import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';

export interface Track {
  title: string;
  filename: string;
  /** Csak az énekes számoknál; az instrumentálisaknál üres. */
  lyricist?: string;
  duration: string;
}

const DEFAULT_VOLUME = 0.8;
const FADE_SECONDS = 2;

@Component({
  selector: 'app-jukebox',
  standalone: true,
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.scss'],
  imports: [NgClass]
})
export class JukeboxComponent implements OnDestroy {
  currentTrack: Track | null = null;
  isLooping = false;
  isShuffling = false;
  showVisualizer = false;
  showEqualizer = false;
  isMinimized = true;
  currentClass = 'cont track-info';

  /** A felhasználó által beállított hangerő (0–1); minden szám ezzel indul. */
  volume = DEFAULT_VOLUME;

  readonly tracks: Track[] = [
    { title: 'Frostbound Journey', filename: 'Frostbound_Journey.mp3', duration: '2:00' },
    { title: 'The Epic Quest', filename: 'The Epic Quest.mp3', duration: '2:00' },
    { title: 'Quest of the Hero', filename: 'Quest of the Hero.mp3', duration: '2:00' },
    { title: 'Wild Woods Wander', filename: 'Wild Woods Wander.mp3', duration: '2:00' },
    { title: 'Az életed egy…', filename: 'Az életed egy….mp3', lyricist: 'Porkoláb Ádám', duration: '3:00' },
    { title: 'Háború, harc', filename: 'Háború, harc.mp3', lyricist: 'Porkoláb Ádám', duration: '2:26' },
    { title: 'Szellem vagyok', filename: 'Szellem vagyok.mp3', lyricist: 'Porkoláb Ádám', duration: '1:51' },
    { title: 'A Vámpír', filename: 'A Vámpír.mp3', lyricist: 'Porkoláb Ádám', duration: '3:54' }
  ];

  readonly audio: HTMLAudioElement = new Audio();

  // A Web Audio láncot (forrás → mély → magas → analizátor → kimenet) csak az első
  // lejátszáskor építjük fel: a böngészők felhasználói művelet előtt nem engedik elindítani,
  // és egy <audio> elemhez csak EGY MediaElementSource köthető.
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private bassFilter: BiquadFilterNode | null = null;
  private trebleFilter: BiquadFilterNode | null = null;
  private bassGain = 0;
  private trebleGain = 0;

  private canvas: HTMLCanvasElement | null = null;
  private visualizerFrame: number | null = null;
  private fadeFrame: number | null = null;
  private faded = false;
  private playedTracks = new Set<number>();

  private readonly listeners: Array<[string, () => void]> = [
    ['ended', () => this.onEnded()],
    ['play', () => this.onPlay()],
    ['timeupdate', () => this.onTimeUpdate()]
  ];

  // A vizualizáló vászon *ngIf/@if alatt van, és két helyen (kis és nagy nézetben) is
  // létezik: a setter minden megjelenéskor megkapja az épp látható példányt.
  @ViewChild('visualizerCanvas')
  set visualizerCanvas(ref: ElementRef<HTMLCanvasElement> | undefined) {
    this.canvas = ref?.nativeElement ?? null;
    if (this.canvas && this.showVisualizer) {
      this.startVisualizer();
    } else if (!this.canvas) {
      this.stopVisualizer();
    }
  }

  constructor() {
    this.audio.preload = 'none';
    for (const [type, handler] of this.listeners) {
      this.audio.addEventListener(type, handler);
    }
  }

  ngOnDestroy(): void {
    for (const [type, handler] of this.listeners) {
      this.audio.removeEventListener(type, handler);
    }
    this.audio.pause();
    this.audio.removeAttribute('src');
    this.audio.load();
    this.stopVisualizer();
    this.cancelFade();
    void this.audioContext?.close();
  }

  /** Lejátssza az aktuális vagy a megadott számot. */
  play(filename?: string): void {
    this.ensureAudioGraph();

    if (filename && this.currentTrack?.filename !== filename) {
      const track = this.tracks.find(t => t.filename === filename);
      if (!track) {
        return;
      }
      this.currentTrack = track;
      this.audio.src = `music/${encodeURIComponent(filename)}`;
      this.audio.load();
    }
    this.startPlayback();
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.cancelFade();
    this.audio.pause();
    if (this.currentTrack) {
      this.audio.currentTime = 0;
    }
    this.currentTrack = null;
    this.playedTracks.clear();
  }

  togglePlayPause(): void {
    if (this.audio.paused) {
      this.playCurrent();
    } else {
      this.pause();
    }
  }

  playCurrent(): void {
    if (this.currentTrack) {
      this.play();
    } else {
      this.play(this.tracks[0].filename);
    }
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  getTooltipText(): string {
    return this.isPlaying() ? 'Szüneteltetés' : 'Lejátszás';
  }

  /** Lejátssza az előző számot a lejátszási listában. */
  playPrevious(): void {
    const index = this.currentIndex();
    const previous = index > 0 ? index - 1 : this.tracks.length - 1;
    this.play(this.tracks[previous].filename);
  }

  /** A „Következő” gomb: mindig a lista következő száma. */
  playNext(): void {
    const index = this.currentIndex();
    this.play(this.tracks[(index + 1) % this.tracks.length].filename);
  }

  /** Szám végén: keverésnél véletlenszerű, különben a következő. */
  playNextTrack(): void {
    if (this.isShuffling) {
      this.playRandomTrack();
    } else {
      this.playNext();
    }
  }

  playRandomTrack(): void {
    if (this.playedTracks.size >= this.tracks.length) {
      this.playedTracks.clear();
    }
    const remaining = this.tracks
      .map((_, i) => i)
      .filter(i => !this.playedTracks.has(i) && i !== this.currentIndex());
    const pool = remaining.length ? remaining : this.tracks.map((_, i) => i);
    const next = pool[Math.floor(Math.random() * pool.length)];
    this.playedTracks.add(next);
    this.play(this.tracks[next].filename);
  }

  toggleLoop(): void {
    this.isLooping = !this.isLooping;
  }

  toggleShuffle(): void {
    this.isShuffling = !this.isShuffling;
    this.playedTracks.clear();
  }

  toggleEqualizer(): void {
    this.showEqualizer = !this.showEqualizer;
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }

  toggleVisualizer(): void {
    this.showVisualizer = !this.showVisualizer;
    if (this.showVisualizer) {
      this.startVisualizer();
    } else {
      this.stopVisualizer();
    }
  }

  setVolume(event: Event): void {
    this.volume = Number((event.target as HTMLInputElement).value) / 100;
    this.cancelFade();
    this.audio.volume = this.volume;
  }

  get volumePercent(): number {
    return Math.round(this.volume * 100);
  }

  setBassBoost(event: Event): void {
    this.bassGain = this.calculateGain(Number((event.target as HTMLInputElement).value), 40);
    this.applyGains();
  }

  setTrebleBoost(event: Event): void {
    this.trebleGain = this.calculateGain(Number((event.target as HTMLInputElement).value), 40);
    this.applyGains();
  }

  /** A 0–100-as csúszkaértéket -maxGain/2 … +maxGain/2 dB-re képezi (40 → ±20 dB). */
  calculateGain(value: number, maxGain: number): number {
    return (value - 50) * (maxGain / 100);
  }

  getProgress(): number {
    return this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0;
  }

  seek(event: MouseEvent): void {
    if (!this.audio.duration) {
      return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    this.audio.currentTime = ratio * this.audio.duration;
  }

  startVisualizer(): void {
    this.stopVisualizer();
    const canvas = this.canvas;
    const analyser = this.analyser;
    const context = canvas?.getContext('2d');
    if (!canvas || !analyser || !context) {
      return; // az első lejátszáskor (ensureAudioGraph) újrapróbáljuk
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    analyser.fftSize = 256;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      if (!this.showVisualizer || this.canvas !== canvas) {
        return;
      }
      this.visualizerFrame = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);
      context.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / data.length) * 2.5;
      let x = 0;
      for (const value of data) {
        context.fillStyle = `rgb(${Math.min(value + 100, 255)}, 50, 50)`;
        context.fillRect(x, canvas.height - value / 2, barWidth, value / 2);
        x += barWidth + 1;
      }
    };
    draw();
  }

  stopVisualizer(): void {
    if (this.visualizerFrame !== null) {
      cancelAnimationFrame(this.visualizerFrame);
      this.visualizerFrame = null;
    }
    const context = this.canvas?.getContext('2d');
    if (this.canvas && context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private currentIndex(): number {
    return this.currentTrack ? this.tracks.indexOf(this.currentTrack) : -1;
  }

  private startPlayback(): void {
    this.cancelFade();
    this.audio.volume = this.volume;
    void this.audioContext?.resume();
    this.audio.play().catch(err => {
      // Gyors számváltáskor a félbeszakított play() AbortError-t dob — ez nem hiba.
      if (err?.name !== 'AbortError') {
        console.warn('A lejátszás nem indult el:', err);
      }
    });
  }

  private ensureAudioGraph(): void {
    if (this.audioContext) {
      return;
    }
    const context = new AudioContext();
    const source = context.createMediaElementSource(this.audio);
    this.bassFilter = context.createBiquadFilter();
    this.bassFilter.type = 'lowshelf';
    this.bassFilter.frequency.value = 200;
    this.trebleFilter = context.createBiquadFilter();
    this.trebleFilter.type = 'highshelf';
    this.trebleFilter.frequency.value = 3000;
    this.analyser = context.createAnalyser();

    source.connect(this.bassFilter);
    this.bassFilter.connect(this.trebleFilter);
    this.trebleFilter.connect(this.analyser);
    this.analyser.connect(context.destination);
    this.audioContext = context;
    this.applyGains();

    if (this.showVisualizer) {
      this.startVisualizer();
    }
  }

  private applyGains(): void {
    if (!this.audioContext || !this.bassFilter || !this.trebleFilter) {
      return;
    }
    const now = this.audioContext.currentTime;
    this.bassFilter.gain.setValueAtTime(this.bassGain, now);
    this.trebleFilter.gain.setValueAtTime(this.trebleGain, now);
  }

  private onPlay(): void {
    if (this.showVisualizer) {
      this.startVisualizer();
    }
  }

  private onEnded(): void {
    this.cancelFade();
    if (this.isLooping) {
      this.audio.currentTime = 0;
      this.startPlayback();
    } else {
      this.playNextTrack();
    }
  }

  private onTimeUpdate(): void {
    const remaining = this.audio.duration - this.audio.currentTime;
    if (remaining <= FADE_SECONDS) {
      this.fadeOut();
    } else if (this.faded) {
      // visszatekertek a lecsengésből: vissza az eredeti hangerőre
      this.cancelFade();
      this.audio.volume = this.volume;
    }
  }

  /** A szám utolsó két másodpercében lehalkít (egyszerre csak egy lecsengés fut). */
  private fadeOut(): void {
    if (this.faded) {
      return;
    }
    this.faded = true;
    const start = performance.now();
    const from = this.audio.volume;
    const step = (now: number) => {
      const t = Math.min((now - start) / (FADE_SECONDS * 1000), 1);
      this.audio.volume = from * (1 - t);
      this.fadeFrame = t < 1 ? requestAnimationFrame(step) : null;
    };
    this.fadeFrame = requestAnimationFrame(step);
  }

  private cancelFade(): void {
    this.faded = false;
    if (this.fadeFrame !== null) {
      cancelAnimationFrame(this.fadeFrame);
      this.fadeFrame = null;
    }
  }
}

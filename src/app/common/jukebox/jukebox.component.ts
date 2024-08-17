import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jukebox',
  standalone: true,
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.scss'],
  imports: [CommonModule]  // További szükséges modulok itt hozzáadhatók, pl. FormsModule, ReactiveFormsModule
})
export class JukeboxComponent implements AfterViewInit {
  currentTrack: any = null;
  isLooping: boolean = false;
  isShuffling: boolean = false;
  showVisualizer: boolean = false;
  showEqualizer: boolean = false;
  isMinimized: boolean = true;
  currentClass = 'cont track-info';
  audioContextInitialized: boolean = false;
  tracks: Array<{ title: string, filename: string, author: string, lyricist: string, duration: string }> = [
    { title: 'Frostbound Journey', filename: 'Frostbound_Journey.mp3', author: '', lyricist: '', duration: '3:45' },
    { title: 'The Epic Quest', filename: 'The Epic Quest.mp3', author: '', lyricist: '', duration: '4:30' },
    { title: 'Quest of the Hero', filename: 'Quest of the Hero.mp3', author: '', lyricist: '', duration: '5:00' },
    { title: 'Wild Woods Wander', filename: 'Wild Woods Wander.mp3', author: '', lyricist: '', duration: '2:50' },
    { title: 'Az életed egy…', filename: 'Az életed egy….mp3', author: '', lyricist: 'Porkoláb Ádám', duration: '3:20' },
    { title: 'Háború, harc', filename: 'Háború, harc.mp3', author: '', lyricist: 'Porkoláb Ádám', duration: '4:00' },
    { title: 'Szellem vagyok', filename: 'Szellem vagyok.mp3', author: '', lyricist: 'Porkoláb Ádám', duration: '1:51' },
    { title: 'A Vámpír', filename: 'A Vámpír.mp3', author: '', lyricist: 'Porkoláb Ádám', duration: '3:54' }
  ];

  audio: HTMLAudioElement = new Audio();
  audioContext: AudioContext;
  analyser: AnalyserNode;
  source: MediaElementAudioSourceNode | null = null;
  bassFilter: BiquadFilterNode;
  trebleFilter: BiquadFilterNode;
  playedTracks: Set<number> = new Set();
  @ViewChild('visualizerCanvas') visualizerCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.bassFilter = this.audioContext.createBiquadFilter();
    this.bassFilter.type = 'lowshelf';
    this.bassFilter.frequency.setValueAtTime(200, this.audioContext.currentTime);

    this.trebleFilter = this.audioContext.createBiquadFilter();
    this.trebleFilter.type = 'highshelf';
    this.trebleFilter.frequency.setValueAtTime(3000, this.audioContext.currentTime);
  }

  ngAfterViewInit() {
    this.audio.addEventListener('ended', () => {
      if (this.isLooping) {
        this.audio.play();
      } else {
        this.playNextTrack();
      }
    });

    this.audio.addEventListener('play', () => {
      this.audio.volume = 1.0;
      this.autoMaster();
      if (this.showVisualizer) {
        this.startVisualizer();
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration - this.audio.currentTime <= 2) {
        this.fadeOut();
      }
    });

    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.bassFilter);
    this.bassFilter.connect(this.trebleFilter);
    this.trebleFilter.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  startAudioContext() {
    if (!this.audioContextInitialized) {
      this.audioContext.resume().then(() => {
        this.audioContextInitialized = true;
        console.log('AudioContext started.');
      });
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.currentTrack = null;
    this.playedTracks.clear();
  }

  pause() {
    this.audio.pause();
  }

  /**
   * Lejátsza az aktuális vagy megadott számot.
   * @param filename Az audiofájl neve (ha meg van adva).
   */
  play(filename?: string) {
    this.startAudioContext();
    const filePath = filename ? `music/${filename}` : null;

    if (filePath && this.currentTrack?.filename !== filename) {
      this.currentTrack = this.tracks.find(t => t.filename === filename) || null;
      if (this.currentTrack) {
        this.audio.src = filePath;
        this.audio.load(); // Biztosítjuk, hogy a fájl újra betöltődjön.
        this.audio.play();
      }
    } else {
      this.audio.play();
    }
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
  }

  toggleShuffle() {
    this.isShuffling = !this.isShuffling;
  }

  toggleEqualizer() {
    this.showEqualizer = !this.showEqualizer;
  }

  stopVisualizer() {
    if (this.visualizerCanvas) {
      const canvas = this.visualizerCanvas.nativeElement;
      const canvasContext = canvas.getContext('2d');
      if (canvasContext) {
        // Töröljük a canvas-t és állítsuk le a vizualizációt
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  setVolume(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.audio.volume = Number(value) / 100;
  }

  fadeOut() {
    const fadeStep = () => {
      if (this.audio.volume > 0.01) {
        this.audio.volume -= 0.01;
        requestAnimationFrame(fadeStep);
      } else {
        this.audio.volume = 0;
      }
    };
    fadeStep();
  }

  autoMaster() {
    // Assuming normalization value is 0.8 for consistent volume
    this.audio.volume = 0.8;
  }

  setBassBoost(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    const gain = this.calculateGain(value, 40); // Max gain: 40 dB
    this.bassFilter.gain.setValueAtTime(gain, this.audioContext.currentTime);
  }

  setTrebleBoost(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    const gain = this.calculateGain(value, 40); // Max gain: 40 dB
    this.trebleFilter.gain.setValueAtTime(gain, this.audioContext.currentTime);
  }

  calculateGain(value: number, maxGain: number): number {
    // Gain érték finomhangolása kisebb léptékkel, hogy ne legyen túl érzékeny
    return (value - 50) * (maxGain / 100); // -20 dB-től +20 dB-ig terjedő tartomány
  }

  getProgress() {
    return this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0;
  }

  seek(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const seekTime = (x / width) * this.audio.duration;
    this.audio.currentTime = seekTime;
  }

  /**
   * Lejátssza az előző számot a lejátszási listában.
   */
  playPrevious() {
    let currentIndex = this.tracks.indexOf(this.currentTrack);
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : this.tracks.length - 1;
    this.play(this.tracks[currentIndex].filename);
  }

  /**
   * Lejátssza a következő számot a lejátszási listában, vagy keverés esetén véletlenszerűen.
   */
  playNextTrack() {
    if (this.isShuffling) {
      this.playRandomTrack();
    } else {
      let currentIndex = this.tracks.indexOf(this.currentTrack);
      currentIndex = (currentIndex + 1) % this.tracks.length;
      this.play(this.tracks[currentIndex].filename);
    }
  }

  playRandomTrack() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.tracks.length);
    } while (this.playedTracks.has(randomIndex) && this.playedTracks.size < this.tracks.length);

    if (this.playedTracks.size >= this.tracks.length) {
      this.playedTracks.clear();
    }

    this.playedTracks.add(randomIndex);
    this.play(this.tracks[randomIndex].filename);
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;

    if (!this.isMinimized && this.showVisualizer) {
      this.restartVisualizer(); // Teljes újraindítás
    }
  }

  restartVisualizer() {
    if (!this.visualizerCanvas || !this.audio) {
      return;
    }

    if (this.audioContext.state !== 'closed') {
      this.analyser.disconnect();
      this.source!.disconnect();
      this.source!.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } else {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    this.startVisualizer();
  }

  startVisualizer() {
    if (!this.visualizerCanvas || !this.analyser) {
      return;
    }

    const canvas = this.visualizerCanvas.nativeElement;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.showVisualizer) return;
      requestAnimationFrame(draw);

      this.analyser.getByteFrequencyData(dataArray);

      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
        canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    };

    draw();
  }

  toggleVisualizer() {
    this.showVisualizer = !this.showVisualizer;

    if (this.showVisualizer && !this.isMinimized) {
      this.restartVisualizer();  // Újraindítás a biztos működésért
    }
  }

  togglePlayPause() {
    if (this.audio.paused) {
      this.playCurrent();
    } else {
      this.pause();
    }
  }

  playCurrent() {
    if (this.currentTrack) {
      this.audio.play();
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

  playNext() {
    if (this.currentTrack) {
      let currentIndex = this.tracks.indexOf(this.currentTrack);
      if (currentIndex === this.tracks.length - 1) {
        currentIndex = 0; // Az első számra ugrik, ha az utolsónál van
      } else {
        currentIndex += 1;
      }
      this.play(this.tracks[currentIndex].filename);
    } else {
      this.play(this.tracks[0].filename); // Az első számot játssza, ha nincs aktuális szám
    }
  }
}
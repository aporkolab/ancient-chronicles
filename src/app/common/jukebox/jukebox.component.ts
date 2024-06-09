import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jukebox',
  standalone: true,
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.scss'],
  imports: [CommonModule]
})
export class JukeboxComponent implements AfterViewInit {
  currentTrack: any = null;
  isLooping: boolean = false;
  isShuffling: boolean = false;
  showVisualizer: boolean = false;
  showEqualizer: boolean = false;
  isMinimized: boolean = false;
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

  play(filename: string) {
    this.startAudioContext();
    const filePath = `music/${filename}`; // Ensure correct file path
    if (this.currentTrack && this.currentTrack.filename === filename && !this.audio.paused) {
      this.audio.pause();
    } else {
      this.currentTrack = this.tracks.find(t => t.filename === filename);
      this.audio.src = filePath;
      this.audio.play();
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

  playCurrent() {
    if (this.currentTrack) {
      this.audio.play();
    } else {
      this.play(this.tracks[0].filename);
    }
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
  }

  toggleShuffle() {
    this.isShuffling = !this.isShuffling;
  }

  toggleVisualizer() {
    this.showVisualizer = !this.showVisualizer;
    if (this.showVisualizer && this.visualizerCanvas) {
      this.startVisualizer();
    }
  }

  toggleEqualizer() {
    this.showEqualizer = !this.showEqualizer;
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  setVolume(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.audio.volume = Number(value) / 100;
  }

  fadeOut() {
    let volume = this.audio.volume;
    const fadeInterval = setInterval(() => {
      if (volume > 0) {
        volume -= 0.1;
        this.audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
      }
    }, 200);
  }

  autoMaster() {
    // Assuming normalization value is 0.8 for consistent volume
    this.audio.volume = 0.8;
  }

  startVisualizer() {
    if (!this.visualizerCanvas) {
      return;
    }

    const canvas = this.visualizerCanvas.nativeElement;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;

    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      canvasContext.fillStyle = 'rgb(0, 0, 0)';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
      }
    };

    draw();
  }

  setBassBoost(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.bassFilter.gain.setValueAtTime(Number(value), this.audioContext.currentTime);
  }

  setTrebleBoost(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.trebleFilter.gain.setValueAtTime(Number(value), this.audioContext.currentTime);
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
}

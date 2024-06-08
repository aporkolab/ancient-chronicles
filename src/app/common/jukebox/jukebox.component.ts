// jukebox.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jukebox',
  standalone: true,
  templateUrl: './jukebox.component.html',
  styleUrls: ['./jukebox.component.scss'],
  imports: [CommonModule]
})
export class JukeboxComponent {
  currentTrack: any = null;
  isLooping: boolean = false;
  tracks: Array<{ title: string, filename: string, author: string, lyricist: string, duration: string }> = [
    { title: 'Frostbound Journey', filename: 'Frostbound_Journey.mp3', author: 'Author 1', lyricist: 'Lyricist 1', duration: '3:45' },
    { title: 'The Epic Quest', filename: 'The Epic Quest.mp3', author: 'Author 2', lyricist: 'Lyricist 2', duration: '4:30' },
    { title: 'Quest of the Hero', filename: 'Quest of the Hero.mp3', author: 'Author 3', lyricist: 'Lyricist 3', duration: '5:00' },
    { title: 'Wild Woods Wander', filename: 'Wild Woods Wander.mp3', author: 'Author 4', lyricist: 'Lyricist 4', duration: '2:50' },
    { title: 'Az életed egy…', filename: 'Az életed egy….mp3', author: 'Author 5', lyricist: 'Lyricist 5', duration: '3:20' },
    { title: 'Háború, harc', filename: 'Háború, harc.mp3', author: 'Author 6', lyricist: 'Lyricist 6', duration: '4:00' },
    { title: 'A gyűlölet maga…', filename: 'A gyűlölet maga….mp3', author: 'Author 7', lyricist: 'Lyricist 7', duration: '4:10' }
  ];

  audio: HTMLAudioElement = new Audio();

  ngOnInit() {
    this.audio.addEventListener('ended', () => {
      if (this.isLooping) {
        this.audio.play();
      } else {
        this.stop();
      }
    });
  }

  play(filename: string) {
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
  }

  toggleLoop() {
    this.isLooping = !this.isLooping;
  }

  getProgress() {
    return this.audio.duration ? (this.audio.currentTime / this.audio.duration) * 100 : 0;
  }
}

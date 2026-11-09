import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JukeboxComponent } from './jukebox.component';

describe('JukeboxComponent', () => {
  let component: JukeboxComponent;
  let fixture: ComponentFixture<JukeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JukeboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(JukeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list tracks with m:ss durations and unique files', () => {
    expect(component.tracks.length).toBe(8);
    expect(new Set(component.tracks.map(t => t.filename)).size).toBe(8);
    for (const t of component.tracks) {
      expect(t.duration).withContext(t.title).toMatch(/^\d+:[0-5]\d$/);
    }
  });

  it('should map the 0–100 slider to ±20 dB', () => {
    expect(component.calculateGain(0, 40)).toBe(-20);
    expect(component.calculateGain(50, 40)).toBe(0);
    expect(component.calculateGain(100, 40)).toBe(20);
  });

  it('should wrap around with next/previous', () => {
    const play = spyOn(component, 'play');
    component.currentTrack = component.tracks[component.tracks.length - 1];
    component.playNext();
    expect(play).toHaveBeenCalledWith(component.tracks[0].filename);

    component.currentTrack = component.tracks[0];
    component.playPrevious();
    expect(play).toHaveBeenCalledWith(component.tracks[component.tracks.length - 1].filename);
  });

  it('should not repeat a track while shuffling until all have played', () => {
    const played: string[] = [];
    spyOn(component, 'play').and.callFake((f?: string) => {
      played.push(f!);
      component.currentTrack = component.tracks.find(t => t.filename === f) ?? null;
    });
    for (let i = 0; i < component.tracks.length; i++) {
      component.playRandomTrack();
    }
    expect(new Set(played).size).toBe(component.tracks.length);
  });

  it('should remember the chosen volume', () => {
    component.setVolume({ target: { value: '30' } } as unknown as Event);
    expect(component.volume).toBeCloseTo(0.3);
    expect(component.audio.volume).toBeCloseTo(0.3);
    expect(component.volumePercent).toBe(30);
  });
});

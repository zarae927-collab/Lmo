/**
 * Gentle Web Audio Synthesizer for playing romantic music-box / acoustic chimes
 * when no custom audio file or URL has been uploaded yet.
 */

class BirthdayMelodySynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private step: number = 0;
  private volume: number = 0.5;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private onEndedCallback: (() => void) | null = null;
  private onStepCallback: ((step: number, total: number) => void) | null = null;

  // Gentle, warm chord progression inspired by Haareya / romantic birthday acoustic song
  // Notes in Hz
  private notes = [
    { freq: 261.63, dur: 0.5, name: 'C4' },
    { freq: 293.66, dur: 0.5, name: 'D4' },
    { freq: 329.63, dur: 0.5, name: 'E4' },
    { freq: 392.00, dur: 0.75, name: 'G4' },
    { freq: 349.23, dur: 0.5, name: 'F4' },
    { freq: 329.63, dur: 0.5, name: 'E4' },
    { freq: 293.66, dur: 0.75, name: 'D4' },
    { freq: 261.63, dur: 1.0, name: 'C4' },

    { freq: 329.63, dur: 0.5, name: 'E4' },
    { freq: 392.00, dur: 0.5, name: 'G4' },
    { freq: 440.00, dur: 0.5, name: 'A4' },
    { freq: 523.25, dur: 0.8, name: 'C5' },
    { freq: 493.88, dur: 0.5, name: 'B4' },
    { freq: 440.00, dur: 0.5, name: 'A4' },
    { freq: 392.00, dur: 1.2, name: 'G4' },

    { freq: 349.23, dur: 0.5, name: 'F4' },
    { freq: 392.00, dur: 0.5, name: 'G4' },
    { freq: 440.00, dur: 0.5, name: 'A4' },
    { freq: 392.00, dur: 0.5, name: 'G4' },
    { freq: 329.63, dur: 0.5, name: 'E4' },
    { freq: 293.66, dur: 0.6, name: 'D4' },
    { freq: 261.63, dur: 1.5, name: 'C4' },
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public play(onStep?: (step: number, total: number) => void, onEnded?: () => void) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.onStepCallback = onStep || null;
    this.onEndedCallback = onEnded || null;
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public stop() {
    this.pause();
    this.step = 0;
  }

  public toggle(onStep?: (step: number, total: number) => void, onEnded?: () => void): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(onStep, onEnded);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getProgress(): number {
    return this.notes.length > 0 ? this.step / this.notes.length : 0;
  }

  public seek(ratio: number) {
    const target = Math.floor(ratio * this.notes.length);
    this.step = Math.max(0, Math.min(this.notes.length - 1, target));
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    if (this.step >= this.notes.length) {
      // Loop or restart smoothly
      this.step = 0;
    }

    const note = this.notes[this.step];
    this.playTone(note.freq, note.dur);

    if (this.onStepCallback) {
      this.onStepCallback(this.step, this.notes.length);
    }

    this.step++;

    const delayMs = note.dur * 850;
    this.timer = window.setTimeout(() => {
      this.scheduleNextNote();
    }, delayMs);
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Harmonic bell/music-box synthesis
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Warm soft overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.25, now);
    osc2.connect(subGain);
    subGain.connect(noteGain);

    osc1.connect(noteGain);

    // Pluck attack & smooth exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.4);

    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.5);
    osc2.stop(now + duration * 1.5);
  }
}

export const birthdaySynth = new BirthdayMelodySynth();

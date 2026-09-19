// Soft romantic music box / acoustic chime melody using Web Audio API

class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;

  // Romantic arpeggio sequence (notes in Hz: C4, E4, G4, B4, C5, D5, E5, G5, etc.)
  private melodyNotes: number[] = [
    261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 587.33, 493.88,
    392.0, 329.63, 349.23, 440.0, 523.25, 440.0, 392.0, 329.63,
    293.66, 369.99, 440.0, 554.37, 587.33, 440.0, 369.99, 329.63,
    261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 659.25, 523.25,
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, duration: number = 1.2, volume: number = 0.12) {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine + warm harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Music box envelope: instant attack, gentle decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playChime() {
    // A sweet 3-note celebration chime
    this.playTone(523.25, 0.8, 0.1);
    setTimeout(() => this.playTone(659.25, 0.8, 0.1), 120);
    setTimeout(() => this.playTone(783.99, 1.2, 0.12), 240);
  }

  public playSoftPop() {
    this.playTone(440, 0.15, 0.05);
  }

  public startMelody() {
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    this.currentStep = 0;

    const tick = () => {
      if (!this.isPlaying) return;
      const freq = this.melodyNotes[this.currentStep % this.melodyNotes.length];
      this.playTone(freq, 1.4, 0.08);

      // Add a quiet bass harmony note on some beats
      if (this.currentStep % 4 === 0) {
        this.playTone(freq / 2, 2.0, 0.05);
      }

      this.currentStep++;
      this.timerId = window.setTimeout(tick, 480);
    };

    tick();
  }

  public stopMelody() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticSynth();

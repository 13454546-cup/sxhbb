class NatureSoundGenerator {
  private audioContext: AudioContext | null = null;
  private activeNodes: Map<string, AudioNode[]> = new Map();

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  stopAll() {
    this.activeNodes.forEach((nodes) => {
      nodes.forEach(node => {
        try {
          node.disconnect();
        } catch (e) {}
      });
    });
    this.activeNodes.clear();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  stop(id: string) {
    const nodes = this.activeNodes.get(id);
    if (nodes) {
      nodes.forEach(node => {
        try {
          node.disconnect();
        } catch (e) {}
      });
      this.activeNodes.delete(id);
    }
  }

  setVolume(id: string, volume: number) {
    const nodes = this.activeNodes.get(id);
    if (nodes) {
      nodes.forEach(node => {
        if ('gain' in node) {
          (node as GainNode).gain.value = volume;
        }
      });
    }
  }

  playRainLight(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.3;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);
    this.activeNodes.set(id, nodes);
  }

  playRainHeavy(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1500;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.5;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);
    this.activeNodes.set(id, nodes);
  }

  playRainWindow(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 1;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.4;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);
    this.activeNodes.set(id, nodes);
  }

  playForestDay(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      data[i] = (Math.random() * 2 - 1) * 0.2 * (1 + Math.sin(t * 0.5) * 0.3);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 4000;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.3;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);
    this.activeNodes.set(id, nodes);
  }

  playForestNight(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.2;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);
    this.activeNodes.set(id, nodes);
  }

  playForestStream(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 2;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.1;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.4;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, lfo, lfoGain, gain);
    this.activeNodes.set(id, nodes);
  }

  playOceanCalm(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      data[i] = (Math.random() * 2 - 1) * 0.5 * (1 + Math.sin(t * 0.8) * 0.5);
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.25;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200;

    const gainLfo = ctx.createOscillator();
    gainLfo.type = 'sine';
    gainLfo.frequency.value = 0.25;

    const gainLfoGain = ctx.createGain();
    gainLfoGain.gain.value = volume * 0.2;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.3;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    gainLfo.connect(gainLfoGain);
    gainLfoGain.connect(gain.gain);
    gainLfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, lfo, lfoGain, gainLfo, gainLfoGain, gain);
    this.activeNodes.set(id, nodes);
  }

  playOceanStormy(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.7;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    const lfo = ctx.createOscillator();
    lfo.type = 'sawtooth';
    lfo.frequency.value = 0.5;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 500;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.5;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, lfo, lfoGain, gain);
    this.activeNodes.set(id, nodes);
  }

  playOceanRocky(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.6;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 1.5;

    const lfo = ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 1.5;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.4;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, lfo, lfoGain, gain);
    this.activeNodes.set(id, nodes);
  }

  playBirdsMorning(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const birdInterval = setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000 + Math.random() * 1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500 + Math.random() * 500, ctx.currentTime + 0.1);
      
      filter.type = 'highpass';
      filter.frequency.value = 1500;

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);

      nodes.push(osc, filter, gain);
    }, 800 + Math.random() * 1200);

    nodes.push({
      disconnect: () => clearInterval(birdInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playBirdsForest(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const birdInterval = setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1500 + Math.random() * 800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1800 + Math.random() * 600, ctx.currentTime + 0.08);
      osc.frequency.linearRampToValueAtTime(1200 + Math.random() * 400, ctx.currentTime + 0.16);

      filter.type = 'highpass';
      filter.frequency.value = 1000;

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.12, ctx.currentTime + 0.03);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);

      nodes.push(osc, filter, gain);
    }, 1000 + Math.random() * 2000);

    nodes.push({
      disconnect: () => clearInterval(birdInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playBirdsSong(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const notes = [523, 587, 659, 698, 784, 880, 1047];
    
    const birdInterval = setInterval(() => {
      const noteCount = 2 + Math.floor(Math.random() * 4);
      let time = ctx.currentTime;
      
      for (let i = 0; i < noteCount; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(volume * 0.1, time + 0.02);
        gain.gain.linearRampToValueAtTime(0, time + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.1);

        nodes.push(osc, gain);
        time += 0.08;
      }
    }, 2000 + Math.random() * 3000);

    nodes.push({
      disconnect: () => clearInterval(birdInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playFireCamp(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.25;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);

    const crackleInterval = setInterval(() => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = 100 + Math.random() * 200;

      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(volume * 0.15, ctx.currentTime + 0.01);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);

      nodes.push(osc, oscGain);
    }, 150 + Math.random() * 350);

    nodes.push({
      disconnect: () => clearInterval(crackleInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playFireBonfire(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.35;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, gain);

    const crackleInterval = setInterval(() => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.value = 50 + Math.random() * 150;

      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(volume * 0.2, ctx.currentTime + 0.005);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);

      nodes.push(osc, oscGain);
    }, 80 + Math.random() * 200);

    nodes.push({
      disconnect: () => clearInterval(crackleInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playFireplace(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.25;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 250;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 50;

    const gain = ctx.createGain();
    gain.gain.value = volume * 0.2;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    nodes.push(source, filter, lfo, lfoGain, gain);

    const crackleInterval = setInterval(() => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = 80 + Math.random() * 120;

      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(volume * 0.1, ctx.currentTime + 0.01);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);

      nodes.push(osc, oscGain);
    }, 200 + Math.random() * 400);

    nodes.push({
      disconnect: () => clearInterval(crackleInterval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }

  playMusicMelody(id: string, volume: number = 0.5) {
    const ctx = this.getContext();
    const nodes: AudioNode[] = [];

    const scales: Record<string, number[]> = {
      major: [262, 294, 330, 349, 392, 440, 494],
      minor: [262, 294, 311, 349, 392, 415, 466],
      pentatonic: [262, 294, 330, 392, 440],
      chinese: [262, 294, 311, 350, 392, 415, 466],
    };

    const scale = scales[Object.keys(scales)[Math.floor(Math.random() * Object.keys(scales).length)]];
    let noteIndex = 0;

    const playNote = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.value = scale[noteIndex];

      filter.type = 'lowpass';
      filter.frequency.value = 3000;

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.5);

      nodes.push(osc, filter, gain);

      noteIndex = (noteIndex + Math.floor(Math.random() * 3) - 1 + scale.length) % scale.length;
    };

    playNote();
    const interval = setInterval(playNote, 800);

    nodes.push({
      disconnect: () => clearInterval(interval)
    } as AudioNode);

    this.activeNodes.set(id, nodes);
  }
}

export const soundGenerator = new NatureSoundGenerator();
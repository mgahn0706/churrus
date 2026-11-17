type Voice = {
  file: string;
  maxDuration?: number;
  frequency: number;
  wave: OscillatorType;
  volume: number;
};

const voices: Record<string, Voice> = {
  "나": { file: "/sfx/me.wav", maxDuration: .08, frequency: 420, wave: "triangle", volume: .028 },
  "실험체 A": { file: "/sfx/exp_a.wav", frequency: 350, wave: "triangle", volume: .035 },
  "실험체 B": { file: "/sfx/exp_b.wav", frequency: 255, wave: "square", volume: .018 },
  "실험체 C": { file: "/sfx/exp_c.wav", frequency: 510, wave: "sine", volume: .045 },
  "김짜장": { file: "/sfx/sojang.wav", frequency: 180, wave: "sawtooth", volume: .015 },
};
const selectFile = "/sfx/select.wav";

let context: AudioContext | null = null;
let lastBlipTime = 0;
const samples = new Map<string, AudioBuffer>();
const loadingSamples = new Set<string>();

function loadSample(audioContext: AudioContext, file: string) {
  if (samples.has(file) || loadingSamples.has(file)) return;
  loadingSamples.add(file);
  void fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.arrayBuffer();
    })
    .then((data) => audioContext.decodeAudioData(data))
    .then((buffer) => { samples.set(file, buffer); })
    .catch(() => { /* Keep the synthesized sound as a fallback. */ })
    .finally(() => { loadingSamples.delete(file); });
}

export function primeDialogueAudio() {
  if (typeof window === "undefined" || !window.AudioContext) return;
  try {
    context ??= new window.AudioContext();
    for (const voice of Object.values(voices)) loadSample(context, voice.file);
    loadSample(context, selectFile);
    if (context.state === "suspended") void context.resume().catch(() => {});
  } catch {
    // Audio may be unavailable or blocked by the browser.
  }
}

export function playSelectSound() {
  if (typeof document === "undefined" || document.visibilityState === "hidden") return;
  primeDialogueAudio();
  if (!context || context.state !== "running") return;
  const sample = samples.get(selectFile);
  if (!sample) return;
  const now = context.currentTime;
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = sample;
  gain.gain.setValueAtTime(.5, now);
  source.connect(gain);
  gain.connect(context.destination);
  source.start(now);
  source.onended = () => {
    source.disconnect();
    gain.disconnect();
  };
}

export function playDialogueBlip(speaker: string | undefined, characterIndex: number) {
  if (!speaker || document.visibilityState === "hidden") return;
  const voice = voices[speaker];
  if (!voice || !context || context.state !== "running") return;
  const now = context.currentTime;
  if (now - lastBlipTime < .065) return;
  lastBlipTime = now;

  const sample = samples.get(voice.file);
  if (sample) {
    const duration = Math.min(sample.duration, voice.maxDuration ?? sample.duration);
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = sample;
    gain.gain.setValueAtTime(.5, now);
    gain.gain.setValueAtTime(.5, now + Math.max(0, duration - .012));
    gain.gain.linearRampToValueAtTime(0, now + duration);
    source.connect(gain);
    gain.connect(context.destination);
    source.start(now, 0, duration);
    source.onended = () => {
      source.disconnect();
      gain.disconnect();
    };
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = voice.wave;
  oscillator.frequency.setValueAtTime(
    voice.frequency * (1 + ((characterIndex % 3) - 1) * .045),
    now,
  );
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(voice.volume, now + .004);
  gain.gain.exponentialRampToValueAtTime(.0001, now + .045);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + .05);
  oscillator.onended = () => {
    oscillator.disconnect();
    gain.disconnect();
  };
}

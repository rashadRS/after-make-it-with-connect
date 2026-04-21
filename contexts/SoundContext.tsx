'use client';
import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { soundConfig } from '@/config/sounds';

type SoundKey = keyof typeof soundConfig;

const SoundContext = createContext<{ muted: boolean; toggleMute: () => void; play: (k: SoundKey) => void } | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) audioCtxRef.current = new window.AudioContext();
    return audioCtxRef.current;
  };

  const play = (k: SoundKey) => {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return;
    const cfg = soundConfig[k];

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = cfg.type;
      osc.frequency.setValueAtTime(cfg.frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + cfg.duration);
    } catch {
      // Browser autoplay/security restrictions are expected in some environments.
    }
  };

  const value = useMemo(() => ({ muted, toggleMute: () => setMuted((m) => !m), play }), [muted]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export const useSound = () => {
  const c = useContext(SoundContext);
  if (!c) throw new Error('sound missing');
  return c;
};

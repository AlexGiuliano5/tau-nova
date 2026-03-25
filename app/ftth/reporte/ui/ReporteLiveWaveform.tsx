'use client';

/**
 * Este componente dibuja las barras que se mueven mientras la persona habla.
 * Es solo una ayuda visual: no cambia ni mejora el audio que se guarda.
 *
 * El cálculo se hace con los datos "crudos" del micrófono para que todas las barras
 * respondan de forma más pareja, y no solo una parte del gráfico.
 */

import { useEffect, useRef, useState } from 'react';

const BAR_COUNT = 20;
const INITIAL_HEIGHTS = (): number[] => Array.from({ length: BAR_COUNT }, () => 0.14);
const BAR_KEYS = Array.from({ length: BAR_COUNT }, (_, i) => `live-wave-${i}`);
const ENVELOPE_DECAY = 0.986;
const MIN_ENVELOPE = 0.014;
const WAVE_GAIN = 1.12;
const WAVE_CURVE = 0.82;
const WAVE_BASE_HEIGHT = 0.08;

type Props = {
  stream: MediaStream | null;
};

/**
 * Calcula la intensidad promedio de un tramo del audio.
 * Ese valor nos sirve para decidir qué altura tendrá cada barra.
 */
function rmsPerSegment(
  timeData: Uint8Array,
  barIndex: number,
  barCount: number,
  bufferLength: number
): number {
  const start = Math.floor((barIndex / barCount) * bufferLength);
  const end = Math.floor(((barIndex + 1) / barCount) * bufferLength);
  let sumSq = 0;
  let count = 0;
  for (let k = start; k < end; k++) {
    const centered = ((timeData[k] ?? 128) - 128) / 128;
    sumSq += centered * centered;
    count++;
  }
  return count > 0 ? Math.sqrt(sumSq / count) : 0;
}

export function ReporteLiveWaveform({ stream }: Props) {
  const [bars, setBars] = useState<number[]>(INITIAL_HEIGHTS);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream) {
      setBars(INITIAL_HEIGHTS());
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.55;
    source.connect(analyser);

    const bufferLength = analyser.fftSize;
    const timeData = new Uint8Array(bufferLength);
    let peakEnvelope = 0.045;

    const tick = () => {
      analyser.getByteTimeDomainData(timeData);
      const rmsPerBar: number[] = [];
      for (let i = 0; i < BAR_COUNT; i++) {
        rmsPerBar.push(rmsPerSegment(timeData, i, BAR_COUNT, bufferLength));
      }

      const frameMax = Math.max(...rmsPerBar, 0);
      peakEnvelope = Math.max(frameMax, peakEnvelope * ENVELOPE_DECAY);
      const denom = Math.max(peakEnvelope, MIN_ENVELOPE);

      const next = rmsPerBar.map(rms => {
        const ratio = Math.min(1, rms / denom);
        const boosted = Math.min(1, ratio * WAVE_GAIN);
        const curved = Math.min(1, boosted ** WAVE_CURVE);
        return WAVE_BASE_HEIGHT + curved * (1 - WAVE_BASE_HEIGHT);
      });

      setBars(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      source.disconnect();
      void ctx.close().catch(() => {});
    };
  }, [stream]);

  return (
    <div className="mt-8 flex h-14 w-full max-w-xs items-end justify-center gap-1" aria-hidden>
      {bars.map((h, i) => (
        <div
          key={BAR_KEYS[i]}
          className="w-2 min-w-1.5 shrink-0 rounded-sm bg-(--primary-2) transition-[height] duration-75 dark:bg-(--secondary)"
          style={{ height: `${Math.round(h * 100)}%` }}
        />
      ))}
    </div>
  );
}

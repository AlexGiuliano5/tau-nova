'use client';

import { useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay, FiRotateCcw, FiRotateCw } from 'react-icons/fi';

import { formatMmSsFromSeconds } from './reporte-time';

const SKIP_SECONDS = 5;

type Props = {
  audioUrl: string;
  /**
   * Esta duración viene del cronómetro de grabación.
   * La usamos como respaldo porque a veces el navegador tarda en informar
   * la duración real del archivo, y sin este dato la barra puede verse mal.
   */
  recordedDurationSec: number;
};

/**
 * Reproductor de la grabación en la vista previa.
 * El audio se reproduce con una etiqueta nativa oculta, y los botones que ve la persona
 * son controles propios para mantener el diseño de la pantalla.
 */
export function ReportePreviewPlayer({ audioUrl, recordedDurationSec }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSec, setCurrentSec] = useState(0);
  const [mediaDurationSec, setMediaDurationSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fallbackSec = Math.max(recordedDurationSec, 0);
  const totalSec = mediaDurationSec > 0 ? mediaDurationSec : fallbackSec;

  /**
   * Cuando cambia el archivo de audio, este componente se crea de nuevo desde cero
   * (gracias al key que envía el padre). Por eso no hace falta resetear estado acá.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const syncDuration = () => {
      const d = Number.isFinite(audio.duration) ? audio.duration : 0;
      setMediaDurationSec(d > 0 ? d : fallbackSec);
    };

    const onTime = () => setCurrentSec(audio.currentTime || 0);
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);

    audio.addEventListener('loadedmetadata', syncDuration);
    audio.addEventListener('durationchange', syncDuration);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    syncDuration();

    return () => {
      audio.removeEventListener('loadedmetadata', syncDuration);
      audio.removeEventListener('durationchange', syncDuration);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
    };
  }, [fallbackSec]);

  const seekTo = (next: number) => {
    const audio = audioRef.current;
    if (!audio || totalSec <= 0) {
      return;
    }
    const clamped = Math.min(Math.max(next, 0), totalSec);
    audio.currentTime = clamped;
    setCurrentSec(clamped);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  const rangeMax = Math.max(totalSec, 1);
  const rangeValue = Math.min(currentSec, rangeMax);

  return (
    <div className="mt-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" className="hidden">
        <track kind="captions" srcLang="es" label="Español" />
      </audio>

      <div className="flex items-center justify-between text-xs text-(--text-secondary) dark:text-(--secondary)">
        <span>{formatMmSsFromSeconds(currentSec)}</span>
        <span>{formatMmSsFromSeconds(totalSec)}</span>
      </div>

      <input
        type="range"
        min={0}
        max={rangeMax}
        step={0.1}
        value={rangeValue}
        onChange={e => seekTo(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer accent-(--primary-2) dark:accent-(--secondary)"
        aria-label="Progreso del audio"
      />

      <div className="mt-4 flex items-center justify-center gap-5 text-(--primary-2) dark:text-(--secondary)">
        <button
          type="button"
          onClick={() => seekTo(currentSec - SKIP_SECONDS)}
          className="relative rounded-full p-2 hover:bg-(--primary-2)/10 dark:hover:bg-(--secondary)/15"
          aria-label={`Retroceder ${SKIP_SECONDS} segundos`}
        >
          <FiRotateCcw size={18} />
          <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold">
            {SKIP_SECONDS}
          </span>
        </button>

        <button
          type="button"
          onClick={() => void togglePlay()}
          className="rounded-full bg-(--primary-2) p-3 text-white shadow-md dark:bg-(--secondary-3)"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <FiPause size={22} /> : <FiPlay size={22} />}
        </button>

        <button
          type="button"
          onClick={() => seekTo(currentSec + SKIP_SECONDS)}
          className="relative rounded-full p-2 hover:bg-(--primary-2)/10 dark:hover:bg-(--secondary)/15"
          aria-label={`Adelantar ${SKIP_SECONDS} segundos`}
        >
          <FiRotateCw size={18} />
          <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold">
            {SKIP_SECONDS}
          </span>
        </button>
      </div>
    </div>
  );
}

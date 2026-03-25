'use client';

/**
 * Pantalla del reporte por voz: grabar, escuchar, y completar categoría + transcripción.
 * La grabación y el texto transcrito viven en useReporteRecording; el reproductor en ReportePreviewPlayer.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiChevronDown, FiMic } from 'react-icons/fi';
import { ReporteLiveWaveform } from './ReporteLiveWaveform';
import { ReportePreviewPlayer } from './ReportePreviewPlayer';
import { REPORTE_CATEGORIAS, type ReporteCategoriaId } from './reporte-categorias';
import { formatReporteMmSs, useReporteRecording } from './useReporteRecording';

type StepIdleProps = {
  startRecording: () => Promise<void>;
};

function StepIdle({ startRecording }: StepIdleProps) {
  return (
    <>
      <h2 className="mt-4 text-center text-lg font-bold text-(--text-primary)">
        Reportá el incidente por voz
      </h2>
      <p className="mt-2 max-w-sm text-center text-sm text-(--text-secondary)">
        Tocá el botón para comenzar a grabar. Podés cancelar en cualquier momento.
      </p>
      <button
        type="button"
        onClick={() => void startRecording()}
        className="mt-10 flex h-36 w-36 items-center justify-center rounded-full bg-(--primary-2) text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-(--secondary-3)"
        aria-label="Comenzar grabación"
      >
        <FiMic size={56} strokeWidth={1.5} />
      </button>
    </>
  );
}

type StepRecordingProps = {
  elapsedMs: number;
  progress: number;
  recordingStream: MediaStream | null;
  finalizeRecording: () => void;
  cancelRecording: () => void;
};

function StepRecording({
  elapsedMs,
  progress,
  recordingStream,
  finalizeRecording,
  cancelRecording
}: StepRecordingProps) {
  return (
    <>
      <h2 className="mt-4 text-center text-lg font-bold text-(--text-primary)">Grabando audio…</h2>
      <p className="mt-1 text-center text-sm text-(--text-secondary)">
        Estamos escuchando tu voz. Tocá de nuevo el micrófono para finalizar.
      </p>

      <button
        type="button"
        onClick={finalizeRecording}
        aria-label="Finalizar grabación"
        className="relative mt-8 flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--primary-2) dark:focus-visible:outline-(--secondary-3)"
      >
        <span
          className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-(--primary-2)/25 dark:bg-(--secondary-3)/25"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inline-flex h-[85%] w-[85%] animate-pulse rounded-full bg-(--primary-2)/20 dark:bg-(--secondary-3)/20"
          aria-hidden
        />
        <span className="relative flex h-28 w-28 items-center justify-center rounded-full bg-(--primary-2) text-white shadow-md dark:bg-(--secondary-3)">
          <FiMic size={48} strokeWidth={1.5} />
        </span>
      </button>

      <ReporteLiveWaveform stream={recordingStream} />

      <p className="mt-6 font-mono text-3xl font-bold tabular-nums text-(--text-primary)">
        {formatReporteMmSs(elapsedMs)}
      </p>

      <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-(--outline)">
        <div
          className="h-full rounded-full bg-(--primary-2) transition-[width] duration-100 dark:bg-(--secondary-3)"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="mt-3 text-xs font-semibold tracking-wide text-(--primary-2) dark:text-(--secondary)">
        GRABACIÓN EN CURSO
      </p>

      <div className="mx-auto mt-auto flex w-full max-w-[280px] flex-col gap-3 pt-10">
        <button
          type="button"
          onClick={finalizeRecording}
          className="w-full rounded-xl bg-(--primary-2) py-3.5 text-center text-sm font-semibold text-white dark:bg-(--secondary-3)"
        >
          Finalizar grabación
        </button>
        <button
          type="button"
          onClick={cancelRecording}
          className="w-full rounded-xl bg-(--card-gray) py-3.5 text-center text-sm font-semibold text-(--text-primary) dark:bg-white/10"
        >
          Cancelar
        </button>
      </div>
    </>
  );
}

type StepPreviewProps = {
  elapsedMs: number;
  audioUrl: string | null;
  resetFlow: () => void;
  continueToEdicion: () => void;
};

function StepPreview({ elapsedMs, audioUrl, resetFlow, continueToEdicion }: StepPreviewProps) {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[320px] flex-col items-center">
      <h2 className="text-center text-lg font-bold text-(--text-primary)">Vista previa de audio</h2>
      <p className="mt-1 text-center text-sm text-(--text-secondary)">
        Escuchá la grabación antes de continuar.
      </p>

      <div className="mt-6 w-full rounded-2xl bg-(--primary)/8 p-4 dark:bg-(--secondary-3)/35">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-(--primary-2) text-white dark:bg-(--secondary-3)">
          <FiMic size={36} strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-center font-semibold text-(--text-primary)">
          Grabación (archivo local)
        </p>
        <p className="mt-1 text-center text-sm text-(--primary-2) dark:text-(--secondary)">
          Duración aprox.: {formatReporteMmSs(elapsedMs)}
        </p>
        {audioUrl ? (
          /* Si cambia el archivo, recreamos el reproductor para que play y barra arranquen limpios. */
          <ReportePreviewPlayer
            key={audioUrl}
            audioUrl={audioUrl}
            recordedDurationSec={elapsedMs / 1000}
          />
        ) : null}
      </div>

      <div className="mt-6 flex w-full gap-3">
        <button
          type="button"
          onClick={resetFlow}
          className="w-1/2 rounded-xl border border-(--primary-2) py-3 text-sm font-semibold text-(--primary-2) dark:border-(--secondary-3) dark:text-white"
        >
          Regrabar
        </button>
        <button
          type="button"
          onClick={continueToEdicion}
          className="w-1/2 rounded-xl bg-(--primary-2) py-3 text-sm font-semibold text-white dark:bg-(--secondary-3)"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

type StepEdicionProps = {
  categoriaId: ReporteCategoriaId;
  setCategoriaId: (value: ReporteCategoriaId) => void;
  transcript: string;
  setTranscript: (value: string) => void;
  speechSupported: boolean;
};

function StepEdicion({
  categoriaId,
  setCategoriaId,
  transcript,
  setTranscript,
  speechSupported
}: StepEdicionProps) {
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const categoriaBoxRef = useRef<HTMLDivElement | null>(null);
  const categoriaLabel =
    REPORTE_CATEGORIAS.find(opt => opt.id === categoriaId)?.label ?? 'Seleccionar categoría';

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!categoriaBoxRef.current?.contains(event.target as Node)) {
        setIsCategoriaOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-5 px-1">
      <div>
        <h2 className="text-center text-lg font-bold text-(--text-primary)">Completar reporte</h2>
        <p className="mt-1 text-center text-sm text-(--text-secondary)">
          Elegí una categoría y revisá el texto. Podés editarlo antes de enviar.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="reporte-categoria-trigger"
          className="text-sm font-semibold text-(--text-primary)"
        >
          Categoría
        </label>
        <div ref={categoriaBoxRef} className="relative">
          <button
            id="reporte-categoria-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isCategoriaOpen}
            aria-label="Seleccionar categoría"
            onClick={() => setIsCategoriaOpen(prev => !prev)}
            className="flex w-full items-center justify-between rounded-xl border border-(--outline) bg-(--card-gray) px-3 py-3 text-left text-sm font-medium text-(--text-primary) shadow-sm transition-colors hover:border-(--primary-2)/40 focus:border-(--primary-2) focus:outline-none focus:ring-2 focus:ring-(--primary-2)/20 dark:bg-white/5 dark:hover:border-(--secondary-3)/60 dark:focus:border-(--secondary-3) dark:focus:ring-(--secondary-3)/25"
          >
            <span className="truncate">{categoriaLabel}</span>
            <FiChevronDown
              size={18}
              className={[
                'ml-2 shrink-0 text-(--text-secondary) transition-transform',
                isCategoriaOpen ? 'rotate-180' : ''
              ].join(' ')}
              aria-hidden
            />
          </button>

          {isCategoriaOpen ? (
            <div className="absolute z-20 mt-2 max-h-52 w-full overflow-auto rounded-xl border border-(--outline) bg-(--surface,white) p-1 shadow-xl dark:bg-(--card)">
              {REPORTE_CATEGORIAS.map(opt => {
                const isActive = categoriaId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setCategoriaId(opt.id);
                      setIsCategoriaOpen(false);
                    }}
                    className={[
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-(--primary-2) text-white dark:bg-(--secondary-3)'
                        : 'text-(--text-primary) hover:bg-(--primary-2)/10 dark:hover:bg-(--secondary-3)/25'
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      {!speechSupported ? (
        <p className="rounded-xl border border-(--outline) bg-(--card-gray) px-3 py-2 text-xs text-(--text-secondary) dark:bg-white/5">
          Tu navegador no soporta transcripción automática en vivo. Podés escribir el texto
          manualmente en el campo de abajo.
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="reporte-transcripcion"
          className="text-sm font-semibold text-(--text-primary)"
        >
          Transcripción del audio
        </label>
        <textarea
          id="reporte-transcripcion"
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          rows={8}
          placeholder="Acá aparece la transcripción. Si querés, podés editarla antes de enviar."
          className="w-full resize-y rounded-xl border border-(--outline) bg-(--card-gray) px-3 py-3 text-sm text-(--text-primary) placeholder:text-(--text-secondary) dark:bg-white/5"
        />
      </div>

      <div className="flex w-full gap-3 pt-2">
        <Link
          href="/ftth"
          className="flex w-1/2 items-center justify-center rounded-xl border border-(--primary-2) py-3.5 text-center text-sm font-semibold text-(--primary-2) dark:border-(--secondary-3) dark:bg-white/5 dark:text-white"
        >
          Cancelar
        </Link>
        <button
          type="button"
          onClick={() => {
            console.info('Enviar pendiente', { categoriaId, transcript });
          }}
          className="w-1/2 rounded-xl bg-(--primary-2) py-3.5 text-sm font-semibold text-white dark:bg-(--secondary-3)"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export function ReporteGrabacionPanel() {
  const [categoriaId, setCategoriaId] = useState<ReporteCategoriaId>(REPORTE_CATEGORIAS[0].id);

  const {
    phase,
    elapsedMs,
    error,
    progress,
    recordingStream,
    audioUrl,
    transcript,
    setTranscript,
    speechSupported,
    startRecording,
    finalizeRecording,
    cancelRecording,
    resetFlow,
    continueToEdicion
  } = useReporteRecording();

  return (
    <div className="flex flex-1 flex-col items-center px-2 pb-6">
      {phase === 'idle' ? <StepIdle startRecording={startRecording} /> : null}
      {phase === 'recording' ? (
        <StepRecording
          elapsedMs={elapsedMs}
          progress={progress}
          recordingStream={recordingStream}
          finalizeRecording={finalizeRecording}
          cancelRecording={cancelRecording}
        />
      ) : null}
      {phase === 'preview' ? (
        <StepPreview
          elapsedMs={elapsedMs}
          audioUrl={audioUrl}
          resetFlow={resetFlow}
          continueToEdicion={continueToEdicion}
        />
      ) : null}
      {phase === 'edicion' ? (
        <StepEdicion
          categoriaId={categoriaId}
          setCategoriaId={setCategoriaId}
          transcript={transcript}
          setTranscript={setTranscript}
          speechSupported={speechSupported}
        />
      ) : null}

      {error && (
        <p className="mt-6 max-w-sm text-center text-sm text-(--state-03)" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

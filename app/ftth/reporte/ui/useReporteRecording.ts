'use client';

/**
 * Este hook maneja toda la grabación de voz del reporte en una sola pantalla.
 * Define los momentos del flujo: inicio, grabación, vista previa y pantalla final.
 *
 * También se encarga de limpiar recursos del navegador para evitar problemas:
 * corta el micrófono al terminar, detiene el cronómetro y libera la URL temporal
 * del audio cuando ya no se necesita.
 *
 * El texto transcrito se arma con la API de voz del navegador mientras la persona
 * habla (en paralelo con la grabación). Si el navegador no la ofrece, el cuadro de
 * texto queda vacío y se puede completar a mano.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import { getSpeechRecognitionConstructor } from './speech-recognition';

export { formatMmSsFromMs as formatReporteMmSs } from './reporte-time';

const MAX_MS = 120_000;
const TIMER_TICK_MS = 100;
const RECORDER_CHUNK_MS = 250;

export type ReportePhase = 'idle' | 'recording' | 'preview' | 'edicion';

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined') {
    return undefined;
  }
  for (const t of ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'] as const) {
    if (MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return undefined;
}

function stopTracks(stream: MediaStream | null) {
  stream?.getTracks().forEach(track => {
    track.stop();
  });
}

export function useReporteRecording() {
  const [phase, setPhase] = useState<ReportePhase>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);

  /**
   * Guardamos el stream del micrófono en estado para que el componente de la onda
   * pueda leer exactamente la misma fuente de audio mientras se está grabando.
   */
  const [recordingStream, setRecordingStream] = useState<MediaStream | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startTimeRef = useRef(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');
  const phaseRef = useRef<ReportePhase>('idle');

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopSpeechRecognition = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) {
      return;
    }
    recognitionRef.current = null;
    rec.onresult = null;
    rec.onerror = null;
    rec.onend = null;
    try {
      rec.stop();
    } catch {
      /* el motor a veces ya estaba detenido */
    }
  }, []);

  const releaseMic = useCallback(() => {
    stopTimer();
    stopTracks(streamRef.current);
    streamRef.current = null;
    setRecordingStream(null);
  }, [stopTimer]);

  /**
   * Al cancelar, detenemos la grabación sin ejecutar el cierre normal que arma el audio final.
   * Así evitamos avanzar a la pantalla de vista previa cuando la persona eligió cancelar.
   */
  const stopRecorderSilently = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = null;
      recorder.stop();
    }
    recorderRef.current = null;
  }, []);

  useEffect(() => {
    setSpeechSupported(Boolean(getSpeechRecognitionConstructor()));
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    return () => {
      stopSpeechRecognition();
      releaseMic();
      stopRecorderSilently();
    };
  }, [releaseMic, stopRecorderSilently, stopSpeechRecognition]);

  useEffect(() => {
    if (!recordedBlob) {
      setAudioUrl(null);
      return;
    }
    const url = URL.createObjectURL(recordedBlob);
    setAudioUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [recordedBlob]);

  const startSpeechRecognition = useCallback(() => {
    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) {
      return;
    }
    stopSpeechRecognition();
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-AR';
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const piece = result[0]?.transcript ?? '';
        if (result.isFinal) {
          finalTranscriptRef.current += piece;
        } else {
          interim += piece;
        }
      }
      setTranscript((finalTranscriptRef.current + interim).trim());
    };
    recognition.onerror = () => {
      /* no cortamos la grabación; el usuario puede escribir a mano */
    };
    recognition.onend = () => {
      if (phaseRef.current !== 'recording' || recognitionRef.current !== recognition) {
        return;
      }
      try {
        recognition.start();
      } catch {
        /* el motor a veces no permite reiniciar enseguida */
      }
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
    }
  }, [stopSpeechRecognition]);

  const startRecording = useCallback(async () => {
    setError(null);
    setRecordedBlob(null);
    finalTranscriptRef.current = '';
    setTranscript('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Tu navegador no permite grabar audio desde esta página.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setRecordingStream(stream);

      const mimeType = pickMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      chunksRef.current = [];
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        stopSpeechRecognition();
        const mime = recorder.mimeType || 'audio/webm';
        setRecordedBlob(new Blob(chunksRef.current, { type: mime }));
        chunksRef.current = [];
        recorderRef.current = null;
        releaseMic();
        setPhase('preview');
      };

      recorderRef.current = recorder;
      recorder.start(RECORDER_CHUNK_MS);

      startTimeRef.current = Date.now();
      setElapsedMs(0);
      setPhase('recording');
      if (speechSupported) {
        startSpeechRecognition();
      }

      timerRef.current = setInterval(() => {
        const next = Date.now() - startTimeRef.current;
        if (next >= MAX_MS) {
          setElapsedMs(MAX_MS);
          stopTimer();
          recorder.stop();
          return;
        }
        setElapsedMs(next);
      }, TIMER_TICK_MS);
    } catch {
      setError('No pudimos acceder al micrófono. Revisá los permisos del navegador.');
      stopSpeechRecognition();
      releaseMic();
    }
  }, [releaseMic, speechSupported, startSpeechRecognition, stopSpeechRecognition, stopTimer]);

  const finalizeRecording = useCallback(() => {
    stopTimer();
    setElapsedMs(Math.min(Date.now() - startTimeRef.current, MAX_MS));
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    }
  }, [stopTimer]);

  const cancelRecording = useCallback(() => {
    stopTimer();
    stopSpeechRecognition();
    finalTranscriptRef.current = '';
    setTranscript('');
    stopRecorderSilently();
    chunksRef.current = [];
    setRecordedBlob(null);
    releaseMic();
    setElapsedMs(0);
    setPhase('idle');
  }, [releaseMic, stopRecorderSilently, stopSpeechRecognition, stopTimer]);

  const resetFlow = useCallback(() => {
    stopSpeechRecognition();
    finalTranscriptRef.current = '';
    setTranscript('');
    chunksRef.current = [];
    setRecordedBlob(null);
    setElapsedMs(0);
    setPhase('idle');
  }, [stopSpeechRecognition]);

  const continueToEdicion = useCallback(() => {
    setPhase('edicion');
  }, []);

  const progress = phase === 'recording' ? Math.min(1, elapsedMs / MAX_MS) : 0;

  return {
    phase,
    elapsedMs,
    error,
    progress,
    recordingStream,
    recordedBlob,
    audioUrl,
    transcript,
    setTranscript,
    speechSupported,
    startRecording,
    finalizeRecording,
    cancelRecording,
    resetFlow,
    continueToEdicion
  };
}

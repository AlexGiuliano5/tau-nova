/**
 * La API de reconocimiento de voz del navegador (Chrome/Edge suelen traerla).
 * No transcribe un archivo: escucha el micrófono en vivo, por eso la usamos
 * mientras la persona graba, en paralelo con MediaRecorder.
 */

export function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

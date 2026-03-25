# FTTH - Reporte por voz

## Objetivo
Permitir que el usuario reporte un error describiéndolo con voz:
1) graba audio,
2) revisa la grabación,
3) completa categoría y texto transcripto (editable).

**Todavía no se envía** el reporte al backend: el botón `Enviar` queda como placeholder.

## Rutas
- Paso 1-3 dentro de la misma ruta: `/ftth/reporte`

## Flujo UI (1 sola página)
El flujo se maneja con `phase` en el hook `useReporteRecording` y se renderiza en `ReporteGrabacionPanel`.

### 1) Grabación (fase `recording`)
Archivo principal:
- `app/ftth/reporte/ui/ReporteGrabacionPanel.tsx`
- Hook: `app/ftth/reporte/ui/useReporteRecording.ts`
- Onda en vivo: `app/ftth/reporte/ui/ReporteLiveWaveform.tsx`

Detalles:
- Usa `navigator.mediaDevices.getUserMedia({ audio: true })` para acceder al micrófono.
- Genera el audio con `MediaRecorder`, acumulando `chunks` y construyendo un `Blob` final cuando se termina la grabación.
- Hay un límite de tiempo `MAX_MS` y un cronómetro que actualiza cada `TIMER_TICK_MS`.
- Mientras graba:
  - se muestra una onda decorativa (no impacta el audio guardado) usando `AudioContext` + `AnalyserNode`.
  - se intenta transcribir en vivo usando `SpeechRecognition` (si el navegador lo soporta).

Botones:
- `Finalizar grabación` detiene el cronómetro y cierra el `MediaRecorder`, avanzando a la vista previa.
- `Cancelar` detiene todo y vuelve al estado inicial sin entrar a preview.

### 2) Vista previa (fase `preview`)
Archivo:
- `app/ftth/reporte/ui/ReportePreviewPlayer.tsx`

Detalles:
- El audio real se reproduce con un `<audio>` nativo oculto.
- Los controles (play/pause, barra, saltos de `5s`) son UI propia.
- Como el navegador a veces tarda en informar la duración real del audio, el reproductor usa:
  - duración real si está disponible,
  - o un valor de respaldo basado en el cronómetro (`recordedDurationSec`).
- Se usa `key={audioUrl}` desde `ReporteGrabacionPanel` para recrear el reproductor cuando cambia el archivo de audio.

### 3) Edición final (fase `edicion`)
Archivo:
- `app/ftth/reporte/ui/ReporteGrabacionPanel.tsx`

Detalles:
- Arriba: selector de categoría (placeholder por ahora).
  - categorías: `sin_datos` y `error_funcionalidad` desde `reporte-categorias.ts`
  - el selector es un “select custom” para que se vea bien en mobile y mantiene un UX consistente.
- Abajo: textarea con transcripción editable.
  - si `SpeechRecognition` no está disponible, el campo queda vacío y se puede completar a mano.

Botones:
- `Cancelar`: vuelve a `/ftth`
- `Enviar`: placeholder (no hace acción todavía)

## Transcripción (STT) - estado actual
Implementación:
- Transcripción en vivo desde el micrófono con Web Speech API:
  - `SpeechRecognition` / `webkitSpeechRecognition` (si existe).

Notas importantes:
- No se transcribe el archivo ya grabado; esta API funciona mientras el micrófono está activo.
- En navegadores donde `SpeechRecognition` no está soportado, la app sigue funcionando y el usuario completa a mano.

## Dependencias de navegador y experiencia
Esta feature depende de APIs del navegador:
- Micrófono + grabación: `getUserMedia` + `MediaRecorder`
- Onda en vivo: `AudioContext` + `AnalyserNode`
- Transcripción: `SpeechRecognition` (opcional)

## Futuros pasos (para completar “en producción”)
1) Conectar botón `Enviar`:
   - mover el envío al backend vía `actions/` y/o `services/` según el caso de uso.
2) Mejorar la calidad/consistencia del STT:
   - para mayor uniformidad y mejor calidad, considerar transcripción en backend (Whisper u otra solución) y devolver texto listo.
3) Persistencia del estado entre pantallas (si se decide separar rutas):
   - hoy el paso 3 vive en la misma ruta, así que no es necesario para este MVP.


/**
 * Funciones para mostrar tiempo en pantalla.
 * Las dejamos juntas para usar el mismo criterio en grabación y reproducción.
 */

/** Convierte milisegundos al formato mm:ss para el contador de grabación. */
export function formatMmSsFromMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Convierte segundos al formato m:ss para el reproductor. */
export function formatMmSsFromSeconds(seconds: number): string {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Esta ruta muestra los pasos 1 y 2 del reporte por voz.
 * El encabezado y el pie ya vienen del layout principal de FTTH.
 * Acá solo montamos el contenido propio de esta pantalla.
 */

import type { Metadata } from 'next';
import { ReporteGrabacionPanel } from './ui/ReporteGrabacionPanel';

export const metadata: Metadata = {
  title: 'TAU Nova | Reporte por voz'
};

export default function ReportePage() {
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col">
      <ReporteGrabacionPanel />
    </div>
  );
}

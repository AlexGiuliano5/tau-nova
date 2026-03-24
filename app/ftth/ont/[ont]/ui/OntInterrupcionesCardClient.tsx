'use client';

import { useMemo, useState } from 'react';
import type { OntHistoricDownItem } from '@/types/ftth/ont-info';

interface Props {
  interruptions: OntHistoricDownItem[];
}

export const OntInterrupcionesCardClient = ({ interruptions }: Props) => {
  const [showHistoric, setShowHistoric] = useState(false);

  const recentInterruptions = useMemo(
    () => interruptions.filter(item => item.isInLast24h),
    [interruptions]
  );

  const hasRecentData = recentInterruptions.length > 0;
  const hasHistoricOutside24h = interruptions.some(item => !item.isInLast24h);
  const canToggleView = hasRecentData && hasHistoricOutside24h;
  const effectiveHistoricMode = showHistoric || !hasRecentData;
  const dataToRender = effectiveHistoricMode ? interruptions : recentInterruptions;

  return (
    <>
      <header className="flex items-start justify-between gap-3">
        <h1 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">Interrupciones</h1>
        <span className="inline-flex shrink-0 rounded-full px-2 py-0.5 text-[12px] font-semibold bg-(--text-secondary)/10 text-(--text-secondary)/70">
          {effectiveHistoricMode ? 'Histórico completo' : 'Últimas 24h'}
        </span>
      </header>

      <div className="flex flex-col gap-3 mt-4">
        {dataToRender.length === 0 ? (
          <div className="text-sm text-(--text-secondary)">Sin Datos</div>
        ) : (
          dataToRender.map(item => (
            <div
              key={`${item.status}-${item.date}-${item.time}-${item.duration}`}
              className="grid grid-cols-3 w-full items-center gap-4 mt-2 border-b border-black/20 pb-3 dark:border-white/20"
            >
              <div className="flex items-center justify-center bg-(--card-red)/20 text-(--card-red) font-semibold rounded-full">
                {formatStatusLabel(item.status)}
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="font-semibold">{item.date}</span>
                <span className="text-sm text-(--text-secondary)">{item.time}</span>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className="font-semibold">{item.duration}</span>
                <span className="text-sm text-(--text-secondary)">Duración</span>
              </div>
            </div>
          ))
        )}

        {canToggleView && (
          <button
            type="button"
            className="w-full mt-3 font-semibold text-(--primary) dark:text-(--secondary)"
            onClick={() => setShowHistoric(prev => !prev)}
          >
            {effectiveHistoricMode ? 'Ver últimas 24h' : 'Ver histórico'}
          </button>
        )}
      </div>
    </>
  );
};

function formatStatusLabel(status: string): string {
  const normalized = status.trim();
  if (!normalized) {
    return 'Sin Datos';
  }

  const textWithSpaces = normalized.replace(/_/g, ' ');

  // Si viene todo en mayúsculas, se muestra más legible.
  if (textWithSpaces === textWithSpaces.toUpperCase()) {
    const lower = textWithSpaces.toLowerCase();
    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
  }

  return textWithSpaces;
}

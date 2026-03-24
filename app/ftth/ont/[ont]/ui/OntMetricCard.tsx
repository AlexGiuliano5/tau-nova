'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import type { OntMetricCard as OntMetricCardModel } from '@/types/ftth/ont-info';

interface Props {
  metric: OntMetricCardModel;
}

function getMetricColorClass(color: OntMetricCardModel['color']): string {
  switch (color) {
    case 'neutral':
      return 'bg-(--gray-01) dark:bg-(--card-gray)';
    case 'card-red':
      return 'bg-(--card-red)';
    case 'card-yellow':
      return 'bg-(--card-yellow)';
    case 'card-green':
      return 'bg-(--card-green)';
    default:
      return 'bg-(--gray-01) dark:bg-(--card-gray)';
  }
}

export const OntMetricCard = ({ metric }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasData = metric.actual !== 'Sin Datos';

  return (
    <div className="flex flex-col items-center gap-2 shadow-sm rounded-lg p-2 dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)]">
      <h2 className="text-xs font-semibold text-(--text-secondary)">{metric.title}</h2>
      <div className="flex w-full items-center gap-4">
        <span className={clsx('h-2 flex-1 rounded-full', getMetricColorClass(metric.color))} />
        <p className="text-4xl font-semibold leading-none">{metric.actual}</p>
        <span className={clsx('h-2 flex-1 rounded-full', getMetricColorClass(metric.color))} />
      </div>
      <p className="text-xs text-(--text-secondary)">{metric.unit || 'Sin Datos'}</p>

      {hasData && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label={`Mostrar detalle de ${metric.title}`}
          className="inline-flex items-center justify-center p-1 rounded-md text-(--text-secondary)"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <IoChevronDown className={clsx('transition-transform duration-200', isExpanded && 'rotate-180')} size={20} />
        </button>
      )}

      {isExpanded && (
        <div className="w-full pt-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <span className="text-sm font-semibold">{metric.min}</span>
            <span className="text-sm font-semibold">{metric.avg}</span>
            <span className="text-sm font-semibold">{metric.max}</span>
            <span className="text-xs text-(--text-secondary)">min</span>
            <span className="text-xs text-(--text-secondary)">avg</span>
            <span className="text-xs text-(--text-secondary)">max</span>
          </div>
        </div>
      )}
    </div>
  );
};

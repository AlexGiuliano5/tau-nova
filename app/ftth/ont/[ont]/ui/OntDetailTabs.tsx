'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';
export type OntDetailTabId = 'info' | 'historic-graphs';

const tabs: Array<{ id: OntDetailTabId; label: string }> = [
  { id: 'info', label: 'Información' },
  { id: 'historic-graphs', label: 'Gráficos históricos' }
];

export const OntDetailTabs = () => {
  const params = useParams<{ ont?: string | string[] }>();
  const segment = useSelectedLayoutSegment();
  const ontParam = Array.isArray(params.ont) ? params.ont[0] : params.ont;

  if (!ontParam) return null;

  const normalizedTab = (segment ?? 'info') as OntDetailTabId;

  return (
    <nav
      aria-label="Secciones de detalle ONT"
      className="w-full h-[50px] grid grid-cols-2 items-end text-white bg-(--breadcrumb-bg) border-t border-white/20"
    >
      {tabs.map(tab => {
        const isActive = tab.id === normalizedTab;
        const href = `/ftth/ont/${encodeURIComponent(ontParam)}/${tab.id}`;
        const classes = clsx(
          'h-full w-full inline-flex items-center justify-center text-sm tracking-wide transition-colors',
          {
            'ont-detail-tab-active text-white font-medium': isActive,
            'text-white/80 hover:text-white': !isActive
          }
        );

        if (isActive) {
          return (
            <span key={tab.id} aria-current="page" className={classes}>
              <span className="leading-none">{tab.label}</span>
            </span>
          );
        }

        return (
          <Link key={tab.id} href={href} className={classes}>
            <span className="leading-none">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

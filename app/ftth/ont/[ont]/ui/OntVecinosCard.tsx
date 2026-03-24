import Link from 'next/link';

import { OntNeighborsTablePreview } from '@/components';
import { CardSpinner } from '@/components/ui/loading/CardSpinner';
import type { OntNeighborPreviewItem } from '@/types/ftth/ont-info';

interface Props {
  ont: string;
  neighbors: OntNeighborPreviewItem[];
}

export const OntVecinosCard = ({ ont, neighbors }: Props) => {
  return (
    <div className={cardClassName}>
      <header>
        <h1 className="text-xl font-semibold">Vecinos</h1>
      </header>
      <OntNeighborsTablePreview neighbors={neighbors} />
      <Link
        href={`/ftth/ont/${encodeURIComponent(ont)}/vecinos`}
        className="w-full mt-3 font-semibold text-(--primary) dark:text-(--secondary) flex justify-center"
      >
        Ver tabla completa
      </Link>
    </div>
  );
};

const cardClassName =
  'm-5 shadow-sm rounded-lg p-5 bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5';

export const OntVecinosCardLoading = () => {
  return (
    <div className={`${cardClassName} relative min-h-[280px]`} aria-busy="true" aria-live="polite">
      <CardSpinner label="Cargando vecinos" />
    </div>
  );
};

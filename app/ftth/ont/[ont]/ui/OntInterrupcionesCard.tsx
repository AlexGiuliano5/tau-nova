import { CardSpinner } from '@/components/ui/loading/CardSpinner';
import type { OntHistoricDownItem } from '@/types/ftth/ont-info';
import { OntInterrupcionesCardClient } from './OntInterrupcionesCardClient';

interface Props {
  interruptions: OntHistoricDownItem[];
}

const cardClassName =
  'm-5 shadow-sm rounded-lg p-5 bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5';

export const OntInterrupcionesCard = ({ interruptions }: Props) => {
  return (
    <div className={cardClassName}>
      <OntInterrupcionesCardClient interruptions={interruptions} />
    </div>
  );
};

export const OntInterrupcionesCardLoading = () => {
  return (
    <div className={`${cardClassName} relative min-h-[280px]`} aria-busy="true" aria-live="polite">
      <CardSpinner label="Cargando interrupciones" />
    </div>
  );
};

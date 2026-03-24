import { CardSpinner } from '@/components/ui/loading/CardSpinner';
import type { OntMetricCard as OntMetricCardModel } from '@/types/ftth/ont-info';
import { OntMetricCard } from './OntMetricCard';

interface Props {
  metrics: OntMetricCardModel[];
}

const cardClassName =
  'm-5 shadow-sm rounded-lg p-5 min-h-[300px] bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5';

export const OntMetricsCardGrid = ({ metrics }: Props) => {
  const hasMetrics = metrics.length > 0;
  const data =
    hasMetrics
      ? metrics
      : [
          {
            title: 'Sin Datos',
            actual: 'Sin Datos',
            min: 'Sin Datos',
            avg: 'Sin Datos',
            max: 'Sin Datos',
            unit: '',
            color: 'neutral' as const
          }
        ];

  return (
    <div className={cardClassName}>
      <header>
        <h1 className="text-xl font-semibold">Métricas</h1>
      </header>
      <div className={hasMetrics ? 'flex flex-col gap-2' : 'flex flex-1 items-center'}>
        {data.map(metric => (
          <OntMetricCard
            key={`${metric.title}-${metric.actual}-${metric.min}-${metric.avg}-${metric.max}`}
            metric={metric}
          />
        ))}
      </div>
    </div>
  );
};

export const OntMetricsCardGridLoading = () => {
  return (
    <div className={`${cardClassName} relative`} aria-busy="true" aria-live="polite">
      <CardSpinner label="Cargando métricas" />
    </div>
  );
};

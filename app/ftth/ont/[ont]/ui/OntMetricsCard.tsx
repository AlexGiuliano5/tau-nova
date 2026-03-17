import clsx from 'clsx';
import { IoChevronDown } from 'react-icons/io5';

type OntMetric = {
  metric: string;
  value: string | null;
  unit: string | null;
  color: string | null;
};

const metrics: OntMetric[] = [
  {
    metric: 'ONT RX',
    value: '-23.10',
    unit: 'dBm',
    color: 'green'
  },
  {
    metric: 'OLT RX',
    value: '-28.87',
    unit: 'dBm',
    color: null
  },
  {
    metric: 'ONT TEMPERATURE',
    value: '-23.10',
    unit: '°C',
    color: null
  },
  {
    metric: 'ONT VOLTAGE',
    value: '-23.10',
    unit: 'V',
    color: null
  },
  {
    metric: 'ONT VALOR',
    value: 'SIN DATOS',
    unit: null,
    color: null
  }
];

export const OntMetricsCard = () => {
  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-semibold">Métricas</h1>
      </header>
      {metrics.map(metric => {
        const hasData = metric.value !== 'SIN DATOS';

        return (
          <div
            key={metric.metric}
            className="flex flex-col items-center gap-2 shadow-sm rounded-lg p-2 dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)]"
          >
            <h2 className="text-xs font-semibold text-(--text-secondary)">{metric.metric}</h2>
            <div className="flex w-full items-center gap-4">
              <span
                className={clsx(
                  'h-2 flex-1 rounded-full',
                  metric.color === 'green'
                    ? 'bg-(--card-green)'
                    : 'bg-(--gray-01) dark:bg-(--card-gray)'
                )}
              />
              <p className="text-4xl font-semibold leading-none">{metric.value ?? '-'}</p>
              <span
                className={clsx(
                  'h-2 flex-1 rounded-full',
                  metric.color === 'green'
                    ? 'bg-(--card-green)'
                    : 'bg-(--gray-01) dark:bg-(--card-gray)'
                )}
              />
            </div>
            <p className="text-xs text-(--text-secondary)">{metric.unit ?? '-'}</p>
            {hasData && <IoChevronDown size={20} style={{ color: 'var(--topbar-bg)' }} />}
          </div>
        );
      })}
    </div>
  );
};

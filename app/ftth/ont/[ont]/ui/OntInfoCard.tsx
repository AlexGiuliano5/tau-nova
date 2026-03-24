import { CardSpinner } from '@/components/ui/loading/CardSpinner';
import type { OntInfoDetails } from '@/types/ftth/ont-info';

interface Props {
  ontInfo: OntInfoDetails | null;
  statusLoading?: boolean;
}

const cardClassName =
  'm-5 shadow-sm rounded-lg p-5 min-h-[370px] bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5';

export const OntInfoCard = ({ ontInfo, statusLoading = false }: Props) => {
  const data = ontInfo ?? {
    ponId: 'Sin Datos',
    serial: 'Sin Datos',
    vendor: 'Sin Datos',
    olt: 'Sin Datos',
    placa: 'Sin Datos',
    puerto: 'Sin Datos',
    estado: 'Sin Datos',
    distancia: 'Sin Datos',
    ultimaVezActiva: 'Sin Datos',
    ultimaVezInactiva: 'Sin Datos',
    causaUltimaInactividad: 'Sin Datos'
  };
  const statusTone = getStatusTone(data.estado);
  const statusLabel = statusLoading ? 'Cargando' : formatStatusLabel(data.estado);

  return (
    <div className={cardClassName}>
      <header className="flex items-start justify-between gap-3">
        <h1 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
          Información de ONT
        </h1>

        <span
          className={`inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold dark:text-white ${statusTone}`}
        >
          Estado:{' '}
          {statusLoading ? (
            <>
              <span className="inline-flex h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              <span className="sr-only">Cargando estado</span>
            </>
          ) : (
            statusLabel
          )}
        </span>
      </header>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-(--text-secondary)">PON ID:</span>
          <span className="font-semibold">{data.ponId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-(--text-secondary)">Serial:</span>
          <span className="font-semibold">{data.serial}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-(--text-secondary)">Vendor:</span>
          <span className="font-semibold">{data.vendor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-(--text-secondary)">OLT:</span>
          <span className="font-semibold">{data.olt}</span>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-(--text-secondary)">Placa:</span>
            <span className="font-semibold">{data.placa}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-(--text-secondary)">Puerto</span>
            <span className="font-semibold">{data.puerto}</span>
          </div>
        </div>
      </div>
      <div className="w-full border-t" style={{ borderColor: 'var(--card-divider)' }} />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <span className="text-(--text-secondary)">Distancia:</span>
          <span className="font-semibold text-right">{data.distancia}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-(--text-secondary)">Últ. vez activa:</span>
          <span className="font-semibold text-right whitespace-nowrap">{data.ultimaVezActiva}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-(--text-secondary)">Últ. vez inactiva:</span>
          <span className="font-semibold text-right whitespace-nowrap">
            {data.ultimaVezInactiva}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="text-(--text-secondary)">Causa de últ. inactividad:</span>
          <span className="font-semibold text-right wrap-break-word">
            {data.causaUltimaInactividad}
          </span>
        </div>
      </div>
    </div>
  );
};

export const OntInfoCardLoading = () => {
  return (
    <div className={`${cardClassName} relative`} aria-busy="true" aria-live="polite">
      <CardSpinner label="Cargando información de ONT" />
    </div>
  );
};

function getStatusTone(status: string): string {
  const normalized = status.trim().toUpperCase();

  if (normalized === 'GOOD') {
    return 'bg-(--card-green)/40 border-(--card-green)';
  }

  if (normalized === 'INTERRUPTED') {
    return 'bg-(--card-red)/30 border-(--card-red)';
  }

  if (normalized === 'REDUCED_ROBUSTNESS' || normalized === 'DEGRADED') {
    return 'bg-(--card-yellow)/35 border-(--card-yellow)';
  }

  return 'bg-(--text-secondary)/15 border-(--text-secondary)/40 text-(--text-secondary)';
}

function formatStatusLabel(status: string): string {
  const normalized = status.trim();
  if (!normalized) {
    return 'Sin Datos';
  }

  const withSpaces = normalized.replace(/_/g, ' ');
  if (withSpaces === withSpaces.toUpperCase()) {
    const lower = withSpaces.toLowerCase();
    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
  }

  return withSpaces;
}

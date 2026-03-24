import { CardSpinner } from '@/components/ui/loading/CardSpinner';
import type { OntClientInfo } from '@/types/ftth/ont-info';

interface Props {
  clientInfo: OntClientInfo | null;
}

const cardClassName =
  'm-5 shadow-sm rounded-lg p-5 min-h-[290px] bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5';

export const OntClientCard = ({ clientInfo }: Props) => {
  const data = clientInfo ?? {
    nombre: 'Sin Datos',
    numeroCliente: 'Sin Datos',
    provincia: 'Sin Datos',
    localidad: 'Sin Datos',
    direccion: 'Sin Datos',
    pisoDpto: 'Sin Datos',
    telefonoFijo: 'Sin Datos',
    telefonoMovil: 'Sin Datos'
  };

  return (
    <div className={cardClassName}>
      <header>
        <h1 className="text-xl font-semibold">{data.nombre}</h1>
        <h2 className="text-(--text-secondary)">
          Nro. de cliente: <span className="font-semibold">{data.numeroCliente}</span>
        </h2>
      </header>
      <main className="flex justify-between">
        <div className="flex flex-col text-(--text-secondary) gap-3">
          <span>Provincia:</span>
          <span>Localidad:</span>
          <span>Calle:</span>
          <span>Piso:</span>
          <span>Teléfono fijo:</span>
          <span>Teléfono móvil:</span>
        </div>
        <div className="flex flex-col items-end font-semibold gap-3">
          <span>{data.provincia}</span>
          <span>{data.localidad}</span>
          <span>{data.direccion}</span>
          <span>{data.pisoDpto}</span>
          <span>{data.telefonoFijo}</span>
          <span>{data.telefonoMovil}</span>
        </div>
      </main>
    </div>
  );
};

export const OntClientCardLoading = () => {
  return (
    <div className={`${cardClassName} relative`} aria-busy="true" aria-live="polite">
      <CardSpinner label="Cargando cliente" />
    </div>
  );
};

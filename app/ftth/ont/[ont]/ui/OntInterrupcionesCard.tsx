import { IoAlertCircleOutline } from 'react-icons/io5';

export const OntInterrupcionesCard = () => {
  const interrupciones = [
    {
      estado: 'Apagada',
      fecha: '14/08',
      hora: '23:00',
      duracion: '12min'
    },
    {
      estado: 'Apagada',
      fecha: '14/08',
      hora: '21:15',
      duracion: '08min'
    }
  ];

  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--app-card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header className="flex items-start justify-between gap-3">
        <h1 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
          Interrupciones
        </h1>

        <span className="inline-flex shrink-0  rounded-full px-2 py-0.5 text-[12px] font-semibold  bg-(--text-secondary)/10 text-(--text-secondary)/50">
          Últimas 24h
        </span>
      </header>
      <div className="flex flex-col gap-3 mt-4">
        {interrupciones.map(interrupcion => (
          <div
            key={`${interrupcion.fecha}-${interrupcion.hora}`}
            className="grid grid-cols-3 w-full items-center gap-4 mt-2 border-b border-black/20 pb-3 dark:border-white/20"
          >
            <div className="flex items-center justify-center bg-(--error-color)/20 text-(--error-color) font-semibold rounded-full">
              {interrupcion.estado}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="font-semibold">{interrupcion.fecha}</span>
              <span className="text-sm text-(--text-secondary)">{interrupcion.hora}</span>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="font-semibold">{interrupcion.duracion}</span>
              <span className="text-sm text-(--text-secondary)">Duración</span>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="w-full mt-3 font-semibold text-(--color-primary-mobile) dark:text-secondary-dark-mobile-2"
        >
          Ver histórico
        </button>
      </div>
    </div>
  );
};

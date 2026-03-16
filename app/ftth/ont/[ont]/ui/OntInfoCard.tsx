export const OntInfoCard = () => {
  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--app-card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header className="flex items-start justify-between gap-3">
        <h1 className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
          Información de ONT
        </h1>

        <span
          className="inline-flex shrink-0  rounded-full border px-2 py-0.5 text-[12px] font-semibold"
          style={{
            backgroundColor: 'var(--status-ok-bg)',
            color: 'var(--status-ok-text)',
            borderColor: 'var(--status-ok-border)'
          }}
        >
          Estado: OK
        </span>
      </header>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <span className="text-(--text-secondary)">PON ID:</span>
          <span className="font-semibold">414c434cb26bc898</span>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col">
            <span className="text-(--text-secondary)">Placa</span>
            <span className="font-semibold">2</span>
          </div>
          <div className="flex flex-col">
            <span className="text-(--text-secondary)">Puerto</span>
            <span className="font-semibold">10</span>
          </div>
        </div>
      </div>
      <div className="w-full border-t" style={{ borderColor: 'var(--card-divider)' }} />
      <div className="flex justify-between">
        <div className="flex flex-col text-(--text-secondary) gap-3">
          <span>Distancia:</span>
          <span>Últ. vez activa:</span>
          <span>Últ. vez inactiva:</span>
          <span>Causa de últ. inactividad:</span>
        </div>
        <div className="flex flex-col items-end font-semibold gap-3">
          <span>-</span>
          <span>-</span>
          <span>-</span>
          <span>-</span>
        </div>
      </div>
    </div>
  );
};

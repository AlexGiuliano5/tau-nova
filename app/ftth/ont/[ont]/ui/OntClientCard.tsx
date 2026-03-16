export const OntClientCard = () => {
  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--app-card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-semibold">Alex Gabriel Giuliano</h1>
        <h2 className="text-(--text-secondary)">
          Nro. de cliente: <span className="font-semibold">123456789</span>
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
          <span>Capital Federal</span>
          <span>Capital Federal</span>
          <span>Av. Rivadavia 3456</span>
          <span>6 A</span>
          <span>-</span>
          <span>114563342</span>
        </div>
      </main>
    </div>
  );
};

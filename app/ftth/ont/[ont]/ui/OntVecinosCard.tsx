import { AppDataTablePreview } from '@/components';

export const OntVecinosCard = () => {
  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--app-card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-semibold">Vecinos</h1>
      </header>
      <AppDataTablePreview />
      <button
        type="button"
        className="w-full mt-3 font-semibold text-(--color-primary-mobile) dark:text-secondary-dark-mobile-2"
      >
        Ver tabla completa
      </button>
    </div>
  );
};

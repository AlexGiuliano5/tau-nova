import { CardSpinner } from '@/components/ui/loading/CardSpinner';

export default function LoadingVecinosPage() {
  return (
    <div className="h-full w-full p-3">
      <div
        className="relative h-full min-h-[280px] rounded-lg bg-(--card) shadow-sm dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)]"
        aria-busy="true"
        aria-live="polite"
      >
        <CardSpinner label="Cargando tabla de vecinos" />
      </div>
    </div>
  );
}

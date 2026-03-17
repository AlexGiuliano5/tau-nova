import Link from 'next/link';

import { OntNeighborsTablePreview } from '@/components';

interface Props {
  ont: string;
}

export const OntVecinosCard = ({ ont }: Props) => {
  return (
    <div className="m-5 shadow-sm rounded-lg p-5 bg-(--card) dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-semibold">Vecinos</h1>
      </header>
      <OntNeighborsTablePreview />
      <Link
        href={`/ftth/ont/${encodeURIComponent(ont)}/vecinos`}
        className="w-full mt-3 font-semibold text-(--primary) dark:text-(--secondary) flex justify-center"
      >
        Ver tabla completa
      </Link>
    </div>
  );
};

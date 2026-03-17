import Link from 'next/link';
import { IoArrowBack, IoOpenOutline } from 'react-icons/io5';

interface Props {
  title: string;
  backHref?: string;
  showLinkIndicator?: boolean;
}

export const FtthBreadcrumb = ({
  title,
  backHref = '/ftth/busqueda',
  showLinkIndicator = false
}: Props) => {
  return (
    <div className="w-full h-[50px] px-5 flex items-center justify-between text-white bg-(--primary-2) dark:bg-(--secondary-4) border-t border-white/20">
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          aria-label="Volver"
          className="inline-flex items-center justify-center"
        >
          <IoArrowBack size={22} />
        </Link>
        <h1 className="leading-none">{title}</h1>
      </div>
      {showLinkIndicator && (
        <span className="inline-flex items-center justify-center text-white/85" aria-hidden="true">
          <IoOpenOutline size={18} />
        </span>
      )}
    </div>
  );
};

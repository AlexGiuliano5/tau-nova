import clsx from 'clsx';
import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

interface BaseProps {
  title: string;
  icon?: React.ReactNode;
  chevron?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  href?: string;
}

type Props = BaseProps;

export const FtthButton = ({
  title,
  icon,
  chevron = false,
  isActive = false,
  href,
  disabled = false,
  className
}: Props) => {
  const buttonClassName = clsx(
    'flex items-center px-5 w-full h-[60px] gap-4 rounded-lg shadow-lg text-white',
    { 'opacity-50 cursor-not-allowed': disabled },
    className
  );

  const content = (
    <div
      className={clsx('flex w-full items-center', chevron ? 'justify-between' : 'justify-center')}
    >
      <div className="flex items-center gap-2">
        {icon && icon}
        <span>{title}</span>
      </div>
      {chevron && <IoChevronForward size={24} />}
    </div>
  );

  // Si recibe `href`, renderiza navegación; si no, renderiza un botón de acción.
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={buttonClassName}
        style={{
          backgroundColor: isActive ? 'var(--ftth-button-active-bg)' : 'var(--ftth-button-bg)'
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={buttonClassName}
      style={{
        backgroundColor: isActive ? 'var(--ftth-button-active-bg)' : 'var(--ftth-button-bg)'
      }}
    >
      {content}
    </button>
  );
};

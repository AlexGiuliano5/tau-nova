interface Props {
  label: string;
}

export const CardSpinner = ({ label }: Props) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <span className="relative inline-flex h-11 w-11 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-(--primary-2) dark:border-(--secondary) opacity-30" />
        <span className="absolute inset-[2px] rounded-full border-2 border-transparent border-t-(--primary-2) border-r-(--primary-2) dark:border-t-(--secondary) dark:border-r-(--secondary) animate-spin" />
      </span>
      <span className="text-xs font-medium tracking-wide text-(--text-secondary)">{label}</span>
    </div>
  );
};

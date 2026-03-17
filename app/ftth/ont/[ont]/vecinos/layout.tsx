import { OntDetailHeader } from '../ui/OntDetailHeader';

interface Props {
  children: React.ReactNode;
  params: Promise<{ ont: string }>;
}

export default async function OntVecinosLayout({ children, params }: Props) {
  const { ont } = await params;

  return (
    <>
      <OntDetailHeader
        ont={ont}
        backHref={`/ftth/ont/${encodeURIComponent(ont)}/info`}
        showTabs={false}
      />
      <div className="h-[calc(100dvh-208px)] max-h-[calc(100dvh-208px)] min-h-0 overflow-hidden">
        {children}
      </div>
    </>
  );
}

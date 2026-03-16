import { OntDetailHeader } from './ui/OntDetailHeader';

interface Props {
  children: React.ReactNode;
  params: Promise<{ ont: string }>;
}

export default async function OntDetailLayout({ children, params }: Props) {
  const { ont } = await params;

  return (
    <section className="pb-2">
      <OntDetailHeader ont={ont} />
      {children}
    </section>
  );
}

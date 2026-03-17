import { OntDetailHeader } from '../ui/OntDetailHeader';

interface Props {
  children: React.ReactNode;
  params: Promise<{ ont: string }>;
}

export default async function OntDetailTabsLayout({ children, params }: Props) {
  const { ont } = await params;

  return (
    <>
      <OntDetailHeader ont={ont} showTabs showLinkIndicator />
      {children}
    </>
  );
}

import { FtthBreadcrumb } from '@/components';
import { OntDetailTabs } from './ui/OntDetailTabs';

interface Props {
  children: React.ReactNode;
  params: Promise<{ ont: string }>;
}

export default async function OntDetailLayout({ children, params }: Props) {
  const { ont } = await params;

  return (
    <section className="pb-2">
      <FtthBreadcrumb
        title={`ONT ${decodeURIComponent(ont)}`}
        backHref="/ftth/search/network-element"
        showLinkIndicator
      />
      <OntDetailTabs />
      {children}
    </section>
  );
}

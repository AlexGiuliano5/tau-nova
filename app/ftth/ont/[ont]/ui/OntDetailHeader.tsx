import { FtthBreadcrumb } from '@/components';
import { OntDetailTabs } from './OntDetailTabs';

interface Props {
  ont: string;
  backHref?: string;
  showTabs?: boolean;
  showLinkIndicator?: boolean;
}

export const OntDetailHeader = ({
  ont,
  backHref = '/ftth/busqueda/elemento-de-red',
  showTabs = true,
  showLinkIndicator = false
}: Props) => {
  return (
    <>
      <FtthBreadcrumb
        title={`ONT ${decodeURIComponent(ont)}`}
        backHref={backHref}
        showLinkIndicator={showLinkIndicator}
      />
      {showTabs && <OntDetailTabs />}
    </>
  );
};

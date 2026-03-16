'use client';

import { FtthBreadcrumb } from '@/components';
import { useSelectedLayoutSegment } from 'next/navigation';
import { OntDetailTabs } from './OntDetailTabs';

interface Props {
  ont: string;
}

export const OntDetailHeader = ({ ont }: Props) => {
  const segment = useSelectedLayoutSegment();
  const isVecinosPage = segment === 'vecinos';
  const encodedOnt = encodeURIComponent(ont);

  return (
    <>
      <FtthBreadcrumb
        title={`ONT ${decodeURIComponent(ont)}`}
        backHref={
          isVecinosPage
            ? `/ftth/ont/${encodedOnt}/info`
            : '/ftth/busqueda/elemento-de-red'
        }
        showLinkIndicator
      />
      {!isVecinosPage && <OntDetailTabs />}
    </>
  );
};

import { FtthBreadcrumb } from '@/components';
import { FtthSearchButtons } from '@/components';

export default function FTTHSearchPage() {
  return (
    <>
      <FtthBreadcrumb title="Búsqueda" backHref="/ftth" />
      <div className="pt-5">
        <FtthSearchButtons />
      </div>
    </>
  );
}

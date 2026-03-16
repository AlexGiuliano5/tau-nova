import { FtthBreadcrumb } from '@/components';
import {
  NetworkElementSearchForm,
  type RecentNetworkElementSearch
} from './ui/NetworkElementSearchForm';

const recentSearches: RecentNetworkElementSearch[] = [
  { name: 'AVNO01', type: 'olt', searchedAt: 'Oct 24 - 10:30 AM' },
  { name: 'AVNO02', type: 'olt', searchedAt: 'Oct 23 - 04:15 PM' },
  { name: '48575443BC9B89AC', type: 'ont', searchedAt: 'Oct 22 - 09:45 AM' },
  { name: '48575444BC9B89AD', type: 'ont', searchedAt: 'Oct 21 - 12:20 PM' },
  { name: 'ALNM01', type: 'olt', searchedAt: 'Oct 20 - 08:05 AM' }
];

export default function NetworkElementPage() {
  return (
    <>
      <FtthBreadcrumb title="Búsqueda por elemento de red" backHref="/ftth/busqueda" />
      <NetworkElementSearchForm recentSearches={recentSearches} />
      {/* <div className="m-5 p-5 shadow-sm flex items-center gap-3 bg-(--app-text-info)/5 text-(--app-text-info) rounded-md dark:border dark:border-[#3aa7ff]/60 dark:shadow-[0_8px_18px_rgb(0_0_0/0.35)]">
        <div>
          <IoInformationCircleOutline size={24} />
        </div>
        <span className="text-sm">Puede buscar por número de serie o nombre de OLT</span>
      </div> */}
    </>
  );
}

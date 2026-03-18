import { FtthSearchButtons } from '@/components';
import { getTreeFtthByUserAction } from '@/actions/ftth/get-tree-ftth-by-user.action';
import { FtthTreeBootstrapper } from './ui/FtthTreeBootstrapper';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function FTTHPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const refreshTreeParam = resolvedSearchParams.refreshTree;
  const shouldRefreshTree =
    (Array.isArray(refreshTreeParam) ? refreshTreeParam[0] : refreshTreeParam)?.trim() === '1';

  // Solo refresca al llegar desde login; volver al home no vuelve a pegarle al BFF.
  const treeData = await getTreeFtthByUserAction(shouldRefreshTree);

  return (
    <>
      <FtthTreeBootstrapper treeData={treeData} />
      <div className="py-7 mx-5 w-auto rounded-2xl flex flex-col items-center">
        <span>Te damos la bienvenida</span>
        <p className="font-semibold">¿Qué búsqueda querés hacer hoy?</p>
      </div>
      <FtthSearchButtons />
    </>
  );
}

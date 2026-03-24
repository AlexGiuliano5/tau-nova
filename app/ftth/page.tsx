import { getTreeFtthByUserAction } from '@/actions/ftth/get-tree-ftth-by-user.action';
import { FtthSearchButtons } from '@/components';
import { FtthTreeBootstrapper } from './ui/FtthTreeBootstrapper';

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function parseRefreshTreeParam(value: string | string[] | undefined): boolean {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized?.trim() === '1';
}

export default async function FTTHPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const shouldRefreshTree = parseRefreshTreeParam(resolvedSearchParams.refreshTree);

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

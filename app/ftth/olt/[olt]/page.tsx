import { FtthBreadcrumb } from '@/components';

interface Props {
  params: Promise<{ olt: string }>;
}

export default async function OltPage({ params }: Props) {
  const { olt } = await params;
  const decodedOlt = decodeURIComponent(olt);

  return (
    <>
      <FtthBreadcrumb title={`OLT ${decodedOlt}`} backHref="/ftth/busqueda/arbol" />
      <div className="px-5 pt-5">Proximamente pantalla OLT: {decodedOlt}</div>
    </>
  );
}

import { getOntNeighborsFullAction } from '@/actions/ftth/ont/get-ont-neighbors-full.action';
import { OntNeighborsTableFull } from '@/components';

interface Props {
  params: Promise<{ ont: string }>;
}

export default async function OntVecinosPage({ params }: Props) {
  const { ont } = await params;
  const neighbors = await getOntNeighborsFullAction(ont);

  return <OntNeighborsTableFull neighbors={neighbors} />;
}

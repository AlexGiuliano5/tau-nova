import { Suspense } from 'react';
import { getOntDetailsInfoAction } from '@/actions/ftth/ont/get-ont-details-info.action';
import { getOntHistoricDownAction } from '@/actions/ftth/ont/get-ont-historic-down.action';
import { getOntInfoAction } from '@/actions/ftth/ont/get-ont-info.action';
import { getOntMetricsCardsAction } from '@/actions/ftth/ont/get-ont-metrics-cards.action';
import { getOntNeighborsPreviewAction } from '@/actions/ftth/ont/get-ont-neighbors-preview.action';
import { OntClientCard, OntClientCardLoading } from '../../ui/OntClientCard';
import { OntInfoCard, OntInfoCardLoading } from '../../ui/OntInfoCard';
import { OntInterrupcionesCard, OntInterrupcionesCardLoading } from '../../ui/OntInterrupcionesCard';
import { OntMetricsCardGrid, OntMetricsCardGridLoading } from '../../ui/OntMetricsCardGrid';
import { OntVecinosCard, OntVecinosCardLoading } from '../../ui/OntVecinosCard';

interface Props {
  params: Promise<{ ont: string }>;
}

export default async function OntInformationPage({ params }: Props) {
  const { ont } = await params;

  return (
    <>
      <Suspense fallback={<OntClientCardLoading />}>
        <OntClientCardContainer ont={ont} />
      </Suspense>
      <Suspense fallback={<OntInfoCardLoading />}>
        <OntInfoCardContainer ont={ont} />
      </Suspense>
      <Suspense fallback={<OntMetricsCardGridLoading />}>
        <OntMetricsCardContainer ont={ont} />
      </Suspense>
      <Suspense fallback={<OntInterrupcionesCardLoading />}>
        <OntInterrupcionesCardContainer ont={ont} />
      </Suspense>
      <Suspense fallback={<OntVecinosCardLoading />}>
        <OntVecinosCardContainer ont={ont} />
      </Suspense>
    </>
  );
}

async function OntClientCardContainer({ ont }: { ont: string }) {
  const clientInfo = await getOntInfoAction(ont);
  return <OntClientCard clientInfo={clientInfo} />;
}

async function OntInfoCardContainer({ ont }: { ont: string }) {
  const ontInfo = await getOntDetailsInfoAction(ont);
  return <OntInfoCard ontInfo={ontInfo} />;
}

async function OntMetricsCardContainer({ ont }: { ont: string }) {
  const metrics = await getOntMetricsCardsAction(ont);
  return <OntMetricsCardGrid metrics={metrics} />;
}

async function OntInterrupcionesCardContainer({ ont }: { ont: string }) {
  const interruptions = await getOntHistoricDownAction(ont);
  return <OntInterrupcionesCard interruptions={interruptions} />;
}

async function OntVecinosCardContainer({ ont }: { ont: string }) {
  const neighbors = await getOntNeighborsPreviewAction(ont);
  return <OntVecinosCard ont={ont} neighbors={neighbors} />;
}

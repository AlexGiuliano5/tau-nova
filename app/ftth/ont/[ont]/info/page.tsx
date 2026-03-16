import { OntClientCard } from '../ui/OntClientCard';
import { OntInfoCard } from '../ui/OntInfoCard';
import { OntInterrupcionesCard } from '../ui/OntInterrupcionesCard';
import { OntMetricsCard } from '../ui/OntMetricsCard';
import { OntVecinosCard } from '../ui/OntVecinosCard';

interface Props {
  params: Promise<{ ont: string }>;
}

export default async function OntInformationPage({ params }: Props) {
  const { ont } = await params;

  return (
    <>
      <OntClientCard />
      <OntInfoCard />
      <OntMetricsCard />
      <OntInterrupcionesCard />
      <OntVecinosCard ont={ont} />
    </>
  );
}

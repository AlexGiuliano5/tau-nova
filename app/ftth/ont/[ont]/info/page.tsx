import { OntClientCard } from '../ui/OntClientCard';
import { OntInfoCard } from '../ui/OntInfoCard';
import { OntInterrupcionesCard } from '../ui/OntInterrupcionesCard';
import { OntMetricsCard } from '../ui/OntMetricsCard';
import { OntVecinosCard } from '../ui/OntVecinosCard';

export default async function OntInformationPage() {
  return (
    <>
      <OntClientCard />
      <OntInfoCard />
      <OntMetricsCard />
      <OntInterrupcionesCard />
      <OntVecinosCard />
    </>
  );
}

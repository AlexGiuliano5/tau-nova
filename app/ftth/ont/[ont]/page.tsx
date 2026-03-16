import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ ont: string }>;
}

export default async function OntDetailPage({ params }: Props) {
  const { ont } = await params;
  redirect(`/ftth/ont/${encodeURIComponent(ont)}/info`);
}

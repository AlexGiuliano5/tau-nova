interface Props {
  params: Promise<{ ont: string }>;
}

export default async function OntGraphsPage({ params }: Props) {
  const { ont } = await params;

  return (
    <div className="m-5 rounded-md bg-(--app-card) p-5 shadow-sm dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)]">
      <h2 className="text-xl font-semibold">Gráficos ONT</h2>
      <p className="mt-2 text-(--text-secondary)">
        Próximamente se mostrarán gráficos para: {decodeURIComponent(ont)}
      </p>
    </div>
  );
}

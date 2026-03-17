interface Props {
  children: React.ReactNode;
}

export default function OntDetailLayout({ children }: Props) {
  return (
    <section className="pb-2">
      {children}
    </section>
  );
}

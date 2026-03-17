import { LoginForm } from '@/app/login/ui/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-svh flex items-center justify-center px-5 py-8 bg-(--primary-3) dark:bg-(--secondary-2)">
      <section className="w-full max-w-sm rounded-2xl border border-(--outline) bg-(--card) p-6 shadow-lg">
        <header className="mb-5 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-(--text-primary)">Ingresar</h1>
          <p className="text-sm text-(--text-secondary)">Acceso para ambientes bajos</p>
        </header>
        <LoginForm />
      </section>
    </main>
  );
}

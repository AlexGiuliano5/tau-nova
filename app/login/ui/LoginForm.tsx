'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { type LoginState, loginAction } from '@/actions/auth/login.action';

const initialLoginState: LoginState = {
  error: null
};

function SubmitButton({ disabledByFields }: { disabledByFields: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = disabledByFields || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="mt-1 h-11 rounded-lg bg-(--primary-2) text-white font-semibold transition-opacity hover:opacity-95 dark:bg-(--secondary-3) disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialLoginState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const disabledByFields = username.trim().length === 0 || password.trim().length === 0;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm text-(--text-secondary)">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          placeholder="Ingresá tu usuario"
          value={username}
          onChange={event => setUsername(event.target.value)}
          className="h-11 rounded-lg border border-(--outline) bg-(--card) px-3 text-(--text-primary) outline-none focus:ring-2 focus:ring-(--primary)"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-(--text-secondary)">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Ingresá tu contraseña"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className="h-11 rounded-lg border border-(--outline) bg-(--card) px-3 text-(--text-primary) outline-none focus:ring-2 focus:ring-(--primary)"
        />
      </div>

      {state.error ? <p className="text-sm text-(--state-03)">{state.error}</p> : null}

      <SubmitButton disabledByFields={disabledByFields} />
    </form>
  );
}

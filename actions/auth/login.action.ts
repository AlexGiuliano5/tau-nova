'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_COOKIE_NAME } from '@/lib/auth/session';
import { authenticate } from '@/services/auth/authenticate.service';

export interface LoginState {
  error: string | null;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!username || !password) {
    return { error: 'Completá usuario y contraseña.' };
  }

  const result = await authenticate({ username, password });

  if (!result.ok) {
    return { error: result.message ?? 'No fue posible iniciar sesión.' };
  }

  if (!result.token) {
    return { error: 'No fue posible iniciar sesión.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 20
  });

  redirect('/ftth');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect('/login');
}

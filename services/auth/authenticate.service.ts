import { getBffBaseUrl, parseJsonResponse } from '@/lib/bff/http';
import type { AuthenticateApiResponse } from '@/types/auth/authenticate';

interface AuthenticateResponse {
  ok: boolean;
  token?: string;
  message?: string;
}

interface AuthenticateInput {
  username: string;
  password: string;
}

export async function authenticate({
  username,
  password
}: AuthenticateInput): Promise<AuthenticateResponse> {
  const encodedPassword = encodeBase64(password);
  const url = `${getBffBaseUrl()}/api/v1/authenticate`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: username,
        password: encodedPassword
      }),
      cache: 'no-store'
    });

    const data = (await parseJsonResponse(response)) as AuthenticateApiResponse | null;
    const token =
      data && 'token' in data && typeof data.token === 'string' && data.token.length > 0
        ? data.token
        : undefined;

    if (response.status === 202) {
      // Contrato BFF actual: 202 representa cualquier error de autenticacion.
      return {
        ok: false,
        message: 'No fue posible iniciar sesión. Verificá los datos e intentá nuevamente.'
      };
    }

    if (token) {
      return { ok: true, token };
    }

    return {
      ok: false,
      message: 'No fue posible iniciar sesión.'
    };
  } catch {
    return {
      ok: false,
      message: 'No se pudo conectar con el servicio de autenticación.'
    };
  }
}

function encodeBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  return Buffer.from(bytes).toString('base64');
}

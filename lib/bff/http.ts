/**
 * Utilidades comunes para clientes HTTP hacia el BFF (base URL, parseo tolerante de JSON).
 * Usar desde `services/*`, no desde componentes.
 */

export function getBffBaseUrl(): string {
  const baseUrl = process.env.BFF_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error('Falta definir BFF_API_BASE_URL.');
  }

  return baseUrl.replace(/\/+$/, '');
}

export async function parseJsonResponse(response: Response): Promise<unknown> {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    return null;
  }
}

export function toStringOrEmpty(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return '';
}

import type { BffTreeResponse } from '@/types/ftth/tree';

interface GetTreeFtthByUserInput {
  token: string;
}

function getBaseUrl(): string {
  const baseUrl = process.env.BFF_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error('Falta definir BFF_API_BASE_URL.');
  }

  return baseUrl.replace(/\/+$/, '');
}

export async function getTreeFtthByUser({
  token
}: GetTreeFtthByUserInput): Promise<BffTreeResponse | null> {
  const url = `${getBaseUrl()}/api/services/portal/treeFtthByUser`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    });

    // Contrato BFF: 202 representa cualquier error del arbol.
    if (response.status === 202) {
      return null;
    }

    // El service mantiene una salida simple: data valida o null.
    if (!response.ok) {
      return null;
    }

    const data = await parseResponseJson<BffTreeResponse>(response);

    if (!data || !Array.isArray(data.tree) || !Array.isArray(data.treeArray)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

async function parseResponseJson<T>(response: Response): Promise<T | null> {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody) as T;
  } catch {
    return null;
  }
}

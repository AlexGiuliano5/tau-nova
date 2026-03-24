import { getBffBaseUrl, parseJsonResponse } from '@/lib/bff/http';
import type { BffTreeResponse } from '@/types/ftth/tree';

interface GetTreeFtthByUserInput {
  token: string;
}

export async function getTreeFtthByUser({
  token
}: GetTreeFtthByUserInput): Promise<BffTreeResponse | null> {
  const url = `${getBffBaseUrl()}/api/services/portal/treeFtthByUser`;

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

    const data = (await parseJsonResponse(response)) as BffTreeResponse | null;

    if (!data || !Array.isArray(data.tree) || !Array.isArray(data.treeArray)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

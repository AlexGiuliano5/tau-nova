import { getBffBaseUrl, parseJsonResponse, toStringOrEmpty } from '@/lib/bff/http';
import type { BffLastMetricByOntResponse } from '@/types/ftth/ont-info';

interface GetLastMetricByOntInput {
  token: string;
  ontId: string;
}

export type GetLastMetricByOntResult =
  | { ok: true; data: BffLastMetricByOntResponse }
  | { ok: false; error: 'auth' | 'no-data' | 'unknown' };

export async function getLastMetricByOnt({
  token,
  ontId
}: GetLastMetricByOntInput): Promise<GetLastMetricByOntResult> {
  const url = `${getBffBaseUrl()}/api/services/ont/LastMetricsByOnt`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ontId }),
      cache: 'no-store'
    });

    // Contrato BFF:
    // - 204: token invalido/vencido/sin token
    // - 206: error interno de celula (sin datos en base)
    // - 202: error generico
    if (response.status === 204) {
      return { ok: false, error: 'auth' };
    }

    if (response.status === 206) {
      return { ok: false, error: 'no-data' };
    }

    if (response.status === 202) {
      return { ok: false, error: 'unknown' };
    }

    if (!response.ok) {
      return { ok: false, error: 'unknown' };
    }

    const data = await parseJsonResponse(response);

    if (!data) {
      return { ok: false, error: 'unknown' };
    }

    const normalized = normalizeLastMetricPayload(data);
    if (!normalized) {
      return { ok: false, error: 'unknown' };
    }

    return { ok: true, data: normalized };
  } catch {
    return { ok: false, error: 'unknown' };
  }
}

function normalizeLastMetricPayload(data: unknown): BffLastMetricByOntResponse | null {
  const direct = mapLastMetricPayload(data);
  if (direct) {
    return direct;
  }

  if (!data || typeof data !== 'object') {
    return null;
  }

  const wrapped = data as Record<string, unknown>;
  for (const value of Object.values(wrapped)) {
    if (Array.isArray(value) && value.length > 0) {
      for (const item of value) {
        const mappedFromArray = mapLastMetricPayload(item);
        if (mappedFromArray) {
          return mappedFromArray;
        }
      }
    }

    const mapped = mapLastMetricPayload(value);
    if (mapped) {
      return mapped;
    }
  }

  return null;
}

function mapLastMetricPayload(data: unknown): BffLastMetricByOntResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  if (!('olt' in source) && !('slot' in source) && !('port' in source)) {
    return null;
  }

  return {
    slot: toStringOrEmpty(source.slot),
    port: toStringOrEmpty(source.port),
    olt: toStringOrEmpty(source.olt)
  };
}

import { getBffBaseUrl, parseJsonResponse, toStringOrEmpty } from '@/lib/bff/http';
import type { BffMetricsCardsResponse } from '@/types/ftth/ont-info';

interface GetOntMetricsCardsInput {
  token: string;
  ontId: string;
  oltId: string;
}

export type GetOntMetricsCardsResult =
  | { ok: true; data: BffMetricsCardsResponse[] }
  | { ok: false; error: 'auth' | 'no-data' | 'unknown' };

export async function getOntMetricsCards({
  token,
  ontId,
  oltId
}: GetOntMetricsCardsInput): Promise<GetOntMetricsCardsResult> {
  const url = `${getBffBaseUrl()}/api/services/ont/metricsCards`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ontId, oltId }),
      cache: 'no-store'
    });

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

    const normalized = normalizeMetricsCardsPayload(data);
    if (!normalized) {
      return { ok: false, error: 'unknown' };
    }

    return {
      ok: true,
      data: normalized
    };
  } catch {
    return { ok: false, error: 'unknown' };
  }
}

function normalizeMetricsCardsPayload(data: unknown): BffMetricsCardsResponse[] | null {
  const direct = mapMetricsCardsList(data);
  if (direct) {
    return direct;
  }

  if (!data || typeof data !== 'object') {
    return null;
  }

  const wrapped = data as Record<string, unknown>;
  for (const value of Object.values(wrapped)) {
    const mapped = mapMetricsCardsList(value);
    if (mapped) {
      return mapped;
    }
  }

  return null;
}

function mapMetricsCardsList(data: unknown): BffMetricsCardsResponse[] | null {
  if (Array.isArray(data)) {
    const mapped = data.map(mapMetricsCardItem).filter(Boolean) as BffMetricsCardsResponse[];
    return mapped.length > 0 ? mapped : null;
  }

  const single = mapMetricsCardItem(data);
  return single ? [single] : null;
}

function mapMetricsCardItem(data: unknown): BffMetricsCardsResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  if (!('title' in source) && !('actual' in source)) {
    return null;
  }

  return {
    title: toStringOrEmpty(source.title),
    max: toStringOrEmpty(source.max),
    avg: toStringOrEmpty(source.avg),
    min: toStringOrEmpty(source.min),
    actual: toStringOrEmpty(source.actual)
  };
}

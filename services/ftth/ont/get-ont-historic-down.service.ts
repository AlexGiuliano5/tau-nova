import { getBffBaseUrl, parseJsonResponse, toStringOrEmpty } from '@/lib/bff/http';
import type { BffHistoricDownResponse } from '@/types/ftth/ont-info';

interface GetOntHistoricDownInput {
  token: string;
  ontId: string;
  oltId: string;
}

export type GetOntHistoricDownResult =
  | { ok: true; data: BffHistoricDownResponse[] }
  | { ok: false; error: 'auth' | 'no-data' | 'unknown' };

export async function getOntHistoricDown({
  token,
  ontId,
  oltId
}: GetOntHistoricDownInput): Promise<GetOntHistoricDownResult> {
  const url = `${getBffBaseUrl()}/api/services/ont/historicdown`;

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

    const normalized = normalizeHistoricDownPayload(data);
    if (!normalized) {
      return { ok: false, error: 'unknown' };
    }

    return { ok: true, data: normalized };
  } catch {
    return { ok: false, error: 'unknown' };
  }
}

function normalizeHistoricDownPayload(data: unknown): BffHistoricDownResponse[] | null {
  const direct = mapHistoricDownList(data);
  if (direct) {
    return direct;
  }

  if (!data || typeof data !== 'object') {
    return null;
  }

  const wrapped = data as Record<string, unknown>;
  if ('statusDown' in wrapped) {
    return mapHistoricDownList(wrapped.statusDown);
  }

  return null;
}

function mapHistoricDownList(data: unknown): BffHistoricDownResponse[] | null {
  if (Array.isArray(data)) {
    const mapped = data.map(mapHistoricDownItem).filter(Boolean) as BffHistoricDownResponse[];
    return mapped.length > 0 ? mapped : null;
  }

  const single = mapHistoricDownItem(data);
  return single ? [single] : null;
}

function mapHistoricDownItem(data: unknown): BffHistoricDownResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  if (!('status' in source) && !('date' in source) && !('duration' in source)) {
    return null;
  }

  return {
    status: toStringOrEmpty(source.status),
    date: toStringOrEmpty(source.date),
    dateEnd: toStringOrEmpty(source.dateEnd),
    duration: toStringOrEmpty(source.duration)
  };
}

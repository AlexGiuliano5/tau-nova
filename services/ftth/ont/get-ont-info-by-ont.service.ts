import { getBffBaseUrl, parseJsonResponse, toStringOrEmpty } from '@/lib/bff/http';
import type { BffOntInfoByOntResponse } from '@/types/ftth/ont-info';

interface GetOntInfoByOntInput {
  token: string;
  oltId: string;
  ontId: string;
}

export type GetOntInfoByOntResult =
  | { ok: true; data: BffOntInfoByOntResponse }
  | { ok: false; error: 'auth' | 'no-data' | 'unknown' };

export async function getOntInfoByOnt({
  token,
  oltId,
  ontId
}: GetOntInfoByOntInput): Promise<GetOntInfoByOntResult> {
  const url = `${getBffBaseUrl()}/api/services/ont/InfoByOnt`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        oltId,
        ontId
      }),
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

    const normalized = normalizeOntInfoByOntPayload(data);
    if (!normalized) {
      return { ok: false, error: 'unknown' };
    }

    return { ok: true, data: normalized };
  } catch {
    return { ok: false, error: 'unknown' };
  }
}

function normalizeOntInfoByOntPayload(data: unknown): BffOntInfoByOntResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const direct = mapOntInfoByOntPayload(data);
  if (direct) {
    return direct;
  }

  const wrapped = data as Record<string, unknown>;
  for (const value of Object.values(wrapped)) {
    if (Array.isArray(value) && value.length > 0) {
      for (const item of value) {
        const mappedFromArray = mapOntInfoByOntPayload(item);
        if (mappedFromArray) {
          return mappedFromArray;
        }
      }
    }

    if (value && typeof value === 'object') {
      const mapped = mapOntInfoByOntPayload(value);
      if (mapped) {
        return mapped;
      }
    }
  }

  return null;
}

function mapOntInfoByOntPayload(data: unknown): BffOntInfoByOntResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  const requiredKeys = ['lastUpTime', 'lastDnTime', 'downCause', 'distance', 'equipmentType'];
  if (!requiredKeys.some(key => key in source)) {
    return null;
  }

  return {
    lastUpTime: toStringOrEmpty(source.lastUpTime),
    lastDnTime: toStringOrEmpty(source.lastDnTime),
    downCause: toStringOrEmpty(source.downCause),
    distance: toStringOrEmpty(source.distance),
    equipmentType: toStringOrEmpty(source.equipmentType)
  };
}

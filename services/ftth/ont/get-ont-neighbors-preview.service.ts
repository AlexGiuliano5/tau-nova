import { getBffBaseUrl, parseJsonResponse } from '@/lib/bff/http';
import type { BffMetricsGridResponse } from '@/types/ftth/ont-info';

interface GetOntNeighborsPreviewInput {
  token: string;
  entityId: string;
}

export type GetOntNeighborsPreviewResult =
  | { ok: true; data: BffMetricsGridResponse }
  | { ok: false; error: 'auth' | 'no-data' | 'unknown' };

interface MetricsGridCacheEntry {
  data: BffMetricsGridResponse;
  expiresAt: number;
}

const METRICS_GRID_CACHE_TTL_MS = 45_000;
const metricsGridCache = new Map<string, MetricsGridCacheEntry>();

export async function getOntNeighborsPreview({
  token,
  entityId
}: GetOntNeighborsPreviewInput): Promise<GetOntNeighborsPreviewResult> {
  const cacheKey = `${token}::${entityId}`;
  const cached = metricsGridCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { ok: true, data: cached.data };
  }

  if (cached && cached.expiresAt <= Date.now()) {
    metricsGridCache.delete(cacheKey);
  }

  const url = `${getBffBaseUrl()}/api/services/port/metricsGrid`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ entityId }),
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
    const normalized = normalizeMetricsGridPayload(data);

    if (!normalized) {
      return { ok: false, error: 'unknown' };
    }

    metricsGridCache.set(cacheKey, {
      data: normalized,
      expiresAt: Date.now() + METRICS_GRID_CACHE_TTL_MS
    });

    return { ok: true, data: normalized };
  } catch {
    return { ok: false, error: 'unknown' };
  }
}

function normalizeMetricsGridPayload(data: unknown): BffMetricsGridResponse | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  const columnNames = asStringArray(source.dataSchema, 'columnNames');
  const rows = asRows(source.rows);

  if (!columnNames || !rows) {
    return null;
  }

  return {
    dataSchema: {
      columnNames,
      columnDataTypes: asStringArray(source.dataSchema, 'columnDataTypes') ?? []
    },
    rows,
    extraData: {
      coordinates: asCoordinates(source.extraData)
    },
    pageNumber: null,
    pageSize: null,
    totalPages: null,
    totalRecords: null
  };
}

function asStringArray(value: unknown, key: string): string[] | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const arr = (value as Record<string, unknown>)[key];
  if (!Array.isArray(arr)) {
    return null;
  }

  const onlyStrings = arr.filter(item => typeof item === 'string') as string[];
  return onlyStrings.length > 0 ? onlyStrings : null;
}

function asRows(value: unknown): Array<Array<number | null | string>> | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const normalizedRows: Array<Array<number | null | string>> = [];
  for (const row of value) {
    if (!Array.isArray(row)) {
      continue;
    }

    normalizedRows.push(
      row.map(cell => {
        if (cell === null) return null;
        if (typeof cell === 'string' || typeof cell === 'number') return cell;
        return '';
      })
    );
  }

  return normalizedRows;
}

function asCoordinates(
  value: unknown
): Array<{ serial: string; lat: string | null; lon: string | null }> {
  if (!value || typeof value !== 'object') {
    return [];
  }

  const coords = (value as Record<string, unknown>).coordinates;
  if (!Array.isArray(coords)) {
    return [];
  }

  return coords
    .filter(item => item && typeof item === 'object')
    .map(item => {
      const coord = item as Record<string, unknown>;
      return {
        serial: typeof coord.serial === 'string' ? coord.serial : '',
        lat: typeof coord.lat === 'string' ? coord.lat : null,
        lon: typeof coord.lon === 'string' ? coord.lon : null
      };
    });
}

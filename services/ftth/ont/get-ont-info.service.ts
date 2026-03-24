import { getBffBaseUrl, parseJsonResponse, toStringOrEmpty } from '@/lib/bff/http';

interface OntClientApiPayload {
  abonado: string;
  serviceAccount: string;
  localidad: string;
  province: string;
  calle: string;
  altura: number | null;
  pisoDpto: string;
  teleF_CASA: string;
  teleF_PERSONA: string;
}

interface GetOntInfoInput {
  ont: string;
  token: string;
}

export async function getOntInfo({
  ont,
  token
}: GetOntInfoInput): Promise<OntClientApiPayload | null> {
  const url = `${getBffBaseUrl()}/api/services/ont/info/${encodeURIComponent(ont)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store'
    });

    // Contrato BFF: 202 representa error funcional y no respuesta valida.
    if (response.status === 202) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data = await parseJsonResponse(response);

    if (!data) {
      return null;
    }

    // Valida contrato del BFF en runtime para evitar usar payloads inválidos en UI.
    const normalized = normalizeOntInfoPayload(data);
    if (!normalized) {
      return null;
    }
    return normalized;
  } catch {
    return null;
  }
}

function normalizeOntInfoPayload(data: unknown): OntClientApiPayload | null {
  const direct = mapOntInfoPayload(data);
  if (direct) {
    return direct;
  }
  if (!data || typeof data !== 'object') {
    return null;
  }

  const wrapped = data as Record<string, unknown>;
  for (const value of Object.values(wrapped)) {
    const mapped = mapOntInfoPayload(value);
    if (mapped) {
      return mapped;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const mappedFromArray = mapOntInfoPayload(item);
        if (mappedFromArray) {
          return mappedFromArray;
        }
      }
    }
  }

  return null;
}

function mapOntInfoPayload(data: unknown): OntClientApiPayload | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const source = data as Record<string, unknown>;
  const requiredKeys = ['abonado', 'serviceAccount', 'localidad', 'province', 'calle'];
  if (!requiredKeys.some(key => key in source)) {
    return null;
  }

  return {
    abonado: toStringOrEmpty(source.abonado),
    serviceAccount: toStringOrEmpty(source.serviceAccount),
    localidad: toStringOrEmpty(source.localidad),
    province: toStringOrEmpty(source.province),
    calle: toStringOrEmpty(source.calle),
    altura: asNullableNumber(source.altura),
    pisoDpto: toStringOrEmpty(source.pisoDpto),
    teleF_CASA: toStringOrEmpty(source.teleF_CASA),
    teleF_PERSONA: toStringOrEmpty(source.teleF_PERSONA)
  };
}

function asNullableNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

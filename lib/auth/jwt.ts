export interface UserTokenInfo {
  fullname?: string;
  legajo?: string;
  roles?: string[];
}

export function parseUserTokenInfo(token: string): UserTokenInfo {
  const payload = parseJwtPayload(token);

  if (!payload || typeof payload !== 'object') {
    return {};
  }

  const data = payload as Record<string, unknown>;
  const fullname = asString(data.fullname ?? data.nombre_usuario ?? data.name);
  const legajo = asString(data.legajo ?? data.user ?? data.username);
  const roles = asStringArray(data.roles);

  return {
    fullname,
    legajo,
    roles
  };
}

function parseJwtPayload(token: string): unknown {
  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }

  const payload = base64UrlToString(parts[1]);
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as unknown;
  } catch {
    return null;
  }
}

function base64UrlToString(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);

  try {
    return Buffer.from(padded, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const parsed = value.filter((item): item is string => typeof item === 'string');
  return parsed.length > 0 ? parsed : undefined;
}

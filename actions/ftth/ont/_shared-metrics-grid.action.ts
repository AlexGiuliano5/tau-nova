export function buildEntityId(olt: string, slot: string, port: string): string | null {
  const normalizedOlt = olt.trim();
  const normalizedSlot = slot.trim();
  const normalizedPort = port.trim();

  if (!normalizedOlt || !normalizedSlot || !normalizedPort) {
    return null;
  }

  return `${normalizedOlt}/${normalizedSlot}/${normalizedPort}`;
}

export function findGridColumnIndex(columnNames: string[], candidates: string[]): number {
  const normalizedCandidates = candidates.map(candidate => normalizeLabel(candidate));

  return columnNames.findIndex(columnName => normalizedCandidates.includes(normalizeLabel(columnName)));
}

export function normalizeLabel(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function toTextOrNoData(value: unknown): string {
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : 'Sin Datos';
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return 'Sin Datos';
}

export function normalizeSerial(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }

  if (typeof value === 'number') {
    return String(value).trim().toLowerCase();
  }

  return '';
}

export function getRowValue(row: Array<number | string | null>, index: number): number | string | null {
  if (index < 0 || index >= row.length) {
    return null;
  }

  return row[index];
}

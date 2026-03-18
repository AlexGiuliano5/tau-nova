import type { BffTreeResponse } from '@/types/ftth/tree';

const FTTH_TREE_STORAGE_KEY = 'tau_ftth_tree_cache_v1';
// TTL requerido: mantener cache local hasta 30 dias.
const FTTH_TREE_STORAGE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredTreePayload {
  timestamp: number;
  treeData: BffTreeResponse;
}

export function isValidTreeData(value: BffTreeResponse | null): value is BffTreeResponse {
  return Boolean(value && Array.isArray(value.tree) && Array.isArray(value.treeArray));
}

export function saveTreeToLocalStorage(treeData: BffTreeResponse): void {
  if (typeof window === 'undefined') {
    return;
  }

  const payload: StoredTreePayload = {
    timestamp: Date.now(),
    treeData
  };
  localStorage.setItem(FTTH_TREE_STORAGE_KEY, JSON.stringify(payload));
}

export function clearTreeFromLocalStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(FTTH_TREE_STORAGE_KEY);
}

export function getTreeFromLocalStorage(): BffTreeResponse | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawPayload = localStorage.getItem(FTTH_TREE_STORAGE_KEY);

  if (!rawPayload) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawPayload) as Partial<StoredTreePayload>;
    const timestamp = typeof parsed.timestamp === 'number' ? parsed.timestamp : 0;

    // Si vencio, se limpia para evitar que la UI use datos obsoletos.
    if (Date.now() - timestamp > FTTH_TREE_STORAGE_TTL_MS) {
      localStorage.removeItem(FTTH_TREE_STORAGE_KEY);
      return null;
    }

    if (isValidTreeData(parsed.treeData ?? null)) {
      return parsed.treeData ?? null;
    }

    return null;
  } catch {
    localStorage.removeItem(FTTH_TREE_STORAGE_KEY);
    return null;
  }
}

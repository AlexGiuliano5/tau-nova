import type { Tree } from '@/types/ftth/tree';

export const LEVEL_KEYS = ['pais', 'region', 'subregion', 'hub', 'olt'] as const;
export type LevelKey = (typeof LEVEL_KEYS)[number];

export interface TreeNavigatorViewModel {
  breadcrumbTitle: string;
  backHref: string;
  nodesToRender: Tree[];
  nextKey: LevelKey | undefined;
  selectedByKey: Partial<Record<LevelKey, string>>;
}

export function buildHref(values: Partial<Record<LevelKey, string>>): string {
  const params = new URLSearchParams();

  for (const key of LEVEL_KEYS) {
    const value = values[key];
    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `/ftth/busqueda/arbol?${query}` : '/ftth/busqueda/arbol';
}

export function buildOltHref(oltName: string): string {
  return `/ftth/olt/${encodeURIComponent(oltName)}`;
}

function getSelectedNodeName(searchParams: URLSearchParams, key: LevelKey): string | null {
  const rawValue = searchParams.get(key);
  const value = rawValue?.trim();
  return value ? value : null;
}

export function buildViewModel(tree: Tree[], searchParams: URLSearchParams): TreeNavigatorViewModel {
  if (!tree.length) {
    return {
      breadcrumbTitle: 'Búsqueda de árbol',
      backHref: '/ftth/busqueda',
      nodesToRender: [],
      nextKey: LEVEL_KEYS[0],
      selectedByKey: {}
    };
  }

  let currentNodes = tree;
  const selectedByKey: Partial<Record<LevelKey, string>> = {};
  const selectedPath: string[] = [];

  // Recorre el arbol segun los params actuales y corta en el primer nivel faltante o invalido.
  for (const key of LEVEL_KEYS) {
    const selectedValue = getSelectedNodeName(searchParams, key);
    if (!selectedValue) {
      break;
    }

    const matchedNode = currentNodes.find(node => node.name === selectedValue);
    if (!matchedNode) {
      break;
    }

    selectedByKey[key] = matchedNode.name;
    selectedPath.push(matchedNode.name);
    currentNodes = matchedNode.childs ?? [];
  }

  const selectedCount = selectedPath.length;
  const nextKey = LEVEL_KEYS[selectedCount];

  const previousValues: Partial<Record<LevelKey, string>> = {};
  for (let index = 0; index < Math.max(selectedCount - 1, 0); index += 1) {
    const key = LEVEL_KEYS[index];
    previousValues[key] = selectedByKey[key];
  }
  const backHref = selectedCount > 0 ? buildHref(previousValues) : '/ftth/busqueda';

  const breadcrumbTitle =
    selectedPath.length >= 3
      ? `... / ${selectedPath[selectedPath.length - 2]} / ${selectedPath[selectedPath.length - 1]}`
      : selectedPath.length === 2
        ? `${selectedPath[0]} / ${selectedPath[1]}`
        : selectedPath.length === 1
          ? selectedPath[0]
          : 'Búsqueda de árbol';

  return {
    breadcrumbTitle,
    backHref,
    nodesToRender: currentNodes,
    nextKey,
    selectedByKey
  };
}

export interface BffTreeResponse {
  tree: Tree[];
  treeArray: TreeArray[];
}

export interface Tree {
  name: string;
  childs: Tree[];
}

export interface TreeArray {
  type: Type;
  name: string;
}

export enum Type {
  Hub = 'hub',
  Olt = 'olt',
  Pais = 'pais',
  Region = 'region',
  Subregion = 'subregion'
}

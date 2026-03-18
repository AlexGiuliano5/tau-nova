import { create } from 'zustand';

import type { BffTreeResponse } from '@/types/ftth/tree';

interface FtthTreeState {
  treeData: BffTreeResponse | null;
  setTreeData: (treeData: BffTreeResponse | null) => void;
  clearTreeData: () => void;
}

export const useFtthTreeStore = create<FtthTreeState>(set => ({
  treeData: null,
  setTreeData: treeData => set({ treeData }),
  clearTreeData: () => set({ treeData: null })
}));

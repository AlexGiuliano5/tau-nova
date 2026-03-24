'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  getTreeFromLocalStorage,
  isValidTreeData,
  saveTreeToLocalStorage
} from '@/lib/ftth/tree-cache';
import { useFtthTreeStore } from '@/store/ftth/tree-store';
import type { BffTreeResponse } from '@/types/ftth/tree';

interface Props {
  treeData: BffTreeResponse | null;
}

export const FtthTreeBootstrapper = ({ treeData }: Props) => {
  const setTreeData = useFtthTreeStore(state => state.setTreeData);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isValidTreeData(treeData)) {
      setTreeData(treeData);
      saveTreeToLocalStorage(treeData);
    } else {
      const cachedTree = getTreeFromLocalStorage();
      if (isValidTreeData(cachedTree)) {
        setTreeData(cachedTree);
      }
    }
  }, [setTreeData, treeData]);

  useEffect(() => {
    if (!searchParams.get('refreshTree')) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete('refreshTree');
    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(nextUrl);
  }, [pathname, router, searchParams]);

  return null;
};

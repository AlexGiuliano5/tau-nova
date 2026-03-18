'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    // Si vino respuesta server post-login, pisa cache. Si no, usa cache local vigente.
    if (isValidTreeData(treeData)) {
      setTreeData(treeData);
      saveTreeToLocalStorage(treeData);
    } else {
      const cachedTreeData = getTreeFromLocalStorage();
      if (isValidTreeData(cachedTreeData)) {
        setTreeData(cachedTreeData);
      }
    }
  }, [setTreeData, treeData]);

  useEffect(() => {
    if (!searchParams.get('refreshTree')) {
      return;
    }

    // Evita refrescos repetidos si el usuario actualiza estando en /ftth?refreshTree=1.
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete('refreshTree');
    const query = nextParams.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(nextUrl);
  }, [pathname, router, searchParams]);

  return null;
};

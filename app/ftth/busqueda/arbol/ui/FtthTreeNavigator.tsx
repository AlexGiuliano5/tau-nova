'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { FtthBreadcrumb, FtthButton } from '@/components';
import { getTreeFromLocalStorage } from '@/lib/ftth/tree-cache';
import { useFtthTreeStore } from '@/store/ftth/tree-store';
import { buildNextLevelHref, buildOltHref, buildViewModel } from '@/utils/ftth/tree-navigation';

export const FtthTreeNavigator = () => {
  const searchParams = useSearchParams();
  const treeData = useFtthTreeStore(state => state.treeData);
  const setTreeData = useFtthTreeStore(state => state.setTreeData);

  useEffect(() => {
    if (treeData?.tree?.length) {
      return;
    }

    const cachedTreeData = getTreeFromLocalStorage();
    if (cachedTreeData) {
      setTreeData(cachedTreeData);
    }
  }, [setTreeData, treeData]);

  const viewModel = useMemo(
    () => buildViewModel(treeData?.tree ?? [], searchParams),
    [searchParams, treeData?.tree]
  );

  if (!treeData?.tree?.length) {
    return (
      <>
        <FtthBreadcrumb title="Búsqueda de árbol" backHref="/ftth/busqueda" />
        <div className="px-5 pt-5 text-sm text-white/90">
          No hay datos de árbol disponibles para este usuario.
        </div>
      </>
    );
  }

  return (
    <>
      <FtthBreadcrumb title={viewModel.breadcrumbTitle} backHref={viewModel.backHref} />
      <div className="mx-5 pt-5 flex flex-col gap-3">
        {viewModel.nodesToRender.length > 0 ? (
          viewModel.nodesToRender.map(node => {
            if (!viewModel.nextKey) {
              return <FtthButton key={node.name} title={node.name} />;
            }

            if (viewModel.nextKey === 'olt') {
              return (
                <FtthButton
                  key={node.name}
                  title={node.name}
                  href={buildOltHref(node.name)}
                />
              );
            }

            return (
              <FtthButton
                key={node.name}
                title={node.name}
                chevron
                href={buildNextLevelHref(viewModel.selectedByKey, viewModel.nextKey, node.name)}
              />
            );
          })
        ) : (
          <div className="text-sm text-white/90">
            No hay más niveles para mostrar. Ya llegaste al último nivel del árbol.
          </div>
        )}
      </div>
    </>
  );
};

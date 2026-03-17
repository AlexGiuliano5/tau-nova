'use client';

import Link from 'next/link';
import { useState } from 'react';

import { FiChevronRight, FiClock } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';

import { FtthButton } from '@/components';

export interface RecentNetworkElementSearch {
  name: string;
  type: 'olt' | 'ont';
  searchedAt: string;
}

interface Props {
  recentSearches: RecentNetworkElementSearch[];
}

export const NetworkElementSearchForm = ({ recentSearches }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const trimmedValue = searchValue.trim();
  const searchHref = trimmedValue ? `/ftth/ont/${encodeURIComponent(trimmedValue)}` : undefined;

  return (
    <div className="m-5 flex flex-col gap-5 rounded-md dark:bg-(--card) p-3 dark:border dark:border-white/15 dark:shadow-[0_10px_20px_rgb(0_0_0/0.45)] h-[calc(100dvh-250px)] justify-between">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg">Ingrese elemento de red</span>
          <input
            type="text"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            className="border rounded-md p-2 border-bg-dark/10 placeholder:text-(--text-secondary)/65 dark:bg-[#1b1b1b] dark:border-white/25 dark:text-(--app-text) dark:placeholder:text-white/55"
            placeholder="Elemento de red (OLT / ONT)"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-(--text-secondary)/70">Búsquedas recientes</p>
          <div className="divide-y divide-black/8 dark:divide-white/10">
            {recentSearches.map(search => (
              <Link
                key={`${search.type}-${search.name}-${search.searchedAt}`}
                href={`/ftth/ont/${encodeURIComponent(search.name)}`}
                className="group flex w-full items-center justify-between py-3 text-left"
              >
                <span className="flex items-center gap-3">
                  <FiClock
                    className="text-(--text-secondary)/40 transition-colors group-hover:text-(--text-secondary)/60"
                    size={16}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="leading-none font-semibold text-(--text-secondary)/80">
                      {search.name}
                    </span>
                    <span className="text-xs leading-none text-(--text-secondary)/45">
                      {search.searchedAt}
                    </span>
                  </span>
                </span>
                <FiChevronRight
                  className="text-(--text-secondary)/28 transition-colors group-hover:text-(--text-secondary)/55"
                  size={16}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FtthButton
        title="Buscar"
        icon={<IoSearch />}
        href={searchHref}
        disabled={!trimmedValue}
        className="w-full justify-center items-center flex"
      />
    </div>
  );
};

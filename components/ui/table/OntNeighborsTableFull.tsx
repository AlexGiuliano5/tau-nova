'use client';

import Link from 'next/link';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useRef, useState } from 'react';
import {
  IoCheckmarkSharp,
  IoChevronDownSharp,
  IoCloseSharp,
  IoGitCompareOutline
} from 'react-icons/io5';
import { LuFilter } from 'react-icons/lu';
import { TbListCheck } from 'react-icons/tb';

import { ONT_NEIGHBORS_TABLE_FULL_CLASSNAME } from './tableClassNames';

type NeighborRow = {
  serial: string;
  estado: 'OK' | 'ERROR';
  ontRx: number;
  calle: string;
  altura: number;
  piso: string;
  depto: string;
  ontTx: number;
  oltRx: number;
  oltTx: number;
  oltVolt: number;
  ontTemp: number;
  ontVolt: number;
  ontBiasCurrent: number;
  oltBiasCurrent: number;
  portTemp: number;
  slot: number;
  port: number;
  provincia: string;
};

const ROW_OPTIONS = [25, 50, 100];
const TABLE_COLUMNS: Array<{ field: keyof NeighborRow; header: string }> = [
  { field: 'calle', header: 'Calle' },
  { field: 'altura', header: 'Altura' },
  { field: 'piso', header: 'Piso' },
  { field: 'depto', header: 'Depto' },
  { field: 'ontTx', header: 'Ont Tx' },
  { field: 'oltRx', header: 'Olt Rx' },
  { field: 'oltTx', header: 'Olt Tx' },
  { field: 'oltVolt', header: 'Olt Volt' },
  { field: 'ontTemp', header: 'Ont Temp' },
  { field: 'ontVolt', header: 'Ont Volt' },
  { field: 'ontBiasCurrent', header: 'Ont BiasCurrent' },
  { field: 'oltBiasCurrent', header: 'Olt BiasCurrent' },
  { field: 'portTemp', header: 'Port Temp' },
  { field: 'slot', header: 'Slot' },
  { field: 'port', header: 'Port' },
  { field: 'provincia', header: 'Provincia' }
];

const mockNeighborsFull: NeighborRow[] = [
  {
    serial: '5casfyevwob232455',
    estado: 'ERROR',
    ontRx: -18.07,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '4354640425asdadbi',
    estado: 'OK',
    ontRx: -21.05,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '3672434q75sdfvbjk',
    estado: 'OK',
    ontRx: -15.3,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 43,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '279839b67t78uwxyz',
    estado: 'OK',
    ontRx: -8.75,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 43,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '1982735234asdvbcc',
    estado: 'ERROR',
    ontRx: 0,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '938472b49dswqerf',
    estado: 'OK',
    ontRx: 0.5,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '12457824s5assdfghi',
    estado: 'OK',
    ontRx: 5.2,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 43,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '5647386dsr7sdjkhg',
    estado: 'OK',
    ontRx: 10.15,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '892134b456qwertyu',
    estado: 'OK',
    ontRx: 15.5,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '453890lk678asdfghj',
    estado: 'OK',
    ontRx: 20,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '675849m789qwertyui',
    estado: 'OK',
    ontRx: 25.75,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '82374f8s9dasdqwery',
    estado: 'OK',
    ontRx: 30.6,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '543216rp34sasdfghi',
    estado: 'OK',
    ontRx: 35.45,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  },
  {
    serial: '52346rfgtr3saasdfghs',
    estado: 'OK',
    ontRx: 40.8,
    calle: 'RIVADAVIA',
    altura: 1047,
    piso: 'Sin datos',
    depto: 'Sin datos',
    ontTx: 2.18,
    oltRx: -24.01,
    oltTx: 4,
    oltVolt: 3.34,
    ontTemp: 44,
    ontVolt: 3.34,
    ontBiasCurrent: 16,
    oltBiasCurrent: 16,
    portTemp: 36,
    slot: 1,
    port: 0,
    provincia: 'SALTA'
  }
];

const serialTemplate = (row: NeighborRow) => {
  return (
    <Link
      href={`/ftth/ont/${encodeURIComponent(row.serial)}/info`}
      className="inline-flex text-center text-(--primary) hover:underline dark:text-(--secondary)"
    >
      <span>{row.serial}</span>
    </Link>
  );
};

const estadoTemplate = (row: NeighborRow) => {
  const isOk = row.estado === 'OK';
  const estadoColor = isOk ? 'var(--state-01)' : 'var(--state-03)';
  return (
    <span className="inline-flex items-center justify-center">
      {isOk ? (
        <IoCheckmarkSharp
          size={15}
          className="rounded-full text-white"
          style={{ backgroundColor: estadoColor }}
        />
      ) : (
        <IoCloseSharp
          size={15}
          className="rounded-full text-white"
          style={{ backgroundColor: estadoColor }}
        />
      )}
    </span>
  );
};

const ontRxTemplate = (row: NeighborRow) => {
  const ontRxColor =
    row.ontRx > 0 ? 'var(--state-01)' : row.ontRx === 0 ? 'var(--state-02)' : 'var(--state-03)';
  return <span style={{ color: ontRxColor }}>{row.ontRx.toFixed(2)}</span>;
};

export const OntNeighborsTableFull = () => {
  const [selectedRows, setSelectedRows] = useState<NeighborRow[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(25);
  const [isRowsMenuOpen, setIsRowsMenuOpen] = useState(false);
  const [rowsMenuPosition, setRowsMenuPosition] = useState<{ top: number; left: number } | null>(
    null
  );
  const rowsMenuRef = useRef<HTMLDivElement | null>(null);
  const rowsButtonRef = useRef<HTMLButtonElement | null>(null);
  const canCompare = selectedRows.length >= 2;
  const isCompactRowsMode = rows <= 5;
  const pageLinkSize = isCompactRowsMode ? 3 : 5;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rowsMenuRef.current) return;
      if (!rowsMenuRef.current.contains(event.target as Node)) {
        setIsRowsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden p-3 pb-0">
      <div className="grid grid-cols-3 gap-3 px-6">
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            disabled={!canCompare}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-(--text-secondary)/20 dark:bg-(--secondary-3) bg-(--primary-2)/10 text-(--primary-2) disabled:text-(--gray-02) dark:text-white transition-opacity disabled:cursor-not-allowed disabled:bg-(--gray-01) dark:disabled:bg-(--gray-02) dark:disabled:text-white disabled:opacity-45 dark:border-(--secondary-3)"
          >
            <IoGitCompareOutline size={32} />
          </button>
          <span className="text-center text-sm">Comparar</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-(--text-secondary)/20 bg-(--primary-2)/10 text-(--primary-2) dark:border-(--secondary-3) dark:bg-(--secondary-3) dark:text-white"
          >
            <TbListCheck size={32} />
          </button>
          <span className="text-center text-sm">Seleccionar registros</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-(--text-secondary)/20 bg-(--primary-2)/10 text-(--primary-2) dark:border-(--secondary-3) dark:bg-(--secondary-3) dark:text-white"
          >
            <LuFilter size={32} />
          </button>
          <span className="text-center text-sm">Ordenar columnas</span>
        </div>
      </div>

      <div
        className={`-mx-3 min-h-0 overflow-x-auto border-t border-black/10 pt-2 dark:border-white/10 dark:bg-(--card) ${
          isCompactRowsMode ? '' : 'flex-1'
        }`}
      >
        <DataTable
          value={mockNeighborsFull}
          selection={selectedRows}
          onSelectionChange={e => setSelectedRows(e.value as NeighborRow[])}
          first={first}
          onPage={e => {
            setFirst(e.first);
            setRows(e.rows);
          }}
          dataKey="serial"
          selectionMode="multiple"
          size="small"
          paginator
          rows={rows}
          rowsPerPageOptions={[25, 50, 100]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          pageLinkSize={pageLinkSize}
          paginatorRight={
            <label className="inline-flex items-center gap-2 text-xs text-(--text-secondary) dark:text-white/75">
              Filas
              <span ref={rowsMenuRef} className="relative inline-flex items-center">
                <button
                  ref={rowsButtonRef}
                  type="button"
                  onClick={() => {
                    if (isRowsMenuOpen) {
                      setIsRowsMenuOpen(false);
                      return;
                    }

                    if (!rowsButtonRef.current) return;
                    const buttonRect = rowsButtonRef.current.getBoundingClientRect();
                    const viewportPadding = 8;
                    const menuWidth = 72;
                    const menuHeight = ROW_OPTIONS.length * 36 + 8;
                    const spaceBelow = window.innerHeight - buttonRect.bottom;
                    const openDown = spaceBelow >= menuHeight;

                    setRowsMenuPosition({
                      top: openDown
                        ? buttonRect.bottom + 6
                        : Math.max(viewportPadding, buttonRect.top - menuHeight - 6),
                      left: Math.max(
                        viewportPadding,
                        Math.min(
                          buttonRect.right - menuWidth,
                          window.innerWidth - menuWidth - viewportPadding
                        )
                      )
                    });
                    setIsRowsMenuOpen(true);
                  }}
                  aria-label="Cantidad de filas por página"
                  className="inline-flex h-8 items-center gap-2 rounded-lg border border-black/20 bg-white py-1 pl-2 pr-2 text-sm font-medium text-(--text-primary) shadow-sm outline-none transition-colors hover:border-(--primary-2) focus:border-(--primary-2) focus:ring-2 focus:ring-(--primary-2)/20 dark:border-white/20 dark:bg-(--card) dark:text-(--text-primary) dark:hover:border-(--secondary) dark:focus:border-(--secondary) dark:focus:ring-(--secondary)/25"
                >
                  <span>{rows}</span>
                  <IoChevronDownSharp
                    size={14}
                    className={`text-(--text-secondary) transition-transform dark:text-white/70 ${
                      isRowsMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isRowsMenuOpen && rowsMenuPosition && (
                  <div
                    className="fixed z-300 min-w-[72px] overflow-hidden rounded-lg border border-black/15 bg-white shadow-lg dark:border-white/20 dark:bg-(--card)"
                    style={{
                      top: rowsMenuPosition.top,
                      left: rowsMenuPosition.left
                    }}
                  >
                    {ROW_OPTIONS.map(option => {
                      const isSelected = option === rows;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFirst(0);
                            setRows(option);
                            setIsRowsMenuOpen(false);
                          }}
                          className={`flex h-9 w-full items-center justify-center text-sm transition-colors ${
                            isSelected
                              ? 'bg-(--primary-2)/15 font-semibold text-(--primary-3) dark:bg-(--secondary)/35 dark:text-white'
                              : 'text-(--text-primary) hover:bg-black/5 dark:text-(--text-primary) dark:hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </span>
            </label>
          }
          scrollable={!isCompactRowsMode}
          scrollHeight={isCompactRowsMode ? undefined : 'flex'}
          tableStyle={{ width: 'max-content', minWidth: '100%' }}
          className={ONT_NEIGHBORS_TABLE_FULL_CLASSNAME}
        >
          <Column selectionMode="multiple" />
          <Column field="serial" header="Serial" body={serialTemplate} />
          <Column field="estado" header="Estado" body={estadoTemplate} />
          <Column field="ontRx" header="Ont Rx" body={ontRxTemplate} />
          {TABLE_COLUMNS.map(({ field, header }) => (
            <Column key={field} field={field} header={header} />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

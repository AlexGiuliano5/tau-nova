'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IoCheckmarkSharp, IoCloseSharp, IoGitCompareOutline } from 'react-icons/io5';
import { LuFilter } from 'react-icons/lu';
import { TbListCheck } from 'react-icons/tb';

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
      className="inline-flex text-center text-(--info-color) hover:underline dark:text-secondary-dark-mobile-2"
    >
      <span className='font-semibold'>{row.serial}</span>
    </Link>
  );
};

const estadoTemplate = (row: NeighborRow) => {
  const isOk = row.estado === 'OK';
  return (
    <span className="inline-flex items-center justify-center">
      {isOk ? (
        <IoCheckmarkSharp size={15} className="rounded-full bg-(--ok-color) text-white" />
      ) : (
        <IoCloseSharp size={15} className="rounded-full bg-(--error-color) text-white" />
      )}
    </span>
  );
};

const ontRxTemplate = (row: NeighborRow) => {
  const colorClass =
    row.ontRx < 0
      ? 'text-(--error-color)'
      : row.ontRx === 0
        ? 'text-(--color-text-secondary-mobile)'
        : 'text-(--ok-color)';
  return <span className={colorClass + ' font-semibold'}>{row.ontRx.toFixed(2)}</span>;
};

export const AppDataTableFull = () => {
  const [selectedRows, setSelectedRows] = useState<NeighborRow[]>([]);
  const canCompare = selectedRows.length >= 2;

  return (
    <div className="flex flex-col gap-4 p-3 pb-0">
      <div className="grid grid-cols-3 gap-3 px-6">
        <div className="flex flex-col items-center gap-1">
          <button
            disabled={!canCompare}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-(--color-text-secondary-mobile)/20 bg-(--color-primary-mobile-2)/10 text-(--color-primary-mobile-2) transition-opacity disabled:cursor-not-allowed disabled:opacity-45 dark:border-(--color-primary-mobile-2) dark:bg-(--color-primary-mobile-2) dark:text-white dark:disabled:opacity-35"
          >
            <IoGitCompareOutline size={32} />
          </button>
          <span className="text-center text-sm">Comparar</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-(--color-text-secondary-mobile)/20 bg-(--color-primary-mobile-2)/10 text-(--color-primary-mobile-2) dark:border-(--color-primary-mobile-2) dark:bg-(--color-primary-mobile-2) dark:text-white">
            <TbListCheck size={32} />
          </button>
          <span className="text-center text-sm">Seleccionar registros</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-(--color-text-secondary-mobile)/20 bg-(--color-primary-mobile-2)/10 text-(--color-primary-mobile-2) dark:border-(--color-primary-mobile-2) dark:bg-(--color-primary-mobile-2) dark:text-white">
            <LuFilter size={32} />
          </button>
          <span className="text-center text-sm">Ordenar columnas</span>
        </div>
      </div>

      <div className="-mx-3 overflow-x-auto border-t border-black/10 pt-2 dark:border-white/10 dark:bg-(--app-card)">
        <DataTable
          value={mockNeighborsFull}
          selection={selectedRows}
          onSelectionChange={e => setSelectedRows(e.value as NeighborRow[])}
          dataKey="serial"
          selectionMode="multiple"
          size="small"
          scrollable
          scrollHeight="420px"
          tableStyle={{ width: 'max-content', minWidth: '100%' }}
          className="w-full text-xs [&_.p-datatable-wrapper]:overflow-auto [&_.p-datatable-thead>tr>th]:whitespace-nowrap [&_.p-datatable-thead>tr>th]:bg-white [&_.p-datatable-thead>tr>th]:py-1.5 [&_.p-datatable-thead>tr>th]:px-2 [&_.p-datatable-thead>tr>th]:font-semibold [&_.p-datatable-thead>tr>th]:text-center [&_.p-datatable-thead>tr>th]:border-b [&_.p-datatable-thead>tr>th]:border-black/20 [&_.p-column-header-content]:justify-center [&_.p-datatable-tbody>tr>td]:whitespace-nowrap [&_.p-datatable-tbody>tr>td]:py-1 [&_.p-datatable-tbody>tr>td]:px-2 [&_.p-datatable-tbody>tr>td]:text-center [&_.p-datatable-tbody>tr>td]:border-b [&_.p-datatable-tbody>tr>td]:border-black/10 [&_.p-datatable-tbody>tr.p-highlight>td]:bg-(--info-color)/10 dark:[&_.p-datatable-thead>tr>th]:bg-(--app-card) dark:[&_.p-datatable-thead>tr>th]:border-white/20 dark:[&_.p-datatable-tbody>tr>td]:bg-(--app-card) dark:[&_.p-datatable-tbody>tr>td]:border-white/10 dark:[&_.p-datatable-tbody>tr.p-highlight>td]:bg-(--color-primary-mobile-2)/50"
        >
          <Column selectionMode="multiple" />
          <Column field="serial" header="Serial" body={serialTemplate} />
          <Column field="estado" header="Estado" body={estadoTemplate} />
          <Column field="ontRx" header="Ont Rx" body={ontRxTemplate} />
          <Column field="calle" header="Calle" />
          <Column field="altura" header="Altura" />
          <Column field="piso" header="Piso" />
          <Column field="depto" header="Depto" />
          <Column field="ontTx" header="Ont Tx" />
          <Column field="oltRx" header="Olt Rx" />
          <Column field="oltTx" header="Olt Tx" />
          <Column field="oltVolt" header="Olt Volt" />
          <Column field="ontTemp" header="Ont Temp" />
          <Column field="ontVolt" header="Ont Volt" />
          <Column field="ontBiasCurrent" header="Ont BiasCurrent" />
          <Column field="oltBiasCurrent" header="Olt BiasCurrent" />
          <Column field="portTemp" header="Port Temp" />
          <Column field="slot" header="Slot" />
          <Column field="port" header="Port" />
          <Column field="provincia" header="Provincia" />
        </DataTable>
      </div>
    </div>
  );
};

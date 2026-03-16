'use client';

import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';

const mockNeighbors = [
  { serial: '414c434cb26bc989', estado: 'OK', ontRx: '-20.7', oltRx: '-25.38' },
  { serial: '414c434cb26bc989', estado: 'OK', ontRx: '-20.7', oltRx: '-25.38' },
  { serial: '414c434cb26bc989', estado: 'OK', ontRx: '-20.7', oltRx: '-25.38' },
  { serial: '414c434cb26bc989', estado: 'Apag.', ontRx: '-20.7', oltRx: '-25.38' },
  { serial: '414c434cb26bc989', estado: 'OK', ontRx: '-20.7', oltRx: '-25.38' }
];

const splitSerialInTwoRows = (serial: string) => {
  const abbreviatedSerial =
    serial.length > 6 ? `${serial.slice(0, 4)}...${serial.slice(-4)}` : serial;

  return (
    <Link
      href={`/ftth/ont/${encodeURIComponent(serial)}/info`}
      className="inline-flex text-center text-(--info-color) hover:underline dark:text-secondary-dark-mobile-2"
    >
      <span>{abbreviatedSerial}</span>
    </Link>
  );
};

const estadoTemplate = (row: (typeof mockNeighbors)[number]) => {
  const isOk = row.estado.toUpperCase() === 'OK';
  return (
    <span className="inline-flex items-center justify-center gap-1">
      {isOk ? (
        <IoCheckmarkSharp size={15} className="bg-(--ok-color) rounded-full text-white" />
      ) : (
        <IoCloseSharp size={15} className="bg-(--error-color) rounded-full text-white" />
      )}
    </span>
  );
};

export const AppDataTablePreview = () => {
  return (
    <DataTable
      value={mockNeighbors}
      tableStyle={{ minWidth: '100%', width: '100%' }}
      size="small"
      className="w-full text-sm [&_.p-datatable-table]:w-full [&_.p-datatable-thead>tr>th]:bg-transparent [&_.p-datatable-thead>tr>th]:text-center [&_.p-datatable-thead>tr>th]:font-semibold [&_.p-datatable-thead>tr>th]:py-2 [&_.p-datatable-thead>tr>th]:border-b [&_.p-datatable-thead>tr>th]:border-black/15 [&_.p-column-header-content]:justify-center [&_.p-datatable-tbody>tr>td]:text-center [&_.p-datatable-tbody>tr>td]:py-1.5 [&_.p-datatable-tbody>tr>td]:border-b [&_.p-datatable-tbody>tr>td]:border-black/10 dark:[&_.p-datatable-thead>tr>th]:border-white/20 dark:[&_.p-datatable-tbody>tr>td]:border-white/10"
    >
      <Column
        field="serial"
        header="Serial"
        body={row => splitSerialInTwoRows(row.serial)}
        headerClassName="text-center"
        bodyClassName="text-center"
        style={{ width: '25%' }}
      />
      <Column
        field="estado"
        header="Estado"
        body={estadoTemplate}
        headerClassName="text-center"
        bodyClassName="text-center"
        style={{ width: '25%' }}
      />
      <Column
        field="ontRx"
        header="Ont Rx"
        headerClassName="text-center"
        bodyClassName="text-center"
        style={{ width: '25%' }}
      />
      <Column
        field="oltRx"
        header="Olt Rx"
        headerClassName="text-center"
        bodyClassName="text-center"
        style={{ width: '25%' }}
      />
    </DataTable>
  );
};

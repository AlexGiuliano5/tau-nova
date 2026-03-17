'use client';

import Link from 'next/link';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';

import { ONT_NEIGHBORS_TABLE_PREVIEW_CLASSNAME } from './tableClassNames';

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
      className="inline-flex text-center text-(--primary) hover:underline dark:text-(--secondary)"
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
        <IoCheckmarkSharp size={15} className="bg-(--state-01) rounded-full text-white" />
      ) : (
        <IoCloseSharp size={15} className="bg-(--state-03) rounded-full text-white" />
      )}
    </span>
  );
};

export const OntNeighborsTablePreview = () => {
  return (
    <DataTable
      value={mockNeighbors}
      tableStyle={{ minWidth: '100%', width: '100%' }}
      size="small"
      className={ONT_NEIGHBORS_TABLE_PREVIEW_CLASSNAME}
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

'use client';

import Link from 'next/link';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import type { DataTableSortEvent } from 'primereact/datatable';
import { useMemo, useState } from 'react';
import { IoCheckmarkSharp, IoCloseSharp } from 'react-icons/io5';

import { ONT_NEIGHBORS_TABLE_PREVIEW_CLASSNAME } from './tableClassNames';
import type { OntNeighborPreviewItem } from '@/types/ftth/ont-info';

interface Props {
  neighbors: OntNeighborPreviewItem[];
}

type NeighborRowView = OntNeighborPreviewItem & {
  ontRxValue: number;
  oltRxValue: number;
};

const MAX_PREVIEW_ROWS = 5;

const splitSerialInTwoRows = (serial: string) => {
  const normalizedSerial = serial.trim();
  const abbreviatedSerial =
    normalizedSerial.length > 6
      ? `${normalizedSerial.slice(0, 4)}...${normalizedSerial.slice(-4)}`
      : normalizedSerial;

  return (
    <Link
      href={`/ftth/ont/${encodeURIComponent(normalizedSerial)}/info`}
      className="inline-flex text-center text-(--primary) hover:underline dark:text-(--secondary)"
    >
      <span>{abbreviatedSerial}</span>
    </Link>
  );
};

function normalizeStatus(value: string): string {
  return value.trim().toUpperCase();
}

function metricTemplate(value: string): string {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : 'Sin Datos';
}

function ontRxTemplate(value: string) {
  return <span style={{ color: getOntRxColor(value) }}>{metricTemplate(value)}</span>;
}

function toMetricNumber(value: string): number {
  const parsed = Number.parseFloat(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : Number.NEGATIVE_INFINITY;
}

export const OntNeighborsTablePreview = ({ neighbors }: Props) => {
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const rows = useMemo<NeighborRowView[]>(
    () =>
      neighbors.map(item => ({
        ...item,
        ontRxValue: toMetricNumber(item.ontRx),
        oltRxValue: toMetricNumber(item.oltRx)
      })),
    [neighbors]
  );

  const sortedRows = useMemo(() => {
    if (!sortField || sortOrder === 0) {
      return rows;
    }

    const sorted = [...rows];
    sorted.sort((left, right) => compareRows(left, right, sortField, sortOrder));
    return sorted;
  }, [rows, sortField, sortOrder]);

  const visibleRows = useMemo(() => sortedRows.slice(0, MAX_PREVIEW_ROWS), [sortedRows]);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(formatStatusLabel(status));
  };

  const estadoTemplate = (row: OntNeighborPreviewItem) => {
    const status = normalizeStatus(row.estado);

    if (status === 'GOOD') {
      return (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1"
          onClick={() => handleStatusClick(row.estado)}
          aria-label={`Ver estado ${formatStatusLabel(row.estado)}`}
        >
          <IoCheckmarkSharp size={16} className="bg-(--state-01) rounded-full text-white p-px" />
        </button>
      );
    }

    if (status === 'INTERRUPTED') {
      return (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1"
          onClick={() => handleStatusClick(row.estado)}
          aria-label={`Ver estado ${formatStatusLabel(row.estado)}`}
        >
          <IoCloseSharp size={16} className="bg-(--state-03) rounded-full text-white p-px" />
        </button>
      );
    }

    if (status === 'REDUCED_ROBUSTNESS' || status === 'DEGRADED') {
      return (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1"
          onClick={() => handleStatusClick(row.estado)}
          aria-label={`Ver estado ${formatStatusLabel(row.estado)}`}
        >
          <IoCheckmarkSharp size={16} className="bg-(--state-02) rounded-full text-white p-px" />
        </button>
      );
    }

    return (
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1"
        onClick={() => handleStatusClick(row.estado)}
        aria-label={`Ver estado ${formatStatusLabel(row.estado)}`}
      >
        <IoCloseSharp size={16} className="bg-(--gray-02) rounded-full text-white p-px" />
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedStatus && (
        <div className="rounded-md border border-(--table-stroke) bg-(--table-header) px-3 py-1.5 text-xs text-(--text-secondary)">
          Estado seleccionado: <span className="font-semibold text-(--text-primary)">{selectedStatus}</span>
        </div>
      )}
      <DataTable
        value={visibleRows}
        tableStyle={{ minWidth: '100%', width: '100%' }}
        size="small"
        className={ONT_NEIGHBORS_TABLE_PREVIEW_CLASSNAME}
        emptyMessage="Sin Datos"
        sortMode="single"
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(event: DataTableSortEvent) => {
          setSortField(event.sortField);
          setSortOrder(event.sortOrder as 1 | -1 | 0);
        }}
      >
        <Column
          field="serial"
          header="Serial"
          body={row => splitSerialInTwoRows(row.serial)}
          sortable
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ width: '25%' }}
        />
        <Column
          field="estado"
          header="Estado"
          body={estadoTemplate}
          sortable
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ width: '25%' }}
        />
        <Column
          field="ontRx"
          header="Ont Rx"
          body={row => ontRxTemplate(row.ontRx)}
          sortable
          sortField="ontRxValue"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ width: '25%' }}
        />
        <Column
          field="oltRx"
          header="Olt Rx"
          body={row => metricTemplate(row.oltRx)}
          sortable
          sortField="oltRxValue"
          headerClassName="text-center"
          bodyClassName="text-center"
          style={{ width: '25%' }}
        />
      </DataTable>
      {rows.length > MAX_PREVIEW_ROWS && (
        <span className="text-xs text-(--text-secondary) text-center">
          Mostrando {MAX_PREVIEW_ROWS} de {rows.length} vecinos
        </span>
      )}
    </div>
  );
};

function formatStatusLabel(status: string): string {
  const normalized = status.trim();
  if (!normalized) {
    return 'Sin Datos';
  }

  const textWithSpaces = normalized.replace(/_/g, ' ');
  if (textWithSpaces === textWithSpaces.toUpperCase()) {
    const lower = textWithSpaces.toLowerCase();
    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
  }

  return textWithSpaces;
}

function getOntRxColor(rawValue: string): string {
  const value = Number.parseFloat(rawValue.replace(',', '.'));
  if (Number.isNaN(value)) {
    return 'var(--text-secondary)';
  }

  if (value < -27) {
    return 'var(--state-03)';
  }

  if (value < -24.5) {
    return 'var(--state-02)';
  }

  if (value > -12) {
    return 'var(--state-03)';
  }

  return 'var(--state-01)';
}

function compareRows(
  left: NeighborRowView,
  right: NeighborRowView,
  field: string,
  order: 1 | -1 | 0
): number {
  if (field === 'ontRxValue' || field === 'oltRxValue') {
    const leftValue = left[field];
    const rightValue = right[field];

    if (leftValue === rightValue) {
      return 0;
    }

    return leftValue > rightValue ? order : -order;
  }

  const leftRaw = left[field as keyof NeighborRowView];
  const rightRaw = right[field as keyof NeighborRowView];
  const leftText = String(leftRaw ?? '').toLowerCase();
  const rightText = String(rightRaw ?? '').toLowerCase();

  if (leftText === rightText) {
    return 0;
  }

  return leftText > rightText ? order : -order;
}

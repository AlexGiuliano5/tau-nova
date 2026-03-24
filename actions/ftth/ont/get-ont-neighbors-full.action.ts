'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getLastMetricByOntShared } from '@/actions/ftth/ont/_shared-last-metric.action';
import {
  buildEntityId,
  findGridColumnIndex,
  getRowValue,
  toTextOrNoData
} from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { getOntNeighborsPreview } from '@/services/ftth/ont/get-ont-neighbors-preview.service';
import type { OntNeighborFullItem } from '@/types/ftth/ont-info';

export async function getOntNeighborsFullAction(ont: string): Promise<OntNeighborFullItem[]> {
  const normalizedOnt = ont.trim();

  if (!normalizedOnt) {
    return [];
  }

  const cookieStore = await cookies();
  const token = getAuthTokenFromCookieStore(cookieStore);

  if (!token || isTokenExpired(token)) {
    redirect('/login');
  }

  const lastMetricByOnt = await getLastMetricByOntShared(token, normalizedOnt);
  if (!lastMetricByOnt.ok) {
    if (lastMetricByOnt.error === 'auth') {
      redirect('/login');
    }

    return [];
  }

  const entityId = buildEntityId(lastMetricByOnt.data.olt, lastMetricByOnt.data.slot, lastMetricByOnt.data.port);
  if (!entityId) {
    return [];
  }

  const metricsGrid = await getOntNeighborsPreview({ token, entityId });
  if (!metricsGrid.ok) {
    if (metricsGrid.error === 'auth') {
      redirect('/login');
    }

    return [];
  }

  return mapFullRows(metricsGrid.data.dataSchema.columnNames, metricsGrid.data.rows);
}

function mapFullRows(
  columnNames: string[],
  rows: Array<Array<number | string | null>>
): OntNeighborFullItem[] {
  // Mapeamos por nombre de columna (no por posición) para tolerar
  // cambios de orden en el payload del BFF sin romper la UI.
  const serialIndex = findGridColumnIndex(columnNames, ['serial']);
  const estadoIndex = findGridColumnIndex(columnNames, ['estado']);
  const ontRxIndex = findGridColumnIndex(columnNames, ['ont rx pwr', 'ont rx']);
  const calleIndex = findGridColumnIndex(columnNames, ['calle']);
  const alturaIndex = findGridColumnIndex(columnNames, ['altura']);
  const pisoIndex = findGridColumnIndex(columnNames, ['piso']);
  const deptoIndex = findGridColumnIndex(columnNames, ['depto']);
  const ontTxIndex = findGridColumnIndex(columnNames, ['ont tx pwr', 'ont tx']);
  const oltRxIndex = findGridColumnIndex(columnNames, ['olt rx pwr', 'olt rx']);
  const oltTxIndex = findGridColumnIndex(columnNames, ['olt tx pwr', 'olt tx']);
  const oltVoltIndex = findGridColumnIndex(columnNames, ['olt volt']);
  const ontTempIndex = findGridColumnIndex(columnNames, ['ont temp']);
  const ontVoltIndex = findGridColumnIndex(columnNames, ['ont volt']);
  const ontBiasCurrentIndex = findGridColumnIndex(columnNames, ['ontbiascurrent']);
  const oltBiasCurrentIndex = findGridColumnIndex(columnNames, ['oltbiascurrent']);
  const portTempIndex = findGridColumnIndex(columnNames, ['port temp']);
  const slotIndex = findGridColumnIndex(columnNames, ['slot']);
  const portIndex = findGridColumnIndex(columnNames, ['port']);
  const provinciaIndex = findGridColumnIndex(columnNames, ['provincia']);

  if (serialIndex < 0 || estadoIndex < 0 || ontRxIndex < 0) {
    return [];
  }

  return rows.map((row, idx) => ({
    rowId: `${toTextOrNoData(row[serialIndex])}-${idx}`,
    serial: toTextOrNoData(row[serialIndex]),
    estado: toTextOrNoData(row[estadoIndex]),
    ontRx: toTextOrNoData(row[ontRxIndex]),
    calle: toTextOrNoData(getRowValue(row, calleIndex)),
    altura: toTextOrNoData(getRowValue(row, alturaIndex)),
    piso: toTextOrNoData(getRowValue(row, pisoIndex)),
    depto: toTextOrNoData(getRowValue(row, deptoIndex)),
    ontTx: toTextOrNoData(getRowValue(row, ontTxIndex)),
    oltRx: toTextOrNoData(getRowValue(row, oltRxIndex)),
    oltTx: toTextOrNoData(getRowValue(row, oltTxIndex)),
    oltVolt: toTextOrNoData(getRowValue(row, oltVoltIndex)),
    ontTemp: toTextOrNoData(getRowValue(row, ontTempIndex)),
    ontVolt: toTextOrNoData(getRowValue(row, ontVoltIndex)),
    ontBiasCurrent: toTextOrNoData(getRowValue(row, ontBiasCurrentIndex)),
    oltBiasCurrent: toTextOrNoData(getRowValue(row, oltBiasCurrentIndex)),
    portTemp: toTextOrNoData(getRowValue(row, portTempIndex)),
    slot: toTextOrNoData(getRowValue(row, slotIndex)),
    port: toTextOrNoData(getRowValue(row, portIndex)),
    provincia: toTextOrNoData(getRowValue(row, provinciaIndex))
  }));
}


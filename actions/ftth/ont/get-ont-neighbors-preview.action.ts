'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getLastMetricByOntShared } from '@/actions/ftth/ont/_shared-last-metric.action';
import {
  buildEntityId,
  findGridColumnIndex,
  toTextOrNoData
} from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { getOntNeighborsPreview } from '@/services/ftth/ont/get-ont-neighbors-preview.service';
import type { OntNeighborPreviewItem } from '@/types/ftth/ont-info';

export async function getOntNeighborsPreviewAction(ont: string): Promise<OntNeighborPreviewItem[]> {
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

  return mapPreviewRows(metricsGrid.data.dataSchema.columnNames, metricsGrid.data.rows);
}

function mapPreviewRows(
  columnNames: string[],
  rows: Array<Array<number | string | null>>
): OntNeighborPreviewItem[] {
  const serialIndex = findGridColumnIndex(columnNames, ['serial']);
  const estadoIndex = findGridColumnIndex(columnNames, ['estado']);
  const ontRxIndex = findGridColumnIndex(columnNames, ['ont rx pwr', 'ont rx']);
  const oltRxIndex = findGridColumnIndex(columnNames, ['olt rx pwr', 'olt rx']);

  if (serialIndex < 0 || estadoIndex < 0 || ontRxIndex < 0 || oltRxIndex < 0) {
    return [];
  }

  return rows.map(row => ({
    serial: toTextOrNoData(row[serialIndex]),
    estado: toTextOrNoData(row[estadoIndex]),
    ontRx: toTextOrNoData(row[ontRxIndex]),
    oltRx: toTextOrNoData(row[oltRxIndex])
  }));
}

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getLastMetricByOntShared } from '@/actions/ftth/ont/_shared-last-metric.action';
import {
  buildEntityId,
  findGridColumnIndex,
  normalizeSerial,
  toTextOrNoData
} from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { getOntInfoByOnt } from '@/services/ftth/ont/get-ont-info-by-ont.service';
import { getOntNeighborsPreview } from '@/services/ftth/ont/get-ont-neighbors-preview.service';
import type { OntInfoDetails } from '@/types/ftth/ont-info';
import { formatOntSerial } from '@/utils/ftth/ont/format-ont-serial';

export async function getOntDetailsInfoAction(ont: string): Promise<OntInfoDetails | null> {
  const normalizedOnt = ont.trim();

  if (!normalizedOnt) {
    return null;
  }

  const cookieStore = await cookies();
  const token = getAuthTokenFromCookieStore(cookieStore);

  if (!token || isTokenExpired(token)) {
    return null;
  }

  const lastMetricByOnt = await getLastMetricByOntShared(token, normalizedOnt);

  if (!lastMetricByOnt.ok) {
    if (lastMetricByOnt.error === 'auth') {
      redirect('/login');
    }

    return null;
  }

  const ontInfoByOnt = await getOntInfoByOnt({
    token,
    oltId: lastMetricByOnt.data.olt,
    ontId: normalizedOnt
  });

  if (!ontInfoByOnt.ok) {
    if (ontInfoByOnt.error === 'auth') {
      redirect('/login');
    }

    return null;
  }

  const ponId = toTextOrNoData(normalizedOnt).toUpperCase();
  const status = await getCurrentOntStatus({
    token,
    ontId: normalizedOnt,
    olt: lastMetricByOnt.data.olt,
    slot: lastMetricByOnt.data.slot,
    port: lastMetricByOnt.data.port
  });

  return {
    ponId,
    serial: formatOntSerial(ponId),
    vendor: toTextOrNoData(ontInfoByOnt.data.equipmentType),
    olt: toTextOrNoData(lastMetricByOnt.data.olt),
    placa: toTextOrNoData(lastMetricByOnt.data.slot),
    puerto: toTextOrNoData(lastMetricByOnt.data.port),
    estado: status,
    distancia: toTextOrNoData(ontInfoByOnt.data.distance),
    ultimaVezActiva: toTextOrNoData(ontInfoByOnt.data.lastUpTime),
    ultimaVezInactiva: toTextOrNoData(ontInfoByOnt.data.lastDnTime),
    causaUltimaInactividad: toTextOrNoData(ontInfoByOnt.data.downCause)
  };
}

async function getCurrentOntStatus({
  token,
  ontId,
  olt,
  slot,
  port
}: {
  token: string;
  ontId: string;
  olt: string;
  slot: string;
  port: string;
}): Promise<string> {
  const entityId = buildEntityId(olt, slot, port);
  if (!entityId) {
    return 'Sin Datos';
  }

  const metricsGrid = await getOntNeighborsPreview({ token, entityId });
  if (!metricsGrid.ok) {
    if (metricsGrid.error === 'auth') {
      redirect('/login');
    }

    return 'Sin Datos';
  }

  const serialIndex = findGridColumnIndex(metricsGrid.data.dataSchema.columnNames, ['serial']);
  const statusIndex = findGridColumnIndex(metricsGrid.data.dataSchema.columnNames, ['estado']);

  if (serialIndex < 0 || statusIndex < 0) {
    return 'Sin Datos';
  }

  const normalizedOnt = normalizeSerial(ontId);
  // El contrato de metricsGrid no garantiza orden fijo de columnas,
  // por eso primero resolvemos índices y luego hacemos match por serial.
  const matchedRow = metricsGrid.data.rows.find(row => normalizeSerial(row[serialIndex]) === normalizedOnt);

  if (!matchedRow) {
    return 'Sin Datos';
  }

  return toTextOrNoData(matchedRow[statusIndex]);
}

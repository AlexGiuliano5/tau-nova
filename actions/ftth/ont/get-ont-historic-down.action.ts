'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLastMetricByOntShared } from '@/actions/ftth/ont/_shared-last-metric.action';
import { toTextOrNoData } from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getOntHistoricDown } from '@/services/ftth/ont/get-ont-historic-down.service';
import type { OntHistoricDownItem } from '@/types/ftth/ont-info';

export async function getOntHistoricDownAction(ont: string): Promise<OntHistoricDownItem[]> {
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

  const historicDown = await getOntHistoricDown({
    token,
    ontId: normalizedOnt,
    oltId: lastMetricByOnt.data.olt
  });

  if (!historicDown.ok) {
    if (historicDown.error === 'auth') {
      redirect('/login');
    }

    return [];
  }

  const nowMs = Date.now();
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  return historicDown.data.map(item => {
    const { date, time } = splitDateTime(item.date);
    const timestampMs = parseDateToTimestamp(item.date);

    return {
      status: toTextOrNoData(item.status),
      date,
      time,
      duration: toTextOrNoData(item.duration),
      timestampMs,
      isInLast24h: timestampMs !== null && nowMs - timestampMs <= twentyFourHoursInMs
    };
  });
}

function splitDateTime(value: string): { date: string; time: string } {
  const normalized = value.trim();

  if (!normalized) {
    return { date: 'Sin Datos', time: 'Sin Datos' };
  }

  // Formatos frecuentes: ISO con "T", o fecha/hora separados por espacio.
  const isoParts = normalized.split('T');
  if (isoParts.length === 2) {
    return {
      date: isoParts[0],
      time: isoParts[1].replace('Z', '').split('.')[0]
    };
  }

  const spacedParts = normalized.split(' ');
  if (spacedParts.length >= 2) {
    return {
      date: spacedParts[0],
      time: spacedParts[1]
    };
  }

  return { date: normalized, time: 'Sin Datos' };
}

function parseDateToTimestamp(value: string): number | null {
  const dateByNativeParser = new Date(value);
  if (!Number.isNaN(dateByNativeParser.getTime())) {
    return dateByNativeParser.getTime();
  }

  // Formato frecuente del BFF: "DD-MM HH:mm" (sin año).
  const shortMatch = value.trim().match(/^(\d{1,2})[-/](\d{1,2})\s+(\d{1,2}):(\d{1,2})$/);

  if (shortMatch) {
    const day = Number.parseInt(shortMatch[1], 10);
    const month = Number.parseInt(shortMatch[2], 10);
    const hour = Number.parseInt(shortMatch[3], 10);
    const minute = Number.parseInt(shortMatch[4], 10);

    if (
      Number.isFinite(day) &&
      Number.isFinite(month) &&
      Number.isFinite(hour) &&
      Number.isFinite(minute)
    ) {
      const now = new Date();
      const currentYear = now.getFullYear();
      const parsedWithCurrentYear = new Date(currentYear, month - 1, day, hour, minute);

      if (!Number.isNaN(parsedWithCurrentYear.getTime())) {
        // Si queda muy en el futuro, asumimos que corresponde al año anterior.
        if (parsedWithCurrentYear.getTime() - now.getTime() > 24 * 60 * 60 * 1000) {
          const parsedWithPreviousYear = new Date(currentYear - 1, month - 1, day, hour, minute);
          if (!Number.isNaN(parsedWithPreviousYear.getTime())) {
            return parsedWithPreviousYear.getTime();
          }
        }

        return parsedWithCurrentYear.getTime();
      }
    }
  }

  return null;
}

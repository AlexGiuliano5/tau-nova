'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLastMetricByOntShared } from '@/actions/ftth/ont/_shared-last-metric.action';
import { toTextOrNoData } from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getOntMetricsCards } from '@/services/ftth/ont/get-ont-metrics-cards.service';
import type { MetricStatusColor, OntMetricCard } from '@/types/ftth/ont-info';

export async function getOntMetricsCardsAction(ont: string): Promise<OntMetricCard[]> {
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

  const metricsCards = await getOntMetricsCards({
    token,
    ontId: normalizedOnt,
    oltId: lastMetricByOnt.data.olt
  });

  if (!metricsCards.ok) {
    if (metricsCards.error === 'auth') {
      redirect('/login');
    }

    return [];
  }

  return metricsCards.data.map(metric => ({
    title: toTextOrNoData(metric.title),
    actual: toTextOrNoData(metric.actual),
    min: toTextOrNoData(metric.min),
    avg: toTextOrNoData(metric.avg),
    max: toTextOrNoData(metric.max),
    unit: getMetricUnit(metric.title),
    color: getMetricStatusColor(metric.title, metric.actual)
  }));
}

function getMetricUnit(title: string): string {
  const normalizedTitle = title.trim().toUpperCase();

  switch (normalizedTitle) {
    case 'ONT RX':
    case 'ONT TX':
    case 'OLT TX':
    case 'OLT RX':
      return 'dBm';
    case 'ONT VOLTAGE':
    case 'OLT VOLTAGE':
      return 'V';
    case 'ONT TEMP LASER':
    case 'PORT TEMPERATURA':
      return '°C';
    case 'ONT DISTANCE':
      return 'Mts';
    default:
      // Algunas métricas llegan como "Temperature" en inglés.
      return normalizedTitle.includes('TEMPERATURE') ? '°C' : '';
  }
}

function getMetricStatusColor(title: string, actual: string): MetricStatusColor {
  if (title.trim().toUpperCase() !== 'ONT RX') {
    return 'neutral';
  }

  const value = Number.parseFloat(actual.replace(',', '.'));
  if (Number.isNaN(value)) {
    return 'neutral';
  }

  // Regla de umbrales actual para ONT Rx.
  if (value < -27) {
    return 'card-red';
  }

  if (value < -24.5) {
    return 'card-yellow';
  }

  if (value > -12) {
    return 'card-red';
  }

  return 'card-green';
}

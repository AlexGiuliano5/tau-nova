'use server';

import { cache } from 'react';
import { getLastMetricByOnt } from '@/services/ftth/ont/get-last-metric-by-ont.service';

// Memoiza por request de render en servidor para evitar
// repetir LastMetricsByOnt entre cards de la misma pantalla.
const getLastMetricByOntCached = cache((token: string, ontId: string) => {
  return getLastMetricByOnt({ token, ontId });
});

export async function getLastMetricByOntShared(token: string, ontId: string) {
  return getLastMetricByOntCached(token, ontId);
}

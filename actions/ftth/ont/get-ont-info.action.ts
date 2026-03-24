'use server';

import { cookies } from 'next/headers';

import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { toTextOrNoData } from '@/actions/ftth/ont/_shared-metrics-grid.action';
import { getOntInfo } from '@/services/ftth/ont/get-ont-info.service';
import type { OntClientInfo } from '@/types/ftth/ont-info';

export async function getOntInfoAction(ont: string): Promise<OntClientInfo | null> {
  const normalizedOnt = ont.trim();

  if (!normalizedOnt) {
    return null;
  }

  const cookieStore = await cookies();
  const token = getAuthTokenFromCookieStore(cookieStore);

  if (!token || isTokenExpired(token)) {
    return null;
  }

  const ontInfo = await getOntInfo({ ont: normalizedOnt, token });

  if (!ontInfo) {
    return null;
  }

  return {
    nombre: toTextOrNoData(ontInfo.abonado),
    numeroCliente: toTextOrNoData(ontInfo.serviceAccount),
    provincia: toTextOrNoData(ontInfo.province),
    localidad: toTextOrNoData(ontInfo.localidad),
    direccion: formatAddress(ontInfo.calle, ontInfo.altura),
    pisoDpto: toTextOrNoData(ontInfo.pisoDpto),
    telefonoFijo: toTextOrNoData(ontInfo.teleF_CASA),
    telefonoMovil: toTextOrNoData(ontInfo.teleF_PERSONA)
  };
}

function formatAddress(street: unknown, number: unknown): string {
  const normalizedStreet = toTextOrNoData(street);
  const normalizedNumber =
    typeof number === 'number' && Number.isFinite(number) && number > 0 ? String(number) : '';

  if (normalizedStreet === 'Sin Datos' && !normalizedNumber) {
    return 'Sin Datos';
  }

  if (!normalizedNumber) {
    return normalizedStreet;
  }

  if (normalizedStreet === 'Sin Datos') {
    return normalizedNumber;
  }

  return `${normalizedStreet} ${normalizedNumber}`;
}

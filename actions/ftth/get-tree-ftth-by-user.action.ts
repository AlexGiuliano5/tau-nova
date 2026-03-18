'use server';

import { cookies } from 'next/headers';

import { isTokenExpired } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';
import { getTreeFtthByUser } from '@/services/ftth/tree-ftth-by-user.service';
import type { BffTreeResponse } from '@/types/ftth/tree';

export async function getTreeFtthByUserAction(
  shouldRefreshTree: boolean
): Promise<BffTreeResponse | null> {
  // Sólo consultar BFF en el ingreso post-login.
  if (!shouldRefreshTree) {
    return null;
  }

  const cookieStore = await cookies();
  const token = getAuthTokenFromCookieStore(cookieStore);

  // No consumir API de arbol con sesión vencida.
  if (!token || isTokenExpired(token)) {
    return null;
  }

  return getTreeFtthByUser({ token });
}

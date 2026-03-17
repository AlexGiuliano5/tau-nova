export const AUTH_COOKIE_NAME = 'tau_token';

export function getAuthTokenFromCookieStore(cookieStore: {
  get: (name: string) => { value?: string } | undefined;
}): string | undefined {
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const host = forwardedHost || request.headers.get('host');
    const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const protocol = forwardedProtocol
      ? `${forwardedProtocol.replace(/:$/, '')}:`
      : new URL(request.url).protocol;

    return Boolean(host) && originUrl.origin === `${protocol}//${host}`;
  } catch {
    return false;
  }
}

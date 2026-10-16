import { cookies } from 'next/headers';
import { getSessionSecret, verifyAdminToken } from './session-token';
import { ADMIN_SESSION_COOKIE } from './admin-constants';

export { ADMIN_SESSION_COOKIE } from './admin-constants';

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;

  getSessionSecret();
  try {
    return await verifyAdminToken(token);
  } catch {
    return false;
  }
}

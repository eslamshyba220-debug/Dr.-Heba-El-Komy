import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

const issuer = 'dr-heba-el-komy-admin';
const audience = 'dr-heba-el-komy-admin';

export function getSessionSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || new TextEncoder().encode(secret).byteLength < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 bytes.');
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(username: string) {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer)
    .setAudience(audience)
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSessionSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSessionSecret(), { issuer, audience });
  return payload.role === 'admin' && typeof payload.sub === 'string';
}

import bcrypt from 'bcryptjs';
import type { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import { cookies } from 'next/headers';

import { AUTH_COOKIE_NAME } from '@/lib/auth/cookie';
import { AuthTokenPayload, signJwt, verifyJwt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

type CookieJar = ReturnType<typeof cookies> | ResponseCookies;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export function createAuthToken(payload: AuthTokenPayload) {
  return signJwt(payload);
}

export function persistAuthToken(token: string, jar?: CookieJar) {
  const target = jar ?? cookies();
  target.set(AUTH_COOKIE_NAME, token, cookieConfig);
}

export function clearAuthToken(jar?: CookieJar) {
  const target = jar ?? cookies();
  target.delete(AUTH_COOKIE_NAME);
}

export function decodeAuthToken(token?: string) {
  if (!token) return null;
  return verifyJwt<AuthTokenPayload>(token);
}

export async function getCurrentUser() {
  const token = await getTokenFromCookie();
  const decoded = decodeAuthToken(token);
  if (!decoded?.sub) return null;

  return prisma.user.findUnique({
    where: { id: decoded.sub },
  });
}

export async function getTokenFromCookie() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  return token;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }
  return user;
}

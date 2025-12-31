import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

const EXPIRES_IN = (process.env.JWT_EXPIRES_IN ??
  '7d') as SignOptions['expiresIn'];

function getSecret(): Secret {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      'JWT_SECRET is not set. Please add it to your environment variables.',
    );
  }
  return secret;
}

export type AuthTokenPayload = {
  sub: string;
  email: string;
};

export function signJwt(
  payload: AuthTokenPayload,
  options: SignOptions = {},
): string {
  return jwt.sign(payload, getSecret(), {
    algorithm: 'HS256',
    expiresIn: EXPIRES_IN,
    ...options,
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    return jwt.verify(token, getSecret()) as T;
  } catch {
    return null;
  }
}

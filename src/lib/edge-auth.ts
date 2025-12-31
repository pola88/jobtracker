import { jwtVerify } from 'jose';

const encoder = new TextEncoder();

type AuthTokenPayload = {
  sub?: string;
  email?: string;
};

export async function verifyTokenOnEdge(token?: string) {
  if (!token) return null;
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

  try {
    const { payload } = await jwtVerify<AuthTokenPayload>(
      token,
      encoder.encode(secret),
    );
    return payload;
  } catch {
    return null;
  }
}

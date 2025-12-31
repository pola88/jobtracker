import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  createAuthToken,
  findUserByEmail,
  persistAuthToken,
  verifyPassword,
} from '@/lib/auth';
import { loginSchema } from '@/lib/validators/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Credenciales inválidas' },
        { status: 401 },
      );
    }

    const token = createAuthToken({ sub: user.id, email: user.email });
    const response = NextResponse.json({
      user: { id: user.id, email: user.email },
    });
    persistAuthToken(token, response.cookies);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Datos inválidos', issues: error.flatten() },
        { status: 400 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: 'Error inesperado al iniciar sesión' },
      { status: 500 },
    );
  }
}

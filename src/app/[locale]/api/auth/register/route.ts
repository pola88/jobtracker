import { getLocale, getTranslations } from 'next-intl/server';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import {
  createAuthToken,
  findUserByEmail,
  hashPassword,
  persistAuthToken,
} from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validators/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const locale = await getLocale();
  const t = await getTranslations({ locale });

  try {
    const body = await request.json();
    const { email, password } = registerSchema.parse(body);

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: t('api.register.error.repeated_email') },
        { status: 409 },
      );
    }

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: await hashPassword(password),
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = createAuthToken({ sub: user.id, email: user.email });
    const response = NextResponse.json(
      {
        user,
      },
      { status: 201 },
    );
    await persistAuthToken(token, response.cookies);
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: t('generic_errors.invalid_data'), issues: error.flatten() },
        { status: 400 },
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: t('generic_errors.unknown_error') },
      { status: 500 },
    );
  }
}

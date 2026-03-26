import { getLocale, getTranslations } from 'next-intl/server';
import { NextResponse } from 'next/server';

import { clearAuthToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const response = NextResponse.json({ message: t('api.logout.success') });
  clearAuthToken(response.cookies);
  return response;
}

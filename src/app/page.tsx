import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { decodeAuthToken } from '@/lib/auth';
import { getAuthCookieName } from '@/lib/auth/cookie';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const token = cookies().get(getAuthCookieName())?.value;
  const decoded = decodeAuthToken(token);

  if (decoded?.sub) {
    redirect('/interviews');
  }

  redirect('/login');
}

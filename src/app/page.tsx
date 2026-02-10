import { redirect } from 'next/navigation';

import { decodeAuthToken, getTokenFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const token = await getTokenFromCookie();
  const decoded = decodeAuthToken(token);

  if (decoded?.sub) {
    redirect('/interviews');
  }

  redirect('/login');
}

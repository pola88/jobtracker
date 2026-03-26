import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME } from '@/lib/auth';
import { verifyTokenOnEdge } from '@/lib/edge-auth';

import { routing } from './i18n/routing';

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
];
const AUTH_ROUTES = ['/login', '/register'];

const handleI18nRouting = createMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
  const [, maybeLocale] = pathname.split('/');
  return routing.locales.includes(
    maybeLocale as (typeof routing.locales)[number],
  )
    ? maybeLocale
    : routing.defaultLocale;
}

function stripLocalePrefix(pathname: string, locale: string) {
  const localePrefix = `/${locale}`;
  if (!pathname.startsWith(localePrefix)) {
    return pathname;
  }

  const normalizedPathname = pathname.slice(localePrefix.length);
  return normalizedPathname === '' ? '/' : normalizedPathname;
}

export default async function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  console.log('locale', request.nextUrl.locale);
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname);
  const normalizedPathname = stripLocalePrefix(pathname, locale);
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const decoded = await verifyTokenOnEdge(token);
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    normalizedPathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.includes(normalizedPathname);

  if (!decoded?.sub && !isPublicRoute) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (decoded?.sub && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${locale}/interviews`, request.url));
  }

  if (decoded?.sub) {
    response.headers.set('x-user-id', decoded.sub);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};

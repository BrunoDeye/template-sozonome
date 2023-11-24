import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {locales} from './navigation';
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'pt-BR',
  localePrefix: 'always',
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token, req}) => token != null,
    },
    secret: process.env.jwtSecretKey,
    pages: {
      signIn: '/auth/login'
    }
  }
);
 
export default async function middleware(req: NextRequest) {

  // console.log(req)
  const publicPathnameRegex = RegExp(
    `^\/(${locales.join("|")})\/auth\/(login|cadastro)|\/auth\/(login|email|mudar-senha)$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  // console.log(isPublicPage + req.nextUrl.pathname)
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  // matcher: ['/', '/auth/(email|login)', '/(en|it-IT|pt-BR|es-ES)/:path*']
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
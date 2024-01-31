import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { Viewport } from 'next';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
// import Layout from '@/lib/components/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { unstable_setRequestLocale } from 'next-intl/server';
import '../../lib/styles/globals.css';
// import Providers from '@/services/ReactQuery/Providers.client';
import { Suspense } from 'react';
import Loading from './loading';
import SessionProviders from '@/lib/components/providers/SessionProvider';
import { useLocale } from 'next-intl';
import InitialAlert from '@/lib/components/layout/InitialAlert';

const Layout = dynamic(() => import('@/lib/components/layout'), {
  loading: () => <Loading />,
});
const Providers = dynamic(
  () => import('@/services/ReactQuery/Providers.client')
);

const APP_NAME = 'Deye - Calculadora Solar';

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    'Explore nossa calculadora de inversores híbridos e baterias. Dimensione sistemas de energia solar com precisão, maximize o uso da energia solar e alcance eficiência sustentável. Saiba mais agora!',

  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: 'https://calculadora-deye.vercel.app',
    title: APP_NAME,
    description:
      'Explore nossa calculadora de inversores híbridos e baterias. Dimensione sistemas de energia solar com precisão, maximize o uso da energia solar e alcance eficiência sustentável. Saiba mais agora!',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

const locales = ['en', 'it-IT', 'pt-BR', 'es-ES'];
const timeZone = 'America/Sao_Paulo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

const RootLayout = async ({
  children,
  params: { locale },
}: RootLayoutProps) => {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider
          timeZone={timeZone}
          locale={locale}
          messages={messages}
        >
            <SessionProviders>
              <Providers>
                <div id="__next">
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <div className="flex-1">
                        {children}
                        <Analytics />
                        <InitialAlert />
                      </div>
                    </Suspense>
                  </Layout>
                </div>
              </Providers>
            </SessionProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

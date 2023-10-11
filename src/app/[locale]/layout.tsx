import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import dynamic from 'next/dynamic';
// import Layout from '@/lib/components/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/utils';

import '@/lib/styles/globals.css';
// import Providers from '@/services/ReactQuery/Providers.client';
import { Suspense } from 'react';
import Loading from './loading';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://calculadora-deye.vercel.app',
    title: APP_NAME,
    description:
      'Explore nossa calculadora de inversores híbridos e baterias. Dimensione sistemas de energia solar com precisão, maximize o uso da energia solar e alcance eficiência sustentável. Saiba mais agora!',
  },
};

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pt-BR' },
    { locale: 'it-IT' },
    { locale: 'es-ES' },
  ];
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
        
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div id="__next">
              <Layout>
              <Suspense fallback={<Loading />}>
                <div  className="flex-1">{children}</div>
              </Suspense>
            </Layout>
            </div>
            
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;

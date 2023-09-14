import type { Metadata } from 'next';

import Layout from '@/lib/components/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/utils';

import '@/lib/styles/globals.css';
import { Providers } from '@/services/ReactQuery/Providers.client';
import { Suspense } from 'react';
import Loading from './loading';

const APP_NAME = 'Deye ◌ Calculadora Solar';

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
    url: 'https://nextarter-tailwind.sznm.dev',
    title: APP_NAME,
    description:
      'Explore nossa calculadora de inversores híbridos e baterias. Dimensione sistemas de energia solar com precisão, maximize o uso da energia solar e alcance eficiência sustentável. Saiba mais agora!',
    images: {
      url: 'https://og-image.sznm.dev/**nextarter-tailwind**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      alt: 'nextarter-tailwind.sznm.dev og-image',
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Layout>
            <Suspense fallback={<Loading />}>
              <div className="flex-1">{children}</div>
            </Suspense>
            
          </Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

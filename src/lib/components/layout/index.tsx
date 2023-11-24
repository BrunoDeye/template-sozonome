'use client'
import { type ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

// import Footer from './Footer';
// import Header from './Header';
import dynamic from 'next/dynamic';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useDataStore } from '@/store/data';
import { motion , AnimatePresence, delay } from 'framer-motion';
const  Header = dynamic(() => import('./Header'))
const  Footer = dynamic(() => import('./Footer'), { ssr: false })
import {usePathname } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname()
  
  return (
    
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AnimatePresence mode='popLayout' initial={false} >
      <motion.div key={pathname} className="flex min-h-screen flex-col">
        <Header />
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-0 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80cc] to-[#ff8080] dark:from-[#80d5ff] dark:to-[#9089fc] dark:opacity-60 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

        <main className="wrapper">{children}</main>
        <Footer />
      </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Layout;

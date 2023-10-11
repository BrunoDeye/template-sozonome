'use client';
import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTheme } from 'next-themes';
import { startTransition, useEffect } from 'react';
import { useDataStore } from '@/store/data';
import { usePathname, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';

const Footer = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const router = useRouter();
  const locale = useLocale();
  const {
    state: { grid },
  } = useDataStore();
  const pathname = usePathname();

  useEffect(() => {
    setTheme(theme === 'system' ? systemTheme : (theme as any));
  }, []);

  useEffect(() => {
    if (
      pathname !== '/' &&
      pathname !== `/termos-de-uso` &&
      pathname !== `/grid` &&
      grid === ''
    ) {

      startTransition(() => {
        router.replace(`/`, { locale: locale });
      });
    }
  }, [pathname, grid]);

  return (
    <footer className="wrapper print-hidden mt-6 z-[9999]">
      <div className="flex flex-col justify-center gap-8">
        <div className="mx-auto flex flex-col gap-2 text-xs items-center justify-center">
          <div className="relative ">
            <Image
              className="absolute opacity-100 transition-all duration-700 ease-linear dark:opacity-0"
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeye}
            />
            <Image
              className="opacity-0 transition-all duration-700 ease-linear dark:opacity-100"
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeyeWhite}
            />
          </div>

          {new Date().getFullYear()}
        </div>
        <div className="flex items-center justify-center visible sm:invisible sm:hidden">
          <LocaleSwitcher /> 
          {/* <ChevronDown className='-ml-8 opacity-40 dark:opacity-50'/> */}
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;

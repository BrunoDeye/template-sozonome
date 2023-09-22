'use client';
import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useDataStore } from '@/store/data';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const router = useRouter();
  const {
    state: { place },
  } = useDataStore();
  const pathname = usePathname();

  useEffect(() => {
    setTheme(theme === 'system' ? systemTheme : (theme as any));
  }, []);

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/ambiente' && place === '') {
      router.prefetch('/');
      router.replace('/');
      router.refresh();
    }
  }, [pathname, place]);

  return (
    <footer className="wrapper mt-6">
      <div className="flex">
        <p className="flex flex-col items-center justify-center gap-2 text-xs">
          <div className="relative">
            <Image
              className="absolute duration-700 opacity-100 ease-linear transition-all dark:opacity-0"
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeye}
            />
            <Image
              className="opacity-0 duration-700 ease-linear transition-all dark:opacity-100"
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeyeWhite}
            />
          </div>

          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

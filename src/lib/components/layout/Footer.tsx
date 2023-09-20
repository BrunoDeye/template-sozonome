'use client';
import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const Footer = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  useEffect(() => {
    setTheme(theme === 'system' ? systemTheme : theme as any);
  }, []);
  return (
    <footer className="wrapper mt-6">
      <div className="flex">
        <p className="flex flex-col items-center justify-center gap-2 text-xs">
          {theme === 'light' ? (
            <Image
              className=""
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeye}
            />
          ) : (
            <Image
              className=""
              width={60}
              height={40}
              alt="Deye logo"
              src={logoDeyeWhite}
            />
          )}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

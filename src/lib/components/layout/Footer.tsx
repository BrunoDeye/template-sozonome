'use client';
import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="wrapper mt-6">
      <div className="flex">
        <p className="flex flex-col items-center justify-center gap-2 text-xs">
          {theme === 'light' || theme === undefined || theme === 'system' ? (
            <Image
              className=""
              width={40}
              height={20}
              alt="Deye logo"
              src={logoDeye}
              
            />
          ) : (
            <Image
              className=""
              width={40}
              height={20}
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

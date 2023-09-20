'use client';
import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTheme } from 'next-themes';

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className="grid gap-2.5">
      <div className="flex items-center justify-center gap-2">
        <Image
          className=""
          width={75}
          quality={100}
          height={20}
          alt="Deye logo"
          src={theme === 'dark' ? logoDeyeWhite : logoDeye}
        />
        {/* <iframe className='bg-transparent'  src="https://deyeinversoresbr-my.sharepoint.com/personal/joao_carvalho_deyeinversores_com_br/_layouts/15/embed.aspx?UniqueId=70ec94d1-c614-4e12-9de6-747a9fe6d46f" width="640" height="360"  title="5KW-SG3.png"></iframe> */}
        <h1 className="-mt-[0.35rem] bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
          calculadora
        </h1>
      </div>
      <p className="text-xs text-gray-500 dark:text-white md:text-sm">
        Maximize Seus Benefícios Solares com Confiança.
      </p>
    </div>
  );
};

export default Hero;

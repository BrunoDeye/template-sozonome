import Image from 'next/image';
import React from 'react';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';
import { useTranslations } from 'next-intl';

interface Props {
  children: React.ReactNode;
}

const DashBoardLayout = (props: Props) => {

  const t = useTranslations('Index')

  return (
    <div className="grid min-h-[60vh] w-[90vw] 2xl:w-[80vw] grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-center justify-center gap-20 sm:gap-0">
      <div className="min-h-[15vh] lg:col-span-1 2xl:col-span-2 space-y-3">
        <div className="mx-auto mt-10 flex items-center justify-center gap-2">
          <div className="relative">
            <Image
              className="absolute opacity-100 transition-all duration-700 ease-linear dark:opacity-0"
              width={75}
              quality={100}
              height={20}
              alt="Deye logo"
              src={logoDeye}
            />
            <Image
              className="opacity-0 transition-all duration-700 ease-linear dark:opacity-100"
              width={75}
              quality={100}
              height={20}
              alt="Deye logo"
              src={logoDeyeWhite}
            />
          </div>

          {/* <iframe className='bg-transparent'  src="https://deyeinversoresbr-my.sharepoint.com/personal/joao_carvalho_deyeinversores_com_br/_layouts/15/embed.aspx?UniqueId=70ec94d1-c614-4e12-9de6-747a9fe6d46f" width="640" height="360"  title="5KW-SG3.png"></iframe> */}
          <h1 className="-mt-[0.35rem] bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
            {t('title')}
          </h1>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-white md:text-sm">
          {t('subtitle')}
        </p>
      </div>
      <div className="flex mx-auto w-full gap-8 col-span-1 min-h-[60vh] flex-col items-center justify-center rounded-lg bg-white/40 py-10 px-5 sm:p-10 text-center shadow-lg backdrop-blur-3xl dark:bg-blue-200/10 dark:shadow-blue-400 sm:m-3 sm:w-[70vw] sm:mx-auto sm:px-20 lg:w-full">
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;

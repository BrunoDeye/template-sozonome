import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';
import logoDeyeWhite from '@/images/logoDeyeWhite.png';

type PropsType = {
  title: string; 
  subtitle: string;
}

const Hero = ({ title, subtitle }:PropsType) => {

  return (
    <div className="grid gap-2.5">
      <div className="flex items-center justify-center gap-2">
      <div className="relative">

        <Image
          className="absolute duration-700 opacity-100 ease-linear transition-all dark:opacity-0"
          width={75}
          quality={100}
          height={20}
          alt="Deye logo"
          src={logoDeye}
        />
        <Image
          className="opacity-0 duration-700 ease-linear transition-all dark:opacity-100"
          width={75}
          quality={100}
          height={20}
          alt="Deye logo"
          src={logoDeyeWhite}
        />
      </div>
        
        {/* <iframe className='bg-transparent'  src="https://deyeinversoresbr-my.sharepoint.com/personal/joao_carvalho_deyeinversores_com_br/_layouts/15/embed.aspx?UniqueId=70ec94d1-c614-4e12-9de6-747a9fe6d46f" width="640" height="360"  title="5KW-SG3.png"></iframe> */}
        <h1 className="-mt-[0.35rem] bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
          {title}
        </h1>
      </div>
      <p className="text-xs text-gray-500 dark:text-white md:text-sm">
      {subtitle}
      </p>
    </div>
  );
};

export default Hero;

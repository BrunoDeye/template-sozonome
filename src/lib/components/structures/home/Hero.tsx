import Image from 'next/image';
import logoDeye from '@/images/logoDeye.png';

const Hero = () => {
  return (
      <div className="grid gap-2.5">
        <div className="flex items-center justify-center gap-2">
          <Image
            className=""
            width={75}
            height={20}
            alt="Deye logo"
            src={logoDeye}
          />
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

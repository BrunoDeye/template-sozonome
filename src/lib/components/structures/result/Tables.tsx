'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/lib/components/ui/table';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import Image, { StaticImageData } from 'next/image';
import InversorImg from '@/images/SUN-6K-SG04LP3-US-LV.png';
import { mapImages } from '@/utils/constants';
import { useEffect, useState } from 'react';
import SUN8kBLUR from '@/images/inverters/SUN-8K-SG01LP1-EU-blur.png';
import { decimalToHoursMinutes } from '../../../../utils/functions';
import {
  LucideAlertCircle,
  LucideAlertTriangle,
  LucideInfo,
} from 'lucide-react';
import CoefDescription from './CoefDescription';
import { useTranslations } from 'next-intl';

const tableVariants = cva(
  'flex flex-wrap items-center justify-center px-2 py-2 sm:flex-nowrap',
  {
    variants: {
      variant: {
        default:
          'rounded-lg border-none bg-gradient-to-br from-gray-100 to-blue-200 font-semibold text-sky-600 shadow-xl hover:from-gray-200 hover:to-sky-400 hover:text-sky-700 dark:border-sky-500 dark:from-blue-600 dark:to-blue-400 dark:!text-white dark:shadow-lg dark:shadow-sky-700 dark:hover:from-blue-700 dark:hover:to-indigo-300 dark:hover:!text-sky-100',
        sky: 'rounded-lg border-none bg-gradient-to-br from-gray-100 to-sky-200 font-semibold text-sky-600 shadow-xl hover:from-gray-200 hover:to-sky-400 hover:text-sky-700 dark:border-sky-500 dark:from-sky-600 dark:to-sky-400 dark:!text-white dark:shadow-lg dark:shadow-sky-700 dark:hover:from-sky-700 dark:hover:to-blue-300 dark:hover:!text-sky-100',
        darkBlue:
          'rounded-lg border-none bg-gradient-to-br from-gray-100 to-blue-400 font-semibold text-blue-600 shadow-xl hover:from-gray-200 hover:to-blue-600 hover:!text-blue-800 hover:text-sky-700 dark:border-sky-500 dark:from-blue-800 dark:to-sky-600 dark:!text-white dark:shadow-lg dark:shadow-sky-700 dark:hover:from-blue-700 dark:hover:to-blue-300 dark:hover:!text-sky-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const inverters = [
  {
    model: 'SUN-8K-SG01LP1-US',
    nominalPower: 8000,
    quantity: 1,
  },
  {
    model: 'SUN-5K-SG01LP1-US',
    nominalPower: 5000,
    quantity: 2,
  },
];

const defaultData = [
  {
    attribute: 'Inversor',
    value: 'SUN-3K-SG01/03LP1-BR',
  },
  {
    attribute: 'Tipo',
    value: 'BR',
  },
  {
    attribute: 'Potência[W]',
    value: '8000',
  },
  {
    attribute: 'Quantidade',
    value: '2',
  },
];

type TableData = {
  attribute: string;
  value: string | number;
};

type TableProps = VariantProps<typeof tableVariants> & {
  data: TableData[];
  srcImg?: StaticImageData;
  coef?: boolean;
};

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function Tables({
  variant,
  data = defaultData,
  srcImg = mapImages('SUN-6K-SG01/04LP3-US'),
  coef = false,
}: TableProps) {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations('HVDescription');
  const tB = useTranslations('Batteries');
  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(coef);
  return (
    <div className="trasition-all -z-1 w-full sm:p-4">
      <div className={cn(tableVariants({ variant }))}>
        <div className="min-w-[210px] py-4">
          {isClient ? (
            <div className={`flex justify-between items-center `}>
              {coef ? (
                <TableCaption className="max-[330px]:-ml-4 print-hidden mb-2 flex flex-col items-start justify-start  gap-5 pb-3 pl-3 align-middle font-bold text-sky-600 dark:text-sky-100 sm:hidden sm:pl-5">
                  <div className="flex items-center">
                    <LucideAlertTriangle
                      className="ml-1 mr-2 inline"
                      height={18}
                      width={18}
                    />
                    <span className="whitespace-nowrap text-xs">{t('title')}</span>
                  </div>
                  {}{' '}
                  <div className=" flex flex-col gap-3">
                    <div className="mr-auto flex items-baseline">
                      <CoefDescription message="A Combiner Box é de uso opcional, servindo apenas para padronizar a interligação entre as baterias e evitar barramentos manuais." />
                      <span className="ml-2 text-xs whitespace-nowrap  leading-none">
                        Combiner Box
                      </span>
                    </div>
                    <div className="mr-auto flex items-baseline">
                      <CoefDescription message="Sendo opcional, deve-se ter apenas quando a comunicação entre inversores em paralelo for superior a 50 metros." />
                      <span className="ml-2 text-xs whitespace-nowrap leading-none">
                        Can Bridge
                      </span>
                    </div>
                    <div className="mr-auto flex items-baseline">
                      <CoefDescription message="Para uso de inversores e baterias HV, saiba que caso haja o paralelo entre os inversores, é obrigatório que a quantidade de baterias seja exatamente igual em cada inversor." />
                      <span className="ml-2 text-xs whitespace-nowrap  leading-none">
                        {t('parallelLabel')}
                      </span>
                    </div>
                    <div className="mr-auto flex items-baseline">
                      <CoefDescription message="O Gerenciador Unitário de Bateria (BMU) é um controlador de carga responsável por controlar o uso das baterias. Cada unidade de BMU é projetada para suportar até 12 baterias." />
                      <span className="ml-2 text-xs whitespace-nowrap  leading-none">
                        BMU
                      </span>
                    </div>
                  </div>
                </TableCaption>
              ) : null}
              <div className={`${coef ? "max-sm:scale-75 max-[300px]:-ml-[calc((-0.35*100vw)+152px)] max-sm:-ml-[calc((-0.3*100vw)+152px)]" : ""}`}>
                <Image
                  className={`${
                    loaded ? 'unblur' : ''
                  } clip-your-needful-style to- -z-1 mx-auto dark:[--shadow-inversor:#333132]`}
                  height={srcImg.height}
                  width={srcImg.width}
                  priority
                  placeholder="blur"
                  alt="Inversor/Bateria Deye"
                  src={srcImg}
                  onLoad={() => setLoaded(true)}
                />
              </div>
              
            </div>
          ) : null}
          {coef ? (
            <TableCaption className="print-hidden max-sm:hidden mb-2 mt-10 flex flex-col mx-auto items-start justify-start gap-5 align-middle font-bold text-sky-600 dark:text-sky-100  sm:pl-5">
              <div className="flex items-center">
                <LucideAlertTriangle
                  className="ml-1 mr-2 inline min-w-[18px]"
                  height={18}
                  width={18}
                />
                <span className="max-sm:text-xs whitespace-nowrap">{t('title')}</span>
              </div>
              {}{' '}
              <div className=" flex flex-col gap-3">
                <div className="mr-auto flex items-baseline">
                  <CoefDescription message={t('combinerBox')} />
                  <span className="ml-2 max-sm:text-xs whitespace-nowrap  leading-none">
                    Combiner Box
                  </span>
                </div>
                <div className="mr-auto flex items-baseline">
                  <CoefDescription message={t('canBridge')} />
                  <span className="ml-2 max-sm:text-xs whitespace-nowrap leading-none">
                    Can Bridge
                  </span>
                </div>
                <div className="mr-auto flex items-baseline">
                  <CoefDescription message={t('parallel')} />
                  <span className="ml-2 max-sm:text-xs whitespace-nowrap  leading-none">
                    {t('parallelLabel')}
                  </span>
                </div>
                <div className="mr-auto flex items-baseline">
                  <CoefDescription message={t('BMU')} />
                  <span className="ml-2 max-sm:text-xs whitespace-nowrap  leading-none">
                    BMU
                  </span>
                </div>
              </div>
            </TableCaption>
          ) : null}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-sky-300">
              <TableHead className="w-[100px] text-gray-600 dark:font-bold dark:text-sky-100">
                {data[0].attribute}
              </TableHead>

              <TableHead className="text-right text-gray-600 dark:text-sky-100">
                {data[0].value}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(1).map((attribute) => (
              <TableRow
                key={attribute.attribute}
                className={`border-gray-200 ${
                  attribute.attribute === tB('qntAtr')
                    ? 'group bg-sky-800 text-lg !font-extrabold text-white dark:bg-blue-950 dark:hover:bg-blue-900'
                    : ''
                } dark:border-sky-300`}
              >
                <TableCell
                  className={`${
                    attribute.attribute === tB('qntAtr')
                      ? 'rounded-bl-lg rounded-tl-sm text-lg font-extrabold group-hover:!text-sky-950 dark:group-hover:!text-gray-100 sm:rounded-bl-sm'
                      : 'font-medium'
                  }`}
                >
                  {attribute.attribute}
                </TableCell>

                <TableCell
                  className={`${
                    attribute.attribute === tB('qntAtr')
                      ? 'rounded-br-lg rounded-tr-sm group-hover:!text-sky-950 dark:group-hover:!text-gray-100 sm:rounded-br-2xl '
                      : ''
                  } text-right`}
                >
                  {attribute.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

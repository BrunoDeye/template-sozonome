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

  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(coef);
  return (
    <div className="trasition-all -z-1 w-full sm:p-4">
      <div className={cn(tableVariants({ variant }))}>
        <div className="min-w-[210px] py-4">
          {isClient ? (
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
          ) : null}
          {coef ? (
            <TableCaption className="mb-2 print-hidden max-sm:hidden sm:pl-5 mt-10  flex flex-col items-start justify-start gap-5 align-middle font-bold text-sky-600 dark:text-sky-100">
              <div className="flex items-center">
                <LucideAlertTriangle
                  className="ml-1 mr-2 inline min-w-[18px]"
                  height={18}
                  width={18}
                />
                <span className=" whitespace-nowrap">Informações extras:</span>
              </div>
              
              {}{' '}
              <div className=" flex flex-col gap-3">
              <div className="flex items-baseline mr-auto">
                  <CoefDescription message="(OPCIONAL) 1x para cada 4 racks de baterias, basicamente tem que ser feito um barramento, este equipamento apenas irá facilitar" />
                  <span className="ml-2 leading-none  whitespace-nowrap">Combiner Box</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="(OPCIONAL) Apenas quando a comunicação entre inversor-bateria e bateria-bateria for maior que 50m" />
                  <span className="ml-2 leading-none whitespace-nowrap">Can Bridge</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="Saiba que cada inversor que está conectado em paralelo deverá ter a mesma quantidade de baterias, exemplo 2 inversores de 50k, em cada inversor haverá 1 banco de baterias de 12 unidades" />
                  <span className="ml-2 leading-none  whitespace-nowrap">Paralelo</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="(ESSENCIAL) 1x para até 12 baterias" />
                  <span className="ml-2 leading-none  whitespace-nowrap">BMU</span>
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
                className="border-gray-200 dark:border-sky-300"
              >
                <TableCell className="font-medium">
                  {attribute.attribute}
                </TableCell>

                <TableCell className="text-right">{attribute.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {coef ? (
            <TableCaption className="mb-2 pl-3 pb-3 print-hidden sm:hidden sm:pl-5  flex flex-col items-start justify-start gap-5 align-middle font-bold text-sky-600 dark:text-sky-100">
              <div className="flex items-center">
                <LucideAlertTriangle
                  className="ml-1 mr-2 inline"
                  height={18}
                  width={18}
                />
                <span className="whitespace-nowrap">Informações extras:</span>
              </div>
              {}{' '}
              <div className=" flex flex-col gap-3">
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="A Combiner Box é de uso opcional, servindo apenas para padronizar a interligação entre as baterias e evitar barramentos manuais." />
                  <span className="ml-2 leading-none  whitespace-nowrap">Combiner Box</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="Sendo opcional, deve-se ter apenas quando a comunicação entre inversores em paralelo for superior a 50 metros." />
                  <span className="ml-2 leading-none whitespace-nowrap">Can Bridge</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="Para uso de inversores e baterias HV, saiba que caso haja o paralelo entre os inversores, é obrigatório que a quantidade de baterias seja exatamente igual em cada inversor." />
                  <span className="ml-2 leading-none  whitespace-nowrap">Paralelo</span>
                </div>
                <div className="flex items-baseline mr-auto">
                  <CoefDescription message="O Gerenciador Unitário de Bateria (BMU) é um controlador de carga responsável por controlar o uso das baterias. Cada unidade de BMU é projetada para suportar até 12 baterias." />
                  <span className="ml-2 leading-none  whitespace-nowrap">BMU</span>
                </div>
              </div>
            </TableCaption>
          ) : null}
        </Table>
      </div>
    </div>
  );
}

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
import SUN8kBLUR from '@/images/inverters/SUN-8K-SG01LP1-EU-blur.png'

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
};

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function Tables({
  variant,
  data = defaultData,
  srcImg = mapImages('SUN-6K-SG01/04LP3-US'),
}: TableProps) {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="trasition-all w-full sm:p-4">
      <div className={cn(tableVariants({ variant }))}>
        <div className="min-w-[210px] py-4">
          {isClient ? (
            <Image
              className={`${
                loaded ? 'unblur' : ''
              } clip-your-needful-style mx-auto dark:[--shadow-inversor:#333132]`}
              height={srcImg.height}
              width={srcImg.width}
              priority
              placeholder='blur'
              alt="Inversor/Bateria Deye"
              src={srcImg}
              onLoadingComplete={() => setLoaded(true)}
            />
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
        </Table>
      </div>
    </div>
  );
}

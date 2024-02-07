'use server';
import { server } from '@/url';
import { cookies, headers } from 'next/headers';
import React, { useEffect, useMemo } from 'react';
import CalcsTableColumnHeader from './(table)/CalcsHeaderTable';
import CalcsTable from './(table)/CalcsTable';
import { columns } from './(table)/columns';
import CalcsToggleTable from './(table)/CalcsToggleTable';
import RenderTable from './(table)/RenderTable';
import { getTranslations } from 'next-intl/server';
import prisma, { Calculation } from '@/app/client/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

type Props = {
  params: {
    locale?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getData = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const calculations = await prisma.calculation.findMany({
        where: {
          userId: session.user.id,
        },
      });

      return calculations;
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function CalculationsList({ params: { locale }, searchParams }: Props) {
  const Headers = headers();
  const t = await getTranslations({
    locale: locale || 'pt-BR',
    namespace: 'Calculations',
  });
  const result = await getData();
  const data =
    result !== null
      ? result
      : ([
          {
            id: 0,
            userId: 0,
            grid: 'string',
            devicesList: 'string',
            title: 'string',
            description: 'string',
            totalPower: 0,
            totalEnergy: 0,
            recommendedInverter: 'string',
            selectedBattery: 'string',
            rechargeTime: 10,
            inverterQty: 0,
            batteryQty: 0,
          },
        ] as Calculation[]);

  return (
    <div className="z-10  flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="z-10 m-3 flex flex-col items-center justify-center gap-8 rounded-lg  bg-white/40 p-10 pb-20 text-center shadow-lg backdrop-blur-3xl dark:bg-blue-200/10 dark:shadow-blue-400 max-[330px]:px-3  sm:px-20">
        <h2 className="z-10 bg-gradient-to-br  from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
          {t('title')}
        </h2>
        <div className="z-10 !max-w-[964px]">
          {<RenderTable headers={Headers} data={data} />}
        </div>
      </div>
    </div>
  );
}

export default CalculationsList;

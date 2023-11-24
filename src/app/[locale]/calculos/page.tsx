'use server';
import { server } from '@/url';
import { Calculation } from '@prisma/client';
import { cookies, headers } from 'next/headers';
import React, { useEffect, useMemo } from 'react';
import CalcsTableColumnHeader from './(table)/CalcsHeaderTable';
import CalcsTable from './(table)/CalcsTable';
import { columns } from './(table)/columns';
import CalcsToggleTable from './(table)/CalcsToggleTable';
import RenderTable from './(table)/RenderTable';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: {
    locale: string
  }
}

async function CalculationsList({params: {locale}}: Props) {
  const Headers = headers();
  const t = await getTranslations({locale, namespace: 'Calculations'});
  const result = (await fetch(server + '/api/calculations', {
    method: 'GET',
    headers: Headers,
  })
    .then((data) => data.json())
    .then((data) => data)) as Calculation[];

  return (
    <div className="z-10  flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="z-10 m-3 flex flex-col items-center justify-center gap-8 max-[330px]:px-3  rounded-lg bg-white/40 p-10 pb-20 text-center shadow-lg backdrop-blur-3xl dark:bg-blue-200/10 dark:shadow-blue-400  sm:px-20">
        <h2 className="z-10 bg-gradient-to-br  from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
          {t('title')}
        </h2>
        <div className="z-10 !max-w-[964px]">
          <RenderTable headers={Headers} data={result} />
        </div>
      </div>
    </div>
  );
}

export default CalculationsList;

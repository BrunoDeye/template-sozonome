'use client'
import { useDataStore } from '@/store/data';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

function PrintTotalPower() {
  const t = useTranslations('Devices');
  const {
    state: { totalEnergy, totalPower },
  } = useDataStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient ? (
      <div className="print-show invisible hidden mt-6">
        <hr className='mb-6 mt-0 !w-auto'/>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {totalPower}
          <span className="font-bold tracking-tight">
            {t('totalPower')}
          </span>
        </p>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {totalEnergy}
          <span className="font-bold tracking-tight">
            {' '}
            {t('totalConsumption')}
          </span>
        </p>
      </div>
    ) : null
  )
}

export default PrintTotalPower
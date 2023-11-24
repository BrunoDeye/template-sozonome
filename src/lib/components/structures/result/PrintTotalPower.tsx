'use client'
import { useDataStore } from '@/store/data';
import { Calculation } from '@prisma/client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'

function PrintTotalPower() {
  const t = useTranslations('Devices');
  const {
    state: { totalEnergy, totalPower },
  } = useDataStore();
  const [printData, setPrintData] = useState<Calculation | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const localPrintData = localStorage.getItem('my-print-calculation')
    if (localPrintData !== null){
      const parsedPrintData = JSON.parse(localPrintData) as Calculation;
      setPrintData(parsedPrintData)
    }
  }, [isClient])

  return (
    isClient ? (
      <div className="print-show invisible hidden mt-6">
        <hr className='mb-6 mt-0 !w-auto'/>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {printData ? printData.totalPower : totalPower}
          <span className="font-bold tracking-tight">
            {t('totalPower')}
          </span>
        </p>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {printData ? printData.totalEnergy : totalEnergy}
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
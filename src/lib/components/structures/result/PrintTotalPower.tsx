'use client'
import { useDataStore } from '@/store/data';
import React, { useEffect, useState } from 'react'

function PrintTotalPower() {

  const {
    state: { totalEnergy, totalPower },
  } = useDataStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient ? (
      <div className="print-show invisible hidden -mb-4">
        <hr className='mb-6 mt-0 !w-auto'/>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {totalPower}
          <span className="font-bold tracking-tight">
            Potência Total [W]
          </span>
        </p>
        <p className="flex justify-between gap-4 text-2xl font-thin dark:text-white max-[317px]:text-xl">
          {totalEnergy}
          <span className="font-bold tracking-tight">
            {' '}
            Consumo Total [Wh]
          </span>
        </p>
      </div>
    ) : null
  )
}

export default PrintTotalPower
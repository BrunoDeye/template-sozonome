'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/components/ui/tooltip';
import { useDataStore } from '@/store/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DisplayTotal = () => {
  const {
    state: { totalPower, totalEnergy },
  } = useDataStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="leading-2 mx-auto flex items-start justify-between gap-2 sm:mx-auto sm:w-[400px]">
      <div>
        <h6 className="text-[14px] font-thin">TOTAL:</h6>
      </div>
      <div>
        <p className="text-md flex justify-between gap-4 font-thin dark:text-white max-[317px]:text-[12px]">
          {isClient ? totalPower : null}
          <span className="font-bold tracking-tight">Potência Total [W]</span>
        </p>
        <p className="text-md flex justify-between gap-4 font-thin dark:text-white max-[317px]:text-[12px]">
          {isClient ? totalEnergy : null}
          <span className="font-bold tracking-tight"> Consumo Total [Wh]</span>
        </p>
      </div>
    </div>
  );
};

export default DisplayTotal;

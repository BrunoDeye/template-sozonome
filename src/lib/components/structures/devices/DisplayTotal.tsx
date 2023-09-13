'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/components/ui/tooltip';
import { useDataStore } from '@/store/data';
import Link from 'next/link';

const DisplayTotal = () => {
  const {
    state: { totalPower, totalEnergy },
  } = useDataStore();

  return (
    <div className="leading-2 flex justify-between gap-2 items-start mx-auto">
      <div>
        <h6 className='font-thin text-[10px] md:text-[14px]'>TOTAL:</h6>
      </div>
      <div>
        <p className="flex font-thin justify-between gap-4 text-[11px] sm:text-sm dark:text-white">
        {totalPower}
        <span className="font-bold tracking-tight">Potência Total [W]</span>
      </p>
      <p className="flex font-thin justify-between gap-4 text-[11px] sm:text-sm dark:text-white">
        {totalEnergy}
        <span className="font-bold tracking-tight"> Consumo Total [Wh]</span>
      </p>
      </div>
      
    </div>
  );
};

export default DisplayTotal;

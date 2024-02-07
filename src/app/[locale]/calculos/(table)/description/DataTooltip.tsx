'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { Calculation } from '@/app/client/prisma';
import { ChevronDown, Info, InfoIcon, LucideInfo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Tables from '@/lib/components/structures/result/Tables';
import { InfoCircledIcon } from '@radix-ui/react-icons';

type Props = {
  data: Calculation;
};

const DataTooltip = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const info = Object.entries(data).map(([key, value]) => ({
    attribute: key,
    value: value as any,
  }));
  const t = useTranslations("mobileTable")

  const info2 = [
    { attribute: t('description'), value: data.description },
    { attribute: t('inverter'), value: data.recommendedInverter },
    { attribute: t('battery'), value: data.selectedBattery },
    { attribute: t('power'), value: data.totalPower },
    { attribute: t('consumption'), value: data.totalEnergy },
    { attribute: "Nº Baterias", value: data.batteryQty },
    { attribute: "Nº Inversores", value: data.inverterQty },
  ];

  return isClient ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="print-hidden w-full  z-50 rounded p-3 pr-6 max-[330px]:min-w-[80px] min-w-[200px] hover:bg-slate-200 active:!bg-slate-200 dark:hover:text-black dark:active:text-black dark:hover:bg-blue-200 dark:active:!bg-blue-200"
      >
        <div className="z-50 flex w-full justify-between items-center gap-2 truncate">
          <div>{data?.title}</div> <div><ChevronDown height={16} width={16} /></div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        side="bottom"
        className="z-50 max-h-[250px] w-[280px] overflow-hidden overflow-y-scroll whitespace-normal bg-gray-50 p-3 text-justify shadow-inner shadow-slate-300 dark:bg-black dark:shadow-blue-400  sm:w-80 "
      >
        <h6 className="text-center text-base">{t("tooltipTitle")} {data.title}</h6>
        {/* <InfoCard info={info}/> */}
        <div className="z-50 flex flex-col gap-5 py-5">
          {info2.map((item) => (
            <div
              className="z-50 flex w-[250px] min-w-[250px] max-w-[250px] items-center justify-between gap-10 rounded-lg border bg-gradient-to-br from-gray-200 to-blue-700 p-3 dark:from-blue-600 dark:to-blue-400"
              key={`${item.attribute}-${item.value}`}
            >
              <div className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:text-sky-100 dark:drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)] ">
                {item.attribute}
              </div>
              <div className="text-right text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:text-sky-100 dark:drop-shadow-[0_1.2px_1.2px_rgba(100,100,100,0.8)] ">
                {' '}
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default DataTooltip;

'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { useGetBatteries } from '@/services/ReactQueryHooks/useGetBatteries';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import { useTranslations } from 'next-intl';

type SelectBatteryProps = {
  selectedBattery: string | undefined;
  setSelectedBattery: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function SelectBattery({
  selectedBattery,
  setSelectedBattery,
}: SelectBatteryProps) {
  const t = useTranslations('SelectBattery');
  const { data: batteriesData, isLoading: batteriesDataIsLoading } =
    useGetBatteries();

  const {
    state: { grid, totalPower, place },
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);
  // console.log(invertersList);
  // console.log(batteriesData);
  // console.log(selectedBattery);
  const handleClick = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="p-0 sm:p-4 print-hidden">
      <Select onValueChange={setSelectedBattery} defaultValue={selectedBattery}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('placeholder')} />
        </SelectTrigger>
        <SelectContent onTouchStart={handleClick}>
          <SelectGroup>
            <SelectLabel>{t('label')}</SelectLabel>
            {batteriesDataIsLoading || isLoading || !invertersList ? (
              <LoadingDeye />
            ) : (
              batteriesData
                ?.filter(
                  (battery) =>
                    (battery.model.includes('BOS') &&
                      invertersList![0]
                        .model.includes('HP')) ||
                    (!battery.model.includes('BOS') &&
                      invertersList![0]
                        .model.includes('LP'))
                )
                .map((batteryData) => (
                  <SelectItem
                    className="w-full z-50"
                    key={batteryData.model}
                    value={batteryData.model}
                  >
                    {batteryData.model}
                  </SelectItem>
                ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

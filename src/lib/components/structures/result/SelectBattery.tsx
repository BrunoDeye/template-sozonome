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

type SelectBatteryProps = {
  selectedBattery: string | undefined;
  setSelectedBattery: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export function SelectBattery({
  selectedBattery,
  setSelectedBattery,
}: SelectBatteryProps) {
  const { data: batteriesData, isLoading: batteriesDataIsLoading } =
    useGetBatteries();

  // console.log(batteriesData);
  // console.log(selectedBattery)
  return (
    <div className="p-0 sm:p-4">
      <Select onValueChange={setSelectedBattery} defaultValue={selectedBattery}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione Uma Bateria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Baterias</SelectLabel>
            {batteriesDataIsLoading ? (
              <span>loading</span>
            ) : (
              batteriesData?.map((batteryData) => (
                <SelectItem key={batteryData.model} value={batteryData.model}>
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

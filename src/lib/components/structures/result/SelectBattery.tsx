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

  const {
    state: { grid, totalPower, place },
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);
  console.log(invertersList);
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
            {batteriesDataIsLoading || isLoading || !invertersList ? (
              <span>Carregando...</span>
            ) : (
              batteriesData
                ?.filter(
                  (battery) =>
                    (battery.model.includes('BOS') &&
                      invertersList!
                        .filter((inverter) =>
                          place === 'Indústria'
                            ? inverter.model.includes('HP')
                            : inverter.model.includes('LP')
                        )[0]
                        .model.includes('HP')) ||
                    (!battery.model.includes('BOS') &&
                      invertersList!
                        .filter((inverter) =>
                          place === 'Indústria'
                            ? inverter.model.includes('HP')
                            : inverter.model.includes('LP')
                        )[0]
                        .model.includes('LP'))
                )
                .map((batteryData) => (
                  <SelectItem
                    className="w-full"
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

'use client';
import React, { useEffect, useState } from 'react';
import SelectBattery from './SelectBattery';
import { useCalculateBatteriesMutation } from '@/services/ReactQueryHooks/useCalculateBatteriesMutation';
import { useDataStore } from '@/store/data';
import LoadingDeye from '../../Loading';
import Tables from './Tables';
import { ImageModelName, mapImages } from '@/utils/constants';
import { formatBattery } from '@/utils/functions';

function Batteries() {
  const [selectedBattery, setSelectedBattery] = useState<string | undefined>(
    undefined
  );
  const [battery, setBattery] = useState({
    modelFullName: '\u00A0',
    nominalVoltage: '\u00A0',
    nominalEnergy: 0,
    dod: '\u00A0',
    lifespan: '\u00A0',
    quantity: '\u00A0',
  });

  const calculateBatteriesMutation = useCalculateBatteriesMutation();

  const {
    state: { FC, totalEnergy, systemType },
  } = useDataStore();

  useEffect(() => {
    if (selectedBattery) {
      const requestData = {
        model: selectedBattery as string,
        tEnergy: totalEnergy || 1,
        fc: FC <= 100 ? FC / 100 : 0.94,
      };
      // console.log(requestData);
      calculateBatteriesMutation.mutate(requestData, {
        onSuccess: (data) => {
          setBattery(data);
          // console.log(data);
        },
        onError: (error, variables, context) => {
          console.log(error);
        },
      });
    }
  }, [selectedBattery]);

  return (
    <>
      <h4 className="margin-print-fixer text-center text-xl font-bold tracking-tight sm:text-2xl">
        Baterias
      </h4>
      <SelectBattery
        selectedBattery={selectedBattery}
        setSelectedBattery={setSelectedBattery}
      />
      {calculateBatteriesMutation.isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : selectedBattery ? (
        <Tables
          srcImg={mapImages(battery.modelFullName as ImageModelName)}
          data={formatBattery(battery)}
        />
      ) : (
        <div className="h-[100px]">{'\u00A0'}</div>
      )}
    </>
  );
}

export default Batteries;

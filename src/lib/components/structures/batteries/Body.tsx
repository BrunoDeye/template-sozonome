'use client';
import React, { useEffect, useState } from 'react';
import SelectBattery from '@/lib/components/structures/batteries/SelectBattery';
import { useCalculateBatteriesMutation } from '@/services/ReactQueryHooks/useCalculateBatteriesMutation';
import { useDataStore } from '@/store/data';
import LoadingDeye from '../../Loading';
import Tables from '@/lib/components/structures/result/Tables';
import { ImageModelName, mapImages } from '@/utils/constants';
import { formatBattery } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import Title from './Title';
import { Button } from '../../ui/button';

function Batteries() {
  const t = useTranslations('Batteries');
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
          setBattery(data.quantity);
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
      <Title />
      <SelectBattery
        selectedBattery={selectedBattery}
        setSelectedBattery={setSelectedBattery}
      />
      {/* {calculateBatteriesMutation.isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : selectedBattery ? (
        <Tables
          srcImg={mapImages(battery.modelFullName as ImageModelName)}
          data={formatBattery(
            battery,
            t('batteryAtr'),
            t('dodLifespanAtr'),
            t('energyAtr'),
            t('availEnergyAtr'),
            t('ciclesAtr'),
            t('modelAtr'),
            t('qntAtr'),
            t('yearsUnit', { count: battery.lifespan })
          )}
        />
      ) : (
        <div className="h-[100px]">{'\u00A0'}</div>
      )} */}
      {/* <div className="mt-auto space-y-6">
        <div className="text-center">
          <Button disabled={battery.modelFullName === '\u00A0'} variant="gradientSky">Resultado</Button>
        </div>
      </div> */}
    </>
  );
}

export default Batteries;

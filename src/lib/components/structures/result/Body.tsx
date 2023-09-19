'use client';
import { formatBattery } from '@/utils/functions';
import FadeIn from '../../animations/FadeIn';
import { SelectBattery } from './SelectBattery';
import Tables from './Tables';
import Title from './Title';
import InvertersList from './InvertersList';
import { useEffect, useState } from 'react';
import { useCalculateBatteriesMutation } from '@/services/ReactQueryHooks/useCalculateBatteriesMutation';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import RecalculateButton from './RecalculateButton';
import BatteryImg from '@/images/RW-M5.3.png';
import BatteryImg2 from '@/images/BOS-G.png';
import { ImageModelName, mapImages } from '@/utils/constants';
import PrintButton from './PrintButton';

export default function Body() {
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
  const {
    state: { FC, totalEnergy, grid, totalPower },
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);

  const calculateBatteriesMutation = useCalculateBatteriesMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <FadeIn className="w-full" yMinus>
        <Title />
      </FadeIn>
      <div className="space-y-6">
        <FadeIn className="w-full space-y-6" yMinus>
          <InvertersList />
          <div className='invisible hidden h-[38vh] print-show'></div>
          <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
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
          ) : battery.modelFullName !== '\u00A0' ? (
            <Tables
              srcImg={mapImages(battery.modelFullName as ImageModelName)}
              data={formatBattery(battery)}
            />
          ) : (
            <div className="h-[100px]">{'\u00A0'}</div>
          )}
          <div className="text-center">
            <PrintButton />
          </div>
          <div className="text-center">
            <RecalculateButton />
          </div>
        </FadeIn>
      </div>
    </>
  );
}

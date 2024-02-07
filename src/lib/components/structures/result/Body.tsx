'use client';
import dynamic from 'next/dynamic';
import { formatBattery } from '@/utils/functions';
import { ImageModelName, mapImages } from '@/utils/constants';
import { useEffect, useRef, useState } from 'react';
import { useCalculateBatteriesMutation } from '@/services/ReactQueryHooks/useCalculateBatteriesMutation';
import { useDataStore } from '@/store/data';
// import FadeIn from '../../animations/FadeIn';
// import { SelectBattery } from './SelectBattery';
// import Tables from './Tables';
// import Title from './Title';
// import InvertersList from './InvertersList';
// import RecalculateButton from './RecalculateButton';
// import PrintButton from './PrintButton';

import LoadingDeye from '../../Loading';
import AllInOnesList from './AllInOnesList';
import DisplayTotal from '../devices/DisplayTotal';
import { Separator } from '../../ui/separator';
import { Calculation } from '@/app/client/prisma';
import InvertersList from './InvertersList';

const FadeIn = dynamic(() => import('@/lib/components/animations/FadeIn'));
const SelectBattery = dynamic(() => import('./SelectBattery'));
const Tables = dynamic(() => import('./Tables'));
const Title = dynamic(() => import('./Title'));
const RecalculateButton = dynamic(() => import('./RecalculateButton'));
const PrintButton = dynamic(() => import('./PrintButton'));
const Batteries = dynamic(() => import('./Batteries'));

export default function Body() {
  const [selectedBattery, setSelectedBattery] = useState<string | undefined>(
    undefined
  );

  const [selectedCoef, setSelectedCoef] = useState(``);
  const [printData, setPrintData] = useState<Calculation | null>(null);
  const [battery, setBattery] = useState({
    modelFullName: '\u00A0',
    nominalVoltage: '\u00A0',
    nominalEnergy: 0,
    dod: '\u00A0',
    lifespan: '\u00A0',
    quantity: '\u00A0',
  });
  const {
    actions: {
      addGrid,
      addFC,
      addTotalEnergy,
      addTotalPower,
      addInverterQty,
      addBatteryQty,
      addBatteryModel,
      addRechargeTime
    },
    state: { FC, totalEnergy, totalPower, systemType },
  } = useDataStore();

  const calculateBatteriesMutation = useCalculateBatteriesMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isClient, setIsClient] = useState(false);
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
  }, [selectedBattery, isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const localPrintData = localStorage.getItem('my-print-calculation');
    if (localPrintData !== null) {
      const parsedPrintData = JSON.parse(localPrintData) as Calculation;
      addGrid(parsedPrintData.grid);
      addTotalEnergy(parsedPrintData.totalEnergy);
      addTotalPower(parsedPrintData.totalPower);
      addBatteryModel(parsedPrintData.selectedBattery)
      addRechargeTime(parsedPrintData.rechargeTime as number)

      // setSavedDevicesList((JSON.parse(parsedPrintData.devicesList)))

      setPrintData(parsedPrintData);
    }
  }, [isClient]);

  return (
    <>
      <FadeIn className="w-full" yMinus>
        <Title />
      </FadeIn>

      <div className="space-y-6">
        <FadeIn className="w-full space-y-6" yMinus>
          {systemType === 'AllInOne' ? (
            <AllInOnesList />
          ) : (
            <InvertersList
              selectedCoef={selectedCoef}
              setSelectedCoef={setSelectedCoef}
              printData={printData}
            />
          )}
          <div
            className={`${
              systemType !== 'AllInOne' ? 'print-show' : ''
            } invisible hidden`}
          ></div>

          {<Batteries selectedCoef={selectedCoef} printData={printData} />}
        </FadeIn>
      </div>
    </>
  );
}

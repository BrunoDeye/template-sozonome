'use client';
import React, { useEffect, useState } from 'react';
import SelectBattery from './SelectBattery';
import { useCalculateBatteriesMutation } from '@/services/ReactQueryHooks/useCalculateBatteriesMutation';
import { useDataStore } from '@/store/data';
import LoadingDeye from '../../Loading';
import Tables from './Tables';
import { ImageModelName, mapImages } from '@/utils/constants';
import {
  batteryModelLimit,
  calculateAdjustedBatteries,
  formatBattery,
  isBatteryModelUnderLimit,
} from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import { Calculation } from '@/app/client/prisma';
import Danger from './Danger';

type Props = {
  printData: Calculation | null;
  selectedCoef: string;
};

function Batteries({ printData, selectedCoef }: Props) {
  const t = useTranslations('Batteries');
  const [selectedBattery, setSelectedBattery] = useState<string | undefined>(
    undefined
  );
  const [coefValue, setCoefValue] = useState(1);
  const [originalCoef, setOriginalCoef] = useState(1);
  const [defaultCoef, setDefaultCoef] = useState(1);
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
    state: {
      FC,
      totalEnergy,
      grid,
      totalPower,
      batteryModel,
      batteryQty,
      inverterQty,
      recommendedInverter,
      inverterQtyToSave,
      batteryQtyToSave,
    },
    actions: { addBatteryQty, addBatteryQtyToSave, addRechargeTime },
  } = useDataStore();

  const requestData = {
    gridVoltage: printData
      ? printData.grid
      : grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: printData ? printData.totalPower : totalPower || 1,
    batteryModel: printData ? printData.selectedBattery : batteryModel,
    batteryQty: printData ? printData.batteryQty : batteryQty,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);
  useEffect(() => {
    if (batteryModel) {
      const requestData = {
        model: printData ? printData.selectedBattery : (batteryModel as string),
        tEnergy: printData ? printData.totalEnergy : totalEnergy || 1,
        fc: FC <= 100 ? FC / 100 : 0.94,
        // coef: coefValue,
      };
      console.log(requestData)
      // console.log(requestData);
      calculateBatteriesMutation.mutate(requestData, {
        onSuccess: (data) => {
          console.log("[teste]", data)
          addBatteryQty(data.quantity);
          setBattery(data);
          // console.log(data);
        },
        onError: (error, variables, context) => {
          console.log(error);
        },
      });
    }
  }, [coefValue, printData]);

  useEffect(() => {
    if (
      recommendedInverter &&
      invertersList &&
      batteryModel &&
      selectedCoef &&
      inverterQtyToSave
    ) {
      const tempDefaultCoef = invertersList!.filter((inverter) =>
        invertersList![0].model.includes('HP')
          ? inverter.model.includes('HP')
          : inverter.model.includes('LP')
      )[0].adjustedCoef;
      const tempOriginalCoef = invertersList!.filter((inverter) =>
        invertersList![0].model.includes('HP')
          ? inverter.model.includes('HP')
          : inverter.model.includes('LP')
      )[0].coef;

      setDefaultCoef(tempDefaultCoef);
      setOriginalCoef(tempOriginalCoef);
      const batteryQtyToSave = recommendedInverter.includes('HP')
        ? calculateAdjustedBatteries(
            inverterQtyToSave,
            (tempOriginalCoef < 1
              ? Math.ceil(batteryQty / tempOriginalCoef) < 4
                ? 4
                : Math.ceil(batteryQty / tempOriginalCoef)
              : batteryQty < 4
              ? 4
              : batteryQty) as number
          )
        : ((tempOriginalCoef < 1
            ? Math.ceil(batteryQty / tempOriginalCoef)
            : batteryQty) as number);
      addBatteryQtyToSave(batteryQtyToSave);
      console.log(tempOriginalCoef)
    }
  }, [recommendedInverter, invertersList, batteryModel, inverterQtyToSave, selectedCoef]);

  useEffect(() => {
    if (+selectedCoef !== 0) {
      addRechargeTime(+selectedCoef);
    }
  }, [selectedCoef]);

  return (
    <>
      <h4 className="margin-print-fixer text-center text-xl font-bold tracking-tight sm:text-2xl">
        {t('title')}
      </h4>
      {calculateBatteriesMutation.isLoading || isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : batteryModel && invertersList ? (
        <>
          <Tables
            coef={battery.modelFullName.includes('BOS') ? true : false}
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
              t('yearsUnit', { count: battery.lifespan }),
              originalCoef /** Tempo de Carregamento nao ajustado **/,
              defaultCoef /** Tempo de Carregamento nao ajustado **/ >=
                +selectedCoef
                ? Math.ceil(
                    (defaultCoef /** Tempo de Carregamento nao ajustado **/ *
                      inverterQty) /
                      +selectedCoef
                  )
                : inverterQty,
                printData
            )}
          />
          {isBatteryModelUnderLimit(
            batteryModel as any,
            +battery.quantity,
            invertersList![0].model.includes('HP')
              ? defaultCoef /** Tempo de Carregamento nao ajustado **/ >=
                +selectedCoef
                ? Math.ceil(
                    (defaultCoef /** Tempo de Carregamento nao ajustado **/ *
                      inverterQty) /
                      +selectedCoef
                  )
                : inverterQty
              : undefined
          ) ? null : (
            <div className="sm:mx-4">
              <Danger
                message={
                  t.rich('dangerBattery', {
                    batteryModel: batteryModel,
                    batteryModelLimit: batteryModelLimit(
                      batteryModel as any,
                      invertersList![0].model.includes('HP')
                        ? defaultCoef /** Tempo de Carregamento nao ajustado **/ >=
                          +selectedCoef
                          ? Math.ceil(
                              (defaultCoef /** Tempo de Carregamento nao ajustado **/ *
                                inverterQty) /
                                +selectedCoef
                            )
                          : inverterQty
                        : undefined
                    ),
                    span: (chunks) => (
                      <span className="mx-1 whitespace-nowrap rounded-lg bg-red-950  px-2 leading-6 text-gray-100">
                        {chunks}
                      </span>
                    ),
                  }) as string
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className="h-[100px]">{'\u00A0'}</div>
      )}
    </>
  );
}

export default Batteries;

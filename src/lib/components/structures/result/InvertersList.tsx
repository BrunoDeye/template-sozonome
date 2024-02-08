'use client';
import {
  decimalToHoursMinutes,
  formatInverter,
  inverterGridLimit,
  isInverterGridUnderLimit,
} from '@/utils/functions';
import Tables from './Tables';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import { useEffect, useState } from 'react';
import { ImageModelName, mapImages } from '@/utils/constants';
import { useTranslations } from 'next-intl';
import YourGrid from './YourGrid';
import { Alert, AlertDescription, AlertTitle } from '@/lib/components/ui/alert';
import { Terminal } from 'lucide-react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import CoefDescription from './CoefDescription';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Calculation } from '@/app/client/prisma';
import Warning from './Warning';
import Danger from './Danger';
import { usePathname } from '@/navigation';

export const inverters = [
  {
    model: 'SUN-8K-SG01LP1-US',
    nominalPower: 8000,
    quantity: 1,
  },
  {
    model: 'SUN-5K-SG01LP1-US',
    nominalPower: 5000,
    quantity: 2,
  },
];

type Props = {
  printData: Calculation | null;
  selectedCoef: string;
  setSelectedCoef: React.Dispatch<React.SetStateAction<string>>;
};

export default function InvertersList({
  printData,
  selectedCoef,
  setSelectedCoef,
}: Props) {
  const t = useTranslations('Inverters');
  const [
    grid,
    totalPower,
    totalEnergy,
    batteryModel,
    batteryQty,
    inverterQty,
    addRecommendedInverter,
    addInverterQty,
    addInverterQtyToSave,
    rechargeTime
  ] = useDataStore((state) => [
    state.state.grid,
    state.state.totalPower,
    state.state.totalEnergy,
    state.state.batteryModel,
    state.state.batteryQty,
    state.state.inverterQty,
    state.actions.addRecommendedInverter,
    state.actions.addInverterQty,
    state.actions.addInverterQtyToSave,
    state.state.rechargeTime
  ]);

  const [minCoef, setMinCoef] = useState(0);

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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (invertersList?.length !== 0 && invertersList !== undefined) {
      const recommendedInverter = invertersList!.filter((inverter) =>
        invertersList![0].model.includes('HP')
          ? inverter.model.includes('HP')
          : inverter.model.includes('LP')
      )[0];
      console.log(recommendedInverter);

      addRecommendedInverter(recommendedInverter.model);
      addInverterQty(recommendedInverter.quantity);
    }
  }, [invertersList, inverterQty]);
  useEffect(() => {
    if (invertersList) {
      if (invertersList.length !== 0) {
        const tempMinCoef = invertersList!.filter((inverter) =>
          invertersList![0].model.includes('HP')
            ? inverter.model.includes('HP')
            : inverter.model.includes('LP')
        )[0].adjustedCoef;

        const filteredArray = Array.from(new Set([1, 2, 4, 6, 8, 10])).filter(
          (value, index, array) => {
            if (
              !isInverterGridUnderLimit(
                grid as any,
                Math.ceil((tempMinCoef * inverterQty) / value)
              )
            )
              return false;

            return true; // Include value if it has a unique result
          }
        );

        setMinCoef(tempMinCoef);
        setSelectedCoef(
          printData ? `${rechargeTime}` : `${Math.max(
            ...new Set(
              filteredArray.length === 0 ? [tempMinCoef] : filteredArray
            )
          )}`
        );
      }
    }
  }, [invertersList, inverterQty, rechargeTime]);

  useEffect(() => {
    if (invertersList) {
      if (invertersList.length !== 0) {
        const inverterQtyToSave =
          minCoef >= +selectedCoef
            ? Math.ceil((minCoef * inverterQty) / +selectedCoef)
            : inverterQty;

        addInverterQtyToSave(inverterQtyToSave);
      }
    }
  }, [inverterQty, minCoef, selectedCoef]);

  // console.log(minCoef + "aqui");
  // console.log(selectedCoef+ "selecionado");
  return isError ? (
    <span className="mx-auto flex w-full flex-col text-center">
      {t('errorMsg')}
    </span>
  ) : (
    <div className="flex flex-col gap-6">
      <p className="print-show -mt-6 hidden px-4 text-center text-lg">
        {t('coefMessage', { selectedCoef })}
      </p>
      <div>
        <h4 className="margin-print-fixer text-center text-xl font-bold tracking-tight sm:text-2xl">
          {t('recommendationTitle')}
        </h4>

        {isClient ? <YourGrid /> : null}
      </div>

      {isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : (
        <>
          <Tables
            variant="sky"
            data={formatInverter(
              invertersList!.filter((inverter) =>
                invertersList![0].model.includes('HP')
                  ? inverter.model.includes('HP')
                  : inverter.model.includes('LP')
              )[0],
              t('inverterAtr'),
              t('typeAtr'),
              t('powerAtr'),
              t('qntAtr'),
              minCoef,
              +selectedCoef
            )}
            srcImg={mapImages(
              invertersList!.filter((inverter) =>
                invertersList![0].model.includes('HP')
                  ? inverter.model.includes('HP')
                  : inverter.model.includes('LP')
              )[0].model as ImageModelName
            )}
          />

          <div className="sm:px-4">
            {[Math.ceil(minCoef), 1, 2, 4, 6, 8, 10].filter(
              (value, index, array) => {
                if (
                  !isInverterGridUnderLimit(
                    grid as any,
                    Math.ceil((minCoef * inverterQty) / value)
                  )
                )
                  return false;
                return true; // Include value if it has a unique result
              }
            ).length === 0 ? (
              <Danger
                hasButton
                message={
                  t.rich('AlertInverter', {
                    inverterModel: invertersList!.filter((inverter) =>
                      invertersList![0].model.includes('HP')
                        ? inverter.model.includes('HP')
                        : inverter.model.includes('LP')
                    )[0].model,
                    inverterModelLimit: inverterGridLimit(grid as any),
                    span: (chunks) => (
                      <span className="mx-1 whitespace-nowrap rounded-lg bg-red-950  px-2 leading-6 text-gray-100">
                        {chunks}
                      </span>
                    ),
                  }) as string
                }
              />
            ) : (
              <Warning>
                {/* {decimalToHoursMinutes(
                          invertersList!.filter((inverter) =>
                            invertersList![0].model.includes('HP')
                              ? inverter.model.includes('HP')
                              : inverter.model.includes('LP')
                          )[0].adjustedCoef,
                          t('h'),
                          t('hs'),
                          t('min'),
                          t('mins'),
                          t('and')
                        )} */}
                <Select
                  onValueChange={setSelectedCoef}
                  defaultValue={`${Math.max(
                    ...new Set(
                      [Math.ceil(minCoef), 1, 2, 4, 6, 8, 10].filter(
                        (value, index, array) => {
                          if (
                            !isInverterGridUnderLimit(
                              grid as any,
                              Math.ceil((minCoef * inverterQty) / value)
                            )
                          )
                            return false;
                          return true; // Include value if it has a unique result
                        }
                      )
                    )
                  )}`}
                  value={selectedCoef}
                >
                  <SelectTrigger className="mt-2 h-full w-[100px] border-none bg-amber-300 shadow-inner shadow-yellow-600 backdrop-blur-md dark:bg-amber-200 dark:shadow-yellow-700">
                    <SelectValue
                      // defaultValue={`${Math.ceil(minCoef)}`}
                      placeholder={Math.max(
                        ...new Set(
                          [Math.ceil(minCoef), 1, 2, 4, 6, 8, 10].filter(
                            (value, index, array) => {
                              if (
                                !isInverterGridUnderLimit(
                                  grid as any,
                                  Math.ceil((minCoef * inverterQty) / value)
                                )
                              )
                                return false;
                              return true; // Include value if it has a unique result
                            }
                          )
                        )
                      )}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {[...new Set([Math.ceil(minCoef), 1, 2, 4, 6, 8, 10])]
                      .sort((a, b) => a - b)
                      .filter((value, index, array) => {
                        if (
                          !isInverterGridUnderLimit(
                            grid as any,
                            Math.ceil((minCoef * inverterQty) / value)
                          )
                        )
                          return false;

                        return true; // Include value if it has a unique result
                      })
                      .map((value, i, array) => {
                        if (value === Math.min(...array)) {
                          return (
                            <SelectItem
                              key={`${value}-horas`}
                              defaultChecked
                              value={`${value}`}
                            >
                              {`${value}${value === 1 ? t('h') : t('hs')}`}
                            </SelectItem>
                          );
                        }

                        // if (
                        //   Math.ceil((minCoef * inverterQty) / value) ===
                        //     inverterQty &&
                        //   value !== minCoef
                        // )
                        //   return;

                        // if ((minCoef * inverterQty) / value < 1) return;
                        return (
                          <SelectItem key={`${value}-horas`} value={`${value}`}>
                            {`${value}${value === 1 ? t('h') : t('hs')}`}
                          </SelectItem>
                        );
                      })
                      .sort()}
                  </SelectContent>
                </Select>
              </Warning>
            )}
          </div>
        </>
      )}

      {isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : invertersList!.filter((inverter) =>
          invertersList![0].model.includes('HP')
            ? inverter.model.includes('HP')
            : inverter.model.includes('LP')
        ).length === 1 ? null : (
        <div className="print-hidden space-y-6">
          <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            {t('othersTitle')}
          </h4>
          {invertersList!
            .filter((inverter) =>
              invertersList![0].model.includes('HP')
                ? inverter.model.includes('HP')
                : inverter.model.includes('LP')
            )
            ?.slice(1)
            .map((inverter) => (
              <div key={inverter.model}>
                <Tables
                  variant="darkBlue"
                  data={formatInverter(
                    inverter,
                    t('inverterAtr'),
                    t('typeAtr'),
                    t('powerAtr'),
                    t('qntAtr'),
                    minCoef,
                    +selectedCoef
                  )}
                  // srcImg={`/images/${inverter.model.replace(/\//g, '')}.png`}
                  srcImg={mapImages(inverter.model as ImageModelName)}
                />
                {Math.ceil((minCoef * inverter.quantity) / +selectedCoef) >
                inverterGridLimit(grid as any) ? (
                  <div className="pt-6 sm:px-4">
                    {' '}
                    <Danger
                      message={
                        t.rich('AlertOtherInverters', {
                          inverterModel: inverter.model,
                          inverterModelLimit: inverterGridLimit(grid as any),
                          span: (chunks) => (
                            <span className="mx-1 whitespace-nowrap rounded-lg bg-red-950  px-2 leading-6 text-gray-100">
                              {chunks}
                            </span>
                          ),
                        }) as string
                      }
                    />
                  </div>
                ) : null}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

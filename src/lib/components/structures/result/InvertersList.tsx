'use client';
import { decimalToHoursMinutes, formatInverter } from '@/utils/functions';
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
import { Select, SelectTrigger, SelectValue } from '../../ui/select';
import { Calculation } from '@/app/client/prisma';

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
}

export default function InvertersList({ printData }: Props) {
  const t = useTranslations('Inverters');
  const {
    state: { grid, totalPower, batteryModel, batteryQty },

    actions: { addRecommendedInverter, addInverterQty },
  } = useDataStore();

  const requestData = {
    gridVoltage: printData ? printData.grid : (grid || '220V (Fase + Fase + Terra/Neutro)'),
    tPower: printData ? printData.totalPower : (totalPower || 1),
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
      console.log(recommendedInverter)

      addRecommendedInverter(recommendedInverter.model);
      addInverterQty(recommendedInverter.quantity);
    }
  }, [invertersList]);

  return isError ? (
    <span className="mx-auto flex w-full flex-col text-center">
      {t('errorMsg')}
    </span>
  ) : (
    <div className="flex flex-col gap-6">
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
              t('qntAtr')
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
            <Alert
              variant="accent"
              className="print-hidden alert-margin-print-fixer mx-auto w-full"
            >
              <AlertDescription className="flex flex-col items-center justify-start gap-2">
                <div className="flex">
                  <ExclamationTriangleIcon className="!mr-2 h-10 w-10 font-bold" />
                  <AlertTitle className="text-2xl font-bold uppercase">
                    Atenção
                  </AlertTitle>
                </div>
                <div className="text-center sm:w-[70%]">
                  {t('coefAlert')}: 
                </div>
                <div className='flex items-baseline'>

                <span className="font-bold">
                {decimalToHoursMinutes(
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
                        )}
                  {/* <Select>
                    <SelectTrigger className="mt-2 h-full w-[100px] border-none bg-amber-300 shadow-inner shadow-yellow-600 backdrop-blur-md dark:bg-amber-200 dark:shadow-yellow-700">
                      <SelectValue
                        placeholder={decimalToHoursMinutes(
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
                        )}
                      />
                    </SelectTrigger>
                  </Select> */}
                </span>{' '}<CoefDescription />
                </div>
              </AlertDescription>
            </Alert>
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
                    t('qntAtr')
                  )}
                  // srcImg={`/images/${inverter.model.replace(/\//g, '')}.png`}
                  srcImg={mapImages(inverter.model as ImageModelName)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

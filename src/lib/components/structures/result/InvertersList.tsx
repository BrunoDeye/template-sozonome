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

export default function InvertersList() {
  const t = useTranslations('Inverters');
  const {
    state: { grid, totalPower, batteryModel, batteryQty },
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
    batteryModel,
    batteryQty,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          <Alert className="alert-margin-print-fixer mx-auto w-full text-justify sm:w-[94%] sm:text-center">
            <ExclamationTriangleIcon className="h-4 w-4" />

            <AlertDescription className="font-bold">
              {t('coefAlert')}:{' '}
              {decimalToHoursMinutes(
                invertersList!.filter((inverter) =>
                  invertersList![0].model.includes('HP')
                    ? inverter.model.includes('HP')
                    : inverter.model.includes('LP')
                )[0].coef < 1
                  ? 1
                  : invertersList!.filter((inverter) =>
                      invertersList![0].model.includes('HP')
                        ? inverter.model.includes('HP')
                        : inverter.model.includes('LP')
                    )[0].coef,
                t('h'),
                t('hs'),
                t('min'),
                t('mins'),
                t('and')
              )}{' '}
              <CoefDescription />
            </AlertDescription>
          </Alert>
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

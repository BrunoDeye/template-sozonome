import { formatAllInOne, formatInverter } from '@/utils/functions';
import Tables from './Tables';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import { useEffect } from 'react';
import { ImageModelName, mapImages } from '@/utils/constants';
import { useGetAllInOnes } from '@/services/ReactQueryHooks/useGetAllInOnes';

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

export default function AllInOnesList() {
  // const {
  //   state: { systemType},
  // } = useDataStore();

  // const requestData = {
  //   gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
  //   tPower: totalPower || 1,
  // };
  // const { allInOnesData, isLoading, isError } =
  //   useCalculateInvertersQuery(requestData);

  const { data: allInOnesData, isLoading, isError } =
    useGetAllInOnes();

  return isError ? (
    <span className="mx-auto flex w-full flex-col text-center">
      Ops algo deu errado...
    </span>
  ) : (
    <div className="flex flex-col gap-6">
      <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
        All In One Recomendado
      </h4>
      {isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : (
        <Tables
          variant="sky"
          data={formatAllInOne(
            allInOnesData![0]
          )}
          srcImg={mapImages(allInOnesData![0].model as ImageModelName)}
        />
      )}

      {isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : allInOnesData!.length === 1 ? null : (
        <div className='print-hidden space-y-6'>
          <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            Outras Opções de All In One
          </h4>
          {allInOnesData!.slice(1)
            .map((allInOne) => (
              <div key={allInOne.model}>
                <Tables
                  variant="darkBlue"
                  data={formatAllInOne(allInOne)}
                  // srcImg={`/images/${inverter.model.replace(/\//g, '')}.png`}
                  srcImg={mapImages(allInOne.model as ImageModelName)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

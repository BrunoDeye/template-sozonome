import { formatInverter } from '@/utils/functions';
import Tables from './Tables';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import { useEffect } from 'react';

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
  const {
    state: { grid, totalPower,place },
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);

    

  return isError ? (
    <span className="mx-auto flex w-full flex-col text-center">
      Ops algo deu errado...
    </span>
  ) : (
    <div className="flex flex-col gap-6">
      <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
        Inversor Recomendado
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
          data={formatInverter(invertersList!.filter((inverter) => place==='Indústria' ? inverter.model.includes('HP') : inverter.model.includes('LP') )[0])}
        />
      )}

      {isLoading ? (
        <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
          <div className="pb-12">
            <LoadingDeye />
          </div>
        </div>
      ) : invertersList!.filter((inverter) => place==='Indústria' ? inverter.model.includes('HP'): inverter.model.includes('LP') ).length === 1 ? null : (
        <>
          <h4 className="text-center text-xl font-bold tracking-tight sm:text-2xl">
            Outras Opções de Inversores
          </h4>
          {invertersList!.filter((inverter) => place==='Indústria' ? inverter.model.includes('HP') : inverter.model.includes('LP') )?.slice(1).map((inverter) => (
            <div key={inverter.model}>
              <Tables
                variant="darkBlue"
                data={formatInverter(inverter)}
                // srcImg={`/images/${inverter.model.replace(/\//g, '')}.png`}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

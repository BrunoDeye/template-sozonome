'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { useGetBatteries } from '@/services/ReactQueryHooks/useGetBatteries';
import { useDataStore } from '@/store/data';
import { useCalculateInvertersQuery } from '@/services/ReactQueryHooks/useCalculateInvertersQuery';
import LoadingDeye from '../../Loading';
import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { useRouter } from 'next-intl/client';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import GEF60 from '@/images/allInOne/GE-F60.png';
import sun5KSG0103LP1 from '@/images/inverters/SUN-5K-SG0103LP1-EU.png';
import Tables from '../result/Tables';
import { ImageModelName, mapImages } from '@/utils/constants';
import { formatBattery, formatBatteryOptions } from '@/utils/functions';

type SelectBatteryProps = {
  selectedBattery: string | undefined;
  setSelectedBattery: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const FormSchema = z.object({
  model: z.enum(
    [
      'BOS-G (100Ah)',
      'RW.M6.1 (120Ah)',
      'SE-G5.3 (104Ah)',
      'SE-G5.1 PRO (100Ah)',
    ],
    {
      required_error: '\u24D8 Você precisa escolher uma Opção.',
    }
  ),
});

export default function SelectBattery({
  selectedBattery,
  setSelectedBattery,
}: SelectBatteryProps) {
  const t = useTranslations('SelectBattery');
  const tPage = useTranslations("BatteriesPage");
  const tBattery = useTranslations('Batteries');
  const [isClient, setIsClient] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { data: batteriesData, isLoading: batteriesDataIsLoading } =
    useGetBatteries();

  const {
    state: { grid, totalPower, batteryModel }, actions: { addBatteryModel }
  } = useDataStore();

  const requestData = {
    gridVoltage: grid || '220V (Fase + Fase + Terra/Neutro)',
    tPower: totalPower || 1,
  };
  const { invertersList, isLoading, isError } =
    useCalculateInvertersQuery(requestData);
  // console.log(invertersList);
  // console.log(batteriesData);
  // console.log(selectedBattery);
  const handleClick = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (
    data: z.infer<typeof FormSchema>
  ) => {
    addBatteryModel(data.model);

    router.push('/result', { scroll: false });
  };

  const onError: SubmitErrorHandler<z.infer<typeof FormSchema>> = (errors) =>
    console.log(errors);

  useEffect(() => {
    setIsClient(true);
    if (batteryModel) {
      form.setValue('model', batteryModel as any);
    }
  }, []);

  return (
    <div className="print-hidden p-0 sm:p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="mx-auto mt-8 max-w-4xl sm:mt-12"
        >
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormControl className="grid grid-cols-1 gap-x-8 gap-y-1">
                  {isClient ? (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row justify-around w-full"
                    >
                      {batteriesDataIsLoading || isLoading || !invertersList ? (
                        <LoadingDeye />
                      ) : (
                        batteriesData
                          ?.filter(
                            (battery) =>
                              (battery.model.includes('BOS') &&
                                invertersList![0].model.includes('HP')) ||
                              (!battery.model.includes('BOS') &&
                                invertersList![0].model.includes('LP'))
                          )
                          .map((battery) => (
                            <FormItem
                              onClick={() => router.prefetch('/grid')}
                              className="relative flex w-full my-2 items-center"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  className="peer hidden"
                                  value={battery.model}
                                  id={String(battery.id)}
                                />
                              </FormControl>

                              <FormLabel
                                className="flex h-full w-full cursor-pointer  flex-col items-center justify-end gap-4 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-md dark:shadow-sky-600 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                                htmlFor={String(battery.id)}
                              >
                                <div className="min-w-[210px] h-full flex flex-col justify-center py-4">
                                  <Image
                                    className={`${loaded ? 'unblur' : ''} ${
                                      field.value === battery.model
                                        ? ''
                                        : 'dark:[--shadow-inversor:null]'
                                    } clip-your-needful-style mx-auto dark:[--shadow-inversor:#333132]`}
                                    height={222}
                                    width={400}
                                    priority
                                    placeholder="blur"
                                    blurDataURL={mapImages(battery.model as ImageModelName).blurDataURL}
                                    alt="Inversor/Bateria Deye"
                                    src={mapImages(battery.model as any)}
                                    onLoadingComplete={() => setLoaded(true)}
                                  />
                                </div>
                                {/* <a href="https://storyset.com/nature" className='text-[10px]'>Nature illustrations by Storyset</a> */}
                                <h4> {battery.model}</h4>
                                <h6> {tPage("label1")}: {(battery.correctedEnergy/1000).toFixed(2)}</h6>
                                {/* <a href="https://storyset.com/nature" className='text-[10px]'>Nature illustrations by Storyset</a> */}
                              </FormLabel>
                            </FormItem>
                          ))
                      )}
                    </RadioGroup>
                  ) : (
                    <div className="mx-auto my-auto flex min-h-[377px] w-full items-center justify-center text-center">
                      <div className="pb-12">
                        <LoadingDeye />
                      </div>
                    </div>
                  )}
                </FormControl>

                <FormMessage className="text-md text-center font-bold" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-10 block w-full rounded-md sm:mx-auto sm:w-auto"
            variant="gradientSky"
          >
            {tPage("resultButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

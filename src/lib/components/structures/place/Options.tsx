'use client';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/lib/components/ui/radio-group';
import { useDataStore } from '@/store/data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import House from '@/images/Cabin-bro.svg';
import HouseDark from '@/images/Cabin-bro_dark.svg';
import Industry from '@/images/Farm_house.svg';
import IndustryDark from '@/images/Farm_house_dark.svg';
import { useTheme } from 'next-themes';
import LoadingDeye from '../../Loading';
import { toBase64 } from '../result/Tables';

const FormSchema = z.object({
  place: z.enum(['Residência', 'Indústria'], {
    required_error: '\u24D8 Você precisa escolher uma Opção.',
  }),
});

export default function Options() {
  const {
    state: { place },
    actions: { addPlace },
  } = useDataStore();

  const router = useRouter();
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (
    data: z.infer<typeof FormSchema>
  ) => {
    addPlace(data.place);
    if (data.place === 'Residência') {
      router.push('/grid', { scroll: false });
    } else {
      router.push('/tipo', { scroll: false });
    }
  };

  const onError: SubmitErrorHandler<z.infer<typeof FormSchema>> = (errors) =>
    console.log(errors);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (place) {
      form.setValue('place', place as any);
    }
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="mx-auto mt-8 max-w-4xl sm:mt-12"
      >
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormControl className="grid grid-cols-1 gap-x-8 gap-y-1">
                {isClient ? (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid w-full"
                  >
                    <FormItem
                      onClick={() => router.prefetch('/grid')}
                      className="relative flex w-full items-center"
                    >
                      <FormControl>
                        <RadioGroupItem
                          className="peer hidden"
                          value="Residência"
                          id="r2"
                        />
                      </FormControl>

                      <FormLabel
                        className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-md dark:shadow-sky-600 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                        htmlFor="r2"
                      >
                        <div className="relative">
                          <Image
                            src={House}
                            height={200}
                            width={200}
                            priority
                            className="absolute duration-700 opacity-100 ease-linear transition-all dark:opacity-0"
                            placeholder={`data:image/svg+xml;base64,${toBase64(
                              House as any
                            )}`}
                            alt="Casa na floresta"
                          />
                          <Image
                            src={HouseDark}
                            height={200}
                            width={200}
                            priority
                            className="opacity-0 duration-700 ease-linear transition-all dark:opacity-100"
                            placeholder={`data:image/svg+xml;base64,${toBase64(
                              HouseDark as any
                            )}`}
                            alt="Casa na floresta"
                          />
                        </div>

                        {/* <a href="https://storyset.com/nature" className='text-[8px]'>Nature illustrations by Storyset</a> */}
                        <h4>Residencial e Comercial</h4>
                      </FormLabel>
                    </FormItem>

                    <FormItem
                      onClick={() => router.prefetch('/tipo')}
                      className="relative flex w-full items-center"
                    >
                      <FormControl>
                        <RadioGroupItem
                          className="peer hidden"
                          value="Indústria"
                          id="r3"
                        />
                      </FormControl>

                      <FormLabel
                        className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-md dark:shadow-sky-600 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                        htmlFor="r3"
                      >
                        <div className="relative">
                          <Image
                            src={Industry}
                            height={200}
                            width={200}
                            priority
                            className="absolute duration-700 opacity-100 ease-linear transition-all dark:opacity-0"
                            placeholder={`data:image/svg+xml;base64,${toBase64(
                              Industry as any
                            )}`}
                            alt="Casa na floresta"
                          />
                          <Image
                            src={IndustryDark}
                            height={200}
                            width={200}
                            priority
                            className="opacity-0 duration-700 transition-all ease-linear dark:opacity-100"
                            placeholder={`data:image/svg+xml;base64,${toBase64(
                              IndustryDark as any
                            )}`}
                            alt="Casa na floresta"
                          />
                        </div>

                        {/* <a href="https://storyset.com/nature" className='text-[8px]'>Nature illustrations by Storyset</a> */}
                        <h4>Industrial</h4>
                      </FormLabel>
                    </FormItem>
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
          variant="gradientBlue"
        >
          Confirmar
        </Button>
      </form>
    </Form>
  );
}

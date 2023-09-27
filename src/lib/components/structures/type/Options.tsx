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
import LoadingDeye from '../../Loading';
import GEF60 from '@/images/allInOne/GE-F60.png';
import sun5KSG0103LP1 from '@/images/inverters/SUN-5K-SG0103LP1-EU.png'

const FormSchema = z.object({
  systemType: z.enum(['Híbrido', 'AllInOne'], {
    required_error: '\u24D8 Você precisa escolher uma Opção.',
  }),
});

export default function Options() {
  const {
    state: { systemType },
    actions: { addSystemType },
  } = useDataStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (
    data: z.infer<typeof FormSchema>
  ) => {
    addSystemType(data.systemType);

    router.push('/grid', { scroll: false });
  };

  const onError: SubmitErrorHandler<z.infer<typeof FormSchema>> = (errors) =>
    console.log(errors);
  const [isClient, setIsClient] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (systemType) {
      form.setValue('systemType', systemType as any);
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
          name="systemType"
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
                          value="Híbrido"
                          id="r2"
                        />
                      </FormControl>

                      <FormLabel
                        className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-md dark:shadow-sky-600 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                        htmlFor="r2"
                      >
                        <div className="min-w-[210px] py-4">
                          <Image
                            className={`${loaded ? 'unblur' : ''} ${
                              field.value === 'Híbrido'
                                ? ''
                                : 'dark:[--shadow-inversor:null]'
                            } clip-your-needful-style mx-auto dark:[--shadow-inversor:#333132]`}
                            height={222}
                            width={400}
                            priority
                            placeholder="blur"
                            alt="Inversor/Bateria Deye"
                            src={sun5KSG0103LP1}
                            onLoadingComplete={() => setLoaded(true)}
                          />
                        </div>
                        {/* <a href="https://storyset.com/nature" className='text-[10px]'>Nature illustrations by Storyset</a> */}
                        <h4>Híbrido</h4>
                      </FormLabel>
                    </FormItem>

                    <FormItem
                      onClick={() => router.prefetch('/grid')}
                      className="relative flex w-full items-center"
                    >
                      <FormControl>
                        <RadioGroupItem
                          className="peer hidden"
                          value="AllInOne"
                          id="r3"
                        />
                      </FormControl>

                      <FormLabel
                        className="flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-md dark:shadow-sky-600 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                        htmlFor="r3"
                      >
                        <div className="min-w-[210px] py-4">
                          <Image
                            className={`${loaded ? 'unblur' : ''} ${
                              field.value === 'AllInOne'
                                ? ''
                                : 'dark:[--shadow-inversor:null]'
                            } clip-your-needful-style mx-auto dark:[--shadow-inversor:#333132]`}
                            height={222}
                            width={400}
                            priority
                            placeholder="blur"
                            alt="Inversor/Bateria Deye"
                            src={GEF60}
                            onLoadingComplete={() => setLoaded(true)}
                          />
                        </div>

                        {/* <a href="https://storyset.com/nature" className='text-[10px]'>Nature illustrations by Storyset</a> */}
                        <h4>All In One</h4>
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

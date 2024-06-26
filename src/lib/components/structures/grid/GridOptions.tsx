'use client';
import {Link,usePathname, useRouter } from '@/navigation';
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
import { useEffect, useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';



const GridOptions = () => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Grid");
  const FormSchema = z.object({
    grid: z.enum(
      [
        '220V (Fase + Fase + Terra/Neutro)',
        '127V (Fase + Neutro/Terra)',
        '220V (Fase + Neutro + Terra)',
        '220V (Fase + Fase + Fase + Terra + Neutro)',
        '380V (Fase + Fase + Fase + Terra + Neutro)',
      ],
      {
        required_error: `\u24D8 ${t('errorMsg')}`,
      }
    ),
  });
  const {
    state: { grid, place, systemType },
    actions: { addGrid },
  } = useDataStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (
    data: z.infer<typeof FormSchema>
  ) => {
    addGrid(data.grid);
    localStorage.removeItem('my-print-calculation');
    startTransition(() => {
    router.push('/devices');
    });
  };

  const onError: SubmitErrorHandler<z.infer<typeof FormSchema>> = (errors) =>
    console.log(errors);
  const [isClient, setIsClient] = useState(false);
  // console.log(systemType);
  useEffect(() => {
    setIsClient(true);
    if (grid) {
      form.setValue('grid', grid as any);
    }
  }, []);
  return (
    <div className="isolate min-h-[60vh] px-6 py-2 sm:py-4 lg:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-2 text-sm leading-8">
          {t('subtitle')}
        </p>
        <p className="leading-2 mt-1 text-[13px] font-thin">
          {t('content')}
        </p>
      </div>
      {isClient ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="mx-auto mt-8 max-w-4xl sm:mt-12"
          >
            <FormField
              control={form.control}
              name="grid"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="grid grid-cols-1 gap-x-8 gap-y-1">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid w-full"
                    >
                      {place !== 'Indústria' ? (
                        <FormItem
                          onClick={() => router.prefetch('/devices')}
                          className="relative flex w-full items-center"
                        >
                          <FormControl>
                            <RadioGroupItem
                              className="peer hidden"
                              value="127V (Fase + Neutro/Terra)"
                              id="r2"
                            />
                          </FormControl>

                          <FormLabel
                            className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-lg dark:shadow-sky-700 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                            htmlFor="r2"
                          >
                            <h4>{t("optionMonoTitle")}</h4>
                            <p className="pr-[2rem]">
                            {t("option127VMonoSubtitle")}
                            </p>
                            <p>BR</p>
                          </FormLabel>
                          <div className="absolute bottom-0 right-4 top-1/4 my-auto flex h-7 w-7 scale-0 rounded-full bg-gradient-to-br from-blue-200 to-gray-100 transition delay-100 peer-aria-checked:scale-100 dark:from-blue-400 dark:to-blue-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="mx-auto my-auto w-5 text-sky-700 dark:text-white"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                          </div>
                        </FormItem>
                      ) : null}

                      <FormItem
                        onClick={() => router.prefetch('/devices')}
                        className="relative flex w-full items-center"
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="peer hidden"
                            value="220V (Fase + Neutro + Terra)"
                            id="r3"
                          />
                        </FormControl>

                        <FormLabel
                          className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-lg dark:shadow-sky-700 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                          htmlFor="r3"
                        >
                          <h4>{t("optionMonoTitle")}</h4>
                          <p className="pr-[2rem]">
                          {t("option220VMonoSubtitle")}
                          </p>
                          <p>EU</p>
                        </FormLabel>
                        <div className="absolute bottom-0 right-4 top-1/4 my-auto flex h-7 w-7 scale-0 rounded-full bg-gradient-to-br from-blue-200 to-gray-100 transition delay-100 peer-aria-checked:scale-100 dark:from-blue-400 dark:to-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="mx-auto my-auto w-5 text-sky-700 dark:text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </div>
                      </FormItem>

                      <FormItem
                        onClick={() => router.prefetch('/devices')}
                        className="relative flex w-full items-center"
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="peer hidden"
                            value="220V (Fase + Fase + Terra/Neutro)"
                            id="r1"
                          />
                        </FormControl>

                        <FormLabel
                          className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-lg dark:shadow-sky-700 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                          htmlFor="r1"
                        >
                          <h4>{t("optionBiTitle")}</h4>
                          <p className="pr-[1.5rem]">
                          {t("option220VBiSubtitle")}
                          </p>
                          <p>US</p>
                        </FormLabel>
                        <div className="absolute bottom-0 right-4 top-1/4 my-auto flex h-7 w-7 scale-0 rounded-full bg-gradient-to-br from-blue-200 to-gray-100 transition delay-100 peer-aria-checked:scale-100 dark:from-blue-400 dark:to-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="mx-auto my-auto w-5 text-sky-700 dark:text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </div>
                      </FormItem>

                      <FormItem
                        onClick={() => router.prefetch('/devices')}
                        className="relative flex w-full items-center"
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="peer hidden"
                            value="220V (Fase + Fase + Fase + Terra + Neutro)"
                            id="r4"
                          />
                        </FormControl>

                        <FormLabel
                          className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-lg dark:shadow-sky-700 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                          htmlFor="r4"
                        >
                          <h4>{t("optionTriTitle")}</h4>
                          <p className="pr-[2rem]">
                          {t("option220VTriSubtitle")}
                          </p>
                          <p>US</p>
                        </FormLabel>
                        <div className="absolute bottom-0 right-4 top-1/4 my-auto flex h-7 w-7 scale-0 rounded-full bg-gradient-to-br from-blue-200 to-gray-100 transition delay-100 peer-aria-checked:scale-100 dark:from-blue-400 dark:to-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="mx-auto my-auto w-5 text-sky-700 dark:text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </div>
                      </FormItem>
                      <FormItem
                        onClick={() => router.prefetch('/devices')}
                        className="relative flex w-full items-center"
                      >
                        <FormControl>
                          <RadioGroupItem
                            className="peer hidden"
                            value="380V (Fase + Fase + Fase + Terra + Neutro)"
                            id="r5"
                          />
                        </FormControl>

                        <FormLabel
                          className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl bg-opacity-90 p-4 text-sm shadow-xl backdrop-blur-2xl transition ease-out hover:bg-opacity-75 peer-aria-checked:bg-gradient-to-br peer-aria-checked:from-gray-100 peer-aria-checked:to-blue-200 peer-aria-checked:text-sky-700 dark:shadow-lg dark:shadow-sky-700 dark:peer-aria-checked:from-blue-800 dark:peer-aria-checked:to-blue-400 dark:peer-aria-checked:text-white"
                          htmlFor="r5"
                        >
                          <h4>{t("optionTriTitle")}</h4>
                          <p className="pr-[2rem]">
                            {t("option380VTriSubtitle")}
                          </p>
                          <p>EU</p>
                        </FormLabel>
                        <div className="absolute bottom-0 right-4 top-1/4 my-auto flex h-7 w-7 scale-0 rounded-full bg-gradient-to-br from-blue-200 to-gray-100 transition delay-100 peer-aria-checked:scale-100 dark:from-blue-400 dark:to-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="mx-auto my-auto w-5 text-sky-700 dark:text-white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage className="!mt-8 text-md text-center font-bold" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="large"
              className="mt-10 block w-full rounded-md sm:mx-auto sm:w-auto"
              variant="gradientBlue"
            >
              {t('confirmButton')}
            </Button>
          </form>
        </Form>
      ) : null}
    </div>
  );
};

export default GridOptions;

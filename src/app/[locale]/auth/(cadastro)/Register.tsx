'use client';
import React, { useMemo, useRef, useTransition } from 'react';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { NextPage } from 'next';
import { Link } from '@/navigation';
import { useState, startTransition } from 'react';
import SuccessDialog from './SuccessDialog';
import { Checkbox } from '@/lib/components/ui/checkbox';
import TermsDialog from './TermsDialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/lib/components/ui/form';
import useOutsideAlerter from '@/lib/components/hooks/useOutsideAlerter';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { Select } from '@/lib/components/ui/select';
import { CountrySelect } from './SelectCountry';
import PhoneInput, {
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import br from 'react-phone-number-input/locale/pt-BR.json';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  setAuthPage: React.Dispatch<
    React.SetStateAction<'login' | 'cadastro' | 'esqueci-senha'>
  >;
}

function RegisterPageContent({ setAuthPage }: Props) {
  const wrapperRef = useRef(null);
  const locale = useLocale();
  const t = useTranslations('Register');
  const formSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(2, {
            message: t('errorName'),
          }),
          email: z.string().email({ message: t('errorEmail') }),
          phoneNumber: z.string(),
          password: z.string().min(6, {
            message: t('errorPassword'),
          }),
          confirmPassword: z.string().min(6, {
            message: t('errorPassword'),
          }),
          terms: z.literal<boolean>(true, {
            errorMap: (issue, _ctx) => {
              switch (issue.code) {
                default:
                  return {
                    message: t('errorTerms'),
                  };
              }
            },
          }),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
          if (confirmPassword !== password) {
            ctx.addIssue({
              code: 'custom',
              message: t('errorConfirm'),
              path: ['confirmPassword'],
            });
          }
        }),
    [locale]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });
  const [country, setCountry] = useState('BR');
  const [openTerms, setOpenTerms] = useState(false);
  const [open, setOpen] = useState(false);
  // const [isLoading, setIsloading] = useState(true)
  const [isLoading, startTransition] = useTransition();
  const [alert, setAlert] = useState({
    status: '',
    message: '',
  });

  useOutsideAlerter(wrapperRef, setAlert as any);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const registerZodData = {
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };
    console.log(values);
    setOpen(true);

    if (!values.terms) {
      setAlert({
        status: 'error',
        message: 'Você precisa aceitar os termos',
      });
    } else {
      startTransition(async () => {
        try {
          const result = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(registerZodData),
          });
          console.log(result);
          form.reset();
          if (result.status === 409) {
            setAlert({ status: 'error', message: 'Email já cadastrado' });
          } else {
            setAlert({ status: 'success', message: 'Cadastrado com sucesso!' });
          }
        } catch (error: any) {
          console.log({ error });
          setAlert({ status: 'error', message: 'Algo deu errado' });
        }
      });
    }

    console.log(values);
  }
  return (
    <>
      <h3 className="bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
        {t('title')}
      </h3>

      <SuccessDialog
        isLoading={isLoading}
        alert={alert}
        open={open}
        setOpen={setOpen}
      />
      {alert.message && (
        <div
          style={{
            color: alert.status === 'success' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
          ref={wrapperRef}
        >
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 text-left"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="on"
                    id="name"
                    type={'text'}
                    required
                    aria-required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="on"
                    id="email"
                    type={'email'}
                    required
                    aria-required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber">{t('phone')}</FormLabel>
                <div className="flex gap-3 max-[340px]:flex-col">
                  <div className="">
                    <CountrySelect
                      labels={br}
                      value={country}
                      onChange={setCountry}
                    />
                  </div>

                  <div className="w-full">
                    <FormControl>
                      <PhoneInput
                        autoComplete="on"
                        id="phoneNumber"
                        type={'text'}
                        inputComponent={Input}
                        required
                        country={country as any}
                        aria-required
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    id="password"
                    type={'password'}
                    required
                    aria-required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmPassword">{t('confirm')}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    id="confirmPassword"
                    type={'password'}
                    required
                    aria-required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <TermsDialog
              open={openTerms}
              setOpen={setOpenTerms}
              setAccept={
                ((value: boolean) => form.setValue('terms', value)) as any
              }
              form={form}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      onClick={() => (field.value ? null : setOpenTerms(true))}
                      onCheckedChange={(value) => {
                        field.value ? field.onChange(value) : null;
                      }}
                      checked={field.value}
                      aria-required
                      required
                    />
                  </FormControl>

                  <div className="!my-0 grid gap-1.5 leading-none">
                    <FormLabel
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t.rich('accept', {
                        a: (chunk) => (
                          <Button
                            onClick={() => setOpenTerms(true)}
                            className="max-h-[14px] p-0 px-1 leading-none text-blue-700 underline dark:text-blue-400"
                            variant="link"
                            type="button"
                          >
                            {' '}
                            {chunk}
                          </Button>
                        ),
                      })}
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {t('acceptSub')}
                    </p>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="gradientBlue"
              className="w-full sm:w-auto sm:px-16"
              type="submit"
            >
              {t('createButton')}
            </Button>
          </div>
        </form>
      </Form>
      <div>
        {t.rich('loginText', {
          a: (chunk) => (
            <Button
              variant="link"
              size="lg"
              className="ml-1 p-0 text-base"
              asChild
            >
              <Link href="#" onClick={() => setAuthPage('login')}>
                {chunk}
              </Link>
            </Button>
          ),
        })}
      </div>
    </>
  );
}

export default RegisterPageContent;

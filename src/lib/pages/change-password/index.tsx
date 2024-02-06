'use client';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Link, usePathname, useRouter } from '@/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useOutsideAlerter from '@/lib/components/hooks/useOutsideAlerter';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/lib/components/ui/form';
import SuccessDialog from './SuccessDialog';
const ChangePasswordPage: NextPage = () => {
  const wrapperRef = useRef(null);
  const router = useRouter();
  const [open,  setOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const locale = useLocale();
  const t = useTranslations('ForgotPage');
  const formSchema = useMemo(
    () =>
      z
        .object({
          password: z.string().min(6, {
            message: t('errorPassword'),
          }),
          confirmPassword: z.string().min(6, {
            message: t('errorPassword'),
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
  const [isLoading, startTransition] = useTransition();
  const [loginData, setLoginData] = useState({
    password: '',
  });

  const [alert, setAlert] = useState({
    status: '',
    message: '',
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const searchParams  = useSearchParams()
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(true);
    startTransition(async () => {
    try {
      const result = await signIn('change', {
        password: values.password,
        redirect: false,
      }, { token: `${token}`, id: `${id}` });
      if (result?.ok)
        setAlert({ status: 'success', message: t('successMsg') });
      if (result?.error) setAlert({ status: 'error', message: result.error });
      setLoginData({ password: '' });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: 'error', message: t('errorMsg') });
    }})
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useOutsideAlerter(wrapperRef, setAlert as any);
  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') {
      // router.push(`/`);
      router.refresh();
      router.push('/');
    }
  }, [session, status]);
  

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
        >
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      )}
       <Form {...form}>
      <form className="w-full space-y-6 text-left" onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">{t('labelNew')}</FormLabel>
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
                <FormLabel htmlFor="confirmPassword">{t('labelConfirm')}</FormLabel>
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
        <Button variant="gradientBlue" className="w-full" type="submit">
          {t('changeButton')}
        </Button>
      </form>
      </Form>
    </>
  );
};

export default ChangePasswordPage;

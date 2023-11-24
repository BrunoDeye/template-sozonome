'use client';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Link, usePathname, useRouter } from '@/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();
  const t = useTranslations('ConfirmEmail')
  const { data: session, status, update } = useSession();

  const [loginData, setLoginData] = useState({
    email: '',
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
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('confirm', {
        ...loginData,
        redirect: false,
      }, { token: `${token}` });
      if (result?.ok)
        setAlert({ status: 'success', message: t('successMsg') });
      if (result?.error) setAlert({ status: 'error', message: result.error });
      setLoginData({ email: '', password: '' });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: 'error', message: t('defaultError') });
    }
  };

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
      <form className="w-full space-y-6 text-left" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <Button variant="gradientBlue" className="w-full" type="submit">
          {t('button')}
        </Button>
      </form>
    </>
  );
};

export default VerifyEmailPage;

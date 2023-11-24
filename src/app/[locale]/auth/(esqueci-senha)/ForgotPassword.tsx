'use client';
import React from 'react';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { NextPage } from 'next';
import { Link } from '@/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
  setAuthPage: React.Dispatch<
    React.SetStateAction<'login' | 'cadastro' | 'esqueci-senha'>
  >;
}

function ForgotPasswordPageContent({ setAuthPage }: Props) {
  const [registerData, setRegisterData] = useState({
    email: '',
  });
  const t = useTranslations('ForgotPassword');
  const [open, setOpen] = useState(false);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({
    status: '',
    message: '',
  });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('/api/password/forget', {
        method: 'POST',
        body: JSON.stringify(registerData),
      });
      console.log(result);
      if (result.status === 404) {
        setAlert({ status: 'error', message: 'Email não cadastrado' });
      } else if (result.status === 400) {
        setAlert({
          status: 'error',
          message: 'Email cadastrado, mas não verificado',
        });
      } else {
        setAlert({ status: 'success', message: 'Enviado com sucesso!' });
        setOpen(true);
      }
      setRegisterData({ email: '' });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: 'error', message: 'Algo deu errado' });
    }
  };

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
        <div className="space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            onChange={onChange}
            value={registerData.email}
            type="email"
            name="email"
            required
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant="gradientBlue"
            className="w-full sm:w-auto sm:px-16"
            type="submit"
          >
            {t('send')}
          </Button>
        </div>
      </form>
      <div>
        {t.rich('remember', {
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

export default ForgotPasswordPageContent;

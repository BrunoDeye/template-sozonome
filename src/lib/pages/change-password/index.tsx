'use client';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Link, usePathname, useRouter } from '@/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

const ChangePasswordPage: NextPage = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

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
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('change', {
        ...loginData,
        redirect: false,
      }, { token: `${token}`, id: `${id}` });
      if (result?.ok)
        setAlert({ status: 'success', message: 'Alteração bem sucedida' });
      if (result?.error) setAlert({ status: 'error', message: result.error });
      setLoginData({ password: '' });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: 'error', message: 'Something went wrong' });
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
        Mudar senha
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
          <Label htmlFor="password">Nova Senha</Label>
          <Input
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <Button variant="gradientBlue" className="w-full" type="submit">
          Mudar
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordPage;

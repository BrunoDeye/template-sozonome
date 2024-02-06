'use client';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { Link, usePathname, useRouter } from '@/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { NextPage } from 'next';
import useOutsideAlerter from '@/lib/components/hooks/useOutsideAlerter';
import { useDataStore } from '@/store/data';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useTranslations } from 'next-intl';
import LoginDialog from './LoginDialog';
const { persist } = useDataStore;
interface Props {
  setAuthPage: React.Dispatch<
    React.SetStateAction<'login' | 'cadastro' | 'esqueci-senha'>
  >;
}

const LoginPageContent = ({ setAuthPage }: Props) => {
  const router = useRouter();
  const t = useTranslations('Login');
  const wrapperRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const {
    actions: { reset },
  } = useDataStore();
  const { data: session, status, update } = useSession();
  const [open,  setOpen] = useState(false);
  // const [isLoading, setIsloading] = useState(true)
  const [isLoading, startTransition] = useTransition();
  useEffect(() => {
    setIsClient(true);
  }, []);
  // const persist = useDataStore.persist;

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: '',
    message: '',
  });
  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  useOutsideAlerter(wrapperRef, setAlert as any);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setOpen(true);
    startTransition(async () => {
    try {
      const isEdit = localStorage.getItem('my-calculation');
      if (isEdit !== null) {
        localStorage.removeItem('my-calculation');
      }
      const result = await signIn('credentials', {
        ...loginData,
        redirect: false,
      });
      if (result?.ok)
        setAlert({
          status: 'success',
          message: 'Login realizado com sucesso!',
        });
      if (result?.error) setAlert({ status: 'error', message: result.error });
      setLoginData({ email: '', password: '' });
    } catch (error: any) {
      console.log({ error });
      setAlert({
        status: 'error',
        message: error.message || 'Algo deu errado',
      });
    }})
  };

  useEffect(() => {
    console.log(status);
    if (status === 'authenticated' && isClient) {
      // router.push(`/`);
      clearLocalStorage();
      persist.clearStorage();
      reset();
      router.refresh();
      router.push('/');
    }
  }, [session, status, isClient]);

  return (
    <>
      <h3 className="bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
        {t('enter')}
      </h3>
      <LoginDialog
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
      <form className="w-full space-y-6 text-left" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            autoComplete="username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <div className="flex justify-center">
            <Button
              variant="gradientBlue"
              className="w-full sm:w-auto sm:px-16"
              type="submit"
            >
              {t('enter')}
            </Button>
          </div>

          <div className="flex w-full justify-center">
            <Button variant="link" size="lg" className="p-0 text-sm" asChild>
              <Link
                as="a"
                href="#"
                onClick={() => setAuthPage('esqueci-senha')}
              >
                {t('forgot')}
              </Link>
            </Button>
          </div>
        </div>
      </form>
      <h6>
        {t.rich('account', {
          a: (chunk) => (
            <Button
              variant="link"
              size="lg"
              className="ml-1 p-0 text-base"
              asChild
            >
              <Link href="#" onClick={() => setAuthPage('cadastro')}>
                {chunk}
              </Link>
            </Button>
          ),
        })}
      </h6>
    </>
  );
};

export default LoginPageContent;

'use client';
import {
  BookLockIcon,
  CalculatorIcon,
  Home,
  Lock,
  LogIn,
  LogInIcon,
  LogOut,
  LucideBookKey,
  User,
  UserCircle2Icon,
} from 'lucide-react';

import { Button } from '@/lib/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { Link, usePathname, useRouter } from '@/navigation';
import { getFirstAndLastWords } from '../../../utils/functions';
import LoadingDeye from '../Loading';
import { useDataStore } from '@/store/data';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { LockClosedIcon } from '@radix-ui/react-icons';
import LogInIconSvg from "./LogInIcon"
const { persist } = useDataStore;

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const t = useTranslations('Profile');
  const tL = useTranslations('LoginButtons')
  const pathname = usePathname();
  const [href, setHref] = useState("");
  const [client, setClient] = useState(false);
  const router = useRouter()
  const {
    actions: { reset },
  } = useDataStore();

  const handleLocalStorage = () => {
    localStorage.removeItem('my-calculation');
  };

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (window) {
      setHref(window.location.origin);
    }
  }, [client]);


  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  function handleSingOut() {
    clearLocalStorage();
    persist.clearStorage();
    handleLocalStorage();
    reset();
    // router.push("/")
    signOut({ callbackUrl: `${href}`});
  }
  // console.log(href)
  if (pathname.startsWith('/auth')) return null;
  if (status === 'loading')
    return (
      <div className="min-w-[205px] scale-50">
        <LoadingDeye />
      </div>
    );

  if (status !== 'authenticated')
    return (
      // <div className="flex h-full gap-3">
      // <div className="group relative inline-flex">
      //   <div className="transitiona-all animate-tilt absolute -inset-[0.005rem] rounded-xl bg-gradient-to-r from-[#ff4444] via-[#ff4498] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-3 group-hover:opacity-70 group-hover:duration-200 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:opacity-100"></div>
      //   <Button asChild variant="outlinePurpleToBlue">
      //     <Link href="/auth/login">
      //       <span className="relative rounded-md bg-white/90 !px-5 !py-3 transition-all duration-75 ease-in group-hover:bg-white group-hover:bg-opacity-0 dark:bg-gray-900/80  group-hover:dark:bg-gray-900 dark:group-hover:bg-opacity-0">
      //         Fazer login
      //       </span>
      //     </Link>
      //   </Button>
      // </div>
      // <div className="group relative inline-flex">
      //   <div className="transitiona-all animate-tilt absolute -inset-[0.005rem] rounded-xl bg-gradient-to-r from-[#ff4444] via-[#ff4498] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-3 group-hover:opacity-70 group-hover:duration-200 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:opacity-100"></div>
      //   <Button asChild variant="purpleToBlue">
      //     <Link href="/auth/login">

      //         Criar conta

      //     </Link>
      //   </Button>
      // </div>
      // </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-red-200  shadow-red-200  dark:hover:shadow-sky-300 dark:shadow-sky-300">
            <LogInIconSvg strokeWidth="0.08rem" className="max-h-7 max-w-7" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-5">
          <DropdownMenuLabel className='text-center'>
           {tL("title")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='mb-5' />
          <DropdownMenuGroup className='flex gap-5'>
            <DropdownMenuItem  asChild>
              <div className="group focus:bg-transparent relative inline-flex">
                <div className="transitiona-all   animate-tilt absolute inset-3 dark:-inset-1 rounded-xl bg-gradient-to-r from-purple-300 via-red-400 to-purple-300 opacity-70 blur-lg duration-1000 group-hover:inset-1  dark:group-hover:-inset-3 group-hover:from-purple-300  group-hover:via-red-400 group-hover:to-purple-300  group-hover:opacity-100 group-hover:duration-200 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff] dark:group-hover:to-[#6c5eff]  dark:group-hover:opacity-100 backdrop-blur-lg"></div>
                <Button asChild variant="loginButton">
                  <Link href="/auth/login">
                    <span className="relative rounded-md bg-white/90 !px-5 !py-3 transition-all duration-75 ease-in group-hover:bg-white group-hover:bg-opacity-0 dark:bg-gray-900/80  group-hover:dark:bg-gray-900 dark:group-hover:bg-opacity-0">
                      {tL("login")}
                    </span>
                  </Link>
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem autoFocus={false}   asChild>
              <div className="group focus:bg-transparent relative inline-flex">
                <div className="transitiona-all  animate-tilt absolute inset-3 dark:-inset-1  rounded-xl bg-gradient-to-r from-purple-300 via-red-400 to-purple-300 opacity-70 blur-lg duration-1000 group-hover:inset-1 dark:group-hover:-inset-3  group-hover:from-purple-300  group-hover:via-red-400 group-hover:to-purple-300 group-hover:opacity-100 group-hover:duration-200 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff] dark:group-hover:to-[#6c5eff] dark:group-hover:opacity-100 backdrop-blur-lg"></div>
                <Button asChild variant="registerButton">
                  <Link className='' href="/auth/login?page=cadastro">{tL("register")}</Link>
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  // console.log(session)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="rounded-full">
          <UserCircle2Icon strokeWidth="0.08rem" className="h-7 w-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {t('hello')},
          <span className="font-extrabold tracking-widest">
            {' '}
            {getFirstAndLastWords(session.user.name)}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {pathname === '/' ? null : (
            <DropdownMenuItem asChild>
              <Link href="/" onClick={handleLocalStorage}>
                <Home className="mr-2 h-4 w-4" />
                <span>{t('homeMenu')}</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Link
              href={{
                pathname: '/editar-perfil',
                query: { previous: pathname },
              }}
              onClick={handleLocalStorage}
            >
              <User className="mr-2 h-4 w-4" />
              <span>{t('editMenu')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              onClick={handleLocalStorage}
              href={{ pathname: '/calculos', query: { previous: pathname } }}
            >
              <CalculatorIcon className="mr-2 h-4 w-4" />
              <span>{t('calcMenu')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logoutMenu')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

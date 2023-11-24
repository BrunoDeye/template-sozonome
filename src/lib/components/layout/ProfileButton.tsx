'use client';
import {
  CalculatorIcon,
  Home,
  LogOut,
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
import { Link, usePathname } from '@/navigation';
import { getFirstAndLastWords } from '../../../utils/functions';
import LoadingDeye from '../Loading';
import { useDataStore } from '@/store/data';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useTranslations } from 'next-intl';
const { persist } = useDataStore;

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const t = useTranslations('Profile')
  const pathname = usePathname();
  const {
    actions: { reset },
  } = useDataStore();
  if (status === 'loading')
    return (
      <div className="min-w-[205px] scale-50">
        <LoadingDeye />
      </div>
    );
  if (status !== 'authenticated') return null;
  // console.log(session)
  const handleLocalStorage = () => {
    localStorage.removeItem('my-calculation');
  };

  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  function handleSingOut() {
    clearLocalStorage();
    persist.clearStorage();
    handleLocalStorage();
    reset();
    signOut();
  }

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

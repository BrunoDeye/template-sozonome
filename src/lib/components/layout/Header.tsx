import { ThemeToggle } from '@/lib/components/theme-toggle';
import { NavigateBack } from '../navigate-back';
import LocaleSwitcher from '../LocaleSwitcher';
import { Button } from '../ui/button';
import { getSession, signOut, useSession } from 'next-auth/react';
import ProfileButton from './ProfileButton';
import { useEffect, useState } from 'react';
import { Calculation } from '@prisma/client';

const Header = () => {
  // const { status } = useSession()

  const [printData, setPrintData] = useState<Calculation | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      const myCalculation = localStorage.getItem('my-calculation');
      if (myCalculation !== null) {
        setIsEdit(true);
        setPrintData(JSON.parse(myCalculation))
      }
    }
  }, [isClient]);

  return (
    <header className="print-hidden bg-base-100/80 sticky top-0 z-20 w-full backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <div className="mr-auto">
          {/* { status === 'authenticated' ?<NavigateBack /> : null} */}
          <NavigateBack />
        </div>

        {isEdit ? <span className="absolute left-0 top-16 !min-w-[100vw] bg-gradient-to-br dark:from-green-600/90 dark:to-green-300/90 from-gray-200/90 to-green-500/90 py-1 text-center font-bold backdrop-blur-md">
          <h5 className="text-green-700 font-semibold dark:text-green-50">
            Editando Cálculo: {printData?.title}
          </h5>
        </span>: null}
        <div className="ml-auto flex items-center gap-0 sm:gap-8">
          <div className="invisible hidden sm:visible sm:block">
            <LocaleSwitcher />
          </div>
          {/* { status === 'authenticated' ?<Button onClick={() => signOut()}>Log out</Button> : null } */}
          <ProfileButton />
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};

export default Header;

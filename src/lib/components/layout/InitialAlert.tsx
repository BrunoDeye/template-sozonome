'use client';
import React, { useEffect, useRef, useState } from 'react';
import { parseISO, set } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/lib/components/ui/alert-dialog';
import { Button } from '@/lib/components/ui/button';
import { useSession } from 'next-auth/react';
import { Link } from '@/navigation';
import { Checkbox } from '../ui/checkbox';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../LocaleSwitcher';

export default function InitialAlert() {
  const { status } = useSession();
  const timeoutRef = useRef<number | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [shouldEmitAlert, setShouldEmitAlert] = useState(false);
  const t = useTranslations('GlobalAlert');
  const [disableClick, setDisableClick] = useState(false);
  const VerifyShouldEmitAlert = (lastAlertTime: Date) => {
    const currentTime = new Date();
    const fourHoursAgo = set(currentTime, {
      hours: currentTime.getHours() - 4,
    });

    return lastAlertTime < fourHoursAgo;
  };

  const checkAndEmitAlert = () => {
    const lastAlertTime = localStorage.getItem('calc-alert');

    if (
      status === 'unauthenticated' &&
      (!lastAlertTime ||
        VerifyShouldEmitAlert(parseISO(JSON.parse(lastAlertTime)?.alertTime)) ||
        !JSON.parse(lastAlertTime)?.checked)
    ) {
      // Update the last alert time in localStorage
      const currentTime = new Date();
      const alertInfo = {
        checked: false,
        alertTime: currentTime.toISOString(),
      };
      localStorage.setItem('calc-alert', JSON.stringify(alertInfo));
      // Emit the alert
      setShouldEmitAlert(true);
    }
  };

  const handleEmitAlert = () => {
    const currentTime = new Date();
    const alertInfo = {
      checked: true,
      alertTime: currentTime.toISOString(),
    };
    localStorage.setItem('calc-alert', JSON.stringify(alertInfo));
    setShouldEmitAlert(false);
  };
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && status !== 'loading') {
      checkAndEmitAlert();
    }
  }, [isClient, status]);

  const openChangeHandler = (open: boolean) => {
    if (open) {
      clearTimeout(timeoutRef.current);
      setDisableClick(true);
    } else {
      // Casting it here because Node is returning `Timeout` and this handler will run in the browser.
      const enableClicks = () => setDisableClick(false)
      timeoutRef.current = setTimeout(enableClicks, 50) as unknown as number;
    }
  };

  return isClient ? (
    <AlertDialog  open={shouldEmitAlert}>
      {shouldEmitAlert ? (
        <div
          className="absolute inset-x-0 top-[-10rem] z-[999999] transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-0 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80cc] to-[#ff8080] opacity-25 dark:from-[#80d5ff] dark:to-[#9089fc] dark:opacity-60 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      ) : null}
      <AlertDialogContent className="scroll bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.1)] backdrop-blur-2xl max-h-[100vh]   space-y-0   text-center sm:min-h-[50vh] sm:min-w-[35vw] ">
        <div className="no-scrollbar max-h-[95vh] space-y-5  overflow-y-scroll p-4 sm:space-y-4 sm:p-9 sm:pt-4">
          <AlertDialogHeader>
            {shouldEmitAlert ? (
              <div className="absolute top-1/2 right-1/2 translate-y-[calc(-50vh+5px)] xl:translate-y-[calc(-50vh+50px)]  max-sm:hidden translate-x-[49vw] xl:translate-x-[40vw] ">
                <LocaleSwitcher />
              </div>
            ) : null}
            <AlertDialogTitle className="pb-4 text-center text-3xl tracking-widest sm:mb-6 sm:text-4xl">
              {t.rich('title', {
                span: (chunks) => (
                  <span className="bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text font-bold text-transparent ">
                    {chunks}
                  </span>
                ),
              })}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center  text-lg dark:text-gray-100 sm:text-xl lg:max-w-[29vw]">
              {t('p1')}
            </AlertDialogDescription>
            <AlertDialogDescription className="mx-auto text-center text-lg dark:text-gray-100 sm:text-xl lg:max-w-[29vw]">
              {t('p2')}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div  className="my-2 flex items-center space-x-2 pt-6 max-sm:hidden">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => setChecked(Boolean(value))}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="whitespace-nowrap text-left text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('checkbox')}
            </label>
          </div>
          <AlertDialogFooter  className={`${disableClick ? "pointer-events-none" : ""} !w-full !max-w-full items-end justify-end gap-2 max-sm:space-y-3 sm:gap-4`}>
            <div  className="w-full max-sm:mr-auto max-sm:mt-2">
              <div  className="my-2 flex items-center space-x-2 max-sm:justify-center sm:hidden">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => setChecked(Boolean(value))}
                  id="terms"
                />
                <label
                  htmlFor="terms"
                  className="whitespace-normal text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('checkbox')}
                </label>
              </div>
              <div className=" w-full cursor-not-allowed sm:max-w-[300px]">
                <div
                  className={`group ${
                    !checked ? 'pointer-events-none opacity-50' : ''
                  } relative inline-flex w-full focus:bg-transparent`}
                >
                  <div className="transitiona-all  animate-tilt absolute inset-3  rounded-xl bg-gradient-to-r from-purple-300 via-red-400 to-purple-300 opacity-70 blur-lg backdrop-blur-lg duration-75 group-hover:inset-1  group-hover:from-purple-300 group-hover:via-red-400  group-hover:to-purple-300 group-hover:opacity-100  group-hover:duration-200 dark:-inset-1 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:-inset-3 dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff]  dark:group-hover:to-[#6c5eff] dark:group-hover:opacity-100"></div>
                  <AlertDialogCancel
                    asChild
                    variant="continueButton"
                    className=" w-full"
                    disabled={!checked}
                    onClick={handleEmitAlert}
                  >
                    <Link href="/" className="w-full">
                      <span className="relative w-full rounded-md bg-white/90 !px-5 !py-3 text-center transition-all duration-75 ease-in group-hover:bg-white group-hover:bg-opacity-0 dark:bg-gray-900/80  group-hover:dark:bg-gray-900 dark:group-hover:bg-opacity-0">
                        {t('continue')}
                      </span>
                    </Link>
                  </AlertDialogCancel>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full sm:hidden">
              <div className="group relative inline-flex focus:bg-transparent max-sm:w-full">
                <div className="transitiona-all animate-tilt absolute inset-3 min-w-full rounded-xl bg-gradient-to-r from-purple-300 via-red-400 to-purple-300 opacity-70 blur-lg backdrop-blur-lg duration-1000 group-hover:inset-1 group-hover:from-purple-300  group-hover:via-red-400 group-hover:to-purple-300  group-hover:opacity-100 group-hover:duration-200  dark:-inset-1 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:-inset-3 dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff] dark:group-hover:to-[#6c5eff]  dark:group-hover:opacity-100 max-sm:!w-full max-sm:-scale-x-110"></div>
                <AlertDialogAction
                  asChild
                  variant="loginButton"
                  className="max-sm:w-full"
                  onClick={handleEmitAlert}
                >
                  <Link href="/auth/login">
                    <span className="relative whitespace-nowrap rounded-md bg-white/90 !px-5 !py-3 text-center transition-all duration-75 ease-in group-hover:bg-white group-hover:bg-opacity-0 dark:bg-gray-900/80 group-hover:dark:bg-gray-900  dark:group-hover:bg-opacity-0 max-sm:w-full">
                      {t('login')}
                    </span>
                  </Link>
                </AlertDialogAction>
              </div>
            </div>
            <div className=" flex w-full sm:justify-end gap-4">
              <div className="group relative inline-flex focus:bg-transparent max-sm:hidden max-sm:w-full">
                <div className="transitiona-all animate-tilt absolute inset-3 min-w-full rounded-xl bg-gradient-to-r from-purple-300 via-red-400 to-purple-300 opacity-70 blur-lg backdrop-blur-lg duration-1000 group-hover:inset-1 group-hover:from-purple-300  group-hover:via-red-400 group-hover:to-purple-300  group-hover:opacity-100 group-hover:duration-200  dark:-inset-1 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:-inset-3 dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff] dark:group-hover:to-[#6c5eff]  dark:group-hover:opacity-100 max-sm:!w-full max-sm:-scale-x-110"></div>
                <AlertDialogAction
                  asChild
                  variant="loginButton"
                  className="max-sm:w-full"
                  onClick={handleEmitAlert}
                >
                  <Link href="/auth/login">
                    <span className="relative whitespace-nowrap rounded-md bg-white/90 !px-5 !py-3 text-center transition-all duration-75 ease-in group-hover:bg-white group-hover:bg-opacity-0 dark:bg-gray-900/80 group-hover:dark:bg-gray-900  dark:group-hover:bg-opacity-0 max-sm:w-full">
                      {t('login')}
                    </span>
                  </Link>
                </AlertDialogAction>
              </div>
              <div className="group  relative inline-flex focus:bg-transparent max-sm:w-full">
                <div className="transitiona-all animate-tilt absolute inset-3 rounded-xl bg-gradient-to-r from-purple-300  via-red-400 to-purple-300 opacity-70 blur-lg backdrop-blur-lg duration-1000 group-hover:inset-1 group-hover:from-purple-300 group-hover:via-red-400 group-hover:to-purple-300  group-hover:opacity-100  group-hover:duration-200 dark:-inset-1 dark:from-[#44BCFF] dark:via-[#448fff] dark:to-[#6c5eff] dark:group-hover:-inset-3 dark:group-hover:from-[#44BCFF] dark:group-hover:via-[#448fff] dark:group-hover:to-[#6c5eff] dark:group-hover:opacity-100 max-sm:w-full max-sm:-scale-x-110"></div>
                <AlertDialogAction
                  variant="registerButton"
                  className=" max-sm:w-full"
                  onClick={handleEmitAlert}
                >
                  <Link
                    className="whitespace-nowrap"
                    href="/auth/login?page=cadastro"
                  >
                    {t('register')}
                  </Link>
                </AlertDialogAction>
              </div>
            </div>
          </AlertDialogFooter>
          {shouldEmitAlert ? (
            <div className="flex justify-center pt-5 max-sm:pb-5 sm:hidden">
              <LocaleSwitcher setDisableClick={openChangeHandler} />
            </div>
          ) : null}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ) : null;
}

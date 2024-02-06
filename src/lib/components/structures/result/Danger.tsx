import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import CoefDescription from './CoefDescription';
import { useTranslations } from 'next-intl';
import { Button } from '../../ui/button';
import { Link } from '@/navigation';

type Props = {
  message: string;
  hasButton?: boolean;
};

function Danger({ message, hasButton = false }: Props) {
  const t = useTranslations('Inverters');
  return (
    <Alert
      variant="destructive"
      className="alert-margin-print-fixer mx-auto w-full"
    >
      <AlertDescription className="flex flex-col items-center justify-start gap-2">
        <div className="flex">
          <ExclamationTriangleIcon className="!mr-2 h-10 w-10 font-bold" />
          <AlertTitle className="text-2xl font-bold uppercase text-black">
          {t("AlertTitle")}
          </AlertTitle>
        </div>
        <div className="text-center font-bold sm:w-[70%]">{message}</div>
        {/* <div className="flex items-baseline">
          <span className="font-bold">{children}</span> <CoefDescription />
        </div> */}
        {hasButton ? (
          <div className="mt-2 print-hidden flex gap-5 items-baseline">
            <Button asChild variant="gradientRed">
              <Link href="/devices">{t("RemakeButton")}</Link>
            </Button>
            <Button asChild variant="gradientRed">
              <Link href="/grid">{t("ChangeGridButton")}</Link>
            </Button>
          </div>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

export default Danger;

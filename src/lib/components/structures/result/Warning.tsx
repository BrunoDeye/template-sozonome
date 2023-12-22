import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import CoefDescription from './CoefDescription';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
};

function Warning({ children }: Props) {
  const t = useTranslations('Inverters');
  const tC = useTranslations('Coef');
  return (
    <Alert
      variant="accent"
      className="print-hidden alert-margin-print-fixer mx-auto w-full"
    >
      <AlertDescription className="flex flex-col items-center justify-start gap-2">
        <div className="flex">
          <ExclamationTriangleIcon className="!mr-2 h-10 w-10 font-bold" />
          <AlertTitle className="text-2xl font-bold uppercase">
            Atenção
          </AlertTitle>
        </div>
        <div className="text-center sm:w-[70%]">{t('coefAlert')}:</div>
        <div className="flex items-baseline">
          <span className="font-bold">{children}</span> <CoefDescription message={tC('description')} />
        </div>
      </AlertDescription>
    </Alert>
  );
}

export default Warning;

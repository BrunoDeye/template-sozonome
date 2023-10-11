'use client';
import { useDataStore } from '@/store/data';
import { mapGridKeys } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Title() {
  const t = useTranslations('Result');
  const tYourGrid = useTranslations('Grids');
  const {
    state: { grid },
  } = useDataStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="title-margin-print-fixer mx-auto mb-8 max-w-4xl text-center">
      <h2 className="print-hidden text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h2>
      <p className="mt-2 text-sm leading-8">
        <span className="print-hidden">
          {t.rich('subtitle', {
            important: (chunck) => <strong className="dark:text-indigo-100">{chunck}</strong>
          })}
        </span>
        <span className="truncate">
          <span className="print-show-span print-grid invisible hidden">
            {tYourGrid('yourGrid')}{' '}
          </span>
          <strong className="print-grid tracking-tight print-show-span print-grid invisible hidden">
            {isClient ? tYourGrid(mapGridKeys(grid as any) as any)  : null}
          </strong>
        </span>
      </p>
      {/* <p className="leading-2 print-hidden mt-1 text-[13px] font-thin">
        Sua rede:{' '}
        <strong className="print-grid tracking-tight">
          {isClient ? grid : null}
        </strong>
      </p> */}
    </div>
  );
}

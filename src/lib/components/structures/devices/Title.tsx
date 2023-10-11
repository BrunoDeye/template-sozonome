'use client';
import { useDataStore } from '@/store/data';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

function Title() {
  const {
    state: { place },
  } = useDataStore();
  const t = useTranslations("Devices");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h2>
      <p className="mt-2 text-sm leading-8">
        {t('subtitle')}
      </p>
      <p className="leading-2 mt-1 text-[13px] font-thin">
        {t.rich('content', {
          important: (chunks) => <strong className="dark:text-indigo-100">{chunks}</strong>
        })}
      </p>
    </div>
  );
}

export default Title;

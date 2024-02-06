'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import { useDataStore } from '@/store/data';
import { useTranslations } from 'next-intl';
import {Link,usePathname, useRouter } from '@/navigation';
import { useEffect, useState } from 'react';

export default function RecalculateButton() {
  const t = useTranslations('ResultButtons');
  const {
    actions: { reset },
  } = useDataStore();
  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  function handleCleaning() {
    clearLocalStorage();
    useDataStore.persist.clearStorage();
    reset();
  }
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  
  useEffect(() => {
    if (isClient) {
      const myCalculation = localStorage.getItem('my-calculation');
      if (myCalculation !== null) {
        setIsEdit(true);
      }
    }
  }, [isClient]);

  return (
    isEdit ? null : <Button
      onClick={() => handleCleaning()}
      variant="gradientSky"
      size="large"
      className="!w-full -z-10 sm:mx-auto print-hidden"
      asChild
    >
      <Link href="/">{t('recalcButton')}</Link>
    </Button>
  );
}

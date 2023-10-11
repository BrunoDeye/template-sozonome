'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import { useDataStore } from '@/store/data';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

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

  return (
    <Button
      onClick={() => handleCleaning()}
      variant="gradientSky"
      className="w-full -z-10 sm:mx-auto sm:w-auto print-hidden"
      asChild
    >
      <Link href="/">{t('recalcButton')}</Link>
    </Button>
  );
}

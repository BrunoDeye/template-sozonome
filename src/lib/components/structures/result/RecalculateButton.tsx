'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import { useDataStore } from '@/store/data';
import Link from 'next/link';

export default function RecalculateButton() {
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
      className="w-full sm:mx-auto sm:w-auto print-hidden"
      asChild
    >
      <Link href="/">Recalcular do Início</Link>
    </Button>
  );
}

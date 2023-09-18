'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/data';

export default function RecalculateButton() {
  const router = useRouter();
  const { actions: { reset }} = useDataStore()
  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  function handleCleaning() {
    clearLocalStorage();
    useDataStore.persist.clearStorage()
    reset();
    localStorage.removeItem('calculator-storage');

    router.push('/ambiente');
  }

  return (
    <Button
      onClick={() => handleCleaning()}
      variant="gradientSky"
      className="w-full sm:w-auto sm:mx-auto"
    >
      Recalcular do Início
    </Button>
  );
}

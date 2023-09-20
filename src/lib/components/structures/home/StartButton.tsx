'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { useDataStore } from '@/store/data';
import { useEffect, useState } from 'react';

const StartButton = () => {
  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  const [starting, setStarting] = useState(false);
  const {
    state: { place },
    actions: { reset },
  } = useDataStore();
  function handleCleaning() {
    clearLocalStorage();
    useDataStore.persist.clearStorage();
    reset();
    setStarting(true);
  }
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid justify-items-center gap-2.5">
      <div className="flex items-center gap-2">
        {isClient ? (
          savedDevicesList() || place !== '' || starting ? (
            <>
              <Button asChild variant="gradientBlue">
                <Link href="/ambiente">Continuar Onde Parou</Link>
              </Button>
              <Button
                asChild
                onClick={() => handleCleaning()}
                variant="gradientSky"
              >
                <Link  href="/ambiente">Começar De Novo</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="gradientBlue">
              <Link href="/ambiente">Começar</Link>
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
};
export default StartButton;

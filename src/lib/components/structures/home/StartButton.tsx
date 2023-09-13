'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import Link from 'next/link';

const StartButton = () => {
  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  function handleCleaning() {
    clearLocalStorage();
    localStorage.removeItem('calculator-storage')
  }

  return (
    <div className="grid justify-items-center gap-2.5">
      <div className="flex items-center gap-2">
        {savedDevicesList() ? (
          <>
            <Button asChild variant="gradientBlue">
              <Link href="/grid">Continuar Onde Parou</Link>
            </Button>
            <Button asChild onClick={() => handleCleaning() } variant="gradientSky">
              <Link href="/grid">Começar De Novo</Link>
            </Button>
          </>
        ) : (
          <Button asChild variant="gradientBlue">
            <Link href="/grid">Começar</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
export default StartButton;

'use client';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { Button } from '../../ui/button';
import Link from 'next-intl/link';
import { useDataStore } from '@/store/data';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

type PropsType = {
  keepGoingButtonTxt: string;
  RestartButtonTxt: string;
  StartButtonTxt: string;
};

const StartButton = ({
  keepGoingButtonTxt,
  RestartButtonTxt,
  StartButtonTxt,
}: PropsType) => {
  const locale = useLocale();
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
                <Link href={`/termos-de-uso`}>{keepGoingButtonTxt}</Link>
              </Button>
              <Button
                asChild
                onClick={() => handleCleaning()}
                variant="gradientSky"
              >
                <Link href={`/termos-de-uso`}>{RestartButtonTxt}</Link>
              </Button>
            </>
          ) : (
            <Button asChild variant="gradientBlue">
              <Link href={`/termos-de-uso`}>{StartButtonTxt}</Link>
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
};
export default StartButton;

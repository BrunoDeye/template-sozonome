'use client';
import { useDataStore } from '@/store/data';
import { useEffect, useState } from 'react';

export default function Title() {
  const {
    state: { grid },
  } = useDataStore();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="mx-auto mb-3 max-w-4xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Local
      </h2>
      <p className="mt-2 text-sm leading-8">
        O lugar em que planeja fazer o cálculo é Residencial ou Industrial? 
      </p>
    </div>
  );
}
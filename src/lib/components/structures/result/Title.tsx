'use client';
import { useDataStore } from '@/store/data';
import { useEffect, useState } from 'react';

export default function Title() {
  const {
    state: { grid, systemType },
  } = useDataStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mx-auto mb-12 max-w-4xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Resultados
      </h2>
      <p className="mt-2 text-sm leading-8">
        Inversor(es) mais indicado(s) para sua rede{' '}
        <strong className="tracking-tight">{isClient ? grid : null}</strong> e
        escolha da Sua Bateria.
      </p>
      <p className="leading-2 mt-1 text-[13px] font-thin">
        Uma seleção de
        {isClient ? (
          systemType === 'AllInOne' ? (
            <strong className="dark:text-indigo-100"> All In Ones </strong>
          ) : (
            <>
              <strong className="dark:text-indigo-100"> Inversores </strong> e
              <strong className="dark:text-indigo-100"> Baterias </strong>
            </>
          )
        ) : null}
        ideais para você.
      </p>
    </div>
  );
}

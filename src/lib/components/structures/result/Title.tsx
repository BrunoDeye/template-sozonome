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
    <div className="title-margin-print-fixer mx-auto mb-8 max-w-4xl text-center">
      <h2 className="print-hidden text-3xl font-bold tracking-tight sm:text-4xl">
        Resultados
      </h2>
      <p className="mt-2 text-sm leading-8">
        <span className="print-hidden">
          Em seguida, serão apresentadas algumas recomendações de{' '}
          <strong className="dark:text-indigo-100"> Inversores </strong> e
          opções de <strong className="dark:text-indigo-100"> Baterias</strong>
          .
        </span>
        <span className="truncate">
          <span className="print-show-span print-grid invisible hidden">
            Sua rede:{' '}
          </span>
          <strong className="print-grid tracking-tight print-show-span print-grid invisible hidden">
            {isClient ? grid : null}
          </strong>
        </span>
      </p>
      {/* <p className="leading-2 print-hidden mt-1 text-[13px] font-thin">
        Sua rede:{' '}
        <strong className="print-grid tracking-tight">
          {isClient ? grid : null}
        </strong>
      </p> */}
    </div>
  );
}

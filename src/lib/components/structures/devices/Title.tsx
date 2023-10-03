'use client';
import { useDataStore } from '@/store/data';
import React, { useEffect, useState } from 'react';

function Title() {
  const {
    state: { place },
  } = useDataStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Equipamentos em Sua Residência
      </h2>
      <p className="mt-2 text-sm leading-8">
        Selecione o equipamento desejado a partir das opções do catálogo e
        especifique a quantidade desejada, ou preencha manualmente se
        necessário.
      </p>
      <p className="leading-2 mt-1 text-[13px] font-thin">
        Os valores de <strong className="dark:text-indigo-100">Potência [W]</strong>{' '}
        e <strong className="dark:text-indigo-100">Autonomia [h]</strong>{' '}
        são estimativas baseadas no consumo médio brasileiro. (Fonte: PROCEL)
      </p>
    </div>
  );
}

export default Title;

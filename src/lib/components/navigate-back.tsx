'use client';

import { Button } from '@/lib/components/ui/button';
import { useDataStore } from '@/store/data';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export function NavigateBack() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    actions: { addSystemType, addGrid },
    state: { grid },
  } = useDataStore();

  const handleClick = () => {
    if (pathname === '/tipo') {
      router.prefetch('/ambiente');
      addSystemType('');
    }

    if (pathname === '/grid') {
      addGrid('');
    }

    if (pathname === '/termos-de-uso') {
      router.prefetch('/');
      router.push('/');
    } else {
      router.back();
    }
  };

  return pathname === '/' ? null : (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <ArrowBigLeft /> Voltar
    </Button>
  );
}

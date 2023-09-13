'use client';

import { Button } from '@/lib/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export function NavigateBack() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    pathname === '/' ? null :
    <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowBigLeft /> Voltar
    </Button>
  );
}

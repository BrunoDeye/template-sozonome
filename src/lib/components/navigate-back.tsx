'use client';

import { Button } from '@/lib/components/ui/button';
import { useDataStore } from '@/store/data';
import { ArrowBigLeft } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next-intl/client';
import { useEffect, useState, useTransition } from 'react';

export function NavigateBack() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [tempLocale, setTempLocale] = useState(locale);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('BackButton');

  const {
    actions: { addSystemType, addGrid, addBatteryModel },
    state: { grid },
  } = useDataStore();

  const handleClick = () => {
    if (pathname === `/tipo`) {
      router.prefetch(`/${locale}/ambiente`);
      addSystemType('');
    }

    if (pathname === `/grid`) {
      addGrid('');
    }

    if (pathname === `/baterias`) {
      addBatteryModel('');
    }

    if (pathname === `/termos-de-uso`) {
      startTransition(() => {
        router.replace('/', { locale: locale });
      });
    } else if (pathname === `/grid`) {
      startTransition(() => {
        router.replace('/termos-de-uso', { locale: locale });
      });
    } else if (pathname === `/devices`) {
      startTransition(() => {
        router.replace('/grid', { locale: locale });
      });
    } else if (pathname === `/baterias`) {
      startTransition(() => {
        router.replace('/devices', { locale: locale });
      });
    } else {
      startTransition(() => {
        router.replace('/baterias', { locale: locale });
      });
    }
  };

  useEffect(() => {
    if (locale !== tempLocale) {
      router.replace(pathname, { locale: tempLocale });
    }
  }, [tempLocale]);

  return pathname === `/${locale}` || pathname === '/' ? (
    <div>&nbsp;</div>
  ) : (
    <Button
      className={isPending ? 'transition-opacity [&:disabled]:opacity-30' : ''}
      variant="ghost"
      size="sm"
      onClick={handleClick}
    >
      <ArrowBigLeft /> {t('label')}
    </Button>
  );
}

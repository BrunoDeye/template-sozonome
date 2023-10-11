'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter  } from 'next-intl/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import Image from 'next/image';
import esFlag from '@/images/countries/es.svg';
import brFlag from '@/images/countries/br.svg';
import gbFlag from '@/images/countries/gb.svg';
import itFlag from '@/images/countries/it.svg';
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';
import useSelectInteractionFix from './hooks/useSelectInteractionFix';
import { ChevronDown } from 'lucide-react';
import LoadingDeye from './Loading';

const languages = [
  {
    locale: 'pt-BR',
    svg: brFlag,
    alt: "The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a thin white convex horizontal band inscribed with the national motto 'Ordem e Progresso' across its center.",
  },
  {
    locale: 'en',
    svg: gbFlag,
    alt: 'The flag of the United Kingdom — the Union Jack — has a blue field. It features the white-edged red cross of Saint George superimposed on the diagonal red cross of Saint Patrick which is superimposed on the diagonal white cross of Saint Andrew.',
  },
  {
    locale: 'it-IT',
    svg: itFlag,
    alt: 'The flag of Italy is composed of three equal vertical bands of green, white and red.',
  },
  {
    locale: 'es-ES',
    svg: esFlag,
    alt: 'The flag of Spain is composed of three horizontal bands of red, yellow and red, with the yellow band twice the height of the red bands. In the yellow band is the national coat of arms offset slightly towards the hoist side of center.',
  },
];

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const handleOpenChange = useSelectInteractionFix('#__next');

  useEffect(() => {
    setMounted(true);
  }, []);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // console.log(nextLocale)
      router.replace(pathname, { locale: nextLocale });
    });
  }

  if (!mounted) return <></>;

  return (
    isPending ? <div className='min-w-[205px]'></div>  :
    <div className="z-[9999] max-w-[205px] min-w-[205px] min-h-[50px] h-[50px] w-[205px] transition-all">
      <Select
        onOpenChange={handleOpenChange}
        onValueChange={onSelectChange}
        defaultValue={locale}
      >
        <SelectTrigger className="bg-base-100/80 bg-gray-50 dark:bg-black shadow-inner shadow-slate-300 dark:shadow-blue-400 h-full w-full border-none pl-6 backdrop-blur-md">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-base-100/80 mx-auto border-none px-0 backdrop-blur-md sm:w-[200px] sm:!min-w-full sm:!max-w-full">
          <SelectGroup className="mx-auto !max-w-full">
            <SelectLabel
              className={clsx(
                'relative px-0 text-gray-400',
                isPending && 'transition-opacity [&:disabled]:opacity-30'
              )}
            >
              <p className="sr-only px-0">{t('label')}</p>
            </SelectLabel>
            {languages.map((cur) => (
              <SelectItem
                className="z-[9999] w-full"
                key={cur.locale}
                value={cur.locale}
              >
                <div className="flex h-[50px] w-[50px] items-center gap-3">
                  <Image
                    className="px-0 transition-all"
                    height={40}
                    width={40}
                    src={cur.svg}
                    alt={cur.alt}
                  />
                  <p className="">
                    {t('locale', { locale: cur.locale.replace(/-.*$/, '') })}
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

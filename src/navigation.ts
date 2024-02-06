import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'it-IT', 'pt-BR', 'es-ES'] as const;
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});
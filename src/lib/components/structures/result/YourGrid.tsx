'use client';
import { useDataStore } from '@/store/data';
import { mapGridKeys } from '@/utils/functions';
import { useTranslations } from 'next-intl';
import React from 'react'

function YourGrid() {

  const t = useTranslations('Grids');
  const {
    state: { grid },
  } = useDataStore();

  return (
    <p className="leading-2 print-hidden mt-1 text-center text-[13px] font-thin">
          {t('yourGrid')}{' '}
          <strong className="print-grid tracking-tight">
            {t(mapGridKeys(grid as any) as any)}
          </strong>
        </p>
  )
}

export default YourGrid;
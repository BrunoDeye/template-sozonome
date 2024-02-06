'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/button';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

function PrintButton() {
  const t = useTranslations('ResultButtons');
  const { theme, systemTheme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isClient) {
      const myCalculation = localStorage.getItem('my-calculation');
      if (myCalculation !== null) {
        setIsEdit(true);
      }
    }
  }, [isClient]);

  const handleClick = async () => {
    setTheme('light');
    setTimeout(() => {
      window.print();
    }, 600);
    setTimeout(() => {
      setTheme(theme || (systemTheme as string));
    }, 1000);
  };

  return isClient ? (
    isEdit ? null : (
      <Button
        size="large"
        className="print-hidden -z-10 !w-full"
        variant="gradientDefault"
        onClick={handleClick}
      >
        {t('printButton')}
      </Button>
    )
  ) : null;
}

export default PrintButton;

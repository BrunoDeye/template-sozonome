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

  const handleClick = async () => {
    setTheme('light');
    setTimeout(() => {
      window.print();
    }, 600);
    setTimeout(() => {
      setTheme(theme || systemTheme as string);
    }, 1000);
    
  };

  return isClient ? (
    <Button className="print-hidden -z-10 w-full sm:w-auto" variant="gradientDefault" onClick={handleClick}>
      {t('printButton')}
    </Button>
  ) : null;
}

export default PrintButton;

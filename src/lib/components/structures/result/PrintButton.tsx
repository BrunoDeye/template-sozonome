'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { useTheme } from 'next-themes';

function PrintButton() {
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
    <Button className="print-hidden w-full sm:w-auto" variant="gradientDefault" onClick={handleClick}>
      Imprimir Resultado
    </Button>
  ) : null;
}

export default PrintButton;

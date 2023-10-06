'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { LucideInfo } from 'lucide-react';
import { useEffect, useState } from 'react';

const TCDescription = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-full hover:-translate-x-[1px] hover:-translate-y-[1px] hover:bg-sky-200 dark:hover:bg-sky-500"
      >
        <LucideInfo height={18} width={18} />
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-40 sm:w-80 p-3 text-justify "
      >
        <p>
          Valor recomendado para mitigar perdas no sistema, sendo
          essencial contactar um engenheiro projetista para dimensionar com
          precisão este valor.
        </p>
        <br/>
        <p>Recomendação: Entre 0,94 e 0,87</p>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default TCDescription;

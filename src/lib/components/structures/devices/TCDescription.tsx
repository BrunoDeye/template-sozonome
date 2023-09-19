'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/components/ui/tooltip';
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
        className="w-60 p-3 text-justify "
      >
        <p>
          O fator de correção é usado para compensar as perdas no sistema e pode
          variar dentro da faixa de 0,87 a 0,94.
        </p>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default TCDescription;

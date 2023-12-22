'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { LucideInfo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {
  message: string
}


const CoefDescription = ({ message }: Props) => {
  const t = useTranslations('Coef');
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
        className="print-hidden z-50 ml-1 translate-y-1 rounded-full hover:bg-sky-200 dark:hover:bg-sky-500"
      >
        <LucideInfo height={18} width={18} />
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        side="top"
        className="w-40 p-3 text-justify sm:w-80 "
      >
        { message }
        
      </PopoverContent>
    </Popover>
  ) : null;
};

export default CoefDescription;

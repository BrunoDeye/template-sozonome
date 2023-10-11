'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { LucideInfo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const TCDescription = () => {
  const t = useTranslations("Devices");
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
        {t.rich('TCDescription',{
          br: () => <br />,
        })}
      </PopoverContent>
    </Popover>
  ) : null;
};

export default TCDescription;

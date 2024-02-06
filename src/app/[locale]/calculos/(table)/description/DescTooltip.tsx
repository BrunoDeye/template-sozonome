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
  description: string | null
}

const DescTooltip = ({description}: Props) => {
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
    !description ? null :
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="print-hidden z-50 p-3 rounded-full hover:bg-sky-200 dark:hover:bg-sky-500"
      >
        <div className='truncate max-w-[130px]'>{description}</div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        side="bottom"
        className="w-[75vw] p-3 text-justify whitespace-normal overflow-hidden sm:w-80 "
      >
        {description}
      </PopoverContent>
    </Popover>
  ) : null;
};

export default DescTooltip;

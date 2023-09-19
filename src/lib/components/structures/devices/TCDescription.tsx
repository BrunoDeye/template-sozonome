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

const TCDescription = () => {
  
  return (
    <Popover>
      <PopoverTrigger className='hover:bg-sky-500 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:underline rounded-full'>
        <LucideInfo height={18} width={18} />
      </PopoverTrigger>
      <PopoverContent className="w-60 text-justify p-3">
        <p>
          O fator de correção é usado para compensar as perdas no sistema e
          pode variar dentro da faixa de 0,87 a 0,94.
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default TCDescription;

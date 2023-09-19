import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/components/ui/tooltip';
import { LucideInfo } from 'lucide-react';

const TCDescription = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <LucideInfo height={18} />
        </TooltipTrigger>
        <TooltipContent className="w-60 text-justify">
          <p>
            Fator de correção destinado a corrigir as perdas no sistemas,
            variando entre 0,87 a 0,94.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TCDescription;

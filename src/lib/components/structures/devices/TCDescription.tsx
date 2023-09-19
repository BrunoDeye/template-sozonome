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
            O fator de correção é usado para compensar as perdas no sistema e
            pode variar dentro da faixa de 0,87 a 0,94.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TCDescription;

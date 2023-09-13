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
        <TooltipContent className='w-60 text-justify'>
          <p>
            Esse fator é empregado no cálculo em função dos diversos fatores
            ligados ao fator de potência, harmônicas, corrente de fuga e outros.
            O valor recomendado é 87%, mas pode variar na faixa de 85% a 93%.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TCDescription;

import { Button } from '@/lib/components/ui/button';
import { Checkbox } from '@/lib/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SuccessDialog({ open = true, setOpen }: Props) {
  const t = useTranslations('SuccessDialog')

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="flex  flex-col items-center justify-around sm:min-h-[325px] sm:max-w-[525px]">
        <DialogHeader className="">
          <DialogTitle className="mb-8 text-center">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-justify">
            {t.rich('content', {
              p: (chunks) => <p className='mt-6'>{chunks}</p>,
              strong: (chunks) => <span className="font-bold tracking-tight">{chunks}</span>
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          
          <Button onClick={() => setOpen(false)} type="submit">
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

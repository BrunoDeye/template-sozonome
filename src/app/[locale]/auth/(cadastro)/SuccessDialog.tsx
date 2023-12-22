import LoadingDeye from '@/lib/components/Loading';
import { Button } from '@/lib/components/ui/button';
import { Checkbox } from '@/lib/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
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
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alert: { status: string; message: string };
  isLoading: boolean;
};

export default function SuccessDialog({
  open = true,
  setOpen,
  alert,
  isLoading,
}: Props) {
  const t = useTranslations('SuccessDialog');
  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    if(!isLoading && !isLoaded) {
      setIsloaded(true)
    }
  }, [isLoading])

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="flex  flex-col items-center justify-around sm:min-h-[325px] sm:max-w-[525px]">
        {isLoading || alert.status === '' || !isLoaded ? (
          <DialogHeader className="">
            <DialogTitle className="mb-8 text-center">
              Processando...
            </DialogTitle>

            <DialogDescription className="text-justify">
              <LoadingDeye />
            </DialogDescription>
          </DialogHeader>
        ) : alert.status === 'error' ? (
          <DialogHeader className="">
            <DialogTitle className="mb-8 text-center">
              Algo deu Errado
            </DialogTitle>

            <DialogDescription className="text-justify">
              {alert.message}
            </DialogDescription>
          </DialogHeader>
        ) : alert.status === 'success' ? (
          <DialogHeader className="">
            <DialogTitle className="mb-8 text-center">{t('title')}</DialogTitle>

            <DialogDescription className="text-justify">
              {t.rich('content', {
                p: (chunks) => <p className="mt-6">{chunks}</p>,
                strong: (chunks) => (
                  <span className="font-bold tracking-tight">{chunks}</span>
                ),
              })}
            </DialogDescription>
          </DialogHeader>
        ) : (
          <LoadingDeye />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>{t('confirm')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

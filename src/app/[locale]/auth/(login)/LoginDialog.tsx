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

export default function LoginDialog({
  open = true,
  setOpen,
  alert,
  isLoading,
}: Props) {
  const t = useTranslations('SuccessDialog');
  const [isLoaded, setIsloaded] = useState(false);
  const [loadedStatus, setLoadedStatus] = useState('');

  useEffect(() => {
    if (!isLoading && !isLoaded) {
      setIsloaded(true);
    }

    if (alert.status === 'success') {
      setLoadedStatus('success');
    } else if (alert.status === 'error') {
      setLoadedStatus('error');
    }

    return () => setIsloaded(false);
  }, [isLoading]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex  flex-col items-center justify-around sm:max-w-[525px]">
        {!isLoaded ? (
          <DialogHeader className="">
            <DialogTitle className="mb-8 text-center">
              Processando...
            </DialogTitle>

            <DialogDescription className="my-auto text-center">
              <p className="m-5">
                <LoadingDeye />
              </p>
            </DialogDescription>
          </DialogHeader>
        ) : loadedStatus === 'error' ? (
          <DialogHeader className="min-h-[100px]">
            <DialogTitle className="mb-8 text-center">
              Algo deu Errado
            </DialogTitle>

            <DialogDescription className="text-center">
              <p className="mb-5">{alert.message}</p>
            </DialogDescription>
          </DialogHeader>
        ) : loadedStatus === 'success' || isLoaded ? (
          <DialogHeader className="">
            <DialogTitle className="mb-8 text-center">
              {alert.message}
            </DialogTitle>
          </DialogHeader>
        ) : (
          <LoadingDeye />
        )}
         {!isLoaded ? null : (
          <DialogFooter className="mt-auto">
            <DialogClose asChild>
              <Button>{t('confirm')}</Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

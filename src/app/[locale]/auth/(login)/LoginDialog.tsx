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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/components/ui/alert-dialog"
import { useRouter } from '@/navigation';

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

  const [message, setMessage] = useState(alert.message);
  const router = useRouter();

  useEffect(() => {
    if (alert.message) {
      setMessage(alert.message);
    }
  }, [alert.message]);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex  flex-col items-center justify-around sm:max-w-[525px]">
        {!isLoaded ? (
          <AlertDialogHeader className="">
            <AlertDialogTitle className="mb-8 text-center">
              {t("processing")}
            </AlertDialogTitle>

            <AlertDialogDescription className="my-auto text-center">
              <p className="m-5">
                <LoadingDeye />
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        ) : loadedStatus === 'error' ? (
          <AlertDialogHeader className="min-h-[100px]">
            <AlertDialogTitle className="mb-8 text-center">
              {t("somethingWrong")}
            </AlertDialogTitle>

            <AlertDialogDescription className="text-center">
              <p className="mb-5">{message}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        ) : loadedStatus === 'success' || isLoaded ? (
          <AlertDialogHeader className="">
            <AlertDialogTitle className="mb-8 text-center">
              {message}
            </AlertDialogTitle>
          </AlertDialogHeader>
        ) : (
          <LoadingDeye />
        )}
         {!isLoaded ? null : (
          <AlertDialogFooter className="mt-auto">
            <AlertDialogAction onClick={() => router.refresh()} asChild>
              <Button>{t('confirm')}</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

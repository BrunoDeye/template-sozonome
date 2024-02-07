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
} from '@/lib/components/ui/alert-dialog';
import { useRouter } from '@/navigation';
import { server } from '@/url';
import { Calculation } from '@/app/client/prisma';
import DeleteButton from './DeleteButton';
import { useTranslations } from 'next-intl';


type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  headers: any
};



export function DeleteDialog({ open = true, setOpen, id, headers }: Props) {
  const t = useTranslations("DeleteDialog")
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='!px-6'>
        <AlertDialogHeader className='flex !flex-col items-center w-full'>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
          {t("subtitle")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex !justify-center w-full'>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            variant="gradientGhost"
          >
            {t("cancel")}
          </AlertDialogCancel>
          <DeleteButton id={id} headers={headers} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

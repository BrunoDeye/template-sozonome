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


type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  headers: any
};



export function DeleteDialog({ open = true, setOpen, id, headers }: Props) {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem absoluta certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            variant="gradientGhost"
          >
            Cancel
          </AlertDialogCancel>
          <DeleteButton id={id} headers={headers} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

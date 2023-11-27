'use client';

import { CalcBodyType } from '@/app/api/calculations/(types)/body';
import { Button } from '@/lib/components/ui/button';
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
import { useDataStore } from '@/store/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import { useRouter, usePathname } from '@/navigation';
import LoadingDeye from '@/lib/components/Loading';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Tem que conter pelo menos 2 caracteres.',
    })
    .max(20, {
      message: 'Limite de 20 caracteres.',
    }),
  description: z.string().optional(),
});

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  headers: any;
};

export default function SaveModal({
  open = true,
  setOpen,
  isEdit,
  setIsEdit,
  headers,
}: Props) {
  const {
    state: {
      grid,
      totalPower,
      totalEnergy,
      batteryModel,
      batteryQty,
      recommendedInverter,
      inverterQty,
    },
  } = useDataStore();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [saveData, setSaveData] = useState<CalcBodyType>();
  const [isClient, setIsClient] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const devicesList = localStorage.getItem('devices-list');
      const editCalculation = localStorage.getItem('my-calculation');
      devicesList &&
        setSaveData({
          id: editCalculation ? JSON.parse(editCalculation).id : null,
          batteryQty: batteryQty,
          devicesList: devicesList,
          grid: grid,
          inverterQty: inverterQty,
          recommendedInverter: recommendedInverter,
          selectedBattery: batteryModel,
          totalEnergy: totalEnergy,
          totalPower: totalPower,
          title: '',
          description: '',
        });

      if (editCalculation !== null) {
        form.setValue('title', JSON.parse(editCalculation).title);
        form.setValue('description', JSON.parse(editCalculation).description);
        setIsEdit(true);
      }
    }
  }, [
    isClient,
    batteryQty,
    grid,
    inverterQty,
    recommendedInverter,
    batteryModel,
    totalEnergy,
    totalPower,
  ]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { title, description } = values;
      if (isEdit) {
        startTransition(async () => {
          const result = await fetch('/api/calculations/update', {
            method: 'PATCH',
            body: JSON.stringify({ ...saveData, title, description }),
            headers,
          });
          localStorage.removeItem('my-calculation');
          setIsEdit(false);
          setOpen(false);
          router.prefetch(`/calculos?previous=${pathname}`);
          router.refresh();
          router.push(`/calculos?previous=${pathname}`);
        });
      } else {
        startTransition(async () => {
          const result = await fetch('/api/calculations/create', {
            method: 'POST',
            body: JSON.stringify({ ...saveData, title, description }),
            headers,
          });
          setOpen(false);
          router.refresh();
        });
      }
    } catch (error: any) {
      console.log({ error });
    }
    console.log(values);
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="flex  flex-col items-center justify-around sm:min-h-[325px] sm:max-w-[525px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 sm:px-9"
          >
            {isPending ? (
              <LoadingDeye />
            ) : (
              <>
                <DialogHeader className="">
                  <DialogTitle className="mb-6 text-center">
                    Salvar Cálculo
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Para salvar defina um{' '}
                    <span className="font-bold">título</span> e uma{' '}
                    <span className="font-bold">descrição</span> para o seu
                    cálculo, a descrição é{' '}
                    <span className="font-bold">opcional</span>.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="flex justify-center">
                  <Button
                    variant="gradientGreen"
                    className="w-full sm:mx-auto sm:w-auto"
                    type="submit"
                    size="large"
                  >
                    {isEdit ? 'Atualizar Cálculo' : 'Salvar Cálculo'}
                  </Button>
                </DialogFooter>{' '}
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

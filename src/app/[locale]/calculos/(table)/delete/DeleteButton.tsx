import { AlertDialogAction } from '@/lib/components/ui/alert-dialog';
import { server } from '@/url';
import { Calculation } from '@/app/client/prisma';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: number
  headers: any
}

function DeleteButton({ id, headers }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = (await fetch(server + '/api/calculations', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: headers,
    })
      .then((data) => data.json())
      .then((data) => data)) as Calculation;
    console.log(result)
    router.refresh()
  }

  return (
    <AlertDialogAction
      onClick={async () => await handleDelete()}
      variant="gradientRed"
    >
      Deletar
    </AlertDialogAction>
  );
}

export default DeleteButton;

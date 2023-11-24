'use client';
import CalcsTableColumnHeader from './CalcsHeaderTable';
import { Calculation } from '@/app/client/prisma';
import CalcsToggleTable from './CalcsToggleTable';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Button } from '@/lib/components/ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import { Link } from '@/navigation';
import DescTooltip from './description/DescTooltip';
import DataTooltip from './description/DataTooltip';
import { editCalc, printExternal } from './columns';
import { server } from '@/url';
import { DeleteDialog } from './delete/DeleteDialog';
import { useState } from 'react';

export const mobileColumns: ColumnDef<Calculation>[] = [

  {
    accessorKey: 'description',
    id: 'Informações',
    header: () => <div className='absolute mx-auto max-[330px]:w-[230px] w-[280px] top-5 left-0 bottom-0 right-0'>Cálculos</div>,
    cell: ({ row, table, additionalProp }) => {
      const data = row.original
      return (<DataTooltip data={data} />)
    }
  },

  {
    accessorKey: 'actions',
    id: 'Ações',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row, additionalProp }) => {
      const calculations = row.original;
      const [open, setOpen] = useState(false);

      return (
        <>
          <DeleteDialog
            open={open}
            setOpen={setOpen}
            id={calculations.id}
            headers={additionalProp}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mr-4 h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  printExternal(server + '/result?print=true', calculations);
                }}
              >
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  onClick={() => editCalc(calculations)}
                  href={{ pathname: '/devices', query: { edit: 'true' } }}
                >
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="text-red-500"
              >
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

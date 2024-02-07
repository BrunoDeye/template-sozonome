'use client';
import CalcsTableColumnHeader from './CalcsHeaderTable';
import { Calculation } from '@/app/client/prisma';
import CalcsToggleTable from './CalcsToggleTable';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { Button } from '@/lib/components/ui/button';
import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
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
import { useTranslations } from 'next-intl';
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDownToDot, ChevronDown } from 'lucide-react';

export const mobileColumns: ColumnDef<Calculation>[] = [
  {
    accessorKey: 'description',
    id: 'Informações',
    header: () => {
      const t = useTranslations('mobileTable');
      return (
          t('title')
      );
    },
    cell: ({ row, table, additionalProp }) => {
      const data = row.original;
      return <DataTooltip data={data} />;
    },
  },

  {
    accessorKey: 'actions',
    id: 'Ações',

    header: () => <DotsHorizontalIcon />,
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row, additionalProp }) => {
      const calculations = row.original;
      const [open, setOpen] = useState(false);
      const t = useTranslations('mobileTable');
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
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  printExternal(server + '/result?print=true', calculations);
                }}
              >
                {t('print')}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  onClick={() => editCalc(calculations)}
                  href={{ pathname: '/devices', query: { edit: 'true' } }}
                >
                  {t('edit')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="text-red-500"
              >
                {t('del')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

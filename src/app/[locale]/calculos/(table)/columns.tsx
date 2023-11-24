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
import { server } from '@/url';
import { DeleteDialog } from './delete/DeleteDialog';
import { useState } from 'react';
import { getServerSession } from 'next-auth/next';
import DescTooltip from './description/DescTooltip';
import { useTranslations } from 'next-intl';

export function printExternal(url: string, calc: Calculation) {
  var printWindow = window.open(
    url,
    'Print',
    'left=200, top=200, width=950, height=500, toolbar=0, resizable=0'
  );

  if (printWindow !== null) {
    printWindow.localStorage.setItem(
      'my-print-calculation',
      JSON.stringify(calc)
    );
    const theme = printWindow.localStorage.getItem('theme');
    if (theme === 'dark') {
      printWindow.localStorage.setItem('theme', 'light');
    }
    const print = function () {
      if (Boolean((printWindow! as any).chrome)) {
        setTimeout(function () {
          printWindow!.print();
        }, 2000);
      } else {
        printWindow!.print();
        printWindow!.close();
      }
    };

    const close = function () {
      printWindow!.close();
      printWindow!.removeEventListener('afterprint', close);
      printWindow!.removeEventListener('DOMContentLoaded', print);
      printWindow!.localStorage.removeItem('my-print-calculation');
      if (theme === 'dark') {
        printWindow!.localStorage.setItem('theme', 'dark');
      }
    };

    printWindow.addEventListener('afterprint', close);
    printWindow.addEventListener('DOMContentLoaded', print, true);
  }
}

export function editCalc(calc: Calculation) {
  localStorage.setItem('my-temp-calculation', JSON.stringify(calc));
  localStorage.setItem('my-calculation', JSON.stringify(calc));
}

export const columns: ColumnDef<Calculation>[] = [
  {
    accessorKey: 'title',
    id: 'title',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('titleColumn')} />
      );
    },
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('descColumn')} />
      );
    },
    cell: ({ row, table, additionalProp }) => {
      const data = row.original;
      return <DescTooltip description={data.description} />;
    },
  },
  {
    accessorKey: 'inverterQty',
    id: 'inverterQty',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('qtyInverterColumn')} />
      );
    },
  },

  {
    accessorKey: 'recommendedInverter',
    id: 'recommendedInverter',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('inverterColumn')} />
      );
    },
  },
  {
    accessorKey: 'batteryQty',
    id: 'batteryQty',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('qtyBatteryColumn')} />
      );
    },
  },
  {
    accessorKey: 'selectedBattery',
    id: 'selectedBattery',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('batteryColumn')} />
      );
    },
  },
  {
    accessorKey: 'grid',
    id: 'grid',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('gridColumn')} />
      );
    },
  },
  {
    accessorKey: 'totalPower',
    id: 'totalPower',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('powerColumn')} />
      );
    },
  },
  {
    accessorKey: 'totalEnergy',
    id: 'totalEnergy',
    header: ({ column }: HeaderContext<Calculation, unknown>) => {
      const t = useTranslations('Calculations');
      return (
        <CalcsTableColumnHeader column={column} title={t('energyColumn')} />
      );
    },
  },

  {
    accessorKey: 'actions',
    id: 'Ações',
    header: '',
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
    cell: ({ row, table, additionalProp }) => {
      const calculations = row.original;
      const [open, setOpen] = useState(false);
      const t = useTranslations('Calculations');

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
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];

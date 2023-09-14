import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/lib/components/ui/table';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

const tableVariants = cva('', {
  variants: {
    variant: {
      default:
        'rounded-lg border bg-gradient-to-br from-gray-100 to-blue-200 font-semibold text-sky-600 shadow-lg hover:from-gray-200 hover:to-sky-400 hover:text-sky-700 dark:border-sky-500 dark:from-blue-600 dark:to-blue-400 dark:!text-white dark:shadow-md dark:shadow-sky-600 dark:hover:from-blue-700 dark:hover:to-indigo-300 dark:hover:!text-sky-100',
      sky: 'rounded-lg border bg-gradient-to-br from-gray-100 to-sky-200 font-semibold text-sky-600 shadow-lg hover:from-gray-200 hover:to-sky-400 hover:text-sky-700 dark:border-sky-500 dark:from-sky-600 dark:to-sky-400 dark:!text-white dark:shadow-md dark:shadow-sky-600 dark:hover:from-sky-700 dark:hover:to-blue-300 dark:hover:!text-sky-100',
      darkBlue:
        'rounded-lg border bg-gradient-to-br from-gray-100 to-blue-400 font-semibold text-blue-600 shadow-lg hover:from-gray-200 hover:to-blue-600 hover:!text-blue-800 hover:text-sky-700 dark:border-sky-500 dark:from-blue-800 dark:to-sky-600 dark:!text-white dark:shadow-md dark:shadow-sky-600 dark:hover:from-blue-700 dark:hover:to-blue-300 dark:hover:!text-sky-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const inverters = [
  {
    model: 'SUN-8K-SG01LP1-US',
    nominalPower: 8000,
    quantity: 1,
  },
  {
    model: 'SUN-5K-SG01LP1-US',
    nominalPower: 5000,
    quantity: 2,
  },
];

const defaultData = [
  {
    attribute: 'Inversor',
    value: 'SUN-3K-SG01/03LP1-BR',
  },
  {
    attribute: 'Tipo',
    value: 'BR',
  },
  {
    attribute: 'Potência[W]',
    value: '8000',
  },
  {
    attribute: 'Quantidade',
    value: '2',
  },
];

type TableData = {
  attribute: string;
  value: string | number;
};

type TableProps = VariantProps<typeof tableVariants> & {
  data: TableData[];
  description?: string;
};

export default function Tables({
  variant,
  data = defaultData,
  description = 'Esse Inversor só aceita Baterias do modelo: High Voltage(HV).',
}: TableProps) {
  return (
    <div className="w-full sm:p-4 trasition-all">
      <div className={cn(tableVariants({ variant }))}>
        <Table>
          {description === '' ? null :<TableCaption className="px-4 pb-2 text-[10px] text-gray-600 dark:text-gray-100">
            {description}
          </TableCaption>}
          
          <TableHeader>
            <TableRow className="border-gray-200 dark:border-sky-300">
              <TableHead className="w-[100px] text-gray-600 dark:font-bold dark:text-sky-100">
                {data[0].attribute}
              </TableHead>

              <TableHead className="text-right text-gray-600 dark:text-sky-100">
                {data[0].value}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(1).map((attribute) => (
              <TableRow
                key={attribute.attribute}
                className="border-gray-200 dark:border-sky-300"
              >
                <TableCell className="font-medium">
                  {attribute.attribute}
                </TableCell>

                <TableCell className="text-right">{attribute.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

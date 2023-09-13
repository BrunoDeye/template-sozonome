'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';
import { Button } from '@/lib/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/lib/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import { useState } from 'react';
import { devices } from '@/utils/constants';
import { removeAccents } from '@/utils/functions';

type DeviceListProps = {
  handleEquipList: (
    id: number,
    powerValue: number,
    hours: number,
    equipName: string
  ) => void;
  id: number;
};

const DevicesList = ({ handleEquipList, id }: DeviceListProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const normalizedDevices = devices.map((device) => ({
    ...device,
    value: removeAccents(device.value),
    label: device.value,
  }));

  const handleClick = () => {
    const selectedDevice = normalizedDevices.find((device) =>
      device.value
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(value.toLowerCase().replace(/\s+/g, ''))
    );

    handleEquipList(
      id,
      selectedDevice!.powerW,
      selectedDevice!.hours,
      selectedDevice!.label
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="gradientBlue">
          Catálogo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Catálogo de Dispositivos Domésticos</DialogTitle>
          <DialogDescription className="flex justify-center">
            A seguir, destacamos os principais equipamentos comuns nas
            residências brasileiras, acompanhados por estimativas de sua
            Potência e Uso Diário.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="mx-auto w-full justify-between"
              >
                {value
                  ? normalizedDevices.find((device) =>
                      device.value
                        .toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(value.toLowerCase().replace(/\s+/g, ''))
                    )?.label
                  : 'Escolha um equipamento...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="!mx-0 h-[200px] w-[280px]">
              <Command>
                <CommandInput
                  className="my-1 focus:border-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Buscar na lista ou selecionar..."
                />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup className="overflow-y-scroll">
                  {normalizedDevices.map((device) => (
                    <CommandItem
                      key={device.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                      value={device.value}
                    >
                      <Check
                        width="100%"
                        height="100%"
                        min="100%"
                        preserveAspectRatio="xMaxYMax meet"
                        className={cn(
                          'ml-1 mr-2 h-4 w-4 min-w-[15px] max-w-[15px]',
                          device.value
                            .toLowerCase()
                            .replace(/\s+/g, '')
                            .includes(
                              (value || '-1').toLowerCase().replace(/\s+/g, '')
                            )
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {device.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </DialogFooter>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              disabled={value === ''}
              onClick={handleClick}
              variant="gradientSky"
              className="w-full"
              type="submit"
            >
              Confirmar
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DevicesList;

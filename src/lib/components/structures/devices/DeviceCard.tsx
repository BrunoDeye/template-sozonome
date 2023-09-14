'use client';
import { useEffect, useState } from 'react';
import Counter from './Counter';
import { useDataStore } from '@/store/data';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import DisplayTotal from './DisplayTotal';
import { Separator } from '../../ui/separator';
import TCDescription from './TCDescription';
import DevicesList from './DevicesList';
import { Edit3 } from 'lucide-react';
import Link from 'next/link';
import { Router } from 'next/router';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

const initialState = [
  {
    id: 0,
    quantity: 1,
    powerValue: 0,
    energyValue: 0,
    hours: 0,
    equipName: '',
    selected: false,
    manual: false,
    powerValueIsEditing: false,
    hoursIsEditing: false,
  },
];

const DeviceCard = () => {
  const router = useRouter();
  const {
    state: { FC, totalPower, totalEnergy },
    actions: { addTotalEnergy, addTotalPower, addFC },
  } = useDataStore();

  const [savedDevicesList, setSavedDevicesList, clearLocalStorage] =
    useLocalStorage('devices-list');
  const [items, setItems] = useState<typeof initialState>(
    savedDevicesList() || initialState
  );
  useEffect(() => {
    setSavedDevicesList(items);
  }, [setSavedDevicesList, items]);
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  const handleCleaning = (id: number) => {
    const itemCleared = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: 1,
          powerValue: 0,
          energyValue: 0,
          hours: 0,
          equipName: '',
          selected: false,
          manual: false,
          powerValueIsEditing: false,
          hoursIsEditing: false,
        };
      }
      return item;
    });

    setItems(itemCleared);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleEditing = (
    id: number,
    editingField: 'powerValueIsEditing' | 'hoursIsEditing'
  ) => {
    const updatedItem = items.map((item) => {
      if (item.id === id) {
        return { ...item, [editingField]: true };
      }
      return item;
    });
    setItems(updatedItem);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleEquipList = (
    id: number,
    powerValue: number,
    hours: number,
    equipName = 'Banana'
  ) => {
    const updatedItem = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          powerValue,
          hours,
          equipName,
          selected: true,
        };
      }
      return item;
    });

    setItems(updatedItem);
    // handleSelecting(id);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleInputChange = (
    id: number,
    newValue: string,
    fieldName: string
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [fieldName]: parseFloat(newValue) };
      }
      return item;
    });

    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleManual = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, manual: true };
      }
      return item;
    });

    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleValueChange = (id: number, newValue: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: parseFloat(newValue),
        };
      }
      return item;
    });
    // console.log(parseFloat(newValue));
    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleIncrement = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });

    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleDecrement = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(item.quantity - 1, 0) };
      }
      return item;
    });

    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  const handleNewItem = () => {
    const lastItem = items[items.length - 1];

    const newItem = {
      id: lastItem.id + 1,
      quantity: 1,
      powerValue: 0,
      energyValue: 0,
      hours: 0,
      equipName: '',
      selected: false,
      manual: false,
      powerValueIsEditing: false,
      hoursIsEditing: false,
    };

    setItems([...items, newItem]);
    // setIsEdit([...isEdit, newEdit]);
  };

  const handleDelete = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setTriggerUpdate(triggerUpdate + 1);
  };

  useEffect(() => {
    addTotalPower(
      items.reduce((total, item) => {
        const itemPower = item.powerValue * (item.quantity || 0);

        return total + itemPower;
      }, 0)
    );
    addTotalEnergy(
      items.reduce((total, item) => {
        // console.log(item.hours);
        const itemEnergy =
          item.powerValue * (item.quantity || 0) * (item.hours || 0);

        return total + itemEnergy;
      }, 0)
    );
    // console.log(items);
    return () => {
      setTriggerUpdate(0);
    };
  }, [triggerUpdate]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="start" className="isolate flex flex-col px-6 py-4 sm:py-6 lg:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Equipamentos em Sua Residência
        </h2>
        <p className="mt-2 text-sm leading-8">
          Selecione o equipamento desejado a partir das opções do catálogo e
          especifique a quantidade desejada, ou preencha manualmente se
          necessário.
        </p>
        <p className="leading-2 mt-1 text-[11px] font-thin">
          Os valores de Potência e Uso Diário são estimativas baseadas no
          consumo médio brasileiro.
        </p>
      </div>
      <div className="mx-auto mt-12 flex flex-col items-center justify-center">
        {isClient
          ? items.map((item) => (
              <div className="mb-6 flex w-full gap-2 " key={item.id}>
                <div className="flex flex-col gap-2">
                  <Counter
                    quantity={item.quantity}
                    handleValueChange={handleValueChange}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    id={item.id}
                  />
                  <Button
                    disabled={items.length === 1}
                    variant="gradientRed"
                    onClick={() => handleDelete(item.id)}
                  >
                    Remover
                  </Button>
                </div>
                <div className="flex w-full flex-col justify-center gap-[0.11rem]">
                  {item.manual ? (
                    <div className="relative">
                      <Button
                        className="absolute -right-6 top-5 z-50 origin-[0] -translate-y-[37px] scale-50 transform text-md rounded-md duration-300"
                        onClick={() => handleCleaning(item.id)}
                        variant="gradientRed"
                        size="sm"
                      >
                        X
                      </Button>
                      <div className="grid w-full gap-1.5">
                        <div className="relative">
                          <Input
                            id={`power-${item.id}`}
                            type="number"
                            placeholder=" "
                            className="remove-arrow border-1 peer block w-full !appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                e.target.value,
                                'powerValue'
                              )
                            }
                          />
                          <Label
                            htmlFor={`power-${item.id}`}
                            className="bg-base-100/80 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-md px-2 text-sm text-gray-500 backdrop-blur-md duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                          >
                            Potência (W)
                          </Label>
                        </div>
                        <div className="relative">
                          <Input
                            id={`hours-${item.id}`}
                            type="number"
                            placeholder=" "
                            className="remove-arrow border-1 peer block w-full !appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                e.target.value,
                                'hours'
                              )
                            }
                          />
                          <Label
                            htmlFor={`hours-${item.id}`}
                            className="bg-base-100/80 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-md px-2 text-sm text-gray-500 backdrop-blur-md duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                          >
                            Uso Diário (h)
                          </Label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {item.selected ? (
                        <div className="relative">
                          <Button
                            className="absolute -right-6 top-5 z-50 origin-[0] -translate-y-[43px] scale-50 transform text-md rounded-md duration-300"
                            onClick={() => handleCleaning(item.id)}
                            variant="gradientRed"
                            size="sm"
                          >
                            X
                          </Button>
                          <h5 className="... max-w-[60vw] truncate text-[12px] tracking-tight max-[668px]:max-w-[50vw] max-[281px]:max-w-[40vw]">
                            {item.equipName}
                          </h5>
                          {item.powerValueIsEditing ? (
                            <>
                              <div className="relative">
                                <Input
                                  id={`power-${item.id}`}
                                  type="number"
                                  placeholder=" "
                                  className="remove-arrow border-1 peer block h-5 w-full !appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-3 pt-3.5 text-[11px] text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.id,
                                      e.target.value,
                                      'powerValue'
                                    )
                                  }
                                  defaultValue={item.powerValue}
                                />
                                <Label
                                  htmlFor={`power-${item.id}`}
                                  className="bg-base-100/80 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-md px-2 text-[11px] text-gray-500 backdrop-blur-md duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                  Potência (W)
                                </Label>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex gap-1">
                                <p className="text-[11px] max-[301px]:truncate max-[301px]:tracking-tight">
                                  Potência: {item.powerValue} Watts
                                </p>
                                <Button
                                  onClick={() =>
                                    handleEditing(
                                      item.id,
                                      'powerValueIsEditing'
                                    )
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="z-10 h-5 -translate-y-[2px] scale-100 transform rounded-lg bg-transparent !px-1 px-2 text-sm text-gray-500 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                  <Edit3 height="16" width="16" />
                                </Button>
                              </div>
                            </>
                          )}

                          {item.hoursIsEditing ? (
                            <>
                              <div className="relative">
                                <Input
                                  id={`hours-${item.id}`}
                                  type="number"
                                  placeholder=" "
                                  className="remove-arrow border-1 peer block h-5 w-full !appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-3 pt-3.5 text-[11px] text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.id,
                                      e.target.value,
                                      'hours'
                                    )
                                  }
                                  defaultValue={item.hours}
                                />
                                <Label
                                  htmlFor={`hours-${item.id}`}
                                  className="bg-base-100/80 absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform rounded-md px-2 text-[11px] text-gray-500 backdrop-blur-md duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                  Uso Diário (h)
                                </Label>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex gap-1">
                                <p className="text-[11px] max-[301px]:truncate max-[301px]:tracking-tight">
                                  Uso Diário: {item.hours} Hora(s)
                                </p>
                                <Button
                                  onClick={() =>
                                    handleEditing(item.id, 'hoursIsEditing')
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="z-10 h-5 -translate-y-[2px] scale-100 transform rounded-lg bg-transparent !px-1 px-2 text-sm text-gray-500 dark:text-gray-400 peer-focus:dark:text-blue-500"
                                >
                                  <Edit3 height="16" width="16" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          <DevicesList
                            handleEquipList={handleEquipList}
                            id={item.id}
                          />
                          <Button
                            onClick={() => handleManual(item.id)}
                            variant="gradientGhost"
                            className="mt-[0.45rem] w-full"
                          >
                            Manualmente
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))
          : null}
      </div>

      <div className="space-y-2">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="FC" className="flex items-start gap-1">
            FC (Fator de Correção)
            <TCDescription />
          </Label>
          <Input
            id="FC"
            placeholder="94"
            value={FC}
            onChange={(e) => addFC(parseFloat(e.target.value) || 0)}
            className="focus:border-none"
          />
        </div>
        <div className="space-y-6">
          <Button
            variant="gradientDarkBlue"
            className="w-full"
            onClick={handleNewItem}
          >
            Adicionar
          </Button>
          <Separator />
          <div className="space-y-6">
            <DisplayTotal />

            <Button
              disabled={totalEnergy === 0 || totalPower === 0}
              onClick={() => router.push('/result')}
              variant="gradientSky"
              className="w-full"
            >
              Resultados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;

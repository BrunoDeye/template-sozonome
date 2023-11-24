import { Calculation } from '@prisma/client';

type DeviceList = {
  id: number;
  quantity: number;
  powerValue: number;
  energyValue: number;
  hours: number;
  equipName: string;
  selected: boolean;
  manual: boolean;
  powerValueIsEditing: boolean;
  hoursIsEditing: boolean;
};

type GetTempDeviceList = () => DeviceList[] | null;
type GetCalculation = () => Calculation | null;
type RemoveEditStorage = () => void;
type RemoveTempEditStorage = RemoveEditStorage;
type GetTempCalculation = GetCalculation;

export const useEditStorage = (): [
  GetTempDeviceList,
  GetTempCalculation,
  RemoveTempEditStorage,
  GetCalculation,
  RemoveEditStorage
] => {
  const getTempDevicesList = (): DeviceList[] | null => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('my-temp-calculation');
      // console.log('oi'+ local)
      if (local != null) {
        return JSON.parse(JSON.parse(local).devicesList);
      }
    }
    return null;
  };
  const getTempSavedCalculation = (): Calculation | null => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('my-temp-calculation');
      // console.log('oi'+ local)
      if (local != null) {
        return JSON.parse(local);
      }
    }
    return null;
  };

  const getSavedCalculation = (): Calculation | null => {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem('my-calculation');
      // console.log('oi'+ local)
      if (local != null) {
        return JSON.parse(local);
      }
    }
    return null;
  };

  const removeTempEditStorage = () => {
    return localStorage.removeItem('my-temp-calculation');
  };

  const removeEditStorage = () => {
    return localStorage.removeItem('my-calculation');
  };

  return [
    getTempDevicesList,
    getTempSavedCalculation,
    removeTempEditStorage,
    getSavedCalculation,
    removeEditStorage
  ];
};

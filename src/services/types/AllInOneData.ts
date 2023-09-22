import { BatteryData } from '../types/BatteryData';
export type AllInOneData = {
  id: number;
  model: string;
  nominalPower: number;
  price: number;
  gridVoltageReferenceId: number;
  battery: BatteryData;
};

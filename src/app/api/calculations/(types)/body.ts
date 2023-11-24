import { z } from 'zod';

export const CalcBody = z.object({
  id: z.number()
  .positive()
  .nullable().optional(),
  batteryQty: z.number(),
  devicesList: z.string(),
  grid: z.string(),
  inverterQty: z.number(),
  recommendedInverter: z.string(),
  selectedBattery: z.string(),
  title: z.string(),
  totalEnergy: z.number(),
  totalPower: z.number(),
  description: z.string().optional(),
});

export type CalcBodyType = z.infer<typeof CalcBody>;

export const DeleteCalcBody = z.object({
  id: z.number(),
});
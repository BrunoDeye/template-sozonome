import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma
 

export type Calculation = {
  id: number;
  userId: number;
  grid: string;
  devicesList: string;
  title: string;
  description: string | null;
  totalPower: number;
  totalEnergy: number;
  recommendedInverter: string;
  selectedBattery: string;
  rechargeTime: number | null;
  inverterQty: number;
  batteryQty: number;
}


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

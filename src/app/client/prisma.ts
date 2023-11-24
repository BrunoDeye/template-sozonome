import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient({ errorFormat: 'pretty' });
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV as any !== "preview" ) globalThis.prisma = client;

export default client;
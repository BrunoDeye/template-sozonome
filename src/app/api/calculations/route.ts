
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/authOptions';
import { AuthOptions, Session } from 'next-auth';
import { Calculation } from '@/app/client/prisma';
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';
import { CalcBody, DeleteCalcBody } from './(types)/body';
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest
): Promise<NextResponse<Calculation[] | { error: string }> | undefined> {
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);

    if (session) {
      const calculations = await prisma.calculation.findMany({
        where:{
          userId: session.user.id
        }
      });
      return NextResponse.json(calculations);
    } else {
      return NextResponse.json({ error: 'Session empty' }, { status: 404 });
    }
  } catch (error: any) {
    console.log({ error });
  }
}

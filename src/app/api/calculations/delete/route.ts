
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/authOptions';
import { AuthOptions, Session } from 'next-auth';
import { Calculation } from '@/app/client/prisma';
import prisma from '@/app/client/prisma';
import { CalcBody, DeleteCalcBody } from '../(types)/body';
export const dynamic = 'force-dynamic'

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<Calculation | { error: string }> | undefined> {
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);

    const body: Pick<Calculation, 'id'> = await req.json();
    const { success: isValid } = DeleteCalcBody.safeParse(body);
    if (session && isValid) {
      const { id } = body;
      const getCalculation = await prisma.calculation.findFirst({
        where: {
          id,
        },
      });
      if (getCalculation) {
        if (getCalculation.userId !== session.user.id) {
          return NextResponse.json(
            { error: 'Not authorized' },
            { status: 401 }
          );
        }

        const calculations = await prisma.calculation.delete({
          where: {
            id,
          },
        });
        return NextResponse.json(calculations);
      } else {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Session empty' }, { status: 403 });
    }
  } catch (error: any) {
    console.log({ error });
  }
}

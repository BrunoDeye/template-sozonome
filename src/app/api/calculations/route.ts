import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/authOptions';
import { AuthOptions, Session } from 'next-auth';
import { Calculation } from '@/app/client/prisma';
import { z } from 'zod';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';

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

export type CalcBody = z.infer<typeof CalcBody>;

export async function POST(
  req: NextRequest
): Promise<NextResponse<Calculation | { error: string }> | undefined> {
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);
    const url = req.nextUrl.clone();
    url.pathname = '';
    const body: Omit<Calculation, 'userId'> = await req.json();
   
    const { success: isValid } = CalcBody.safeParse(body);
    if (session && isValid) {
      const { id, ...data } = body
      const calculations = await prisma.calculation.create({
        data: {
          userId: session.user.id,
          ...data,
        },
      });
      if (body.totalPower >= 50000) {
        const transponder = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL,
          to: process.env.EMAIL,
          subject: `Cálculo super dimensionado de ${session.user.email} foi detectado`,
          text: `A potência total foi de ${body.totalPower}W`,
          html: `<p>A potência total foi de ${body.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p>`,
        };

        transponder.sendMail(mailOptions, (error, info) => {
          if (error) {
            return NextResponse.json(
              { error: 'Algo deu errado' },
              { status: 500 }
            );
          }
        });
      }

      return NextResponse.json(calculations);
    } else {
      return NextResponse.json({ error: 'Session empty' }, { status: 404 });
    }
  } catch (error: any) {
    console.log({ error });
  }
}

export const DeleteCalcBody = z.object({
  id: z.number(),
});

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

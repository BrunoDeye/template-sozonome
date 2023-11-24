
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/authOptions';
import { AuthOptions, Session } from 'next-auth';
import { Calculation } from '@/app/client/prisma';
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';
import { CalcBody, DeleteCalcBody } from '../(types)/body';
export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest
): Promise<NextResponse<Calculation | { error: string }> | undefined> {
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);
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

        await new Promise((resolve, reject) => {
          transponder.sendMail(mailOptions, (error, info) => {
            if (error) {
              reject(error);
              return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
            } else {
              resolve(info);
            }
          });
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


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
import { Calculation } from '@prisma/client';
import { z } from 'zod';
import { CalcBody } from '../route';
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<Calculation | { error: string }> | undefined> {
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);
    // console.log(session)
    const body: Omit<Calculation, 'userId'> = await req.json();
    const { success: isValid } = CalcBody.safeParse(body);
    console.log(isValid)
    if (session && isValid) {
      const { id, ...data } = body;
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

        const calculations = await prisma.calculation.update({
          where: {
            id,
          },
          data,
        });

        if(getCalculation.totalPower < 50000 && data.totalPower >= 50000) {
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
            subject: `Atualização super dimensionada de ${session.user.email} foi detectada`,
            text: `A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W`,
            html: `<p>A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p>`,
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
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'Session empty' }, { status: 403 });
    }
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: 'Session empty' }, { status: 405 });
  }
}

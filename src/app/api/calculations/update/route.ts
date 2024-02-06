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
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';
import { CalcBody } from '../(types)/body';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { getLocaleString } from '@/utils/functions';
import { getTranslations } from 'next-intl/server';
import { server } from '@/url';
export const dynamic = 'force-dynamic';

export async function PATCH(
  req: NextRequest
): Promise<NextResponse<Calculation | { error: string }> | undefined> {
  const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
  const { pathname } = new URL(new Headers(req.headers).get('referer') as any);
  const locale = getLocaleString(pathname);
  const t = await getTranslations({
    locale: locale || 'pt-BR',
    namespace: 'Register',
  });
  const emailClient = new EmailClient(connectionString, {});
  try {
    const session = await getServerSession<AuthOptions, Session>(authOptions);
    // console.log(session)
    const body: Omit<Calculation, 'userId'> = await req.json();
    const { success: isValid } = CalcBody.safeParse(body);
    console.log(isValid);
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
        // condiçao para alerta via email
        if (
          (getCalculation.totalPower < 50000 && data.totalPower >= 50000) ||
          (getCalculation.batteryQty < 15 && data.batteryQty >= 15)
        ) {
          const message = {
            senderAddress: t('senderFrom'),
            content: {
              subject: `Atualização super dimensionada de ${session.user.email} foi detectada`,
              plainText: `A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W, e a quantidade de Baterias de ${getCalculation.batteryQty} para ${data.batteryQty}`,
              html: `<p>A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p><p>Idioma: ${locale}</p>`,
            },
            recipients: {
              to: [
                {
                  address: process.env.EMAIL,
                  displayName: 'Deye Inversores',
                },
              ],
            },
          };
          const poller = await emailClient.beginSend(message);
          if (!poller.getOperationState().isStarted) {
            await prisma.user.delete({ where: { id: session.user.id } });
            throw NextResponse.json('Poller was not started.', { status: 401 });
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
          // const transponder = nodemailer.createTransport({
          //   service: "Outlook365",
          //   host: "deyeinversores.com.br",
          //   port: 587,
          //   secure: false,
          //   tls:  { ciphers: 'SSLv3' },
          //   auth: {
          //     user: process.env.EMAIL,
          //     pass: process.env.EMAIL_PASSWORD,
          //   },
          // });
          // const mailOptions = {
          //   from: process.env.EMAIL,
          //   to: process.env.EMAIL,
          //   subject: `Atualização super dimensionada de ${session.user.email} foi detectada`,
          //   text: `A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W`,
          //   html: `<p>A potência total foi atualizada de ${getCalculation.totalPower}W, para ${data.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p>`,
          // };

          // transponder.sendMail(mailOptions, (error, info) => {
          //   if (error) {
          //     return NextResponse.json(
          //       { error: 'Algo deu errado' },
          //       { status: 500 }
          //     );
          //   }
          // });
        }
        // condiçao para alerta via email
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

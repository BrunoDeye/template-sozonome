
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/authOptions';
import { AuthOptions, Session } from 'next-auth';
import { Calculation } from '@/app/client/prisma';
import nodemailer from 'nodemailer';
import prisma from '@/app/client/prisma';
import { CalcBody, DeleteCalcBody } from '../(types)/body';
import { getLocaleString } from '@/utils/functions';
import { getTranslations } from 'next-intl/server';
import { EmailClient } from '@azure/communication-email';
export const dynamic = 'force-dynamic'

export async function POST(
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
      if (body.totalPower >= 50000 || body.batteryQty >= 15) {

        const message = {
          senderAddress: t('senderFrom'),
          content: {
            subject: `Cálculo super dimensionado de ${session.user.email} foi detectado`,
            plainText: `A potência total foi de ${body.totalPower}W e a Quantidade de baterias ${body.batteryQty}`,
            html: `<p>A potência total foi de ${body.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p><p>Idioma: ${locale}</p>`,
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
        //   subject: `Cálculo super dimensionado de ${session.user.email} foi detectado`,
        //   text: `A potência total foi de ${body.totalPower}W`,
        //   html: `<p>A potência total foi de ${body.totalPower}W, esses são os dados para contatar o usuário:</p></br><p>Nome: ${session.user.name}</p><p>Email: ${session.user.email}</p><p>Telefone: ${session.user.phoneNumber}</p>`,
        // };

        // await new Promise((resolve, reject) => {
        //   transponder.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //       reject(error);
        //       return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
        //     } else {
        //       resolve(info);
        //     }
        //   });
        // });
      }

      return NextResponse.json(calculations);
    } else {
      return NextResponse.json({ error: 'Session empty' }, { status: 404 });
    }
  } catch (error: any) {
    console.log({ error });
  }
}


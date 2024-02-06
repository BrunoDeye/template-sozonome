import prisma from '@/app/client/prisma';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { server } from '@/url';
import { getLocaleString } from '@/utils/functions';
import { getTranslations } from 'next-intl/server';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';


export async function POST(request: NextRequest) {
  const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
  const { pathname } = new URL(
    new Headers(request.headers).get('referer') as any
  );
  const locale = getLocaleString(pathname);
  const t = await getTranslations({
    locale: locale || 'pt-BR',
    namespace: 'ForgotPassword',
  });
  const emailClient = new EmailClient(connectionString, {});
  try {
    const body = await request.json();
    const { email } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return NextResponse.json(
        { error: 'Email não cadastrado' },
        { status: 404 }
      );

    if (!user.emailVerified)
      return NextResponse.json(
        { error: 'Email cadastrado, mas não verificado' },
        { status: 400 }
      );

    // const transponder = nodemailer.createTransport({
    //   service: "Outlook365",
    //   host: "deyeinversores.com.br",
    //   port: 587,
    //   secure: true,
    //   tls:  { ciphers: 'SSLv3' },
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    const token = jwt.sign(
      { id: user.id },
      process.env.jwtSecretKey + user.id,
      {
        expiresIn: '1d',
      }
    );

    const message = {
      senderAddress: t('senderFrom'),
      content: {
        subject: t('subject'),
        plainText: `${server}/auth/mudar-senha?token=${token}&id=${user.id}`,
        html: `
        <p>${t('htmlP')}</p>
        </br>
        <a href="${server}/auth/mudar-senha?token=${token}&id=${user.id}">${t(
          'htmlA'
        )}</a>`,
      },
      recipients: {
        to: [
          {
            address: user.email,
            displayName: user.name,
          },
        ],
      },
    };

    const poller = await emailClient.beginSend(message);
    if (!poller.getOperationState().isStarted) {
      throw NextResponse.json('Poller was not started.', { status: 401 });
    }

    const { password: _, ...result } = user;

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    console.log({ error });
    return NextResponse.json(error, { status: 401 });
  }
}

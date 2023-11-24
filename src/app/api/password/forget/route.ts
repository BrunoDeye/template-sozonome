import prisma from '@/app/client/prisma';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = request.nextUrl.clone();
    url.pathname = '';
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

    const transponder = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.jwtSecretKey + user.id, {
      expiresIn: '1d',
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Mudar a senha',
      text: `${url}auth/mudar-senha?token=${token}&id=${user.id}`,
      html: `
      <p>Mude a sua senha clicando no link abaixo:</p>
      </br>
      <a href="${url}auth/mudar-senha?token=${token}&id=${user.id}">Link para mudar a senha</a>`,
    };

    transponder.sendMail(mailOptions, (error, info) => {
      if (error) {
        return NextResponse.json({ error: 'Algo deu errado' }, { status: 500 });
      }
    });

    const { password: _, ...result } = user;

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.log({ error });
  }
}
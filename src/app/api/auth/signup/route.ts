import prisma from '@/app/client/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { server } from '@/url';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const url = request.nextUrl.clone();
    // url.pathname = '';
    const { name, email, password, phoneNumber } = body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user)
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );

    const newUser = await prisma.user.create({
      data: { email, name, phoneNumber, password: await hash(password, 10) },
    });

    const transponder = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const token = jwt.sign(
      { id: newUser.id },
      process.env.jwtSecretKey + email,
      {
        expiresIn: '1d',
      }
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: newUser.email,
      subject: 'Confirme seu email',
      text: `${server}/auth/email?token=${token}`,
      html: `<p>Confirme seu email clicando no link abaixo e comece a utilizar nossa calculadora:</p></br><a href="${server}/auth/email?token=${token}">Link de Ativação</a>`,
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

    const { password: _, ...result } = newUser;

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json( error, { status: 401 });
  }
}

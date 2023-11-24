import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import prisma from '@/app/client/prisma';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const body = await req.json();
    if (body.password && body.id) {
      const password = body.password as string;
      const id = body.id as string;
      if (token && password && id) {
        const isValid = await new Promise((resolve) => {
          jwt.verify(token, process.env.jwtSecretKey + id, (err) => {
            if (err) resolve(false);
            if (!err) resolve(true);
          });
        });
        if (isValid) {
          await prisma.user.update({
            where: {
              id: +id,
            },
            data: {
              password: await hash(password, 10),
            },
          });
          return NextResponse.json({ status: 200 });
        }
      }
    }
    return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
  } catch (error: any) {
    console.log({ error });
  }
}

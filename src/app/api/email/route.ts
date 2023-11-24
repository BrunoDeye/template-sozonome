import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const body = await req.json();
    if (body.email) {
      const email = body.email as string;
      if (token && email) {
        const isValid = await new Promise((resolve) => {
          jwt.verify(token, process.env.jwtSecretKey + email, (err) => {
            if (err) resolve(false);
            if (!err) resolve(true);
          });
        });
        if (isValid) {
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              emailVerified: new Date(),
            },
          });
          return NextResponse.json({ status: 200 });
        }
      }
    }
    return NextResponse.json({ error: 'Ativação inválida' }, { status: 400 });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: 'Ativação inválida' }, { status: 400 });
  }
}

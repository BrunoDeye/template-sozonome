import prisma from '@/app/client/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession  } from 'next-auth/next'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { authOptions } from '@/authOptions';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    session?.user?.email
    const body = await request.json();

    return NextResponse.json( body , { status: 200 });
  } catch (error: any) {
    console.log({ error });
  }
}

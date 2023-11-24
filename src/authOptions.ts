import prisma from '@/app/client/prisma';
import { Account, AuthOptions, Profile, Session, User } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcrypt';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';
import { headers, cookies } from 'next/headers';
import { Prisma } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import { getLocaleString } from './utils/functions';
import { server } from './url';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { pathname } = new URL(
          new Headers(req.headers).get('referer') as any
        );
        const locale = getLocaleString(pathname);
        // console.log(new URL(new Headers(req.headers).get('referer') as any))
        // console.log(locale)
        const t = await getTranslations({
          locale: locale || 'pt-BR',
          namespace: 'Login',
        });
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error(t('emptyError'));
          const { password: hashedPassword, ...user } =
            await prisma.user.findUniqueOrThrow({
              where: {
                email: credentials.email,
              },
            });

          if (!user) throw new Error(t('emailError'));

          const logged = await compare(credentials.password, hashedPassword);
          if (!logged) throw new Error(t('passwordError'));
          if (!user.emailVerified) throw new Error(t('verificationError'));
          return user as any;
        } catch (ignored: any) {
          console.log({ ignored });
          if (ignored instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (ignored.code === 'P2025') {
              throw new Error(t('emailError'));
            } else {
              console.log(ignored.code);
              throw new Error(t('defaultError'));
            }
          } else {
            console.log(ignored.message);
            throw new Error(t('defaultError'));
          }
        }
      },
    }),
    CredentialsProvider({
      id: 'confirm',
      name: 'confirm',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { pathname } = new URL(
          new Headers(req.headers).get('referer') as any
        );
        const locale = getLocaleString(pathname);
        // console.log(new URL(new Headers(req.headers).get('referer') as any))
        // console.log(locale)
        const t = await getTranslations({
          locale: locale || 'pt-BR',
          namespace: 'Login',
        });
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error(t('emptyError'));
          const { password: hashedPassword, ...user } =
            await prisma.user.findUniqueOrThrow({
              where: {
                email: credentials.email,
              },
            });

          if (!user) throw new Error(t('emailError'));

          const logged = await compare(credentials.password, hashedPassword);
          if (!logged) throw new Error(t('passwordError'));

          const token = req.query?.token;
          console.log(token + 'OI');
          if (!token) throw new Error(t('tokenConfirmError'));
          try {
            const res = await fetch(server + '/api/email?token=' + token, {
              method: 'POST',
              body: JSON.stringify({ email: credentials.email }),
            });

            if (res.status === 400) {
              console.log(res as any);
              throw new Error(t('defaultError'));
            }
          } catch (error: any) {
            console.log({ error });
            throw new Error(t('defaultError'));
          }

          return user as any;
        } catch (ignored: any) {
          console.log(ignored.message);
          throw new Error(t('defaultError'));
        }
      },
    }),
    CredentialsProvider({
      id: 'change',
      name: 'change',
      credentials: {
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { pathname } = new URL(
          new Headers(req.headers).get('referer') as any
        );
        const locale = getLocaleString(pathname);
        // console.log(new URL(new Headers(req.headers).get('referer') as any))
        // console.log(locale)
        const t = await getTranslations({
          locale: locale || 'pt-BR',
          namespace: 'Login',
        });

        try {
          if (!credentials?.password)
            throw new Error(t('emptyPasswordError'));
          const id = req.query?.id;
          const { password: hashedPassword, ...user } =
            await prisma.user.findUniqueOrThrow({
              where: {
                id: +id,
              },
            });

          if (!user) throw new Error(t('emailError'));

          const token = req.query?.token;
          if (!token) throw new Error(t('defaultError'));
          try {
            const res = await fetch(
              server + '/api/password/change?token=' + token,
              {
                method: 'POST',
                body: JSON.stringify({
                  password: credentials.password,
                  id: id,
                }),
              }
            );

            if (res.status === 400){ console.log(res); throw new Error(t('defaultError'))};
          } catch (error: any) {
            // console.log({ error });
            throw new Error(t('defaultError'));
          }

          return user as any;
        } catch (ignored) {
          console.log({ ignored });
          throw new Error(t('defaultError'));
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },

  secret: process.env.NEXTAUTH_SECRET, // store this in a .env file
  callbacks: {
    async session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email;
        if (params.user) {
          params.session.user = {
            ...params.session.user,
            ...(params.token as any).user,
          };
        }
      }

      if (params.token && params.session.user) {
        params.session.user = {
          email: params.token.email,
          id: +params.token.id,
          image: params.token.image as any,
          name: params.token.name as any,
          phoneNumber: params.token.phoneNumber,
          isMatched: params.token.isMatched,
          isUpdated: params.token.isUpdated,
        };
      }

      return params.session;
    },
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    async jwt(params: {
      token: JWT;
      user?: User | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
      trigger?: 'update' | 'signIn' | 'signUp' | undefined;
      session?: any;
    }) {
      if (params.trigger === 'update' && params.session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!

        const { email, name, oldPassword, newPassword, phoneNumber } =
          params.session;
        if (email) {
          if (oldPassword && newPassword) {
            const user = await prisma.user.findFirst({
              where: { email },
            });
            if (user) {
              const isMatched = await compare(oldPassword, user.password);
              if (isMatched) {
                await prisma.user.update({
                  where: { email },
                  data: {
                    password: await hash(newPassword, 10),
                  },
                });
                params.token.isMatched = true;
                return params.token;
              } else {
                params.token.isMatched = false;
                return params.token;
              }
            }
          } else {
            const updateData = { name, phoneNumber };

            const result = await prisma.user.update({
              where: {
                email: params.session.email,
              },
              data: {
                ...updateData,
              },
            });

            if (result) {
              params.token.isUpdated = true;
              if (name) params.token.name = params.session.name;
              if (phoneNumber)
                params.token.phoneNumber = params.session.phoneNumber;
              return params.token;
            } else {
              params.token.isUpdated = false;
              return params.token;
            }
          }
        }
      }

      if (params.user && params.token) {
        return { ...params.token, ...params.user };
      }
      params.token.isUpdated = null;
      params.token.isMatched = null;
      return params.token;
    },
  },
};

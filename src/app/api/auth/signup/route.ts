import prisma from '@/app/client/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { server } from '@/url';
import {
  PublicClientApplication,
  LogLevel,
  ConfidentialClientApplication,
} from '@azure/msal-node';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
import { getLocaleString } from '@/utils/functions';
import { getTranslations } from 'next-intl/server';

export async function POST(request: NextRequest) {
  const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
  const { pathname } = new URL(
    new Headers(request.headers).get('referer') as any
  );
  const locale = getLocaleString(pathname);
  const t = await getTranslations({
    locale: locale || 'pt-BR',
    namespace: 'Register',
  });
  const emailClient = new EmailClient(connectionString, {});
  // const POLLER_WAIT_TIME = 10;
  try {
    const body = await request.json();

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
    const token = jwt.sign(
      { id: newUser.id },
      process.env.jwtSecretKey + email,
      {
        expiresIn: '1d',
      }
    );

    const message = {
      senderAddress: t('senderFrom'),
      content: {
        subject: t('subject'),
        plainText: `${server}/auth/email?token=${token}`,
        html: `<p>${t(
          'htmlP'
        )}</p></br><a href="${server}/auth/email?token=${token}">${t(
          'htmlA'
        )}</a>`,
      },
      recipients: {
        to: [
          {
            address: newUser.email,
            displayName: newUser.name,
          },
        ],
      },
    };

    const poller = await emailClient.beginSend(message);

    if (!poller.getOperationState().isStarted) {
      await prisma.user.delete({ where: { id: newUser.id } });
      throw NextResponse.json('Poller was not started.', { status: 401 });
    }
    // let timeElapsed = 0;

    // while (!poller.isDone()) {
    //   poller.poll();
    //   console.log('Email send polling in progress');

    // await new Promise((resolve) =>
    //   setTimeout(resolve, POLLER_WAIT_TIME * 1000)
    // );
    //   timeElapsed += 10;

    //   if (timeElapsed > 18 * POLLER_WAIT_TIME) {
    //     await prisma.user.delete({ where: { id: newUser.id } });
    //     throw NextResponse.json('Polling timed out.', { status: 401 });
    //   }
    // }

    // if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
    //   console.log(
    //     `Successfully sent the email (operation id: ${poller.getResult()?.id})`
    //   );
    const { password: _, ...result } = newUser;

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    return NextResponse.json(result, { status: 201 });
    // } else {
    //   await prisma.user.delete({ where: { id: newUser.id } });
    //   throw NextResponse.json(poller.getResult()?.error, { status: 401 });
    // }
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json(error, { status: 401 });
  }
}

// const url = request.nextUrl.clone();e
// url.pathname = '';

//   const endpoint =
// "https://login.microsoftonline.com/d1849df1-99c9-4b42-b16a-5609a25359ca/oauth2/token";

// const msalConfig = {
//   auth: {
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     authority: `https://login.microsoftonline.com/d1849df1-99c9-4b42-b16a-5609a25359ca/adminconsent?client_id=${process.env.CLIENT_ID}`,

//     // redirectUri: 'http://localhost:8080/',
//   },

//   system: {
//     loggerOptions: {
//       loggerCallback(loglevel: any, message: any, containsPii: any) {
//         console.log(message);
//       },
//       piiLoggingEnabled: false,
//       logLevel: LogLevel.Info,
//     },

//   },

// };
// const msalClient = new ConfidentialClientApplication(msalConfig);

// const url =
//   'https://login.microsoftonline.com/d1849df1-99c9-4b42-b16a-5609a25359ca/oauth2/v2.0/token';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',

//   },
//   body: new URLSearchParams({
//     client_id: '5fe20671-2ef2-4b1e-8a5a-0277b0b9c430',
//     scope: 'https://outlook.office365.com/.default',
//     refresh_token:
//       '0.AVIA8Z2E0cmZQkuxalYJolNZynEG4l_yLh5LiloCd7C5xDC6AB8.AgABAAEAAAAmoFfGtYxvRrNriQdPKIZ-AgDs_wUA9P9HEEOFkaE4UURWfwzjRHfz04QOWI9XOKgzMtk3p51bL4HBQ2MbvD366OxM6NGu7Dkp4HBsxflIIKrBaOlQAstHa9zSXkP-A16vqzhByWOgD4ZWftYxd2bvzRX4cFJ45OPQ3z80wUeI3kVayhbpJGyaZKKmywwBPvEsXxEvsDhkR1hYcBCrwVAnx8iP4O868AD5a7yZNlyoEnYryyxfEvcWaJ9gmMd9yzTn5Xwc4MT9VCPCuClOgUP1x0bQ1olPYO4vwzOLOx-0KcL0k1vSoT2CTz_0ye5r6VaUHgYskekJcKvsALFhtPwFhDHYgFy2u8SUrRyUycQFZr2WPMLzw6FcxZKqa4yC3jEnDeVVZN9z9G6HzAgkDvkGswgq35d1z6IMFv3w18miNBbnsm8peHbyAXyaG5m-O0O-zAjv8oh4_mBBuZmn3dMoG8aUFuDdKigZpaxuwN1BPAZeiUEvAaWJaCkUqUfZ04D2C9X0AiPiyX56IP5e2iniUMAoskHtRd3isdZwlimu45hSHGUyyBanGq7_aZZ2eVnYiRVfYzPDvWbywWVpUJMZx7JlXvnRVagu6m2rTzdAQx8BVgKuBZhViUk4QumTtoCyimmU_lB06rHncpsqRVszvv6i0V1t_m2ifUHZpgAEeJms7-zojQlBfpBPPUAvhZq4Ns_92to94Fd2_Ro2GEKsgCG-3pB-ujY3Ix1RYkzhzxaq8Isv6LUBd_9OK9wJQWubttwL8N9yvF644y4T2oHVhiM6RwUa_XvrF6i33mFf8j9CR9Ok-wSBhw9Cyhnamk8',
//     grant_type: 'refresh_token',
//     client_secret: 'eUP8Q~WNxPh1oaDpkKdzY6XrR~Rdf1ICDc~56b__',
//   }),
// };

// const tokens = await fetch(url, options)
//   .then((response) => response.json())
//   .then((data) => data)
//   .catch((error) => console.error('Error:', error));
// console.log(tokens);

// const a = await msalClient.acquireTokenByCode({
//   code: "0.AVIA8Z2E0cmZQkuxalYJolNZynEG4l_yLh5LiloCd7C5xDC6AB8.AgABAAIAAAAmoFfGtYxvRrNriQdPKIZ-AgDs_wUA9P_hEBmcNX-cu4JMvpODckiRgeXyDgaGEMVy_nKDXOzL3v7P-0Jj3xaFx0ovMXndfnwiax2wcvKFa_bUBojbLjoLZxvmgN6Sc4r_iNw4kS2QKraCZeEyIofOwaB9HJS7bHsulgGjXZPKhzZ22aMwrxCxzxp1k8r7PbuwaBF1ItVN9SlKnO56pRTX8qVqbzTacIy9g8Fq30AW90dZ2YU8MAM-kwClhw7AkMhDTmW8_YEjNQo2EPD5O5cT_R_JfZQuN7K87rvhz6suVT-vKhmI0_ATla-_a0qNdQkEay5lAH1gRI3XNjhcpIrans6nKNZHjp00NA4eTSAmfwwcxiE8vsmgMH6tctWTCF3DWQ_g084tgoYB54CyRb14QIjGMHvTqMLAAMNg1MkVLJNiw59cxF_zJ8sRiBVBRX9meOu2SpCYCpoMITp5JLaG3T5nA14A4UTNom1mRVTJqDjPF1XNWsZtSybgUwMhg6zBRd1dHdO8DTBg86c2XUhA-cmdsf8hPqGlinTbtCLWvhInWhKn2AdbHcOil8ZuHMUTFf9h3S2dbtwR1FZPWY20857cihFYzzj6nCwT3Jb-aHd6nYs0ErjodQku_orBgTA-8G2OAXwrgAX3TCmXc_x4kgU4KA3E1XevqjT9pqx2N8RoM92fWpqFrhkrWxI",
//   scopes: ["https://outlook.office.com/SMTP.SendAsApp"],
//   redirectUri: "http://localhost"
// })
// console.log(a + "adfasfas")
// const auth = await msalClient.acquireTokenByRefreshToken({
//   refreshToken: tokens.refresh_token,
//   scopes: ["https://outlook.office.com/SMTP.Send"],

//   authority: `https://login.microsoftonline.com/d1849df1-99c9-4b42-b16a-5609a25359ca/adminconsent?client_id=${process.env.CLIENT_ID}`
// });
// const newAuth = await msalClient.acquireTokenSilent({

//   account: {

//     homeAccountId: '19a7117e-8019-4613-b80e-521974229945.d1849df1-99c9-4b42-b16a-5609a25359ca',
//     environment: 'login.windows.net',
//     tenantId: 'd1849df1-99c9-4b42-b16a-5609a25359ca',
//     username: 'nao-responda@deyeinversores.com.br',
//     localAccountId: '19a7117e-8019-4613-b80e-521974229945',
//     name: 'Nao Responda',
//     nativeAccountId: undefined,
//     authorityType: 'MSSTS',
//     idTokenClaims: {
//       aud: '5fe20671-2ef2-4b1e-8a5a-0277b0b9c430',
//       iss: 'https://login.microsoftonline.com/d1849df1-99c9-4b42-b16a-5609a25359ca/v2.0',
//       iat: 1706126033,
//       nbf: 1706126033,
//       exp: 1706129933,
//       aio: 'AWQAm/8VAAAAh5nrLQfg29FEU66fGKRlIscFFfCjbxwDQt7pfAxnpZMQ0qizk6KIXrXPGgnYrBc/GobqgsJPYmgP2pZvKtMRsiLBP9hbgEfTg1dMcEK1y+zxNNaHTE8OQGUgvrNrUYQj',
//       name: 'Nao Responda',
//       oid: '19a7117e-8019-4613-b80e-521974229945',
//       preferred_username: 'nao-responda@deyeinversores.com.br',
//       rh: '0.AVIA8Z2E0cmZQkuxalYJolNZynEG4l_yLh5LiloCd7C5xDC6AB8.',
//       sub: 'OZ3U6a31vjfSDaYijVWAV2y3iAiGXi4Ms8mlrhmf_Ng',
//       tid: 'd1849df1-99c9-4b42-b16a-5609a25359ca',
//       uti: 'dxhAnYCJjECoEi5zXZ2EAQ',
//       ver: '2.0'
//     },
//     idToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjVCM25SeHRRN2ppOGVORGMzRnkwNUtmOTdaRSJ9.eyJhdWQiOiI1ZmUyMDY3MS0yZWYyLTRiMWUtOGE1YS0wMjc3YjBiOWM0MzAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZDE4NDlkZjEtOTljOS00YjQyLWIxNmEtNTYwOWEyNTM1OWNhL3YyLjAiLCJpYXQiOjE3MDYxMjYwMzMsIm5iZiI6MTcwNjEyNjAzMywiZXhwIjoxNzA2MTI5OTMzLCJhaW8iOiJBV1FBbS84VkFBQUFoNW5yTFFmZzI5RkVVNjZmR0tSbElzY0ZGZkNqYnh3RFF0N3BmQXhucFpNUTBxaXprNktJWHJYUEdnbllyQmMvR29icWdzSlBZbWdQMnBadkt0TVJzaUxCUDloYmdFZlRnMWRNY0VLMXkrenhOTmFIVEU4T1FHVWd2ck5yVVlRaiIsIm5hbWUiOiJOYW8gUmVzcG9uZGEiLCJvaWQiOiIxOWE3MTE3ZS04MDE5LTQ2MTMtYjgwZS01MjE5NzQyMjk5NDUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJuYW8tcmVzcG9uZGFAZGV5ZWludmVyc29yZXMuY29tLmJyIiwicmgiOiIwLkFWSUE4WjJFMGNtWlFrdXhhbFlKb2xOWnluRUc0bF95TGg1TGlsb0NkN0M1eERDNkFCOC4iLCJzdWIiOiJPWjNVNmEzMXZqZlNEYVlpalZXQVYyeTNpQWlHWGk0TXM4bWxyaG1mX05nIiwidGlkIjoiZDE4NDlkZjEtOTljOS00YjQyLWIxNmEtNTYwOWEyNTM1OWNhIiwidXRpIjoiZHhoQW5ZQ0pqRUNvRWk1elhaMkVBUSIsInZlciI6IjIuMCJ9.SUyj5XPRXpbaugy-t33xtssg_ShoqgPZd-Bty1c2vt1sMEBa9TY2hRlZVYL4bw8OW-S8WfuEX76HkLhqPBwFQzm-ftT-Zw5EHZgAIotn5AEXHI_KwjUD1jAJv0mR-bBdJxZ_jYqMbNcQksY9MD30mP7pIrO-jes16pl3pLLTwHc5NCh4nOd_t-qM0Zrj7eg0yMTU_zMvgNWxjkafumfLv9fI3i8MEoJFWe4oeQzbidQpFKj74C3pwo67xF-y5Z12bIVP6bkcYHkaEjaI0-8yAP8cXQ6fVz1LZ1qA75guAdJ-ESn1_b5ly9T7AFWorUcZ9s-hAKlG5YvcWpgll4Ll3Q',
//   },

//   scopes: ['SMTP.SendAsApp'],
// });

// const transponder = nodemailer.createTransport({
//   // service: 'Outlook365',

//   host: 'smtp.office365.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL,
//     // pass: process.env.EMAIL_PASSWORD,
//     // accessToken: response!.accessToken as string,
//     accessToken:  tokens.access_token,
//     // accessToken: auth?.accessToken,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     // refreshToken: process.env.REFRESH_TOKEN,
//   },
//   tls: {
//     // do not fail on invalid certs
//     ciphers: 'SSLv3',
//   },
//   debug: true,
//   logger: true,
// });

// await new Promise((resolve, reject) => {
//   transponder.verify((error, success) => {
//     if (error) {
//       reject(error);
//       // console.log(error);
//       return NextResponse.json(
//         { error: 'Autentificação ' },
//         { status: 500 }
//       );
//     } else {
//       resolve(success);
//     }
//   });
// });

// const mailOptions = {
//   from: process.env.EMAIL,
//   to: newUser.email,
//   subject: 'Confirme seu email',
//   text: `${server}/auth/email?token=${token}`,
//   html: `<p>Confirme seu email clicando no link abaixo e comece a utilizar nossa calculadora:</p></br><a href="${server}/auth/email?token=${token}">Link de Ativação</a>`,
// };

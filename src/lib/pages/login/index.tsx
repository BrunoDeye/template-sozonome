'use client';
import { NextPage } from 'next';
import RegisterPageContent from '@/app/[locale]/auth/(cadastro)/Register';
import LoginPageContent from '@/app/[locale]/auth/(login)/Login';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import ForgotPasswordPageContent from '@/app/[locale]/auth/(esqueci-senha)/ForgotPassword';


const LoginPage: NextPage = () => {
  const [authPage, setAuthPage] = useState<'login' | 'cadastro' | 'esqueci-senha' >('login');
  
  return (
    <>
      {authPage === 'login' ? (
        <LoginPageContent setAuthPage={setAuthPage} />
      ) : authPage === 'cadastro' ? (
        <RegisterPageContent setAuthPage={setAuthPage} />
      ) : <ForgotPasswordPageContent setAuthPage={setAuthPage} />}
    </>
  );
};

export default LoginPage;

'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { NextPage } from 'next';
import { Link } from '@/navigation';
import { useState } from 'react';
import { getCsrfToken, useSession } from 'next-auth/react';
import useOutsideAlerter from '@/lib/components/hooks/useOutsideAlerter';
import {
  Edit2Icon,
  Edit3Icon,
  EditIcon,
  Key,
  KeyIcon,
  KeyRound,
} from 'lucide-react';
import { areVariablesEmpty } from '@/utils/functions';
import { useTranslations } from 'next-intl';


const EditProfile:NextPage = () => {
  const wrapperRef = useRef(null);
  const t = useTranslations('Profile')
  const { data: Session, update } = useSession();
  const [registerData, setRegisterData] = useState({
    name: '',
    phoneNumber: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [fieldEdit, setFieldEdit] = useState({
    name: {
      isEdit: false,
    },
    phone: {
      isEdit: false,
    },
  });
  const [open, setOpen] = useState(false);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const [alert, setAlert] = useState({
    status: '',
    message: '',
  });
  useOutsideAlerter(wrapperRef, setAlert as any);

  useEffect(() => {
    // console.log(Session);
    if (Session) {
      setRegisterData({
        ...registerData,
        name: Session?.user?.name as string,
        phoneNumber: Session?.user?.phoneNumber as string,
      });
    }
  }, [Session?.user]);

  useEffect(() => {
    if (Session) {
      if (Session!.user.isMatched === false) {
        setAlert({ status: 'error', message: t('oldPasswordError') });
      } else if (Session!.user.isMatched === true) {
        setAlert({
          status: 'success',
          message: t('updatePasswordSuccess'),
        });
        setRegisterData({
          ...registerData,
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        update();
        setOpen(false);
      }
    }
  }, [Session?.user.isMatched]);

  const handlePassword = async () => {
    if (
      areVariablesEmpty(
        registerData.confirmPassword,
        registerData.newPassword,
        registerData.confirmPassword
      )
    ) {
      setAlert({
        status: 'error',
        message: t('emptyError'),
      });
    } else if (registerData.newPassword !== registerData.confirmPassword) {
      setAlert({
        status: 'error',
        message: t('confirmError'),
      });
    } else {
      await update({
        email: Session!.user.email,
        oldPassword: registerData.oldPassword,
        newPassword: registerData.newPassword,
      });
    }
    

    console.log(Session);

    // setOpen(false)
  };

  const handleName = async () => {
    const session = await update({
      email: Session!.user.email,
      name: registerData.name,
    });
    
    if (session?.user.isUpdated) {
      setAlert({
        status: 'success',
        message: t('updateSuccess'),
      });
      setFieldEdit({
        phone: {
          isEdit: fieldEdit.phone.isEdit,
        },
        name: { isEdit: false },
      });
    } else {
      setAlert({
        status: 'error',
        message: t('defaultError'),
      });
    }
  };

  const handlePhone = async () => {
    const session = await update({
      email: Session!.user.email,
      phoneNumber: registerData.phoneNumber,
    });
    if (session?.user.isUpdated) {
      setAlert({
        status: 'success',
        message: t('updateSuccess'),
      });
      setFieldEdit({
        name: {
          isEdit: fieldEdit.name.isEdit,
        },
        phone: { isEdit: false },
      });
    } else {
      setAlert({
        status: 'error',
        message: t('defaultError'),
      });
    }
  };

  return (
    <div className=" flex min-h-[60vh] w-[90vw] flex-col items-center justify-center gap-8 rounded-lg bg-white/40 p-10 text-center shadow-lg backdrop-blur-3xl dark:bg-blue-200/10 dark:shadow-blue-400 sm:m-3 sm:w-[550px] sm:px-20">
      <h3 className="bg-gradient-to-br from-gray-200 to-blue-700 bg-clip-text text-3xl font-bold text-transparent md:text-3xl">
        {t('title')}
      </h3>

      {alert.message && (
        <div
          style={{
            color: alert.status === 'success' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
          ref={wrapperRef}
        >
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      )}
      <div className="w-full space-y-6 text-left">
        <div
          className={`flex ${
            fieldEdit.name.isEdit ? 'flex-col' : ''
          } items-end  gap-3 sm:flex-row`}
        >
          <div className="w-full">
            <Label className="ml-1" htmlFor="name">
            {t('name')}
            </Label>
            <Input
              onChange={onChange}
              value={registerData.name}
              type="text"
              name="name"
              autoComplete="off"
              disabled={!fieldEdit.name.isEdit}
              required
            />
          </div>
          {fieldEdit.name.isEdit ? (
            <Button
              variant="gradientDarkBlue"
              className="w-full  sm:min-w-[100px] sm:max-w-[100px]"
              onClick={handleName}
            >
              {t('editButton')}
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() =>
                setFieldEdit({
                  phone: {
                    isEdit: fieldEdit.phone.isEdit,
                  },
                  name: { isEdit: true },
                })
              }
            >
              <EditIcon />
            </Button>
          )}
        </div>

        <div
          className={`flex ${
            fieldEdit.phone.isEdit ? 'flex-col' : ''
          } items-end  gap-3 sm:flex-row`}
        >
          <div className="w-full">
            <Label className="ml-1" htmlFor="phoneNumber">
            {t('phone')}
            </Label>
            <Input
              onChange={onChange}
              value={registerData.phoneNumber}
              type="text"
              name="phoneNumber"
              autoComplete="off"
              disabled={!fieldEdit.phone.isEdit}
              required
            />
          </div>
          {fieldEdit.phone.isEdit ? (
            <Button
              variant="gradientDarkBlue"
              className="w-full sm:min-w-[100px] sm:max-w-[100px]"
              onClick={handlePhone}
            >
              {t('editButton')}
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() =>
                setFieldEdit({
                  name: {
                    isEdit: fieldEdit.name.isEdit,
                  },
                  phone: { isEdit: true },
                })
              }
            >
              <EditIcon />
            </Button>
          )}
        </div>

        <div>
          {open ? null : (
            <div className="flex justify-between gap-3 py-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <Label  className="ml-1" htmlFor="password">
                {t('password')}
                </Label>
                <KeyRound className="h-5 w-5" />
              </div>

              <Button variant="link" onClick={() => setOpen(true)}>
                <EditIcon />
              </Button>
            </div>
          )}

          {open ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-full">
                <Label className='ml-1' htmlFor="oldPassword">{t('oldPassword')}</Label>
                <Input
                  onChange={onChange}
                  value={registerData.oldPassword}
                  type="password"
                  name="oldPassword"
                  autoComplete="off"
                  id="oldPassword"
                  required
                />
              </div>
              <div className="w-full">
                <Label className='ml-1' htmlFor="newPassword">{t('newPassword')}</Label>
                {registerData.newPassword !== registerData.confirmPassword && <span className='ml-1 text-red-500'>*</span>}
                <Input
                  onChange={onChange}
                  value={registerData.newPassword}
                  type="password"
                  name="newPassword"
                  autoComplete="off"
                  id="newPassword"
                  required
                />
              </div>
              <div className="w-full">
                <Label className='ml-1' htmlFor="confirmPassword">{t('confirmNewPassword')}</Label>
                {registerData.newPassword !== registerData.confirmPassword && <span className='ml-1 text-red-500'>*</span>}
                <Input
                  onChange={onChange}
                  value={registerData.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  id="confirmPassword"
                  required
                />
              </div>
              <div className="flex justify-between gap-3">
                <Button
                  variant="gradientSky"
                  className="w-full sm:min-w-[100px] sm:max-w-[100px]"
                  onClick={() => setOpen(false)}
                >
                  {t('cancelButton')}
                </Button>
                <Button
                  variant="gradientDarkBlue"
                  className="w-full sm:min-w-[100px] sm:max-w-[100px]"
                  onClick={handlePassword}
                >
                  {t('confirmButton')}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

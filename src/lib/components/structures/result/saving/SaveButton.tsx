'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../ui/button';
import { CalcBody } from '@/app/api/calculations/route';
import { useDataStore } from '@/store/data';
import SaveModal from './SaveModal';

type Props = {
  headers: any;
};

function SaveButton({ headers }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (isClient) {
      const myCalculation = localStorage.getItem('my-calculation');
      if (myCalculation !== null) {
        setIsEdit(true);
      }
    }
  }, [isClient]);

  return (
    <>
      <SaveModal
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        open={open}
        setOpen={setOpen}
        headers={headers}
      />
      <div className="flex justify-center">
        <Button
          size="large"
          className="print-hidden w-full sm:w-auto"
          onClick={() => setOpen(true)}
          variant="gradientGreen"
        >
          {isEdit ? 'Atualizar Cálculo' : 'Salvar nos Meus Cálculos'}
        </Button>
      </div>
    </>
  );
}

export default SaveButton;

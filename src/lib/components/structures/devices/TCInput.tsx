'use client';
import React from 'react';
import { Label } from '../../ui/label';
import TCDescription from './TCDescription';
import { Input } from '../../ui/input';
import { useDataStore } from '@/store/data';

function TCInput() {
  const {
    state: { FC },
    actions: { addFC },
  } = useDataStore();

  return (
    <div className="grid w-full items-center  space-y-[0.4rem]">
      <div className='relative mx-0 sm:mx-auto mb-6'>

      <Label
        htmlFor="FC"
        className="flex items-start mb-2 sm:mx-auto sm:w-auto"
      >
        <span className='mr-2'>FC (Fator de Correção)</span>
        <TCDescription />
      </Label>
      <Input
        id="FC"
        placeholder="0.94"
        value={FC}
        onChange={(e) =>
          addFC(
            parseFloat(e.target.value) > 100
              ? 99
              : parseFloat(e.target.value.replace(/0+$/, '')) || 0
          )
        }
        className="block !appearance-none pl-[25px] focus:border-none sm:mx-auto sm:w-auto"
      />
      <Label
        htmlFor="FC"
        className="z-10 mx-auto my-auto absolute left-[10px] top-[39px]"
      >
        0,
      </Label>
      </div>
    </div>
  );
}

export default TCInput;

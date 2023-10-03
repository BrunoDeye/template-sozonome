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
    <div className="grid w-full items-center space-y-[0.4rem]">
      <Label
        htmlFor="FC"
        className="flex items-start gap-1 sm:mx-auto sm:w-auto"
      >
        FC (Fator de Correção)
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
        className="z-10 mx-auto my-auto origin-[0] -translate-x-[42vw] -translate-y-[2.282rem] text-[15px] max-[580px]:-translate-x-[43vw] max-[540px]:-translate-x-[41vw] max-[500px]:-translate-x-[40vw] max-[460px]:-translate-x-[39.5vw] max-[415px]:-translate-x-[39vw] max-[375px]:-translate-x-[37.5vw] max-[302px]:-translate-x-[41.5vw] sm:-translate-x-[5rem] sm:-translate-y-[2.28rem] sm:text-sm md:-translate-y-[2.224rem]"
      >
        0,
      </Label>
    </div>
  );
}

export default TCInput;

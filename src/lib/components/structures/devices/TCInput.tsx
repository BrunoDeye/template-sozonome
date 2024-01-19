'use client';
import React from 'react';
import { Label } from '../../ui/label';
import TCDescription from './TCDescription';
import { Input } from '../../ui/input';
import { useDataStore } from '@/store/data';
import { useTranslations } from 'next-intl';

function TCInput() {
  const t = useTranslations("Devices");
  const {
    state: { FC },
    actions: { addFC },
  } = useDataStore();


  function formatInput(input: any) {
    // Ensure the input value is a number
    let value = parseInt(input);

    // Check if the entered value is within the range 1 to 99
    if (isNaN(value) || value < 1) {
      
      return '';
    }

    if (value > 99) {
      
      return '99';
    }


    // Pad the number with leading zero if necessary
    return value.toLocaleString('en-US', {minimumIntegerDigits: 2 });
  }

  // console.log(FC)
  return (
    <div className="grid w-full items-center  space-y-[0.4rem]">
      <div className='relative mx-0 sm:mx-auto mb-6'>

      <Label
        htmlFor="FC"
        className="flex items-start mb-2 sm:mx-auto sm:w-auto"
      >
        <span className='mr-2'>{t('TCLabel')}</span>
        <TCDescription />
      </Label>
      <Input
        id="FC"
        placeholder="0.94"
        value={FC.toLocaleString('en-US', {minimumIntegerDigits: 2 })}
        onChange={(e) =>
          addFC(
            +(formatInput(e.target.value))
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

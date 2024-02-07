'use client';

import React from 'react';
import PrintButton from './PrintButton';
import RecalculateButton from './RecalculateButton';
import ResultInfo from './ResultInfo';
import SaveButton from './saving/SaveButton';

import { useSession } from 'next-auth/react';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

function ResultPage({ headers }: { headers: ReadonlyHeaders }) {
  const { data: session, status, update } = useSession();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col overflow-x-visible px-6 py-2 max-[300px]:px-1 sm:py-4">
      <ResultInfo />
      <div className="mt-7 space-y-6 sm:mx-auto sm:mt-10 sm:w-[300px]">
        {status === 'authenticated' ? (
          <div className="text-center">
            <SaveButton headers={headers} />
          </div>
        ) : null}
        <div className="text-center">
          <PrintButton />
        </div>
        <div className="text-center">
          <RecalculateButton />
        </div>
      </div>
    </div>
  );
}

export default ResultPage;

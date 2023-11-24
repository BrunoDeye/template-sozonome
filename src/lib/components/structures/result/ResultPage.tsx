import React from 'react';
import PrintButton from './PrintButton';
import RecalculateButton from './RecalculateButton';
import ResultInfo from './ResultInfo';
import SaveButton from './saving/SaveButton';
import { headers } from 'next/headers';

function ResultPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col overflow-x-visible px-6 py-2 max-[300px]:px-1 sm:py-4">
      <ResultInfo />
      <div className="sm:w-[300px] mx-auto mt-6 space-y-6">
        <div className="text-center">
          <SaveButton headers={headers()} />
        </div>
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

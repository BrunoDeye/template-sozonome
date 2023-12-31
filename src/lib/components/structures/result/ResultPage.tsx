import React from 'react';
import PrintButton from './PrintButton';
import RecalculateButton from './RecalculateButton';
import ResultInfo from './ResultInfo';

function ResultPage() {


  return (
    <div
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col overflow-x-hidden px-6 py-2 max-[300px]:px-1 sm:py-4"
    >
     <ResultInfo />
      <div className="mt-6 space-y-6">
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

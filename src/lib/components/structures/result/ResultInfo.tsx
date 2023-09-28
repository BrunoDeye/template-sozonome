import React from 'react';
import Body from './Body';
import Watermark from './Watermark';
import PrintTotalPower from './PrintTotalPower';

function ResultInfo() {
  return (
    <div>
      <Watermark />
      <Body />
      <PrintTotalPower />
    </div>
  );
}

export default ResultInfo;

import { AllInOneData } from '@/services/types/AllInOneData';

export function removeAccents(input: string) {
  const accents =
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ';
  const accentsOut =
    'AAAAAAACEEEEIIIIDNOOOOOOUUUUYBaaaaaaaceeeeiiiionoooooouuuuyy';

  return input
    .split('')
    .map((char) => {
      const index = accents.indexOf(char);
      return index !== -1 ? accentsOut[index] : char;
    })
    .join('');
}

export const formatAllInOne = (allInOne: AllInOneData) => [
  {
    attribute: 'Inversor',
    value: allInOne.model,
  },
  {
    attribute: 'Potência[W]',
    value: allInOne.nominalPower,
  },
  {
    attribute: 'Corrente (Bateria)',
    value: `${allInOne.battery.current} A`,
  },
  {
    attribute: 'Vida Útil / Dod (Bateria)',
    value: `${allInOne.battery.lifespan} anos / ${allInOne.battery.dod}`,
  },
  {
    attribute: 'Quantidade',
    value: 1,
  },
];

type Inverter = {
  model: string;
  nominalPower: number;
  quantity: number;
};

// inverterAtr = 'Inversor', typeAtr = 'Tipo', powerAtr = 'Potência[W]'
// qntAtr = 'Quantidade'

export const formatInverter = (
  inverter: Inverter,
  inverterAtr = 'Inversor',
  typeAtr = 'Tipo',
  powerAtr = 'Potência[W]',
  qntAtr = 'Quantidade',
  minCoef = 8,
  selectedCoef = 8
) =>
  !inverter.model || inverter.model === '\u00A0'
    ? [
        {
          attribute: inverterAtr,
          value: '\u00A0',
        },
        {
          attribute: typeAtr,
          value: '\u00A0',
        },
        {
          attribute: powerAtr,
          value: '\u00A0',
        },
        {
          attribute: qntAtr,
          value: '\u00A0',
        },
      ]
    : [
        {
          attribute: inverterAtr,
          value: inverter.model,
        },
        {
          attribute: typeAtr,
          value: inverter.model.slice(-2),
        },
        {
          attribute: powerAtr,
          value: inverter.nominalPower,
        },
        {
          attribute: qntAtr,

          value:
            minCoef >= selectedCoef
              ? Math.ceil((minCoef * inverter.quantity) / selectedCoef)
              : inverter.quantity,
          // value:  minCoef,
        },
      ];

export function calculateAdjustedBatteries(
  inverterQuantity: number,
  batteryQuantity: number
): number {
  const minBatteriesPerInverter = 4;

  // Calculate the minimum required total batteries
  const minTotalBatteries = inverterQuantity * minBatteriesPerInverter;

  // Adjust the battery quantity if it's less than the minimum required
  const adjustedBatteryQuantity = Math.max(minTotalBatteries, batteryQuantity);

  // Calculate the adjusted quantity for each inverter
  const adjustedBatteriesPerInverter = Math.ceil(
    adjustedBatteryQuantity / inverterQuantity
  );


  // Calculate the final adjusted battery quantity
  const finalAdjustedBatteryQuantity =
    adjustedBatteriesPerInverter * inverterQuantity;

  return finalAdjustedBatteryQuantity;
}

type Battery = {
  modelFullName: string;
  nominalVoltage: string;
  nominalEnergy: number | string;
  dod: number | string;
  lifespan: number | string;
  quantity: number | string;
};
// , bateriaAtr: string, dodLifespanAtr: string, energyAtr: string,
//  availEnergyAtr: string, ciclesAtr: string, modelAtr: string, qntAtr: string

export const formatBattery = (
  battery: Battery,
  batteryAtr = 'Bateria',
  dodLifespanAtr = 'Dod/Vida Útil',
  energyAtr = 'Energia[kWh]',
  availEnergyAtr = 'Energia Disponível[kWh]',
  ciclesAtr = 'Ciclos',
  modelAtr = 'Modelo',
  qntAtr = 'Quantidade',
  yearsUnit = 'anos',
  coef = 1,
  inverterQty = 3
) =>
  !battery.modelFullName || battery.modelFullName === '\u00A0'
    ? [
        {
          attribute: batteryAtr,
          value: '\u00A0',
        },
        {
          attribute: dodLifespanAtr,
          value: '\u00A0',
        },
        {
          attribute: energyAtr,
          value: '\u00A0',
        },
        {
          attribute: availEnergyAtr,
          value: '\u00A0',
        },
        {
          attribute: ciclesAtr,
          value: '\u00A0',
        },
        {
          attribute: modelAtr,
          value: '\u00A0',
        },
        {
          attribute: qntAtr,
          value: '\u00A0',
        },
      ]
    : battery.modelFullName.includes('BOS')
    ? [
        {
          attribute: batteryAtr,
          value: battery.modelFullName || '\u00A0',
        },
        {
          attribute: dodLifespanAtr,
          value:
            battery.dod !== '\u00A0'
              ? `${battery.dod} / ${yearsUnit}`
              : '\u00A0',
        },
        {
          attribute: energyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : battery.nominalEnergy.toFixed(2),
        },
        {
          attribute: availEnergyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : ((battery.dod as any) * battery.nominalEnergy).toFixed(2),
        },
        {
          attribute: ciclesAtr,
          value: battery.nominalEnergy === 0 ? '\u00A0' : 6000,
        },
        {
          attribute: modelAtr,
          value: battery.modelFullName.includes('BOS')
            ? 'High Voltage(HV)'
            : 'Low Voltage(LV)',
        },
        {
          attribute: 'BMU',
          value: Math.ceil(+battery.quantity / 12),
        },
        {
          attribute: qntAtr,
          value: calculateAdjustedBatteries(
            inverterQty,
            (coef < 1
              ? Math.ceil(+battery.quantity / coef) < 4
                ? 4
                : Math.ceil(+battery.quantity / coef)
              : +battery.quantity < 4
              ? 4
              : battery.quantity) as number
          ),
        },
      ]
    : [
        {
          attribute: batteryAtr,
          value: battery.modelFullName || '\u00A0',
        },
        {
          attribute: dodLifespanAtr,
          value:
            battery.dod !== '\u00A0'
              ? `${battery.dod} / ${yearsUnit}`
              : '\u00A0',
        },
        {
          attribute: energyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : battery.nominalEnergy.toFixed(2),
        },
        {
          attribute: availEnergyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : ((battery.dod as any) * battery.nominalEnergy).toFixed(2),
        },
        {
          attribute: ciclesAtr,
          value: battery.nominalEnergy === 0 ? '\u00A0' : 6000,
        },
        {
          attribute: modelAtr,
          value: battery.modelFullName.includes('BOS')
            ? 'High Voltage(HV)'
            : 'Low Voltage(LV)',
        },
        {
          attribute: qntAtr,
          value: (coef < 1
            ? Math.ceil(+battery.quantity / coef)
            : battery.quantity) as number,
        },
      ];

type Grid =
  | '220V (Fase + Fase + Terra/Neutro)'
  | '127V (Fase + Neutro/Terra)'
  | '220V (Fase + Neutro + Terra)'
  | '220V (Fase + Fase + Fase + Terra + Neutro)'
  | '380V (Fase + Fase + Fase + Terra + Neutro)';

const gridKeysMap = {
  ['127V (Fase + Neutro/Terra)']: 'mono127',
  ['220V (Fase + Neutro + Terra)']: 'mono220',
  ['220V (Fase + Fase + Terra/Neutro)']: 'bi220',
  ['220V (Fase + Fase + Fase + Terra + Neutro)']: 'tri220',
  ['380V (Fase + Fase + Fase + Terra + Neutro)']: 'tri380',
};

export const mapGridKeys = (grid: Grid) =>
  gridKeysMap[grid || '127V (Fase + Neutro/Terra)'];

type BatteryOptions = {
  model: string;
  voltage: number;
  nominalEnergy: number | string;
  dod: number | string;
  lifespan: number | string;
};

export const formatBatteryOptions = (
  battery: BatteryOptions,
  batteryAtr = 'Bateria',
  dodLifespanAtr = 'Dod/Vida Útil',
  energyAtr = 'Energia[kWh]',
  availEnergyAtr = 'Energia Disponível[kWh]',
  ciclesAtr = 'Ciclos',
  modelAtr = 'Modelo',
  yearsUnit = 'anos'
) =>
  !battery.model || battery.model === '\u00A0'
    ? [
        {
          attribute: batteryAtr,
          value: '\u00A0',
        },
        {
          attribute: dodLifespanAtr,
          value: '\u00A0',
        },
        {
          attribute: energyAtr,
          value: '\u00A0',
        },
        {
          attribute: availEnergyAtr,
          value: '\u00A0',
        },
        {
          attribute: ciclesAtr,
          value: '\u00A0',
        },
        {
          attribute: modelAtr,
          value: '\u00A0',
        },
      ]
    : [
        {
          attribute: batteryAtr,
          value: battery.model || '\u00A0',
        },
        {
          attribute: dodLifespanAtr,
          value:
            battery.dod !== '\u00A0'
              ? `${battery.dod} / ${yearsUnit}`
              : '\u00A0',
        },
        {
          attribute: energyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : battery.nominalEnergy.toFixed(2),
        },
        {
          attribute: availEnergyAtr,
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : ((battery.dod as any) * battery.nominalEnergy).toFixed(2),
        },
        {
          attribute: ciclesAtr,
          value: battery.nominalEnergy === 0 ? '\u00A0' : 6000,
        },
        {
          attribute: modelAtr,
          value: battery.model.includes('BOS')
            ? 'High Voltage(HV)'
            : 'Low Voltage(LV)',
        },
      ];

export function decimalToHoursMinutes(
  decimal: number,
  h: string,
  hs: string,
  min: string,
  mins: string,
  and: string
) {
  let time = decimal;
  if (decimal < 1) {
    time = 1;
  }

  time = Math.ceil(time);

  const hours = Math.floor(time);

  const minutes = Math.round((time - hours) * 60);

  const hoursStr = hours > 0 ? hours + (hours > 1 ? hs : h) : '';
  const minutesStr = minutes > 0 ? minutes + (minutes > 1 ? mins : min) : '';

  if (hours > 0 && minutes > 0) {
    return `${hoursStr} ${and} ${minutesStr}`;
  } else if (hours > 0) {
    return hoursStr;
  } else if (minutes > 0) {
    return minutesStr;
  } else {
    return '0h';
  }
}

export function areVariablesEmpty(var1: string, var2: string, var3: string) {
  // Check if both variables are empty or contain only whitespaces
  const isEmptyVar1 = var1.trim() === '';
  const isEmptyVar2 = var2.trim() === '';
  const isEmptyVar3 = var3.trim() === '';
  return isEmptyVar1 || isEmptyVar2 || isEmptyVar3;
}

export function getFirstAndLastWords(phrase: string) {
  // Split the phrase into an array of words
  const words = (phrase || '').split(/\s+/);

  // Get the first and last words
  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  // Return an object with the first and last words
  return words.length === 1 ? firstWord : firstWord + ' ' + lastWord;
}

export function getLocaleString(pathname: any) {
  const match = pathname.match(/\/([^\/]+)/);
  return match ? match[1] : null;
}

type GridType =
  | '127V (Fase + Neutro/Terra)'
  | '220V (Fase + Fase + Terra/Neutro)'
  | '220V (Fase + Neutro + Terra)'
  | '220V (Fase + Fase + Fase + Terra + Neutro)'
  | '380V (Fase + Fase + Fase + Terra + Neutro)';

export function isInverterGridUnderLimit(
  grid: GridType,
  inverterQty: number
): boolean {
  switch (grid) {
    case '127V (Fase + Neutro/Terra)':
      if (inverterQty > 10) return false;
      else return true;
    case '220V (Fase + Fase + Terra/Neutro)':
      if (inverterQty > 16) return false;
      else return true;
    case '220V (Fase + Neutro + Terra)':
      if (inverterQty > 16) return false;
      else return true;
    case '220V (Fase + Fase + Fase + Terra + Neutro)':
      if (inverterQty > 10) return false;
      else return true;
    case '380V (Fase + Fase + Fase + Terra + Neutro)':
      if (inverterQty > 10) return false;
      else return true;
  }
}

export function inverterGridLimit(grid: GridType): number {
  switch (grid) {
    case '127V (Fase + Neutro/Terra)':
      return 10;
    case '220V (Fase + Fase + Terra/Neutro)':
      return 16;
    case '220V (Fase + Neutro + Terra)':
      return 16;
    case '220V (Fase + Fase + Fase + Terra + Neutro)':
      return 10;
    case '380V (Fase + Fase + Fase + Terra + Neutro)':
      return 10;
  }
}

type ModelType =
  | 'RW.M6.1 (120Ah)'
  | 'SE-G5.3 (104Ah)'
  | 'SE-G5.1 PRO (100Ah)'
  | 'BOS-G (100Ah)';

export function isBatteryModelUnderLimit(model: ModelType, batteryQty: number, inverterQty = 1) {
  switch (model) {
    case 'RW.M6.1 (120Ah)':
      if (batteryQty > 32) return false;
      else return true;
    case 'SE-G5.3 (104Ah)':
      if (batteryQty > 32) return false;
      else return true;
    case 'SE-G5.1 PRO (100Ah)':
      if (batteryQty > 64) return false;
      else return true;
    case 'BOS-G (100Ah)':
      if (batteryQty > (192 * inverterQty)) return false;
      else return true;
  }
}

export function batteryModelLimit(model: ModelType, inverterQty = 1) {
  switch (model) {
    case 'RW.M6.1 (120Ah)':
      return 32;
    case 'SE-G5.3 (104Ah)':
      return 32;
    case 'SE-G5.1 PRO (100Ah)':
      return 64;
    case 'BOS-G (100Ah)':
      return (192 * inverterQty);
  }
}

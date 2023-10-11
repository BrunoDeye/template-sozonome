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
  qntAtr = 'Quantidade'
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
          value: inverter.quantity,
        },
      ];

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
  yearsUnit = 'anos'
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
          value: battery.quantity,
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
}

export const mapGridKeys = (grid: Grid) => gridKeysMap[grid || '127V (Fase + Neutro/Terra)']


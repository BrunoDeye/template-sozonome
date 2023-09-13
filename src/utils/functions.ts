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

type Inverter = {
  model: string;
  nominalPower: number;
  quantity: number;
};

export const formatInverter = (inverter: Inverter) => [
  {
    attribute: 'Inversor',
    value: inverter.model,
  },
  {
    attribute: 'Tipo',
    value: inverter.model.slice(-2),
  },
  {
    attribute: 'Potência[W]',
    value: inverter.nominalPower,
  },
  {
    attribute: 'Quantidade',
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

export const formatBattery = (battery: Battery) =>
  !battery.modelFullName || battery.modelFullName === '\u00A0'
    ? [
        {
          attribute: 'Bateria',
          value: '\u00A0',
        },
        {
          attribute: 'Dod/Vida Útil',
          value: '\u00A0',
        },
        {
          attribute: 'Energia[kWh]',
          value: '\u00A0',
        },
        {
          attribute: 'Ciclos',
          value: '\u00A0',
        },
        {
          attribute: 'Modelo',
          value: '\u00A0',
        },
        {
          attribute: 'Quantidade',
          value: '\u00A0',
        },
      ]
    : [
        {
          attribute: 'Bateria',
          value: battery.modelFullName || '\u00A0',
        },
        {
          attribute: 'Dod/Vida Útil',
          value:
            battery.dod !== '\u00A0'
              ? `${battery.dod} / ${battery.lifespan} anos`
              : '\u00A0',
        },
        {
          attribute: 'Energia[kWh]',
          value:
            typeof battery.nominalEnergy === 'string'
              ? '\u00A0'
              : battery.nominalEnergy === 0
              ? '\u00A0'
              : battery.nominalEnergy.toFixed(2),
        },
        {
          attribute: 'Ciclos',
          value: battery.nominalEnergy === 0 ? '\u00A0' : 6000,
        },
        {
          attribute: 'Modelo',
          value: battery.modelFullName.includes('BOS')
            ? 'High Voltage(HV)'
            : 'Low Voltage(LV)',
        },
        {
          attribute: 'Quantidade',
          value: battery.quantity,
        },
      ];

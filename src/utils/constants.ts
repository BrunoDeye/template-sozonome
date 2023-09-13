export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export const devices = [
  {
    id: 1,
    value: "Aquecedor de água por acumulação até 80 L",
    powerW: 1500,
    hours: 1
  },
  {
    id: 2,
    value: "Aquecedor de água por acumulação de 100 a 150 L",
    powerW: 2500,
    hours: 1
  },
  {
    id: 3,
    value: "Aquecedor de água por acumulação de 200 a 400 L",
    powerW: 4000,
    hours: 1
  },
  {
    id: 4,
    value: "Aquecedor de água por tampa",
    powerW: 6000,
    hours: 1
  },
  {
    id: 5,
    value: "Aquecedor de ambiente",
    powerW: 1000,
    hours: 2
  },
  {
    id: 6,
    value: "Aspirador de pó residencial",
    powerW: 600,
    hours: 0.5
  },
  {
    id: 7,
    value: "Assadeira grande",
    powerW: 1000,
    hours: 0.5
  },
  {
    id: 8,
    value: "Assadeira pequena",
    powerW: 500,
    hours: 0.5
  },
  {
    id: 9,
    value: "Banheira de hidromassagem",
    powerW: 6600,
    hours: 0.5
  },
  {
    id: 10,
    value: "Batedeira de bolo",
    powerW: 100,
    hours: 0.25
  },
  {
    id: 11,
    value: "Bomba d'água 1/4 CV monofásica",
    powerW: 390,
    hours: 1
  },
  {
    id: 12,
    value: "Bomba d'água 1/3 CV monofásica",
    powerW: 520,
    hours: 1
  },
  {
    id: 13,
    value: "Bomba d'água 1/2 CV trifásica",
    powerW: 570,
    hours: 1
  },
  {
    id: 14,
    value: "Bomba d'água 3/4 CV trifásica",
    powerW: 820,
    hours: 1
  },
  {
    id: 15,
    value: "Bomba d'água 1 CV monofásica",
    powerW: 1100,
    hours: 1
  },
  {
    id: 16,
    value: "Cafeteira elétrica pequena uso doméstico",
    powerW: 600,
    hours: 0.5
  },
  {
    id: 17,
    value: "Cafeteira elétrica uso comercial",
    powerW: 1200,
    hours: 1
  },
  {
    id: 18,
    value: "Chuveiro elétrico 127V",
    powerW: 4400,
    hours: 0.5
  },
  {
    id: 19,
    value: "Chuveiro elétrico 220V",
    powerW: 6000,
    hours: 0.5
  },
  {
    id: 20,
    value: "Chuveiro 4 estações",
    powerW: 6500,
    hours: 0.5
  },
  {
    id: 21,
    value: "Conjunto de som",
    powerW: 100,
    hours: 2
  },
  {
    id: 22,
    value: "Ebulidor",
    powerW: 1000,
    hours: 0.25
  },
  {
    id: 23,
    value: "Enceradeira residencial",
    powerW: 300,
    hours: 0.5
  },
  {
    id: 24,
    value: "Espremedor de frutas",
    powerW: 200,
    hours: 0.25
  },
  {
    id: 25,
    value: "Exaustor",
    powerW: 150,
    hours: 1
  },
  {
    id: 26,
    value: "Ferro elétrico automático de passar roupa",
    powerW: 1000,
    hours: 1
  },
  {
    id: 27,
    value: "Ferro elétrico simples de passar roupa",
    powerW: 500,
    hours: 1
  },
  {
    id: 28,
    value: "Fogão comum com acendedor",
    powerW: 90,
    hours: 1
  },
  {
    id: 29,
    value: "Fogão elétrico de 4 bocas potência por cada queimador",
    powerW: 1500,
    hours: 1
  },
  {
    id: 30,
    value: "Fogão elétrico de 6 bocas potência por cada queimador médio",
    powerW: 2100,
    hours: 1
  },
  {
    id: 31,
    value: "Fogão elétrico de 6 bocas potência por cada queimador grande",
    powerW: 2700,
    hours: 1
  },
  {
    id: 32,
    value: "Forno de microondas",
    powerW: 750,
    hours: 0.25
  },
  {
    id: 33,
    value: "Forno elétrico de embutir",
    powerW: 4500,
    hours: 1
  },
  {
    id: 34,
    value: "Freezer vertical Pequeno",
    powerW: 300,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 35,
    value: "Freezer horizontal médio",
    powerW: 400,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 36,
    value: "Freezer Horizontal Grande",
    powerW: 500,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 37,
    value: "Geladeira Comum",
    powerW: 250,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 38,
    value: "Geladeira Duplex",
    powerW: 300,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 39,
    value: "Grill",
    powerW: 1200,
    hours: 0.5
  },
  {
    id: 40,
    value: "Impressora comum",
    powerW: 90,
    hours: 1
  },
  {
    id: 41,
    value: "Impressora laser",
    powerW: 900,
    hours: 1
  },
  {
    id: 42,
    value: "Liquidificador doméstico",
    powerW: 200,
    hours: 0.25
  },
  {
    id: 43,
    value: "Lâmpada Incandescente de 15W",
    powerW: 15,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 44,
    value: "Lâmpada Incandescente de 20W",
    powerW: 20,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 45,
    value: "Lâmpada Incandescente de 25W",
    powerW: 25,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 46,
    value: "Lâmpada Incandescente de 40W",
    powerW: 40,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 47,
    value: "Lâmpada Incandescente de 60W",
    powerW: 60,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 48,
    value: "Lâmpada Incandescente de 100W",
    powerW: 100,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 49,
    value: "Lâmpada Incandescente de 150W",
    powerW: 150,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 50,
    value: "Lâmpada Incandescente de 200W",
    powerW: 200,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 51,
    value: "Lâmpada Incandescente de 250W",
    powerW: 250,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 52,
    value: "Lâmpada Fluorescente de 20W",
    powerW: 20,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 53,
    value: "Lâmpada Fluorescente de 40W",
    powerW: 40,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 54,
    value: "Máquina de lavar louças",
    powerW: 1500,
    hours: 1
  },
  {
    id: 55,
    value: "Máquina de lavar roupas com aquecimento",
    powerW: 1000,
    hours: 1
  },
  {
    id: 56,
    value: "Máquina de secar roupas",
    powerW: 3500,
    hours: 1
  },
  {
    id: 57,
    value: "Máquina para costurar",
    powerW: 100,
    hours: 0.5
  },
  {
    id: 58,
    value: "Máquina de lavar pratos",
    powerW: 1200,
    hours: 1
  },
  {
    id: 59,
    value: "Máquina de lavar roupas",
    powerW: 1500,
    hours: 1
  },
  {
    id: 60,
    value: "Máquina de xerox grande",
    powerW: 2000,
    hours: 1
  },
  {
    id: 61,
    value: "Máquina de xerox pequena",
    powerW: 1500,
    hours: 1
  },
  {
    id: 62,
    value: "Micro computador",
    powerW: 250,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 63,
    value: "Micro forno elétrico",
    powerW: 1000,
    hours: 1
  },
  {
    id: 64,
    value: "Panela elétrica",
    powerW: 1200,
    hours: 1
  },
  {
    id: 65,
    value: "Raio X (dentista)",
    powerW: 1090,
    hours: 0.5
  },
  {
    id: 66,
    value: "Raio X (hospital)",
    powerW: 12100,
    hours: 0.5
  },
  {
    id: 67,
    value: "Refletor odontológico",
    powerW: 150,
    hours: 0.5
  },
  {
    id: 68,
    value: "Sanduicheira",
    powerW: 640,
    hours: 0.25
  },
  {
    id: 69,
    value: "Sauna comercial",
    powerW: 12000,
    hours: 2
  },
  {
    id: 70,
    value: "Sauna residencial",
    powerW: 4500,
    hours: 2
  },
  {
    id: 71,
    value: "Scanner",
    powerW: 50,
    hours: 1
  },
  {
    id: 72,
    value: "Secador de cabelos grande",
    powerW: 1250,
    hours: 0.25
  },
  {
    id: 73,
    value: "Secador de cabelos pequeno",
    powerW: 700,
    hours: 0.25
  },
  {
    id: 74,
    value: "Secador de roupa comercial",
    powerW: 5000,
    hours: 1
  },
  {
    id: 75,
    value: "Secador de roupa residencial",
    powerW: 1100,
    hours: 1
  },
  {
    id: 76,
    value: "Televisor colorido",
    powerW: 200,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 77,
    value: "Televisor preto e branco",
    powerW: 90,
    hours: 5 // Estimate: 5 hours/day
  },
  {
    id: 78,
    value: "Torneira elétrica",
    powerW: 2000,
    hours: 1
  },
  {
    id: 79,
    value: "Vaporizador",
    powerW: 300,
    hours: 0.5
  },
  {
    id: 80,
    value: "Ventilador grande",
    powerW: 250,
    hours: 12 // Estimate: 12 hours/day
  },
  {
    id: 81,
    value: "Ventilador médio",
    powerW: 200,
    hours: 12 // Estimate: 12 hours/day
  },
  {
    id: 82,
    value: "Ventilador pequeno",
    powerW: 70,
    hours: 12 // Estimate: 12 hours/day
  },
  {
    id: 83,
    value: "Vídeo game",
    powerW: 10,
    hours: 2
  },
  {
    id: 84,
    value: "Ar condicionado 8500 BTU/h",
    powerW: 1300,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 85,
    value: "Ar condicionado 10000 BTU/h",
    powerW: 1400,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 86,
    value: "Ar condicionado 12000 BTU/h",
    powerW: 1600,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 87,
    value: "Ar condicionado 14000 BTU/h",
    powerW: 1900,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 88,
    value: "Ar condicionado 18000 BTU/h",
    powerW: 2600,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 89,
    value: "Ar condicionado 21000 BTU/h",
    powerW: 2800,
    hours: 6 // Estimate: 6 hours/day
  },
  {
    id: 90,
    value: "Ar condicionado 30000 BTU/h",
    powerW: 3600,
    hours: 6 // Estimate: 6 hours/day
  }
];

export const batteries = [
  {
    modelFullName: "Deye - BOG-G (100Ah)",
    "nominalVoltage": "51.2V",
    "nominalEnergy": 5.12,
    "dod": 0.9,
    "lifespan": 15,
    "quantity": 6
  },
  {
    modelFullName: "Deye - RW.M6.1 (120Ah)",
    "nominalVoltage": "51.2V",
    "nominalEnergy": 6.144,
    "dod": 0.9,
    "lifespan": 15,
    "quantity": 5
  },
  {
    modelFullName: "Deye - RW-M5.3 (104Ah)",
    "nominalVoltage": "51.2V",
    "nominalEnergy": 5.3248,
    "dod": 0.9,
    "lifespan": 15,
    "quantity": 6
  },
  {
    modelFullName: "Deye - SE-G5.1 PRO (100Ah)",
    "nominalVoltage": "51.2V",
    "nominalEnergy": 5.12,
    "dod": 0.9,
    "lifespan": 15,
    "quantity": 6
  }
]
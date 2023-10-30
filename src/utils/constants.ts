import sun6KSG0104LP3 from '@/images/inverters/SUN-6K-SG0104LP3-US.png'
import sun5KSG0103LP1 from '@/images/inverters/SUN-5K-SG0103LP1-EU.png'
import sun8KSG01LP1 from '@/images/inverters/SUN-8K-SG01LP1-EU.png'
import sun35KSG0104HP3 from '@/images/inverters/SUN-35K-SG0104HP3-US.png'
import BOSG from '@/images/batteries/Deye - BOS-G (100Ah).png'
import RWM5_3 from '@/images/batteries/Deye - RW-M5.3 (104Ah).png'
import RWM6_1 from '@/images/batteries/Deye - RW.M6.1 (120Ah).png'
import SEG5_1 from '@/images/batteries/Deye - SE-G5.1 PRO (100Ah).png'
import GEF60 from '@/images/allInOne/GE-F60.png'
import MSG230 from '@/images/allInOne/MS-G230.png'
import { StaticImageData } from 'next/image'

export const imagesMap = {
  'SUN-3K-SG01/03LP1-BR': sun5KSG0103LP1,
  'SUN-3.6K-SG01/03LP1-EU': sun5KSG0103LP1,
  'SUN-5K-SG01/03LP1-EU': sun5KSG0103LP1,
  'SUN-5K-SG01LP1-US': sun8KSG01LP1,
  'SUN-6K-SG01/04LP3-US': sun6KSG0104LP3,
  'SUN-7K-SG01/04LP3-US': sun6KSG0104LP3,
  'SUN-8K-SG01LP1-EU': sun8KSG01LP1,
  'SUN-8K-SG01LP1-US': sun8KSG01LP1,
  'SUN-10K-SG01/04LP3-EU': sun6KSG0104LP3,
  'SUN-12K-SG01/04LP3-EU': sun6KSG0104LP3,
  'SUN-18K-SG01/04HP3-US': sun35KSG0104HP3,
  'SUN-20K-SG01HP3-EU': sun35KSG0104HP3,
  'SUN-25K-SG01/04HP3-US': sun35KSG0104HP3,
  'SUN-30K-SG01/04HP3-EU': sun35KSG0104HP3,
  'SUN-30K-SG01/04HP3-US': sun35KSG0104HP3,
  'SUN-40K-SG01/04HP3-EU': sun35KSG0104HP3,
  'SUN-50K-SG01/04HP3-EU': sun35KSG0104HP3,
  'GE-F60': GEF60,
  'MS-G230': MSG230,
  'Deye - BOS-G (100Ah)': BOSG,
  'Deye - SE-G5.3 (104Ah)': SEG5_1,
  'Deye - RW.M6.1 (120Ah)': RWM6_1,
  'Deye - SE-G5.1 PRO (100Ah)': SEG5_1,
  'BOS-G (100Ah)': BOSG,
  'SE-G5.3 (104Ah)': SEG5_1,
  'RW.M6.1 (120Ah)': RWM6_1,
  'SE-G5.1 PRO (100Ah)': SEG5_1
}

export type ImageModelName = keyof typeof imagesMap;

export const mapImages = (imageModelName: ImageModelName): StaticImageData => imagesMap[imageModelName]


export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

// value: { 
//          ['pt-BR']: "Aquecedor de água por acumulação até 80 L",
//          ['it-IT']: "",
//          ['es-ES']: "",
//          en: "",
//        }

export const devices = [
  {
    id: 1,
    value: {
      ['pt-BR']: "Aquecedor de água por acumulação até 80 L",
      ['it-IT']: "Scaldabagno ad accumulo fino a 80 L",
      ['es-ES']: "Calentador de agua por acumulación hasta 80 L",
      en: "Water heater with accumulation up to 80 L",
    },
    powerW: 1500,
    hours: 1
  },
  {
    id: 2,
    value: {
      ['pt-BR']: "Aquecedor de água por acumulação de 100 a 150 L",
      ['it-IT']: "Scaldabagno ad accumulo da 100 a 150 L",
      ['es-ES']: "Calentador de agua por acumulación de 100 a 150 L",
      en: "Water heater with accumulation from 100 to 150 L",
    },
    powerW: 2500,
    hours: 1
  },
  {
    id: 3,
    value: {
      ['pt-BR']: "Aquecedor de água por acumulação de 200 a 400 L",
      ['it-IT']: "Scaldabagno ad accumulo da 200 a 400 L",
      ['es-ES']: "Calentador de agua por acumulación de 200 a 400 L",
      en: "Water heater with accumulation from 200 to 400 L",
    },
    powerW: 4000,
    hours: 1
  },
  {
    id: 4,
    value: {
      ['pt-BR']: "Aquecedor de água por tampa",
      ['it-IT']: "Scaldabagno ad accumulo con coperchio",
      ['es-ES']: "Calentador de agua con tapa",
      en: "Water heater with cover",
    },
    powerW: 6000,
    hours: 1
  },
  {
    id: 5,
    value: {
      ['pt-BR']: "Aquecedor de ambiente",
      ['it-IT']: "Riscaldatore ambiente",
      ['es-ES']: "Calentador de ambiente",
      en: "Room heater",
    },
    powerW: 1000,
    hours: 2
  },
  {
    id: 6,
    value: {
      ['pt-BR']: "Aspirador de pó residencial",
      ['it-IT']: "Aspirapolvere domestico",
      ['es-ES']: "Aspiradora de polvo residencial",
      en: "Residential vacuum cleaner",
    },
    powerW: 600,
    hours: 0.5
  },
  {
    id: 7,
    value: {
      ['pt-BR']: "Assadeira grande",
      ['it-IT']: "Grande teglia da forno",
      ['es-ES']: "Bandeja grande para horno",
      en: "Large baking dish",
    },
    powerW: 1000,
    hours: 0.5
  },
  {
    id: 8,
    value: {
      ['pt-BR']: "Assadeira pequena",
      ['it-IT']: "Piccola teglia da forno",
      ['es-ES']: "Bandeja pequeña para horno",
      en: "Small baking dish",
    },
    powerW: 500,
    hours: 0.5
  },
  {
    id: 9,
    value: {
      ['pt-BR']: "Banheira de hidromassagem",
      ['it-IT']: "Vasca idromassaggio",
      ['es-ES']: "Bañera de hidromasaje",
      en: "Hot tub",
    },
    powerW: 6600,
    hours: 0.5
  },
  {
    id: 10,
    value: {
      ['pt-BR']: "Batedeira de bolo",
      ['it-IT']: "Frullatore per dolci",
      ['es-ES']: "Batidora de pastelería",
      en: "Cake mixer",
    },
    powerW: 100,
    hours: 0.25
  },
  {
    id: 11,
    value: {
      ['pt-BR']: "Bomba d'água 1/4 CV monofásica",
      ['it-IT']: "Pompa d'acqua 1/4 CV monofase",
      ['es-ES']: "Bomba de agua 1/4 CV monofásica",
      en: "1/4 HP single-phase water pump",
    },
    powerW: 390,
    hours: 1
  },
  {
    id: 12,
    value: {
      ['pt-BR']: "Bomba d'água 1/3 CV monofásica",
      ['it-IT']: "Pompa d'acqua 1/3 CV monofase",
      ['es-ES']: "Bomba de agua 1/3 CV monofásica",
      en: "1/3 HP single-phase water pump",
    },
    powerW: 520,
    hours: 1
  },
  {
    id: 13,
    value: {
      ['pt-BR']: "Bomba d'água 1/2 CV trifásica",
      ['it-IT']: "Pompa d'acqua 1/2 CV trifase",
      ['es-ES']: "Bomba de agua 1/2 CV trifásica",
      en: "1/2 HP three-phase water pump",
    },
    powerW: 570,
    hours: 1
  },
  {
    id: 14,
    value: {
      ['pt-BR']: "Bomba d'água 3/4 CV trifásica",
      ['it-IT']: "Pompa d'acqua 3/4 CV trifase",
      ['es-ES']: "Bomba de agua 3/4 CV trifásica",
      en: "3/4 HP three-phase water pump",
    },
    powerW: 820,
    hours: 1
  },
  {
    id: 15,
    value: {
      ['pt-BR']: "Bomba d'água 1 CV monofásica",
      ['it-IT']: "Pompa d'acqua 1 CV monofase",
      ['es-ES']: "Bomba de agua 1 CV monofásica",
      en: "1 HP single-phase water pump",
    },
    powerW: 1100,
    hours: 1
  },
  {
    id: 16,
    value: {
      ['pt-BR']: "Cafeteira elétrica pequena uso doméstico",
      ['it-IT']: "Macchina del caffè elettrica piccola uso domestico",
      ['es-ES']: "Cafetera eléctrica pequeña de uso doméstico",
      en: "Small domestic electric coffee maker",
    },
    powerW: 600,
    hours: 0.5
  },
  {
    id: 17,
    value: {
      ['pt-BR']: "Cafeteira elétrica uso comercial",
      ['it-IT']: "Macchina del caffè elettrica uso commerciale",
      ['es-ES']: "Cafetera eléctrica de uso comercial",
      en: "Commercial electric coffee maker",
    },
    powerW: 1200,
    hours: 1
  },
  {
    id: 18,
    value: {
      ['pt-BR']: "Chuveiro elétrico 127V",
      ['it-IT']: "Doccia elettrica 127V",
      ['es-ES']: "Ducha eléctrica 127V",
      en: "Electric shower 127V",
    },
    powerW: 4400,
    hours: 0.5
  },
  {
    id: 19,
    value: {
      ['pt-BR']: "Chuveiro elétrico 220V",
      ['it-IT']: "Doccia elettrica 220V",
      ['es-ES']: "Ducha eléctrica 220V",
      en: "Electric shower 220V",
    },
    powerW: 6000,
    hours: 0.5
  },
  {
    id: 20,
    value: {
      ['pt-BR']: "Chuveiro 4 estações",
      ['it-IT']: "Doccia 4 stagioni",
      ['es-ES']: "Ducha de 4 estaciones",
      en: "4-season shower",
    },
    powerW: 6500,
    hours: 0.5
  },
  {
    id: 21,
    value: {
      ['pt-BR']: "Conjunto de som",
      ['it-IT']: "Set di suoni",
      ['es-ES']: "Conjunto de sonido",
      en: "Sound system",
    },
    powerW: 100,
    hours: 2
  },
  {
    id: 22,
    value: {
      ['pt-BR']: "Ebulidor",
      ['it-IT']: "Scaldabagno elettrico",
      ['es-ES']: "Hervidor eléctrico",
      en: "Electric kettle",
    },
    powerW: 1000,
    hours: 0.25
  },
  {
    id: 23,
    value: {
      ['pt-BR']: "Enceradeira residencial",
      ['it-IT']: "Lucidatrice domestica",
      ['es-ES']: "Pulidora residencial",
      en: "Residential polisher",
    },
    powerW: 300,
    hours: 0.5
  },
  {
    id: 24,
    value: {
      ['pt-BR']: "Espremedor de frutas",
      ['it-IT']: "Spremiagrumi",
      ['es-ES']: "Exprimidor de frutas",
      en: "Fruit juicer",
    },
    powerW: 200,
    hours: 0.25
  },
  {
    id: 25,
    value: {
      ['pt-BR']: "Exaustor",
      ['it-IT']: "Estrattore",
      ['es-ES']: "Extractor",
      en: "Extractor fan",
    },
    powerW: 150,
    hours: 1
  },
  {
    id: 26,
    value: {
      ['pt-BR']: "Ferro elétrico automático de passar roupa",
      ['it-IT']: "Ferro da stiro elettrico automatico",
      ['es-ES']: "Plancha eléctrica automática para la ropa",
      en: "Automatic electric iron for clothes",
    },
    powerW: 1000,
    hours: 1
  },
  {
    id: 27,
    value: {
      ['pt-BR']: "Ferro elétrico simples de passar roupa",
      ['it-IT']: "Ferro da stiro elettrico semplice",
      ['es-ES']: "Plancha eléctrica simple para la ropa",
      en: "Simple electric iron for clothes",
    },
    powerW: 500,
    hours: 1
  },
  {
    id: 28,
    value: {
      ['pt-BR']: "Fogão comum com acendedor",
      ['it-IT']: "Fornello elettrico comune con accenditore",
      ['es-ES']: "Cocina eléctrica común con encendedor",
      en: "Common electric stove with igniter",
    },
    powerW: 90,
    hours: 1
  },
  {
    id: 29,
    value: {
      ['pt-BR']: "Fogão elétrico de 4 bocas potência por cada queimador",
      ['it-IT']: "Fornello elettrico 4 fuochi potenza per ogni bruciatore",
      ['es-ES']: "Cocina eléctrica de 4 quemadores potencia por cada quemador",
      en: "4-burner electric stove power per burner",
    },
    powerW: 1500,
    hours: 1
  },
  {
    id: 30,
    value: {
      ['pt-BR']: "Fogão elétrico de 6 bocas potência por cada queimador médio",
      ['it-IT']: "Fornello elettrico 6 fuochi potenza per ogni bruciatore medio",
      ['es-ES']: "Cocina eléctrica de 6 quemadores potencia por cada quemador mediano",
      en: "6-burner electric stove power per medium burner",
    },
    powerW: 2100,
    hours: 1
  },
  {
    id: 31,
    value: {
      ['pt-BR']: "Fogão elétrico de 6 bocas potência por cada queimador grande",
      ['it-IT']: "Fornello elettrico 6 fuochi potenza per ogni bruciatore grande",
      ['es-ES']: "Cocina eléctrica de 6 quemadores potencia por cada quemador grande",
      en: "6-burner electric stove power per large burner",
    },
    powerW: 2700,
    hours: 1
  },
  {
    id: 32,
    value: {
      ['pt-BR']: "Forno de microondas",
      ['it-IT']: "Forno a microonde",
      ['es-ES']: "Horno de microondas",
      en: "Microwave oven",
    },
    powerW: 750,
    hours: 0.25
  },
  {
    id: 33,
    value: {
      ['pt-BR']: "Forno elétrico de embutir",
      ['it-IT']: "Forno elettrico da incasso",
      ['es-ES']: "Horno eléctrico empotrado",
      en: "Built-in electric oven",
    },
    powerW: 4500,
    hours: 1
  },
  {
    id: 34,
    value: {
      ['pt-BR']: "Freezer vertical Pequeno",
      ['it-IT']: "Congelatore verticale piccolo",
      ['es-ES']: "Congelador vertical pequeño",
      en: "Small vertical freezer",
    },
    powerW: 300,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 35,
    value: {
      ['pt-BR']: "Freezer horizontal médio",
      ['it-IT']: "Congelatore orizzontale medio",
      ['es-ES']: "Congelador horizontal mediano",
      en: "Medium horizontal freezer",
    },
    powerW: 400,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 36,
    value: {
      ['pt-BR']: "Freezer Horizontal Grande",
      ['it-IT']: "Congelatore orizzontale grande",
      ['es-ES']: "Congelador horizontal grande",
      en: "Large horizontal freezer",
    },
    powerW: 500,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 37,
    value: {
      ['pt-BR']: "Geladeira Comum",
      ['it-IT']: "Frigorifero comune",
      ['es-ES']: "Refrigerador común",
      en: "Common refrigerator",
    },
    powerW: 250,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 38,
    value: {
      ['pt-BR']: "Geladeira Duplex",
      ['it-IT']: "Frigorifero doppia porta",
      ['es-ES']: "Refrigerador dúplex",
      en: "Duplex refrigerator",
    },
    powerW: 300,
    hours: 24 / 3 // Estimate: 8 hours/day
  },
  {
    id: 39,
    value: {
      ['pt-BR']: "Grill",
      ['it-IT']: "Griglia elettrica",
      ['es-ES']: "Parrilla eléctrica",
      en: "Electric grill",
    },
    powerW: 1200,
    hours: 0.5
  },
  {
    id: 40,
    value: {
      ['pt-BR']: "Impressora comum",
      ['it-IT']: "Stampante comune",
      ['es-ES']: "Impresora común",
      en: "Common printer",
    },
    powerW: 150,
    hours: 1
  },
  {
    id: 41,
    value: {
      ['pt-BR']: "Impressora laser",
      ['it-IT']: "Stampante laser",
      ['es-ES']: "Impresora láser",
      en: "Laser printer",
    },
    powerW: 900,
    hours: 1,
  },
  {
    id: 42,
    value: {
      ['pt-BR']: "Liquidificador doméstico",
      ['it-IT']: "Frullatore domestico",
      ['es-ES']: "Licuadora doméstica",
      en: "Household blender",
    },
    powerW: 200,
    hours: 0.25,
  },
  {
    id: 43,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 15W",
      ['it-IT']: "Lampadina incandescente da 15W",
      ['es-ES']: "Bombilla incandescente de 15W",
      en: "15W Incandescent bulb",
    },
    powerW: 15,
    hours: 5,
  },
  {
    id: 44,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 20W",
      ['it-IT']: "Lampadina incandescente da 20W",
      ['es-ES']: "Bombilla incandescente de 20W",
      en: "20W Incandescent bulb",
    },
    powerW: 20,
    hours: 5,
  },
  {
    id: 45,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 25W",
      ['it-IT']: "Lampadina incandescente da 25W",
      ['es-ES']: "Bombilla incandescente de 25W",
      en: "25W Incandescent bulb",
    },
    powerW: 25,
    hours: 5,
  },
  {
    id: 46,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 40W",
      ['it-IT']: "Lampadina incandescente da 40W",
      ['es-ES']: "Bombilla incandescente de 40W",
      en: "40W Incandescent bulb",
    },
    powerW: 40,
    hours: 5,
  },
  {
    id: 47,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 60W",
      ['it-IT']: "Lampadina incandescente da 60W",
      ['es-ES']: "Bombilla incandescente de 60W",
      en: "60W Incandescent bulb",
    },
    powerW: 60,
    hours: 5,
  },
  {
    id: 48,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 100W",
      ['it-IT']: "Lampadina incandescente da 100W",
      ['es-ES']: "Bombilla incandescente de 100W",
      en: "100W Incandescent bulb",
    },
    powerW: 100,
    hours: 5,
  },
  {
    id: 49,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 150W",
      ['it-IT']: "Lampadina incandescente da 150W",
      ['es-ES']: "Bombilla incandescente de 150W",
      en: "150W Incandescent bulb",
    },
    powerW: 150,
    hours: 5,
  },
  {
    id: 50,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 200W",
      ['it-IT']: "Lampadina incandescente da 200W",
      ['es-ES']: "Bombilla incandescente de 200W",
      en: "200W Incandescent bulb",
    },
    powerW: 200,
    hours: 5,
  },
  {
    id: 51,
    value: {
      ['pt-BR']: "Lâmpada Incandescente de 250W",
      ['it-IT']: "Lampadina incandescente da 250W",
      ['es-ES']: "Bombilla incandescente de 250W",
      en: "250W Incandescent bulb",
    },
    powerW: 250,
    hours: 5,
  },
  {
    id: 52,
    value: {
      ['pt-BR']: "Lâmpada Fluorescente de 20W",
      ['it-IT']: "Lampadina fluorescente da 20W",
      ['es-ES']: "Bombilla fluorescente de 20W",
      en: "20W Fluorescent bulb",
    },
    powerW: 20,
    hours: 5,
  },
  {
    id: 53,
    value: {
      ['pt-BR']: "Lâmpada Fluorescente de 40W",
      ['it-IT']: "Lampadina fluorescente da 40W",
      ['es-ES']: "Bombilla fluorescente de 40W",
      en: "40W Fluorescent bulb",
    },
    powerW: 40,
    hours: 5,
  },
  {
    id: 54,
    value: {
      ['pt-BR']: "Máquina de lavar louças",
      ['it-IT']: "Lavastoviglie",
      ['es-ES']: "Lavavajillas",
      en: "Dishwasher",
    },
    powerW: 1500,
    hours: 1,
  },
  {
    id: 55,
    value: {
      ['pt-BR']: "Máquina de lavar roupas com aquecimento",
      ['it-IT']: "Lavatrice con riscaldamento",
      ['es-ES']: "Lavadora con calefacción",
      en: "Washing machine with heating",
    },
    powerW: 1000,
    hours: 1,
  },
  {
    id: 56,
    value: {
      ['pt-BR']: "Máquina de secar roupas",
      ['it-IT']: "Asciugatrice",
      ['es-ES']: "Secadora",
      en: "Clothes dryer",
    },
    powerW: 3500,
    hours: 1,
  },
  {
    id: 57,
    value: {
      ['pt-BR']: "Máquina para costurar",
      ['it-IT']: "Macchina per cucire",
      ['es-ES']: "Máquina de coser",
      en: "Sewing machine",
    },
    powerW: 100,
    hours: 0.5,
  },
  {
    id: 58,
    value: {
      ['pt-BR']: "Máquina de lavar pratos",
      ['it-IT']: "Lavapiatti",
      ['es-ES']: "Lavaplatos",
      en: "Small dishwasher",
    },
    powerW: 1200,
    hours: 1,
  },
  {
    id: 59,
    value: {
      ['pt-BR']: "Máquina de lavar roupas",
      ['it-IT']: "Lavatrice",
      ['es-ES']: "Lavadora",
      en: "Washing machine",
    },
    powerW: 1500,
    hours: 1,
  },
  {
    id: 60,
    value: {
      ['pt-BR']: "Máquina de xerox grande",
      ['it-IT']: "Fotocopiatrice grande",
      ['es-ES']: "Fotocopiadora grande",
      en: "Large photocopier",
    },
    powerW: 2000,
    hours: 1,
  },
  {
    id: 61,
    value: {
      ['pt-BR']: "Máquina de xerox pequena",
      ['it-IT']: "Fotocopiatrice piccola",
      ['es-ES']: "Fotocopiadora pequeña",
      en: "Small photocopier",
    },
    powerW: 1500,
    hours: 1,
  },
  {
    id: 62,
    value: {
      ['pt-BR']: "Micro computador",
      ['it-IT']: "Micro computer",
      ['es-ES']: "Microordenador",
      en: "Micro computer",
    },
    powerW: 250,
    hours: 5,
  },
  {
    id: 63,
    value: {
      ['pt-BR']: "Micro forno elétrico",
      ['it-IT']: "Forno a microonde elettrico",
      ['es-ES']: "Horno eléctrico pequeño",
      en: "Small electric oven",
    },
    powerW: 1000,
    hours: 1,
  },
  {
    id: 64,
    value: {
      ['pt-BR']: "Panela elétrica",
      ['it-IT']: "Padella elettrica",
      ['es-ES']: "Sartén eléctrica",
      en: "Electric pan",
    },
    powerW: 1200,
    hours: 1,
  },
  {
    id: 65,
    value: {
      ['pt-BR']: "Raio X (dentista)",
      ['it-IT']: "Raggi X (dentista)",
      ['es-ES']: "Rayos X (dentista)",
      en: "X-ray (dentist)",
    },
    powerW: 1090,
    hours: 0.5,
  },
  {
    id: 66,
    value: {
      ['pt-BR']: "Raio X (hospital)",
      ['it-IT']: "Raggi X (ospedale)",
      ['es-ES']: "Rayos X (hospital)",
      en: "X-ray (hospital)",
    },
    powerW: 12100,
    hours: 0.5,
  },
  {
    id: 67,
    value: {
      ['pt-BR']: "Refletor odontológico",
      ['it-IT']: "Riflettore dentistico",
      ['es-ES']: "Reflector dental",
      en: "Dental reflector",
    },
    powerW: 150,
    hours: 0.5,
  },
  {
    id: 68,
    value: {
      ['pt-BR']: "Sanduicheira",
      ['it-IT']: "Tostapane",
      ['es-ES']: "Tostadora",
      en: "Sandwich maker",
    },
    powerW: 640,
    hours: 0.25,
  },
  {
    id: 69,
    value: {
      ['pt-BR']: "Sauna comercial",
      ['it-IT']: "Sauna commerciale",
      ['es-ES']: "Sauna comercial",
      en: "Commercial sauna",
    },
    powerW: 12000,
    hours: 2,
  },
  {
    id: 70,
    value: {
      ['pt-BR']: "Sauna residencial",
      ['it-IT']: "Sauna residenziale",
      ['es-ES']: "Sauna residencial",
      en: "Residential sauna",
    },
    powerW: 4500,
    hours: 2,
  },
  {
    id: 71,
    value: {
      ['pt-BR']: "Scanner",
      ['it-IT']: "Scanner",
      ['es-ES']: "Escáner",
      en: "Scanner",
    },
    powerW: 50,
    hours: 1,
  },
  {
    id: 72,
    value: {
      ['pt-BR']: "Secador de cabelos grande",
      ['it-IT']: "Asciugacapelli grande",
      ['es-ES']: "Secador de pelo grande",
      en: "Large hair dryer",
    },
    powerW: 1250,
    hours: 0.25,
  },
  {
    id: 73,
    value: {
      ['pt-BR']: "Secador de cabelos pequeno",
      ['it-IT']: "Asciugacapelli piccolo",
      ['es-ES']: "Secador de pelo pequeño",
      en: "Small hair dryer",
    },
    powerW: 700,
    hours: 0.25,
  },
  {
    id: 74,
    value: {
      ['pt-BR']: "Secador de roupa comercial",
      ['it-IT']: "Asciugatrice commerciale",
      ['es-ES']: "Secadora comercial",
      en: "Commercial clothes dryer",
    },
    powerW: 5000,
    hours: 1,
  },
  {
    id: 75,
    value: {
      ['pt-BR']: "Secador de roupa residencial",
      ['it-IT']: "Asciugatrice residenziale",
      ['es-ES']: "Secadora residencial",
      en: "Residential clothes dryer",
    },
    powerW: 1100,
    hours: 1,
  },
  {
    id: 76,
    value: {
      ['pt-BR']: "Televisor colorido",
      ['it-IT']: "TV a colori",
      ['es-ES']: "Televisor a color",
      en: "Color television",
    },
    powerW: 200,
    hours: 5,
  },
  {
    id: 77,
    value: {
      ['pt-BR']: "Televisor preto e branco",
      ['it-IT']: "TV in bianco e nero",
      ['es-ES']: "Televisor en blanco y negro",
      en: "Black and white television",
    },
    powerW: 90,
    hours: 5,
  },
  {
    id: 78,
    value: {
      ['pt-BR']: "Torneira elétrica",
      ['it-IT']: "Rubinetto elettrico",
      ['es-ES']: "Grifo eléctrico",
      en: "Electric faucet",
    },
    powerW: 2000,
    hours: 1,
  },
  {
    id: 79,
    value: {
      ['pt-BR']: "Vaporizador",
      ['it-IT']: "Vaporizzatore",
      ['es-ES']: "Vaporizador",
      en: "Vaporizer",
    },
    powerW: 300,
    hours: 0.5,
  },
  {
    id: 80,
    value: {
      ['pt-BR']: "Ventilador grande",
      ['it-IT']: "Ventilatore grande",
      ['es-ES']: "Ventilador grande",
      en: "Large fan",
    },
    powerW: 250,
    hours: 12,
  },
  {
    id: 81,
    value: {
      ['pt-BR']: "Ventilador médio",
      ['it-IT']: "Ventilatore medio",
      ['es-ES']: "Ventilador mediano",
      en: "Medium fan",
    },
    powerW: 200,
    hours: 12,
  },
  {
    id: 82,
    value: {
      ['pt-BR']: "Ventilador pequeno",
      ['it-IT']: "Ventilatore piccolo",
      ['es-ES']: "Ventilador pequeño",
      en: "Small fan",
    },
    powerW: 70,
    hours: 12,
  },
  {
    id: 83,
    value: {
      ['pt-BR']: "Vídeo game",
      ['it-IT']: "Videogioco",
      ['es-ES']: "Videojuego",
      en: "Video game",
    },
    powerW: 10,
    hours: 2,
  },
  {
    id: 84,
    value: {
      ['pt-BR']: "Ar condicionado 8500 BTU/h",
      ['it-IT']: "Aria condizionata 8500 BTU/h",
      ['es-ES']: "Aire acondicionado 8500 BTU/h",
      en: "Air conditioner 8500 BTU/h",
    },
    powerW: 1300,
    hours: 6,
  },
  {
    id: 85,
    value: {
      ['pt-BR']: "Ar condicionado 10000 BTU/h",
      ['it-IT']: "Aria condizionata 10000 BTU/h",
      ['es-ES']: "Aire acondicionado 10000 BTU/h",
      en: "Air conditioner 10000 BTU/h",
    },
    powerW: 1400,
    hours: 6,
  },
  {
    id: 86,
    value: {
      ['pt-BR']: "Ar condicionado 12000 BTU/h",
      ['it-IT']: "Aria condizionata 12000 BTU/h",
      ['es-ES']: "Aire acondicionado 12000 BTU/h",
      en: "Air conditioner 12000 BTU/h",
    },
    powerW: 1600,
    hours: 6,
  },
  {
    id: 87,
    value: {
      ['pt-BR']: "Ar condicionado 14000 BTU/h",
      ['it-IT']: "Aria condizionata 14000 BTU/h",
      ['es-ES']: "Aire acondicionado 14000 BTU/h",
      en: "Air conditioner 14000 BTU/h",
    },
    powerW: 1900,
    hours: 6,
  },
  {
    id: 88,
    value: {
      ['pt-BR']: "Ar condicionado 18000 BTU/h",
      ['it-IT']: "Aria condizionata 18000 BTU/h",
      ['es-ES']: "Aire acondicionado 18000 BTU/h",
      en: "Air conditioner 18000 BTU/h",
    },
    powerW: 2600,
    hours: 6,
  },
  {
    id: 89,
    value: {
      ['pt-BR']: "Ar condicionado 21000 BTU/h",
      ['it-IT']: "Aria condizionata 21000 BTU/h",
      ['es-ES']: "Aire acondicionado 21000 BTU/h",
      en: "Air conditioner 21000 BTU/h",
    },
    powerW: 2800,
    hours: 6,
  },
  {
    id: 90,
    value: {
      ['pt-BR']: "Ar condicionado 30000 BTU/h",
      ['it-IT']: "Aria condizionata 30000 BTU/h",
      ['es-ES']: "Aire acondicionado 30000 BTU/h",
      en: "Air conditioner 30000 BTU/h",
    },
    powerW: 3600,
    hours: 6,
  },
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
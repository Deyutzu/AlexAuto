export interface VehicleModel {
  name: string;
  yearsRange: [number, number];
  engines: string[];
}

export interface VehicleBrand {
  brand: string;
  models: VehicleModel[];
}

/**
 * Generates descending year strings from a model's [startYear, endYear] range.
 */
export function getYearsFromRange(range: [number, number]): string[] {
  const [start, end] = range;
  const years: string[] = [];
  for (let y = end; y >= start; y--) {
    years.push(String(y));
  }
  return years;
}

export const VEHICLES_DB: VehicleBrand[] = [
  {
    brand: "Dacia",
    models: [
      { name: "Logan I / II / III", yearsRange: [2004, 2025], engines: ["1.4 MPI 75 CP", "1.6 MPI 85 CP", "0.9 TCe 90 CP", "1.0 ECO-G 100 CP", "1.5 dCi 75 CP", "1.5 dCi 90 CP"] },
      { name: "Sandero / Stepway", yearsRange: [2008, 2025], engines: ["1.2 16V 75 CP", "0.9 TCe 90 CP", "1.0 TCe 90 CP", "1.0 ECO-G 100 CP", "1.5 dCi 90 CP"] },
      { name: "Duster I / II / III", yearsRange: [2010, 2025], engines: ["1.6 16V 105 CP", "1.3 TCe 130 CP", "1.3 TCe 150 CP 4WD", "1.0 ECO-G 100 CP", "1.5 dCi 110 CP 4WD", "1.5 Blue dCi 115 CP"] },
      { name: "Jogger", yearsRange: [2021, 2025], engines: ["1.0 ECO-G 100 CP", "1.0 TCe 110 CP", "1.6 Hybrid 140 CP"] },
      { name: "Dokker", yearsRange: [2012, 2021], engines: ["1.6 MPI 85 CP", "1.2 TCe 115 CP", "1.5 dCi 75 CP", "1.5 dCi 90 CP"] },
      { name: "Lodgy", yearsRange: [2012, 2022], engines: ["1.6 MPI 85 CP", "1.3 TCe 130 CP", "1.5 dCi 90 CP", "1.5 dCi 110 CP"] },
      { name: "Spring", yearsRange: [2021, 2025], engines: ["Electric 45 CP (33 kW)", "Electric Extreme 65 CP (48 kW)", "Electric 27.4 kWh"] },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      { name: "Golf 5 / 6 / 7 / 8", yearsRange: [2003, 2025], engines: ["1.4 TSI 125 CP", "1.5 TSI 150 CP", "1.6 MPI 102 CP", "1.6 TDI 105 CP", "1.6 TDI 115 CP", "2.0 TDI 150 CP"] },
      { name: "Passat B6 / B7 / B8", yearsRange: [2005, 2024], engines: ["1.4 TSI 150 CP", "1.8 TSI 160 CP", "1.6 TDI 120 CP", "1.9 TDI 105 CP", "2.0 TDI 140 CP", "2.0 TDI 150 CP", "2.0 TDI 190 CP"] },
      { name: "Polo IV / V / VI", yearsRange: [2005, 2025], engines: ["1.0 TSI 95 CP", "1.2 HTP 70 CP", "1.4 16V 85 CP", "1.4 TDI 90 CP", "1.6 TDI 95 CP"] },
      { name: "Tiguan I / II / III", yearsRange: [2007, 2025], engines: ["1.4 TSI 150 CP", "1.5 TSI 150 CP", "2.0 TSI 180 CP", "2.0 TDI 140 CP 4Motion", "2.0 TDI 150 CP", "2.0 TDI 190 CP 4Motion"] },
      { name: "Touran I / II", yearsRange: [2003, 2024], engines: ["1.4 TSI 140 CP", "1.9 TDI 105 CP", "1.6 TDI 115 CP", "2.0 TDI 140 CP", "2.0 TDI 150 CP"] },
      { name: "Caddy III / IV / V", yearsRange: [2004, 2025], engines: ["1.2 TSI 105 CP", "1.6 TDI 102 CP", "1.9 TDI 105 CP", "2.0 SDI 70 CP", "2.0 TDI 122 CP"] },
      { name: "Touareg II / III", yearsRange: [2010, 2025], engines: ["3.0 V6 TDI 204 CP", "3.0 V6 TDI 245 CP", "3.0 V6 TDI 286 CP", "3.0 V6 TSI 340 CP"] },
    ],
  },
  {
    brand: "Audi",
    models: [
      { name: "A3 (8P / 8V / 8Y)", yearsRange: [2004, 2025], engines: ["1.4 TFSI 125 CP", "1.5 TFSI 150 CP", "1.6 TDI 110 CP", "1.9 TDI 105 CP", "2.0 TDI 140 CP", "2.0 TDI 150 CP"] },
      { name: "A4 (B7 / B8 / B9)", yearsRange: [2005, 2025], engines: ["1.8 TFSI 160 CP", "2.0 TFSI 190 CP", "2.0 TDI 143 CP", "2.0 TDI 150 CP", "2.0 TDI 190 CP quattro", "3.0 TDI 245 CP"] },
      { name: "A5 Sportback / Coupé", yearsRange: [2007, 2024], engines: ["2.0 TFSI 211 CP", "2.0 TDI 177 CP", "2.0 TDI 190 CP quattro", "3.0 TDI V6 245 CP"] },
      { name: "A6 (C6 / C7 / C8)", yearsRange: [2005, 2025], engines: ["2.0 TDI 177 CP", "2.0 TDI Ultra 190 CP", "40 TDI 204 CP", "3.0 TDI quattro 245 CP", "3.0 TDI quattro 286 CP"] },
      { name: "Q3 (8U / F3)", yearsRange: [2011, 2025], engines: ["1.4 TFSI 150 CP", "35 TFSI 150 CP", "2.0 TDI 140 CP", "2.0 TDI quattro 150 CP", "2.0 TDI quattro 184 CP"] },
      { name: "Q5 (8R / FY)", yearsRange: [2008, 2025], engines: ["2.0 TFSI quattro 225 CP", "2.0 TDI quattro 170 CP", "2.0 TDI quattro 190 CP", "40 TDI quattro 204 CP", "3.0 TDI quattro 258 CP"] },
      { name: "Q7 (4L / 4M)", yearsRange: [2006, 2025], engines: ["3.0 TDI quattro 240 CP", "3.0 TDI quattro 272 CP", "50 TDI quattro 286 CP", "3.0 TFSI quattro 333 CP"] },
    ],
  },
  {
    brand: "BMW",
    models: [
      { name: "Seria 1 (E87 / F20 / F40)", yearsRange: [2004, 2024], engines: ["116i 136 CP", "118i 140 CP", "116d 116 CP", "118d 2.0 143 CP", "118d 2.0 150 CP", "120d 190 CP"] },
      { name: "Seria 3 (E90 / F30 / G20)", yearsRange: [2005, 2025], engines: ["318i 156 CP", "320i 184 CP", "318d 2.0 143 CP", "318d 2.0 150 CP", "320d 2.0 184 CP", "320d xDrive 190 CP"] },
      { name: "Seria 5 (E60 / F10 / G30)", yearsRange: [2004, 2024], engines: ["520i 184 CP", "520d 2.0 177 CP", "520d 2.0 190 CP", "525d 218 CP", "530d xDrive 3.0 258 CP", "530d xDrive 265 CP"] },
      { name: "X1 (E84 / F48 / U11)", yearsRange: [2009, 2025], engines: ["sDrive18i 140 CP", "sDrive18d 143 CP", "xDrive18d 150 CP", "xDrive20d 184 CP", "xDrive20d 190 CP"] },
      { name: "X3 (E83 / F25 / G01)", yearsRange: [2004, 2025], engines: ["xDrive20i 184 CP", "xDrive20d 177 CP", "xDrive20d 184 CP", "xDrive20d 190 CP", "xDrive30d 258 CP"] },
      { name: "X5 (E70 / F15 / G05)", yearsRange: [2007, 2025], engines: ["xDrive25d 231 CP", "xDrive30d 245 CP", "xDrive30d 258 CP", "xDrive30d 286 CP", "xDrive40d 313 CP"] },
      { name: "X6 (E71 / F16 / G06)", yearsRange: [2008, 2025], engines: ["xDrive30d 258 CP", "xDrive30d 286 CP", "xDrive40d 306 CP", "xDrive40i 340 CP"] },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "Clasa A (W169 / W176 / W177)", yearsRange: [2005, 2025], engines: ["A 180 136 CP", "A 200 163 CP", "A 180 CDI 109 CP", "A 180 d 116 CP", "A 200 d 150 CP"] },
      { name: "Clasa C (W204 / W205 / W206)", yearsRange: [2007, 2025], engines: ["C 180 Kompressor / CGI 156 CP", "C 200 184 CP", "C 200 CDI 136 CP", "C 220 CDI 170 CP", "C 220 d 194 CP"] },
      { name: "Clasa E (W211 / W212 / W213)", yearsRange: [2004, 2024], engines: ["E 200 CDI 136 CP", "E 220 CDI 170 CP", "E 220 d 194 CP", "E 250 CDI 204 CP", "E 350 d V6 258 CP"] },
      { name: "GLA (X156 / H247)", yearsRange: [2013, 2025], engines: ["GLA 180 122 CP", "GLA 200 156 CP", "GLA 200 CDI 136 CP", "GLA 200 d 150 CP", "GLA 220 d 4MATIC 177 CP"] },
      { name: "GLC (X253 / X254)", yearsRange: [2015, 2025], engines: ["GLC 220 d 4MATIC 170 CP", "GLC 220 d 4MATIC 194 CP", "GLC 250 d 4MATIC 204 CP", "GLC 300 e Plug-in"] },
      { name: "GLE / ML (W164 / W166 / V167)", yearsRange: [2006, 2025], engines: ["ML 320 CDI 224 CP", "ML 350 BlueTEC 258 CP", "GLE 350 d 4MATIC 258 CP", "GLE 300 d 4MATIC 245 CP"] },
      { name: "Sprinter (906 / 907)", yearsRange: [2006, 2025], engines: ["311 CDI 109 CP", "313 CDI 129 CP", "314 CDI 143 CP", "316 CDI 163 CP", "319 CDI 190 CP"] },
    ],
  },
  {
    brand: "Skoda",
    models: [
      { name: "Octavia II / III / IV", yearsRange: [2004, 2025], engines: ["1.4 TSI 140 CP", "1.5 TSI 150 CP", "1.6 MPI 102 CP", "1.6 TDI 105 CP", "1.6 TDI 115 CP", "1.9 TDI 105 CP", "2.0 TDI 150 CP"] },
      { name: "Superb II / III", yearsRange: [2008, 2024], engines: ["1.4 TSI 150 CP", "1.8 TSI 160 CP", "1.6 TDI 120 CP", "2.0 TDI 140 CP", "2.0 TDI 150 CP", "2.0 TDI 190 CP 4x4"] },
      { name: "Fabia II / III / IV", yearsRange: [2007, 2025], engines: ["1.0 TSI 95 CP", "1.2 HTP 70 CP", "1.2 TSI 90 CP", "1.4 16V 86 CP", "1.4 TDI 90 CP"] },
      { name: "Rapid / Scala", yearsRange: [2012, 2025], engines: ["1.0 TSI 110 CP", "1.2 TSI 105 CP", "1.4 TDI 90 CP", "1.6 TDI 115 CP"] },
      { name: "Kodiaq", yearsRange: [2016, 2025], engines: ["1.5 TSI 150 CP", "2.0 TSI 190 CP 4x4", "2.0 TDI 150 CP", "2.0 TDI 190 CP 4x4", "2.0 TDI 200 CP 4x4"] },
      { name: "Karoq", yearsRange: [2017, 2025], engines: ["1.0 TSI 115 CP", "1.5 TSI 150 CP", "1.6 TDI 115 CP", "2.0 TDI 150 CP 4x4"] },
      { name: "Kamiq", yearsRange: [2019, 2025], engines: ["1.0 TSI 95 CP", "1.0 TSI 110 CP", "1.5 TSI 150 CP", "1.6 TDI 115 CP"] },
    ],
  },
  {
    brand: "Ford",
    models: [
      { name: "Focus II / III / IV", yearsRange: [2004, 2025], engines: ["1.0 EcoBoost 125 CP", "1.6 Ti-VCT 105 CP", "1.5 TDCi 120 CP", "1.5 EcoBlue 120 CP", "1.6 TDCi 109 CP", "2.0 TDCi 150 CP"] },
      { name: "Fiesta VI / VII", yearsRange: [2008, 2023], engines: ["1.0 EcoBoost 100 CP", "1.25 16V 82 CP", "1.4 TDCi 70 CP", "1.5 TDCi 85 CP", "1.6 TDCi 95 CP"] },
      { name: "Mondeo IV / V", yearsRange: [2007, 2022], engines: ["1.5 EcoBoost 160 CP", "1.8 TDCi 125 CP", "2.0 TDCi 140 CP", "2.0 TDCi 150 CP", "2.0 TDCi 180 CP", "2.0 Hybrid 187 CP"] },
      { name: "Kuga I / II / III", yearsRange: [2008, 2025], engines: ["1.5 EcoBoost 150 CP", "2.0 TDCi 140 CP AWD", "2.0 TDCi 150 CP AWD", "2.0 EcoBlue 190 CP AWD", "2.5 Duratec FHEV / PHEV"] },
      { name: "Puma", yearsRange: [2019, 2025], engines: ["1.0 EcoBoost 125 CP", "1.0 EcoBoost mHEV 125 CP", "1.0 EcoBoost mHEV 155 CP", "1.5 EcoBlue 120 CP"] },
      { name: "EcoSport", yearsRange: [2014, 2023], engines: ["1.0 EcoBoost 125 CP", "1.0 EcoBoost 140 CP", "1.5 TDCi 95 CP", "1.5 EcoBlue 125 CP"] },
      { name: "Transit / Transit Custom", yearsRange: [2006, 2025], engines: ["2.0 EcoBlue 105 CP", "2.0 EcoBlue 130 CP", "2.0 EcoBlue 170 CP", "2.2 TDCi 125 CP"] },
    ],
  },
  {
    brand: "Opel",
    models: [
      { name: "Astra H / J / K / L", yearsRange: [2004, 2025], engines: ["1.4 16V 90 CP", "1.4 Turbo 140 CP", "1.6 16V 115 CP", "1.6 CDTI 110 CP", "1.6 CDTI 136 CP", "1.7 CDTI 110 CP"] },
      { name: "Corsa D / E / F", yearsRange: [2006, 2025], engines: ["1.2 16V 85 CP", "1.2 Turbo 100 CP", "1.4 90 CP", "1.3 CDTI 75 CP", "1.3 CDTI 95 CP", "1.5 Diesel 102 CP"] },
      { name: "Insignia A / B", yearsRange: [2008, 2022], engines: ["1.5 Turbo 165 CP", "1.6 CDTI 136 CP", "2.0 CDTI 130 CP", "2.0 CDTI 160 CP", "2.0 CDTI 170 CP"] },
      { name: "Mokka / Mokka X", yearsRange: [2012, 2025], engines: ["1.2 Turbo 130 CP", "1.4 Turbo 140 CP", "1.6 115 CP", "1.6 CDTI 136 CP", "1.7 CDTI 130 CP"] },
      { name: "Zafira B / Tourer C", yearsRange: [2005, 2019], engines: ["1.6 115 CP", "1.4 Turbo 140 CP", "1.7 CDTI 125 CP", "1.9 CDTI 120 CP", "2.0 CDTI 165 CP"] },
      { name: "Crossland / Crossland X", yearsRange: [2017, 2024], engines: ["1.2 83 CP", "1.2 Turbo 110 CP", "1.5 Diesel 102 CP", "1.6 Diesel 99 CP"] },
      { name: "Grandland / Grandland X", yearsRange: [2017, 2025], engines: ["1.2 Turbo 130 CP", "1.5 Diesel 130 CP", "1.6 Diesel 120 CP", "2.0 Diesel 177 CP"] },
    ],
  },
  {
    brand: "Renault",
    models: [
      { name: "Megane II / III / IV", yearsRange: [2004, 2024], engines: ["1.6 16V 110 CP", "1.2 TCe 130 CP", "1.3 TCe 140 CP", "1.5 dCi 90 CP", "1.5 dCi 110 CP", "1.5 Blue dCi 115 CP"] },
      { name: "Clio III / IV / V", yearsRange: [2005, 2025], engines: ["1.2 16V 75 CP", "0.9 TCe 90 CP", "1.0 TCe 90 CP", "1.0 ECO-G 100 CP", "1.5 dCi 75 CP", "1.5 dCi 90 CP"] },
      { name: "Captur I / II", yearsRange: [2013, 2025], engines: ["0.9 TCe 90 CP", "1.0 TCe 100 CP", "1.3 TCe 140 CP", "1.5 dCi 90 CP", "1.5 dCi 110 CP"] },
      { name: "Kadjar", yearsRange: [2015, 2022], engines: ["1.2 TCe 130 CP", "1.3 TCe 140 CP", "1.5 dCi 110 CP", "1.6 dCi 130 CP 4WD"] },
      { name: "Laguna III / Talisman", yearsRange: [2007, 2022], engines: ["1.5 dCi 110 CP", "1.6 dCi 130 CP", "1.6 dCi 160 CP", "2.0 dCi 150 CP", "2.0 Blue dCi 190 CP"] },
      { name: "Scenic / Grand Scenic III / IV", yearsRange: [2009, 2023], engines: ["1.3 TCe 140 CP", "1.5 dCi 110 CP", "1.6 dCi 130 CP", "1.9 dCi 130 CP"] },
      { name: "Master III", yearsRange: [2010, 2024], engines: ["2.3 dCi 125 CP", "2.3 dCi 135 CP", "2.3 dCi 145 CP", "2.3 dCi 165 CP"] },
    ],
  },
  {
    brand: "Peugeot",
    models: [
      { name: "208 I / II", yearsRange: [2012, 2025], engines: ["1.2 PureTech 75 CP", "1.2 PureTech 100 CP", "1.4 HDi 68 CP", "1.5 BlueHDi 100 CP", "1.6 BlueHDi 100 CP"] },
      { name: "308 I / II / III", yearsRange: [2007, 2025], engines: ["1.2 PureTech 130 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 92 CP", "1.6 BlueHDi 120 CP", "2.0 BlueHDi 150 CP"] },
      { name: "508 I / II", yearsRange: [2010, 2024], engines: ["1.5 BlueHDi 130 CP", "1.6 THP 165 CP", "1.6 HDi 115 CP", "2.0 HDi 140 CP", "2.0 HDi 163 CP", "2.0 BlueHDi 180 CP"] },
      { name: "2008 I / II", yearsRange: [2013, 2025], engines: ["1.2 PureTech 100 CP", "1.2 PureTech 130 CP", "1.5 BlueHDi 110 CP", "1.6 BlueHDi 100 CP"] },
      { name: "3008 I / II / III", yearsRange: [2009, 2025], engines: ["1.2 PureTech 130 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 112 CP", "1.6 BlueHDi 120 CP", "2.0 BlueHDi 150 CP", "2.0 BlueHDi 180 CP"] },
      { name: "5008 I / II", yearsRange: [2009, 2024], engines: ["1.2 PureTech 130 CP", "1.5 BlueHDi 130 CP", "1.6 BlueHDi 120 CP", "2.0 HDi 150 CP", "2.0 BlueHDi 180 CP"] },
      { name: "Partner / Rifter", yearsRange: [2008, 2024], engines: ["1.2 PureTech 110 CP", "1.5 BlueHDi 100 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 90 CP"] },
    ],
  },
  {
    brand: "Citroën",
    models: [
      { name: "C3 II / III", yearsRange: [2009, 2025], engines: ["1.2 PureTech 83 CP", "1.2 PureTech 110 CP", "1.4 HDi 70 CP", "1.5 BlueHDi 100 CP", "1.6 BlueHDi 100 CP"] },
      { name: "C4 I / II / III", yearsRange: [2004, 2025], engines: ["1.2 PureTech 130 CP", "1.6 16V 110 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 92 CP", "1.6 HDi 112 CP"] },
      { name: "C4 Cactus", yearsRange: [2014, 2020], engines: ["1.2 PureTech 82 CP", "1.2 PureTech 110 CP", "1.5 BlueHDi 100 CP", "1.6 BlueHDi 100 CP"] },
      { name: "C5 I / II / Aircross", yearsRange: [2008, 2025], engines: ["1.2 PureTech 130 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 115 CP", "2.0 HDi 140 CP", "2.0 HDi 163 CP", "2.0 BlueHDi 180 CP"] },
      { name: "C3 Aircross", yearsRange: [2017, 2025], engines: ["1.2 PureTech 110 CP", "1.2 PureTech 130 CP", "1.5 BlueHDi 110 CP", "1.6 BlueHDi 100 CP"] },
      { name: "Berlingo II / III", yearsRange: [2008, 2024], engines: ["1.2 PureTech 110 CP", "1.5 BlueHDi 100 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 90 CP", "1.6 BlueHDi 100 CP"] },
    ],
  },
  {
    brand: "Toyota",
    models: [
      { name: "Corolla (E150 / E180 / E210)", yearsRange: [2007, 2025], engines: ["1.33 Dual VVT-i 99 CP", "1.6 Valvematic 132 CP", "1.8 Hybrid 122 CP", "1.8 Hybrid 140 CP", "1.4 D-4D 90 CP"] },
      { name: "Auris I / II", yearsRange: [2007, 2019], engines: ["1.4 D-4D 90 CP", "1.6 Valvematic 132 CP", "1.8 Hybrid 136 CP", "2.0 D-4D 126 CP"] },
      { name: "Yaris II / III / IV", yearsRange: [2006, 2025], engines: ["1.0 VVT-i 72 CP", "1.33 VVT-i 99 CP", "1.5 VVT-i 125 CP", "1.5 Hybrid 100 CP", "1.5 Hybrid 116 CP", "1.4 D-4D 90 CP"] },
      { name: "RAV4 III / IV / V", yearsRange: [2006, 2025], engines: ["2.0 Valvematic 158 CP", "2.0 D-4D 124 CP", "2.2 D-4D 150 CP", "2.5 Hybrid 197 CP", "2.5 Hybrid AWD 222 CP"] },
      { name: "C-HR", yearsRange: [2016, 2025], engines: ["1.2 Turbo 116 CP", "1.8 Hybrid 122 CP", "1.8 Hybrid 140 CP", "2.0 Hybrid 184 CP"] },
      { name: "Avensis (T25 / T27)", yearsRange: [2005, 2018], engines: ["1.8 Valvematic 147 CP", "1.6 D-4D 112 CP", "2.0 D-4D 126 CP", "2.0 D-4D 143 CP", "2.2 D-4D 150 CP"] },
      { name: "Hilux", yearsRange: [2006, 2025], engines: ["2.4 D-4D 150 CP", "2.5 D-4D 144 CP", "2.8 D-4D 204 CP", "3.0 D-4D 171 CP"] },
    ],
  },
  {
    brand: "Hyundai",
    models: [
      { name: "Tucson II / III / IV", yearsRange: [2010, 2025], engines: ["1.6 GDI 132 CP", "1.6 T-GDI 150 CP", "1.6 T-GDI Hybrid 230 CP", "1.7 CRDi 115 CP", "1.6 CRDi 136 CP", "2.0 CRDi 185 CP 4WD"] },
      { name: "i30 I / II / III", yearsRange: [2007, 2025], engines: ["1.0 T-GDI 120 CP", "1.4 MPI 100 CP", "1.5 DPI 110 CP", "1.4 CRDi 90 CP", "1.6 CRDi 110 CP", "1.6 CRDi 136 CP"] },
      { name: "i20 I / II / III", yearsRange: [2008, 2025], engines: ["1.0 T-GDI 100 CP", "1.2 MPI 84 CP", "1.4 MPI 100 CP", "1.1 CRDi 75 CP", "1.4 CRDi 90 CP"] },
      { name: "Elantra V / VI / VII", yearsRange: [2011, 2025], engines: ["1.6 MPI 123 CP", "1.6 MPI 128 CP", "1.6 GDI 132 CP", "1.6 CRDi 136 CP"] },
      { name: "Kona", yearsRange: [2017, 2025], engines: ["1.0 T-GDI 120 CP", "1.6 T-GDI 177 CP 4WD", "1.6 GDI Hybrid 141 CP", "1.6 CRDi 136 CP", "Electric 64 kWh 204 CP"] },
      { name: "Santa Fe II / III / IV", yearsRange: [2006, 2024], engines: ["2.2 CRDi 155 CP", "2.2 CRDi 197 CP 4WD", "2.2 CRDi 202 CP 4WD", "1.6 T-GDI Hybrid 230 CP"] },
    ],
  },
  {
    brand: "Kia",
    models: [
      { name: "Sportage III / IV / V", yearsRange: [2010, 2025], engines: ["1.6 GDI 132 CP", "1.6 T-GDI 150 CP", "1.6 T-GDI 177 CP AWD", "1.7 CRDi 115 CP", "1.6 CRDi 136 CP", "2.0 CRDi 185 CP AWD"] },
      { name: "Ceed I / II / III", yearsRange: [2007, 2025], engines: ["1.0 T-GDI 120 CP", "1.4 MPI 100 CP", "1.5 T-GDI 160 CP", "1.4 CRDi 90 CP", "1.6 CRDi 115 CP", "1.6 CRDi 136 CP"] },
      { name: "XCeed", yearsRange: [2019, 2025], engines: ["1.0 T-GDI 120 CP", "1.4 T-GDI 140 CP", "1.5 T-GDI 160 CP", "1.6 CRDi 136 CP"] },
      { name: "Rio III / IV", yearsRange: [2011, 2023], engines: ["1.0 T-GDI 100 CP", "1.2 MPI 84 CP", "1.4 MPI 109 CP", "1.1 CRDi 75 CP", "1.4 CRDi 90 CP"] },
      { name: "Niro", yearsRange: [2016, 2025], engines: ["1.6 GDI Hybrid 141 CP", "1.6 GDI Plug-in Hybrid 141 CP", "e-Niro Electric 204 CP"] },
      { name: "Sorento II / III / IV", yearsRange: [2009, 2025], engines: ["2.2 CRDi 197 CP AWD", "2.2 CRDi 200 CP AWD", "2.2 CRDi 202 CP AWD", "1.6 T-GDI Hybrid 230 CP"] },
    ],
  },
  {
    brand: "Seat",
    models: [
      { name: "Leon II / III / IV", yearsRange: [2005, 2025], engines: ["1.4 TSI 125 CP", "1.4 TSI 150 CP", "1.5 TSI 150 CP", "1.6 TDI 105 CP", "1.6 TDI 115 CP", "1.9 TDI 105 CP", "2.0 TDI 150 CP"] },
      { name: "Ibiza IV / V", yearsRange: [2008, 2025], engines: ["1.0 TSI 95 CP", "1.2 TSI 90 CP", "1.4 16V 85 CP", "1.4 TDI 90 CP", "1.6 TDI 95 CP"] },
      { name: "Ateca", yearsRange: [2016, 2025], engines: ["1.0 TSI 115 CP", "1.4 TSI 150 CP", "1.5 TSI 150 CP", "1.6 TDI 115 CP", "2.0 TDI 150 CP", "2.0 TDI 190 CP 4Drive"] },
      { name: "Arona", yearsRange: [2017, 2025], engines: ["1.0 TSI 95 CP", "1.0 TSI 110 CP", "1.5 TSI 150 CP", "1.6 TDI 95 CP", "1.6 TDI 115 CP"] },
      { name: "Alhambra II", yearsRange: [2010, 2020], engines: ["1.4 TSI 150 CP", "2.0 TDI 140 CP", "2.0 TDI 150 CP", "2.0 TDI 177 CP"] },
      { name: "Tarraco", yearsRange: [2018, 2024], engines: ["1.5 TSI 150 CP", "2.0 TSI 190 CP 4Drive", "2.0 TDI 150 CP", "2.0 TDI 190 CP 4Drive"] },
    ],
  },
  {
    brand: "Fiat",
    models: [
      { name: "Tipo", yearsRange: [2015, 2025], engines: ["1.0 FireFly 100 CP", "1.4 16V 95 CP", "1.4 T-Jet 120 CP", "1.3 MultiJet 95 CP", "1.6 MultiJet 120 CP"] },
      { name: "500 / 500X", yearsRange: [2007, 2025], engines: ["1.0 Hybrid 70 CP", "1.2 8V 69 CP", "1.4 MultiAir 140 CP", "1.3 MultiJet 95 CP", "1.6 MultiJet 120 CP"] },
      { name: "Grande Punto / Punto Evo", yearsRange: [2005, 2018], engines: ["1.2 8V 65 CP", "1.4 8V 77 CP", "1.3 MultiJet 75 CP", "1.3 MultiJet 90 CP"] },
      { name: "Doblo II / III", yearsRange: [2010, 2024], engines: ["1.4 95 CP", "1.3 MultiJet 90 CP", "1.6 MultiJet 105 CP", "1.6 MultiJet 120 CP", "2.0 MultiJet 135 CP"] },
      { name: "Ducato III", yearsRange: [2006, 2025], engines: ["2.2 MultiJet 140 CP", "2.3 MultiJet 120 CP", "2.3 MultiJet 130 CP", "2.3 MultiJet 150 CP", "3.0 MultiJet 180 CP"] },
      { name: "Panda II / III", yearsRange: [2004, 2025], engines: ["1.0 Hybrid 70 CP", "1.2 8V 69 CP", "0.9 TwinAir 85 CP", "1.3 MultiJet 75 CP"] },
    ],
  },
  {
    brand: "Honda",
    models: [
      { name: "Civic VIII / IX / X / XI", yearsRange: [2006, 2025], engines: ["1.0 VTEC Turbo 126 CP", "1.4 i-VTEC 100 CP", "1.5 VTEC Turbo 182 CP", "1.8 i-VTEC 140 CP", "1.6 i-DTEC 120 CP", "2.2 i-CTDi 140 CP"] },
      { name: "CR-V III / IV / V", yearsRange: [2007, 2025], engines: ["1.5 VTEC Turbo 193 CP", "2.0 i-VTEC 150 CP", "2.0 i-MMD Hybrid 184 CP", "1.6 i-DTEC 120 CP", "1.6 i-DTEC 160 CP AWD", "2.2 i-DTEC 150 CP"] },
      { name: "Accord VII / VIII", yearsRange: [2004, 2015], engines: ["2.0 i-VTEC 156 CP", "2.4 i-VTEC 201 CP", "2.2 i-CTDi 140 CP", "2.2 i-DTEC 150 CP"] },
      { name: "HR-V II / III", yearsRange: [2015, 2025], engines: ["1.5 i-VTEC 130 CP", "1.5 i-VTEC Turbo 182 CP", "1.5 e:HEV Hybrid 131 CP", "1.6 i-DTEC 120 CP"] },
      { name: "Jazz II / III / IV", yearsRange: [2008, 2025], engines: ["1.2 i-VTEC 90 CP", "1.3 i-VTEC 102 CP", "1.4 i-VTEC 100 CP", "1.5 e:HEV Hybrid 109 CP"] },
      { name: "ZR-V", yearsRange: [2023, 2025], engines: ["2.0 e:HEV Full Hybrid 184 CP", "2.0 e:HEV Sport 184 CP", "2.0 e:HEV Advance 184 CP"] },
    ],
  },
  {
    brand: "Volvo",
    models: [
      { name: "XC60 I / II", yearsRange: [2008, 2025], engines: ["2.0 D4 190 CP", "2.0 B4 AWD Diesel 197 CP", "2.0 B5 AWD Benzină 250 CP", "2.4 D5 AWD 215 CP", "2.4 D5 AWD 220 CP", "T8 Recharge Plug-in"] },
      { name: "XC90 I / II", yearsRange: [2005, 2025], engines: ["2.0 D5 AWD 225 CP", "2.0 D5 AWD 235 CP", "2.0 B5 AWD 235 CP", "2.4 D5 AWD 185 CP", "2.4 D5 AWD 200 CP", "T8 Twin Engine AWD"] },
      { name: "XC40", yearsRange: [2018, 2025], engines: ["1.5 T3 163 CP", "2.0 B3 163 CP", "2.0 B4 AWD 197 CP", "2.0 D3 150 CP", "2.0 D4 AWD 190 CP"] },
      { name: "S60 II / III", yearsRange: [2010, 2024], engines: ["2.0 D3 150 CP", "2.0 D4 190 CP", "2.0 T4 190 CP", "2.0 B4 197 CP", "2.4 D5 215 CP"] },
      { name: "V60 I / II", yearsRange: [2010, 2025], engines: ["1.6 D2 115 CP", "2.0 D3 150 CP", "2.0 D4 190 CP", "2.0 B4 Diesel 197 CP", "2.4 D5 AWD 215 CP"] },
      { name: "V40 / V40 Cross Country", yearsRange: [2012, 2019], engines: ["1.6 D2 115 CP", "2.0 D2 120 CP", "2.0 D3 150 CP", "2.0 D4 190 CP", "1.5 T3 152 CP"] },
      { name: "S90 / V90", yearsRange: [2016, 2024], engines: ["2.0 D4 190 CP", "2.0 D5 AWD 235 CP", "2.0 B4 197 CP", "2.0 B5 AWD 235 CP"] },
    ],
  },
];

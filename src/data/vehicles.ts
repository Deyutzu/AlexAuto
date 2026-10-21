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
      {
        name: "Logan I (LS)",
        yearsRange: [2004, 2012],
        engines: ["1.4 MPI 75 CP", "1.6 MPI 87 CP", "1.6 16V 105 CP", "1.2 16V 75 CP", "1.5 dCi 65 CP", "1.5 dCi 70 CP", "1.5 dCi 85 CP", "1.4 MPI + GPL"],
      },
      {
        name: "Logan II (L52 / MCV)",
        yearsRange: [2012, 2020],
        engines: ["0.9 TCe 90 CP", "1.0 SCe 73 CP", "1.2 16V 75 CP", "1.0 TCe ECO-G 100 CP (GPL)", "1.5 dCi 75 CP", "1.5 dCi 90 CP", "1.5 Blue dCi 95 CP"],
      },
      {
        name: "Logan III",
        yearsRange: [2020, 2026],
        engines: ["1.0 SCe 65 CP", "1.0 TCe 90 CP", "1.0 TCe 90 CP CVT", "1.0 ECO-G 100 CP (GPL)"],
      },
      {
        name: "Sandero / Sandero Stepway I",
        yearsRange: [2008, 2012],
        engines: ["1.2 16V 75 CP", "1.4 MPI 75 CP", "1.6 MPI 85 CP", "1.5 dCi 70 CP", "1.5 dCi 90 CP"],
      },
      {
        name: "Sandero / Sandero Stepway II",
        yearsRange: [2012, 2020],
        engines: ["0.9 TCe 90 CP", "1.0 SCe 73 CP", "1.2 16V 75 CP", "1.0 TCe ECO-G 100 CP", "1.5 dCi 75 CP", "1.5 dCi 90 CP", "1.5 Blue dCi 95 CP"],
      },
      {
        name: "Sandero / Sandero Stepway III",
        yearsRange: [2020, 2026],
        engines: ["1.0 SCe 65 CP", "1.0 TCe 90 CP", "1.0 TCe 110 CP", "1.0 ECO-G 100 CP (GPL)"],
      },
      {
        name: "Duster I",
        yearsRange: [2010, 2017],
        engines: ["1.6 16V 105 CP 2WD/4WD", "1.6 SCe 115 CP", "1.2 TCe 125 CP", "1.5 dCi 85 CP", "1.5 dCi 90 CP", "1.5 dCi 110 CP 2WD", "1.5 dCi 110 CP 4WD"],
      },
      {
        name: "Duster II",
        yearsRange: [2017, 2024],
        engines: ["1.0 TCe 90 CP", "1.0 ECO-G 100 CP (GPL)", "1.3 TCe 130 CP", "1.3 TCe 150 CP 4WD", "1.6 SCe 115 CP", "1.5 dCi 110 CP", "1.5 Blue dCi 115 CP 4WD"],
      },
      {
        name: "Duster III",
        yearsRange: [2024, 2026],
        engines: ["1.0 ECO-G 100 CP (GPL)", "1.2 TCe 130 CP Mild-Hybrid 2WD", "1.2 TCe 130 CP Mild-Hybrid 4x4", "1.6 Hybrid 140 CP Automată"],
      },
      {
        name: "Jogger",
        yearsRange: [2021, 2026],
        engines: ["1.0 ECO-G 100 CP (GPL)", "1.0 TCe 110 CP", "1.6 Hybrid 140 CP Automată"],
      },
      {
        name: "Dokker / Dokker Van",
        yearsRange: [2012, 2021],
        engines: ["1.6 MPI 85 CP", "1.6 SCe 102 CP", "1.2 TCe 115 CP", "1.3 TCe 130 CP", "1.5 dCi 75 CP", "1.5 dCi 90 CP", "1.5 Blue dCi 95 CP"],
      },
      {
        name: "Lodgy",
        yearsRange: [2012, 2022],
        engines: ["1.6 MPI 85 CP", "1.6 SCe 102 CP", "1.2 TCe 115 CP", "1.3 TCe 130 CP", "1.5 dCi 90 CP", "1.5 dCi 110 CP", "1.5 Blue dCi 115 CP"],
      },
      {
        name: "Spring (Electric)",
        yearsRange: [2021, 2026],
        engines: ["Electric 45 CP (33 kW) 27.4 kWh", "Electric Extreme 65 CP (48 kW)"],
      },
      {
        name: "Bigster",
        yearsRange: [2025, 2026],
        engines: ["1.2 TCe 140 CP Mild-Hybrid", "1.2 ECO-G 140 CP (GPL)", "1.2 TCe 130 CP 4x4", "1.8 Full Hybrid 155 CP"],
      },
    ],
  },
  {
    brand: "Volkswagen",
    models: [
      {
        name: "Golf IV (1J)",
        yearsRange: [1998, 2005],
        engines: ["1.4 16V 75 CP", "1.6 8V 102 CP", "1.6 16V 105 CP", "1.8T 150 CP", "1.9 SDI 68 CP", "1.9 TDI ALH 90 CP", "1.9 TDI ASZ 131 CP", "1.9 TDI AXR 101 CP"],
      },
      {
        name: "Golf V (1K)",
        yearsRange: [2003, 2009],
        engines: ["1.4 16V 75/80 CP", "1.4 TSI 122 CP", "1.4 TSI 140 CP", "1.6 MPI 102 CP", "1.6 FSI 115 CP", "2.0 GTI 200 CP", "1.9 TDI 105 CP (BKC/BXE/BLS)", "2.0 TDI 140 CP (BKD/BMM)"],
      },
      {
        name: "Golf VI (5K)",
        yearsRange: [2008, 2013],
        engines: ["1.2 TSI 85/105 CP", "1.4 16V 80 CP", "1.4 TSI 122 CP", "1.4 TSI 160 CP", "1.6 MPI 102 CP", "2.0 GTI 211 CP", "1.6 TDI 90/105 CP (CAYC)", "2.0 TDI 140 CP (CBAB/CFFB)", "2.0 GTD 170 CP"],
      },
      {
        name: "Golf VII (5G)",
        yearsRange: [2012, 2020],
        engines: ["1.0 TSI 110/115 CP", "1.2 TSI 85/105 CP", "1.4 TSI 125/150 CP", "1.5 TSI 130/150 CP", "2.0 GTI 220/245 CP", "1.6 TDI 90/105/110/115 CP", "2.0 TDI 150 CP", "2.0 GTD 184 CP", "e-Golf 136 CP"],
      },
      {
        name: "Golf VIII (CD)",
        yearsRange: [2020, 2026],
        engines: ["1.0 TSI 110 CP", "1.5 TSI 130/150 CP", "1.5 eTSI Mild-Hybrid 150 CP DSG", "1.4 eHybrid 204/245 CP", "2.0 GTI 245/265 CP", "2.0 TDI 115 CP", "2.0 TDI 150 CP DSG", "2.0 GTD 200 CP"],
      },
      {
        name: "Passat B5.5 (3BG)",
        yearsRange: [2000, 2005],
        engines: ["1.6 102 CP", "1.8T 150 CP", "2.0 115 CP", "1.9 TDI 101 CP (AVB)", "1.9 TDI 131 CP (AWX/AVF)", "2.5 V6 TDI 163/180 CP"],
      },
      {
        name: "Passat B6 (3C)",
        yearsRange: [2005, 2010],
        engines: ["1.4 TSI 122 CP", "1.6 MPI 102 CP", "1.6 FSI 115 CP", "1.8 TSI 160 CP", "2.0 TFSI 200 CP", "1.9 TDI 105 CP", "2.0 TDI 140 CP (BMP/BKP/CBAB)", "2.0 TDI 170 CP (BMR/CBBB)"],
      },
      {
        name: "Passat B7 (36)",
        yearsRange: [2010, 2014],
        engines: ["1.4 TSI 122/160 CP", "1.8 TSI 160 CP", "2.0 TSI 211 CP", "1.6 TDI 105 CP", "2.0 TDI 140 CP (CFFB)", "2.0 TDI 170/177 CP 4Motion"],
      },
      {
        name: "Passat B8 (3G)",
        yearsRange: [2014, 2024],
        engines: ["1.4 TSI 125/150 CP", "1.4 GTE Plug-in Hybrid 218 CP", "1.5 TSI 150 CP", "2.0 TSI 190/280 CP", "1.6 TDI 120 CP", "2.0 TDI 150 CP", "2.0 TDI 190/200 CP 4Motion", "2.0 BiTDI 240 CP 4Motion"],
      },
      {
        name: "Passat CC / CC / Arteon",
        yearsRange: [2008, 2025],
        engines: ["1.4 TSI 150/160 CP", "1.5 TSI 150 CP", "1.8 TSI 160 CP", "2.0 TSI 190/211/280 CP", "2.0 TDI 140/150 CP", "2.0 TDI 170/177/190/200 CP", "2.0 BiTDI 240 CP"],
      },
      {
        name: "Polo IV / V / VI",
        yearsRange: [2002, 2026],
        engines: ["1.0 MPI 60/75/80 CP", "1.0 TSI 95/110 CP", "1.2 HTP 60/70 CP", "1.2 TSI 90/105 CP", "1.4 16V 75/85 CP", "1.4 TDI 75/80/90 CP", "1.6 TDI 90/95/105 CP"],
      },
      {
        name: "Tiguan I (5N)",
        yearsRange: [2007, 2016],
        engines: ["1.4 TSI 122/150/160 CP", "2.0 TSI 180/200/211 CP", "2.0 TDI 110 CP", "2.0 TDI 140 CP 4Motion", "2.0 TDI 170/177 CP 4Motion"],
      },
      {
        name: "Tiguan II / III / Allspace",
        yearsRange: [2016, 2026],
        engines: ["1.4 TSI 125/150 CP", "1.5 TSI / eTSI 130/150 CP", "1.4 eHybrid 245 CP", "2.0 TSI 180/190/220 CP 4Motion", "2.0 TDI 150 CP 2WD/4Motion", "2.0 TDI 190/200 CP 4Motion", "2.0 BiTDI 240 CP"],
      },
      {
        name: "Touareg I / II / III",
        yearsRange: [2003, 2026],
        engines: ["2.5 R5 TDI 174 CP", "3.0 V6 TDI 204/225/240 CP", "3.0 V6 TDI 245/262 CP", "3.0 V6 TDI 231/286 CP", "3.0 V6 TSI / eHybrid", "4.2 V8 TDI 340 CP"],
      },
      {
        name: "T-Roc / T-Cross / Taigo",
        yearsRange: [2017, 2026],
        engines: ["1.0 TSI 95/110/115 CP", "1.5 TSI 150 CP", "2.0 TSI 190 CP 4Motion", "1.6 TDI 115 CP", "2.0 TDI 150 CP"],
      },
      {
        name: "Touran I / II & Sharan",
        yearsRange: [2003, 2025],
        engines: ["1.4 TSI 140/150 CP", "1.5 TSI 150 CP", "1.6 MPI 102 CP", "1.9 TDI 105 CP", "1.6 TDI 105/115 CP", "2.0 TDI 140/150/170/190 CP"],
      },
      {
        name: "Jetta / Bora",
        yearsRange: [1999, 2018],
        engines: ["1.2 TSI 105 CP", "1.4 TSI 122/150 CP", "1.6 MPI 102/105 CP", "1.9 TDI 105 CP", "1.6 TDI 105 CP", "2.0 TDI 110/140/150 CP"],
      },
      {
        name: "Caddy III / IV / V",
        yearsRange: [2004, 2026],
        engines: ["1.2 TSI 84/105 CP", "1.4 TSI 125 CP", "1.5 TSI 114 CP", "1.9 TDI 75/105 CP", "2.0 SDI 70 CP", "1.6 TDI 75/102 CP", "2.0 TDI 75/102/122/140/150 CP"],
      },
      {
        name: "Transporter T5 / T6 / Caravelle / Multivan",
        yearsRange: [2003, 2025],
        engines: ["1.9 TDI 85/102 CP", "2.5 TDI 131/174 CP", "2.0 TDI 84/102/110 CP", "2.0 TDI 140/150 CP", "2.0 BiTDI 180/199/204 CP"],
      },
      {
        name: "Crafter / LT",
        yearsRange: [2006, 2026],
        engines: ["2.5 TDI 109/136/163 CP", "2.0 TDI 109/136/140 CP", "2.0 BiTDI 163/177 CP"],
      },
      {
        name: "ID.3 / ID.4 / ID.5",
        yearsRange: [2020, 2026],
        engines: ["Electric Pure 145/170 CP (52 kWh)", "Electric Pro 174/204 CP (58/77 kWh)", "Electric GTX 299/340 CP AWD"],
      },
    ],
  },
  {
    brand: "Audi",
    models: [
      {
        name: "A1 (8X / GB)",
        yearsRange: [2010, 2026],
        engines: ["1.0 TFSI / 25/30 TFSI 95/110 CP", "1.2 TFSI 86 CP", "1.4 TFSI 122/140 CP", "1.5 TFSI / 35 TFSI 150 CP", "1.6 TDI 90/105/116 CP"],
      },
      {
        name: "A3 (8P / 8V / 8Y)",
        yearsRange: [2003, 2026],
        engines: ["1.2 TFSI 105 CP", "1.4 TFSI 125/140/150 CP", "1.5 TFSI (35 TFSI) 150 CP", "1.6 MPI 102 CP", "2.0 TFSI / S3", "1.9 TDI 105 CP", "1.6 TDI 105/110/116 CP", "2.0 TDI 140/150/184 CP"],
      },
      {
        name: "A4 B6 / B7",
        yearsRange: [2001, 2008],
        engines: ["1.6 102 CP", "1.8T 150/163 CP", "2.0 131 CP", "2.0 TFSI 200 CP", "1.9 TDI 116/131 CP", "2.0 TDI 140/170 CP", "2.5 / 3.0 TDI V6 quattro"],
      },
      {
        name: "A4 B8",
        yearsRange: [2008, 2015],
        engines: ["1.8 TFSI 120/160/170 CP", "2.0 TFSI 180/211/225 CP", "2.0 TDI 120/136 CP", "2.0 TDI 143/150 CP", "2.0 TDI 170/177/190 CP quattro", "2.7 / 3.0 V6 TDI 190/204/240/245 CP"],
      },
      {
        name: "A4 B9 / Allroad",
        yearsRange: [2015, 2025],
        engines: ["1.4 TFSI 150 CP", "2.0 TFSI (35/40/45 TFSI) 150/190/252/265 CP", "2.0 TDI (30/35/40 TDI) 122/136/150/163/190/204 CP", "3.0 V6 TDI (45/50 TDI) 218/231/272/286 CP quattro"],
      },
      {
        name: "A5 Coupé / Sportback",
        yearsRange: [2007, 2026],
        engines: ["1.8 TFSI 170 CP", "2.0 TFSI 190/211/252 CP", "2.0 TDI 143/150/170/177/190/204 CP", "2.7 TDI 190 CP", "3.0 V6 TDI quattro 204/240/245/286 CP"],
      },
      {
        name: "A6 C6 (4F)",
        yearsRange: [2004, 2011],
        engines: ["2.0 TFSI 170 CP", "2.4 V6 177 CP", "2.0 TDI 140/170 CP", "2.7 V6 TDI 180/190 CP", "3.0 V6 TDI quattro 224/233/240 CP"],
      },
      {
        name: "A6 C7 (4G)",
        yearsRange: [2011, 2018],
        engines: ["1.8 TFSI 190 CP", "2.0 TFSI 180/252 CP", "2.0 TDI 177 CP", "2.0 TDI Ultra 190 CP", "3.0 V6 TDI 204/218 CP", "3.0 V6 TDI quattro 245/272 CP", "3.0 V6 BiTDI 313/320 CP"],
      },
      {
        name: "A6 C8 (4K)",
        yearsRange: [2018, 2026],
        engines: ["40 TFSI 204 CP", "45 TFSI quattro 245/265 CP", "50 TFSI e Plug-in Hybrid 299 CP", "35 TDI 163 CP", "40 TDI 204 CP", "45 TDI quattro 231/245 CP", "50 TDI quattro 286 CP"],
      },
      {
        name: "A7 Sportback",
        yearsRange: [2010, 2026],
        engines: ["2.0 TFSI / 45 TFSI 245/252 CP", "3.0 TFSI / 55 TFSI 300/333/340 CP", "40 TDI 204 CP", "3.0 V6 TDI 204/218/245/272/286 CP", "3.0 V6 BiTDI 313/320 CP"],
      },
      {
        name: "A8 (D3 / D4 / D5)",
        yearsRange: [2003, 2026],
        engines: ["3.0 V6 TDI quattro 233/250/258/262 CP", "50 TDI quattro 286 CP", "4.2 V8 TDI quattro 326/350/385 CP", "55 TFSI quattro 340 CP", "60 TFSI e Plug-in"],
      },
      {
        name: "Q2",
        yearsRange: [2016, 2026],
        engines: ["1.0 TFSI (30 TFSI) 110/116 CP", "1.4 / 1.5 TFSI (35 TFSI) 150 CP", "1.6 TDI (30 TDI) 116 CP", "2.0 TDI (35 TDI) 150/190 CP quattro"],
      },
      {
        name: "Q3 (8U / F3)",
        yearsRange: [2011, 2026],
        engines: ["1.4 TFSI 150 CP", "1.5 TFSI (35 TFSI) 150 CP", "2.0 TFSI (40/45 TFSI) 170/190/230/245 CP", "45 TFSI e Plug-in 245 CP", "2.0 TDI 140/150/177/184/190/200 CP quattro"],
      },
      {
        name: "Q5 (8R / FY)",
        yearsRange: [2008, 2026],
        engines: ["2.0 TFSI (45 TFSI) quattro 211/225/252/265 CP", "50/55 TFSI e Plug-in Hybrid", "2.0 TDI 143/150/163/170/177/190 CP", "40 TDI quattro 204 CP", "3.0 V6 TDI (50 TDI) quattro 240/245/258/286 CP"],
      },
      {
        name: "Q7 (4L / 4M) & Q8",
        yearsRange: [2006, 2026],
        engines: ["3.0 V6 TDI quattro 204/218/233/240/245 CP", "45 TDI quattro 231 CP", "50 TDI quattro 272/286 CP", "55 TFSI quattro 340 CP", "55/60 TFSI e Plug-in Hybrid", "SQ7 / SQ8 4.0 V8"],
      },
    ],
  },
  {
    brand: "BMW",
    models: [
      {
        name: "Seria 1 (E87 / F20 / F40)",
        yearsRange: [2004, 2026],
        engines: ["116i 115/122/136/109 CP", "118i 136/140/143/170 CP", "120i 150/170/184 CP", "116d 116 CP", "118d 2.0 122/143/150 CP", "120d 2.0 163/177/184/190 CP xDrive"],
      },
      {
        name: "Seria 2 (Active Tourer / Gran Coupé / Coupé)",
        yearsRange: [2014, 2026],
        engines: ["218i 136/140 CP", "220i 184/192 CP", "225xe Plug-in Hybrid", "216d 116 CP", "218d 2.0 150 CP", "220d 2.0 190 CP xDrive"],
      },
      {
        name: "Seria 3 E46 / E90",
        yearsRange: [1999, 2012],
        engines: ["316i 105/115/122 CP", "318i 118/143 CP", "320i 150/170 CP", "318d 116/122/143 CP", "320d 136/150/163/177/184 CP", "325d / 330d 3.0 197/204/231/245 CP"],
      },
      {
        name: "Seria 3 F30 / G20",
        yearsRange: [2012, 2026],
        engines: ["318i 136/156 CP", "320i 184 CP", "330i 252/258 CP", "330e Plug-in Hybrid 252/292 CP", "316d 116 CP", "318d 2.0 143/150 CP", "320d 2.0 163/184/190 CP xDrive", "330d 3.0 258/265/286 CP"],
      },
      {
        name: "Seria 4 (F32 / F36 / G22 / G26 Gran Coupé)",
        yearsRange: [2013, 2026],
        engines: ["420i 184 CP", "430i 252/258 CP", "418d 150 CP", "420d 2.0 184/190 CP xDrive", "430d 3.0 258/286 CP xDrive", "435d / M440d xDrive"],
      },
      {
        name: "Seria 5 E60 / F10",
        yearsRange: [2003, 2017],
        engines: ["520i 170/184 CP", "525i / 528i", "520d 2.0 163/177/184/190 CP", "525d 177/197/204/218 CP", "530d 3.0 218/235/245/258 CP xDrive", "535d 272/286/300/313 CP"],
      },
      {
        name: "Seria 5 G30 / G60",
        yearsRange: [2017, 2026],
        engines: ["520i 184/208 CP", "530i 252 CP xDrive", "530e / 545e Plug-in Hybrid", "520d 2.0 190/197 CP xDrive", "525d 231 CP", "530d 3.0 265/286 CP xDrive", "540d xDrive 320/340 CP"],
      },
      {
        name: "Seria 6 Gran Turismo / Seria 7",
        yearsRange: [2008, 2026],
        engines: ["730d / 630d 3.0 245/258/265/286 CP xDrive", "740d / 640d xDrive 306/313/320/340 CP", "740i / 745e Plug-in Hybrid", "750d xDrive 381/400 CP"],
      },
      {
        name: "X1 (E84 / F48 / U11) & X2",
        yearsRange: [2009, 2026],
        engines: ["sDrive18i 136/140/150 CP", "xDrive20i 184/192 CP", "xDrive25e Plug-in Hybrid", "sDrive18d / xDrive18d 2.0 143/150 CP", "xDrive20d 2.0 177/184/190 CP", "xDrive23d / xDrive25d 204/218/231 CP"],
      },
      {
        name: "X3 (E83 / F25 / G01) & X4",
        yearsRange: [2004, 2026],
        engines: ["xDrive20i 184 CP", "xDrive30i 252 CP", "xDrive30e Plug-in Hybrid 292 CP", "sDrive18d 143/150 CP", "xDrive20d 2.0 150/177/184/190 CP", "xDrive30d 3.0 218/258/265/286 CP", "xDrive35d / M40d 313/326/340 CP"],
      },
      {
        name: "X5 (E70 / F15 / G05)",
        yearsRange: [2007, 2026],
        engines: ["xDrive25d 2.0 218/231 CP", "xDrive30d 3.0 235/245/258/265/286/298 CP", "xDrive40d 3.0 306/313/340/352 CP", "M50d 381/400 CP", "xDrive40i 340 CP", "xDrive45e / 50e Plug-in Hybrid"],
      },
      {
        name: "X6 (E71 / F16 / G06) & X7",
        yearsRange: [2008, 2026],
        engines: ["xDrive30d 3.0 235/245/258/265/286/298 CP", "xDrive40d 3.0 306/313/340 CP", "M50d 381/400 CP", "xDrive35i / xDrive40i 306/340/381 CP"],
      },
      {
        name: "i3 / i4 / iX3 / iX",
        yearsRange: [2014, 2026],
        engines: ["i3 60Ah / 94Ah / 120Ah 170 CP (+ REX)", "iX3 Electric 286 CP", "i4 eDrive35 / eDrive40 286/340 CP", "iX xDrive40 / xDrive50"],
      },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      {
        name: "Clasa A (W169 / W176 / W177)",
        yearsRange: [2004, 2026],
        engines: ["A 150 / A 160 95/102/109 CP", "A 180 122/136 CP", "A 200 156/163 CP", "A 250 e Plug-in Hybrid", "A 160 CDI / d 82/90/95 CP", "A 180 CDI / d 109/116 CP", "A 200 CDI / d 136/150 CP", "A 220 d 170/190 CP"],
      },
      {
        name: "Clasa B (W245 / W246 / W247)",
        yearsRange: [2005, 2026],
        engines: ["B 170 / B 180 116/122/136 CP", "B 200 156/163 CP", "B 180 CDI / d 109/116 CP", "B 200 CDI / d 136/140/150 CP", "B 220 d 170/190 CP"],
      },
      {
        name: "Clasa C W203 / W204",
        yearsRange: [2001, 2014],
        engines: ["C 180 Kompressor / CGI 143/156 CP", "C 200 Kompressor / CGI 163/184 CP", "C 200 CDI 122/136 CP", "C 220 CDI 143/150/170 CP", "C 250 CDI 204 CP 4MATIC", "C 320 / C 350 CDI V6"],
      },
      {
        name: "Clasa C W205 / W206",
        yearsRange: [2014, 2026],
        engines: ["C 180 156/170 CP", "C 200 184/204 CP 4MATIC", "C 300 / C 300 e Plug-in Hybrid", "C 180 d 116/122 CP", "C 200 d 136/150/160/163 CP", "C 220 d 170/194/200 CP 4MATIC", "C 250 d / C 300 d 204/245/265 CP"],
      },
      {
        name: "Clasa E W211 / W212",
        yearsRange: [2002, 2016],
        engines: ["E 200 Kompressor / CGI 163/184 CP", "E 200 CDI 122/136 CP", "E 220 CDI / BlueTEC 150/170 CP", "E 250 CDI / BlueTEC 204 CP 4MATIC", "E 280 / E 320 / E 350 CDI V6 190/224/231/258/265 CP"],
      },
      {
        name: "Clasa E W213 / W214",
        yearsRange: [2016, 2026],
        engines: ["E 200 184/197/204 CP 4MATIC", "E 300 e / E 300 de Plug-in Hybrid", "E 200 d 150/160 CP", "E 220 d 194/197 CP 4MATIC", "E 300 d 245 CP", "E 350 d / E 400 d 258/286/330/340 CP 4MATIC"],
      },
      {
        name: "Clasa S (W221 / W222 / W223)",
        yearsRange: [2005, 2026],
        engines: ["S 320 / S 350 CDI / BlueTEC / d 235/258/286 CP 4MATIC", "S 400 d / S 450 d 330/340/367 CP 4MATIC", "S 450 / S 500 4MATIC", "S 560 e / S 580 e Plug-in Hybrid"],
      },
      {
        name: "CLA & CLS",
        yearsRange: [2005, 2026],
        engines: ["CLA 180 122/136 CP", "CLA 200 156/163 CP", "CLA 250 e Plug-in", "CLA 200 CDI / d 136/150 CP", "CLA 220 CDI / d 170/177/190 CP 4MATIC", "CLS 320 / 350 CDI / d 224/265/258/286 CP", "CLS 400 d 330/340 CP"],
      },
      {
        name: "GLA & GLB",
        yearsRange: [2013, 2026],
        engines: ["180 122/136 CP", "200 156/163 CP", "250 4MATIC / 250 e Plug-in", "180 d 109/116 CP", "200 CDI / d 136/150 CP 4MATIC", "220 CDI / d 170/177/190 CP 4MATIC"],
      },
      {
        name: "GLK & GLC (X204 / X253 / X254)",
        yearsRange: [2008, 2026],
        engines: ["GLC 200 / 300 4MATIC", "GLC 300 e / 300 de Plug-in Hybrid", "200 CDI / d 143/163 CP", "220 CDI / d 4MATIC 170/194/197 CP", "250 CDI / d 4MATIC 204 CP", "300 d 4MATIC 245/269 CP", "350 CDI / d V6 231/258/265 CP"],
      },
      {
        name: "ML / GLE (W164 / W166 / V167) & GLS",
        yearsRange: [2005, 2026],
        engines: ["250 BlueTEC / d 4MATIC 204 CP", "280 / 300 CDI / d 4MATIC 190/204/245/269 CP", "320 / 350 CDI / BlueTEC / d 4MATIC 224/258/272 CP", "400 d / 450 d 4MATIC 330/367 CP", "GLE 350 de / 400 e Plug-in Hybrid"],
      },
      {
        name: "Vito / Clasa V & Sprinter",
        yearsRange: [2004, 2026],
        engines: ["109 / 111 / 114 CDI 88/109/114/136 CP", "115 / 116 / 119 CDI 150/163/190 CP", "V 220 d / V 250 d / V 300 d", "Sprinter 311 / 313 / 314 / 315 / 316 / 317 / 319 CDI"],
      },
    ],
  },
  {
    brand: "Skoda",
    models: [
      {
        name: "Octavia I (Tour 1U)",
        yearsRange: [1998, 2010],
        engines: ["1.4 16V 75 CP", "1.6 MPI 75/101/102 CP", "1.8T 150/180 CP", "1.9 SDI 68 CP", "1.9 TDI ALH 90 CP", "1.9 TDI AXR 101 CP", "1.9 TDI ASZ 131 CP"],
      },
      {
        name: "Octavia II (1Z)",
        yearsRange: [2004, 2013],
        engines: ["1.2 TSI 105 CP", "1.4 MPI 80 CP", "1.4 TSI 122 CP", "1.6 MPI 102 CP", "1.8 TSI 160 CP", "2.0 TFSI RS 200 CP", "1.6 TDI 105 CP", "1.9 TDI 105 CP (BJB/BKC/BXE/BLS)", "2.0 TDI 140 CP", "2.0 TDI RS 170 CP"],
      },
      {
        name: "Octavia III (5E)",
        yearsRange: [2013, 2020],
        engines: ["1.0 TSI 115 CP", "1.2 TSI 86/105/110 CP", "1.4 TSI 140/150 CP", "1.5 TSI 150 CP", "1.8 TSI 180 CP", "2.0 TSI RS 220/230/245 CP", "1.6 TDI 90/105/110/115 CP", "2.0 TDI 150 CP 2WD/4x4", "2.0 TDI RS 184 CP"],
      },
      {
        name: "Octavia IV (NX)",
        yearsRange: [2020, 2026],
        engines: ["1.0 TSI / e-TEC 110 CP", "1.5 TSI / mHEV 115/150 CP", "1.4 TSI iV Plug-in Hybrid 204/245 CP", "2.0 TSI RS 245/265 CP", "2.0 TDI 115 CP", "2.0 TDI 150 CP DSG", "2.0 TDI RS 200 CP 4x4"],
      },
      {
        name: "Superb I / II / III / IV",
        yearsRange: [2003, 2026],
        engines: ["1.4 TSI 125/150 CP", "1.4 TSI iV Plug-in 218 CP", "1.5 TSI 150 CP", "1.8 TSI 160/180 CP", "2.0 TSI 190/220/280 CP 4x4", "1.6 TDI 105/120 CP", "1.9 TDI 105/131 CP", "2.0 TDI 140/150 CP", "2.0 TDI 170/190/200 CP 4x4"],
      },
      {
        name: "Fabia I / II / III / IV",
        yearsRange: [2001, 2026],
        engines: ["1.0 MPI 60/75/80 CP", "1.0 TSI 95/110 CP", "1.2 HTP 54/60/64/70 CP", "1.2 TSI 86/90/105/110 CP", "1.4 16V 75/80/86 CP", "1.4 TDI 70/75/80/90/105 CP", "1.6 TDI 75/90/105 CP", "1.9 SDI / TDI"],
      },
      {
        name: "Rapid & Scala",
        yearsRange: [2012, 2026],
        engines: ["1.0 TSI 95/110/115 CP", "1.2 MPI 75 CP", "1.2 TSI 86/90/105/110 CP", "1.4 TSI 122/125 CP", "1.5 TSI 150 CP", "1.4 TDI 90 CP", "1.6 TDI 90/105/115 CP"],
      },
      {
        name: "Kamiq, Karoq & Yeti",
        yearsRange: [2009, 2026],
        engines: ["1.0 TSI 95/110/115 CP", "1.2 TSI 105/110 CP", "1.4 TSI 122/125/150 CP", "1.5 TSI 150 CP", "1.6 TDI 105/115 CP", "2.0 TDI 110/115/140/150/170/190 CP 4x4"],
      },
      {
        name: "Kodiaq I / II",
        yearsRange: [2016, 2026],
        engines: ["1.4 TSI 125/150 CP", "1.5 TSI / mHEV 150 CP", "1.5 TSI iV Plug-in Hybrid 204 CP", "2.0 TSI 180/190/204 CP 4x4", "2.0 TDI 150 CP 2WD/4x4", "2.0 TDI 190/193/200 CP 4x4", "2.0 BiTDI RS 240 CP"],
      },
      {
        name: "Enyaq iV (Electric)",
        yearsRange: [2021, 2026],
        engines: ["Enyaq 50 / 60 (148/179 CP)", "Enyaq 80 / 85 (204/286 CP)", "Enyaq 80x / 85x / RS AWD (265/299/340 CP)"],
      },
    ],
  },
  {
    brand: "Ford",
    models: [
      {
        name: "Focus I / II (DA)",
        yearsRange: [2000, 2011],
        engines: ["1.4 16V 80 CP", "1.6 16V 100 CP", "1.6 Ti-VCT 115 CP", "1.8 / 2.0 125/145 CP", "1.6 TDCi 90 CP (HHDA)", "1.6 TDCi 109 CP (G8DA)", "1.8 TDCi 115 CP (KKDA)", "2.0 TDCi 136 CP"],
      },
      {
        name: "Focus III / IV",
        yearsRange: [2011, 2026],
        engines: ["1.0 EcoBoost 100/125 CP", "1.0 EcoBoost mHEV 125/155 CP", "1.5 EcoBoost 150/182 CP", "1.6 Ti-VCT 105/125 CP", "1.5 TDCi 95/120 CP", "1.5 EcoBlue 95/120 CP", "1.6 TDCi 95/115 CP", "2.0 TDCi / EcoBlue 140/150/190 CP"],
      },
      {
        name: "Fiesta V / VI / VII",
        yearsRange: [2002, 2024],
        engines: ["1.0 80 CP", "1.0 EcoBoost 100/125/140 CP", "1.1 Ti-VCT 70/85 CP", "1.25 16V 60/82 CP", "1.4 16V 80/96 CP", "1.4 TDCi 68/70 CP", "1.5 TDCi 75/85/95/120 CP", "1.6 TDCi 90/95 CP"],
      },
      {
        name: "Mondeo III / IV / V",
        yearsRange: [2001, 2022],
        engines: ["1.5 EcoBoost 160/165 CP", "1.6 Ti-VCT / EcoBoost 120/160 CP", "2.0 145 CP / 2.0 EcoBoost", "2.0 Hybrid 187 CP", "1.6 TDCi 115 CP", "1.8 TDCi 125 CP", "2.0 TDCi 115/130/140/150/163/180 CP", "2.0 EcoBlue 150/190 CP"],
      },
      {
        name: "Kuga I / II / III",
        yearsRange: [2008, 2026],
        engines: ["1.5 EcoBoost 120/150/182 CP", "2.5 Duratec FHEV Hybrid 190 CP", "2.5 Duratec PHEV Plug-in Hybrid 225/243 CP", "1.5 TDCi / EcoBlue 120 CP", "2.0 TDCi 136/140/150/163/180 CP 2WD/AWD", "2.0 EcoBlue 150/190 CP AWD"],
      },
      {
        name: "Puma & EcoSport",
        yearsRange: [2014, 2026],
        engines: ["1.0 EcoBoost 95/100/125/140 CP", "1.0 EcoBoost mHEV Mild-Hybrid 125/155 CP", "1.5 EcoBoost ST 200 CP", "1.5 TDCi / EcoBlue 95/100/120/125 CP"],
      },
      {
        name: "C-Max / B-Max / S-Max / Galaxy",
        yearsRange: [2004, 2023],
        engines: ["1.0 EcoBoost 100/125 CP", "1.5 / 1.6 EcoBoost 150/160 CP", "1.6 Ti-VCT 105/125 CP", "1.5 TDCi 95/120 CP", "1.6 TDCi 90/109/115 CP", "1.8 TDCi 115/125 CP", "2.0 TDCi / EcoBlue 136/140/150/163/180/190 CP"],
      },
      {
        name: "Ranger",
        yearsRange: [2007, 2026],
        engines: ["2.2 TDCi 125/150/160 CP 4x4", "2.5 TDCi 143 CP", "3.2 TDCi 200 CP 4x4", "2.0 EcoBlue 170 CP", "2.0 EcoBlue Bi-Turbo 205/213 CP", "3.0 V6 EcoBlue 240 CP"],
      },
      {
        name: "Transit / Transit Custom / Transit Connect",
        yearsRange: [2004, 2026],
        engines: ["1.5 TDCi / EcoBlue 75/100/120 CP", "1.6 TDCi 95/115 CP", "1.8 TDCi 75/90/110 CP", "2.0 TDCi / EcoBlue 105/130/150/170/185 CP", "2.2 TDCi 100/115/125/140/155 CP", "2.4 TDCi 115/140 CP"],
      },
    ],
  },
  {
    brand: "Renault",
    models: [
      {
        name: "Clio II / Symbol / Thalia",
        yearsRange: [2000, 2013],
        engines: ["1.2 8V 60 CP", "1.2 16V 75 CP", "1.4 8V 75 CP", "1.4 16V 98 CP", "1.5 dCi 65/68/70/82/85 CP"],
      },
      {
        name: "Clio III / IV / V",
        yearsRange: [2005, 2026],
        engines: ["0.9 TCe 75/90 CP", "1.0 SCe 65/75 CP", "1.0 TCe 90/100 CP", "1.0 TCe ECO-G 100 CP (GPL)", "1.2 16V 75 CP", "1.2 TCe 100/120 CP", "1.3 TCe 130/140 CP", "1.6 E-Tech Full Hybrid 140/145 CP", "1.5 dCi / Blue dCi 75/85/90/100/115 CP"],
      },
      {
        name: "Megane II / III / IV & Fluence",
        yearsRange: [2003, 2024],
        engines: ["1.2 TCe 115/130 CP", "1.3 TCe 115/140/160 CP", "1.4 16V 98 CP", "1.4 TCe 130 CP", "1.6 16V 105/110/115 CP", "1.6 E-Tech Plug-in Hybrid 160 CP", "1.5 dCi 85/90/95/105/110/115 CP", "1.6 dCi 130 CP", "1.9 dCi 120/130 CP", "2.0 dCi 150/160 CP"],
      },
      {
        name: "Captur I / II & Arkana",
        yearsRange: [2013, 2026],
        engines: ["0.9 TCe 90 CP", "1.0 TCe 90/100 CP", "1.0 ECO-G 100 CP (GPL)", "1.2 TCe 120 CP", "1.3 TCe Mild-Hybrid 130/140/150/158 CP", "1.6 E-Tech Full Hybrid 145 CP", "1.5 dCi / Blue dCi 90/95/110/115 CP"],
      },
      {
        name: "Kadjar, Austral & Koleos",
        yearsRange: [2008, 2026],
        engines: ["1.2 TCe 130 CP", "1.3 TCe 140/160 CP", "1.2 E-Tech Full Hybrid 200 CP", "1.5 dCi / Blue dCi 110/115 CP", "1.6 dCi 130 CP 4WD", "1.7 Blue dCi 150 CP 4WD", "2.0 dCi / Blue dCi 150/175/190 CP 4WD"],
      },
      {
        name: "Laguna II / III & Talisman",
        yearsRange: [2002, 2022],
        engines: ["1.3 TCe 160 CP", "1.6 TCe 150/200 CP", "1.8 TCe 225 CP", "2.0 16V 135/140 CP", "1.5 dCi 110 CP", "1.6 dCi 130/160 CP", "1.7 Blue dCi 150 CP", "1.9 dCi 120/130 CP", "2.0 dCi / Blue dCi 130/150/160/175/190/200 CP"],
      },
      {
        name: "Scenic / Grand Scenic & Espace",
        yearsRange: [2003, 2024],
        engines: ["1.2 TCe 115/130 CP", "1.3 TCe 115/140/160 CP", "1.6 16V 110 CP", "1.5 dCi 95/105/110 CP", "1.6 dCi 130/160 CP", "1.7 Blue dCi 120/150 CP", "1.9 dCi 120/130 CP", "2.0 dCi 150/160/200 CP"],
      },
      {
        name: "Kangoo, Trafic & Master",
        yearsRange: [2003, 2026],
        engines: ["1.5 dCi / Blue dCi 75/80/90/95/110/115 CP", "1.6 dCi 95/120/125/145 CP", "2.0 dCi / Blue dCi 90/115/120/145/150/170 CP", "2.3 dCi 110/125/135/145/150/165/180 CP", "2.5 dCi 120/145 CP"],
      },
      {
        name: "Zoe & Megane E-Tech (Electric)",
        yearsRange: [2013, 2026],
        engines: ["Zoe Q210 / R240 / R90 (22/41 kWh)", "Zoe R110 / R135 (52 kWh)", "Megane E-Tech EV40 130 CP / EV60 220 CP"],
      },
    ],
  },
  {
    brand: "Opel",
    models: [
      {
        name: "Astra G / H",
        yearsRange: [1999, 2011],
        engines: ["1.4 16V 90 CP (Z14XEP)", "1.6 8V / 16V 84/101/105/115 CP (Z16XER)", "1.8 16V 125/140 CP", "1.3 CDTI 90 CP", "1.7 DTI / CDTI 75/80/101/110/125 CP", "1.9 CDTI 100/120/150 CP (Z19DTH)"],
      },
      {
        name: "Astra J / K / L",
        yearsRange: [2009, 2026],
        engines: ["1.0 Turbo 105 CP", "1.2 Turbo 110/130/145 CP", "1.4 100 CP", "1.4 Turbo 120/125/140/150 CP", "1.6 115 CP", "1.6 Plug-in Hybrid 180 CP", "1.3 CDTI 95 CP", "1.5 Diesel 105/122/130 CP", "1.6 CDTI 95/110/136/160 CP", "1.7 CDTI 110/125/130 CP", "2.0 CDTI 160/165 CP"],
      },
      {
        name: "Corsa C / D / E / F",
        yearsRange: [2001, 2026],
        engines: ["1.0 12V 60 CP / 1.0 Turbo 90/115 CP", "1.2 16V 75/80/85 CP", "1.2 PureTech / Turbo 75/100/130 CP", "1.4 16V 90/100 CP", "1.3 CDTI 70/75/90/95 CP", "1.5 Diesel 102 CP", "1.7 DTI / CDTI", "Corsa-e Electric 136/156 CP"],
      },
      {
        name: "Insignia A / B & Vectra C",
        yearsRange: [2002, 2022],
        engines: ["1.4 Turbo 140 CP", "1.5 Turbo 140/165 CP", "1.6 Turbo 170/180 CP", "1.8 16V 122/140 CP", "2.0 Turbo 200/220/260 CP", "1.6 CDTI 120/136 CP", "1.9 CDTI 120/150 CP", "2.0 DTI 101 CP", "2.0 CDTI 110/130/140/160/163/170/174 CP", "2.0 BiTurbo CDTI 195/210 CP"],
      },
      {
        name: "Mokka, Crossland & Grandland",
        yearsRange: [2012, 2026],
        engines: ["1.2 Turbo 83/100/110/130/136 CP", "1.4 Turbo 140 CP", "1.6 115 CP", "1.6 Plug-in Hybrid 225/300 CP", "1.5 Diesel 102/110/120/130 CP", "1.6 CDTI / Diesel 99/110/120/136 CP", "1.7 CDTI 130 CP", "2.0 Diesel 177 CP"],
      },
      {
        name: "Zafira A / B / Tourer C & Meriva",
        yearsRange: [2001, 2019],
        engines: ["1.4 16V 90/100 CP", "1.4 Turbo 120/140 CP", "1.6 16V 101/105/115 CP", "1.8 16V 125/140 CP", "1.3 CDTI 75/95 CP", "1.6 CDTI 110/120/136 CP", "1.7 CDTI 100/110/125/130 CP", "1.9 CDTI 100/120/150 CP", "2.0 DTI / CDTI 101/130/165/170 CP"],
      },
      {
        name: "Combo, Vivaro & Movano",
        yearsRange: [2003, 2026],
        engines: ["1.3 CDTI 75/90 CP", "1.5 Diesel 75/100/130 CP", "1.6 CDTI 95/105/120/125/145 CP", "1.7 CDTI 100 CP", "1.9 DTI / CDTI 82/100 CP", "2.0 CDTI / Diesel 90/114/120/145/177 CP", "2.2 / 2.3 CDTI 100/125/135/145/150/165/170 CP"],
      },
    ],
  },
  {
    brand: "Toyota",
    models: [
      {
        name: "Corolla (E120 / E150 / E180 / E210)",
        yearsRange: [2002, 2026],
        engines: ["1.2 Turbo 116 CP", "1.33 Dual VVT-i 99 CP", "1.4 VVT-i 97 CP", "1.5 Dynamic Force 125 CP", "1.6 VVT-i / Valvematic 110/124/132 CP", "1.8 Hybrid 122/140 CP", "2.0 Hybrid 184/196 CP", "1.4 D-4D 90 CP", "2.0 D-4D 90/116/126 CP"],
      },
      {
        name: "Auris I / II",
        yearsRange: [2007, 2019],
        engines: ["1.2 Turbo 116 CP", "1.33 Dual VVT-i 99/101 CP", "1.4 VVT-i 97 CP", "1.6 VVT-i / Valvematic 124/132 CP", "1.8 Hybrid 136 CP", "1.4 D-4D 90 CP", "1.6 D-4D 112 CP", "2.0 D-4D 124/126 CP", "2.2 D-CAT 177 CP"],
      },
      {
        name: "Yaris & Yaris Cross",
        yearsRange: [2003, 2026],
        engines: ["1.0 VVT-i 68/69/72 CP", "1.3 / 1.33 VVT-i 87/99/100 CP", "1.5 VVT-i 111/125 CP", "1.5 Hybrid 100/116/130 CP 2WD/AWD-i", "1.4 D-4D 75/90 CP"],
      },
      {
        name: "RAV4 II / III / IV / V",
        yearsRange: [2002, 2026],
        engines: ["2.0 VVT-i / Valvematic 150/152/158/175 CP 4WD", "2.5 Hybrid 197 CP (XA40)", "2.5 Hybrid 218 CP 2WD / 222 CP AWD-i (XA50)", "2.5 Plug-in Hybrid 306 CP AWD-i", "2.0 D-4D 116/124/143 CP", "2.2 D-4D / D-CAT 136/150/177 CP"],
      },
      {
        name: "C-HR I / II",
        yearsRange: [2016, 2026],
        engines: ["1.2 Turbo 116 CP 2WD/AWD", "1.8 Hybrid 122/140 CP", "2.0 Hybrid 184/197 CP 2WD/AWD-i", "2.0 Plug-in Hybrid 223 CP"],
      },
      {
        name: "Avensis (T25 / T27) & Camry",
        yearsRange: [2003, 2025],
        engines: ["1.6 VVT-i / Valvematic 110/132 CP", "1.8 VVT-i / Valvematic 129/147 CP", "2.0 VVT-i / Valvematic 147/152 CP", "2.5 Hybrid Camry 218/230 CP", "1.6 D-4D 112 CP", "2.0 D-4D 116/124/126/143 CP", "2.2 D-4D / D-CAT 150/177 CP"],
      },
      {
        name: "Land Cruiser & Hilux",
        yearsRange: [2003, 2026],
        engines: ["2.4 D-4D 150 CP 4x4", "2.5 D-4D 102/120/144 CP 4x4", "2.8 D-4D 177/204 CP 4x4", "3.0 D-4D 163/171/173/190 CP 4x4", "4.5 V8 D-4D 272/286 CP"],
      },
      {
        name: "Prius, Aygo & Proace",
        yearsRange: [2004, 2026],
        engines: ["1.0 VVT-i 68/72 CP (Aygo / Aygo X)", "1.5 Hybrid 110 CP (Prius II)", "1.8 Hybrid 122/136 CP (Prius III/IV)", "2.0 Plug-in Hybrid 223 CP (Prius V)", "1.5 / 1.6 / 2.0 D-4D (Proace)"],
      },
    ],
  },
  {
    brand: "Hyundai",
    models: [
      {
        name: "Tucson I / ix35 / Tucson III / IV",
        yearsRange: [2004, 2026],
        engines: ["1.6 GDI 132 CP", "1.6 T-GDI 150/177/180 CP 2WD/4WD", "1.6 T-GDI Mild-Hybrid 150/180 CP", "1.6 T-GDI Full Hybrid 215/230 CP", "1.6 T-GDI Plug-in Hybrid 252/265 CP", "2.0 MPI 141/163 CP", "1.6 CRDi 115/136 CP", "1.7 CRDi 115/141 CP", "2.0 CRDi 113/136/140/184/185 CP 4WD"],
      },
      {
        name: "i30 I / II / III",
        yearsRange: [2007, 2026],
        engines: ["1.0 T-GDI 100/120 CP", "1.4 MPI 100/105/109 CP", "1.4 T-GDI 140 CP", "1.5 DPI 96/110 CP", "1.5 T-GDI mHEV 140/160 CP", "1.6 MPI / GDI 120/126/135 CP", "2.0 T-GDI i30 N 250/275/280 CP", "1.4 CRDi 90 CP", "1.6 CRDi 90/110/115/128/136 CP"],
      },
      {
        name: "i20, i10 & Bayon",
        yearsRange: [2008, 2026],
        engines: ["1.0 MPI 67 CP", "1.0 T-GDI 100/120 CP", "1.2 / 1.25 MPI 75/78/84 CP", "1.4 MPI 100 CP", "1.1 CRDi 75 CP", "1.4 CRDi 75/90 CP"],
      },
      {
        name: "Elantra, Accent & i40",
        yearsRange: [2006, 2026],
        engines: ["1.4 MPI 97/100 CP", "1.6 MPI 112/122/123/128/132 CP", "1.6 GDI 135 CP", "2.0 MPI / GDI", "1.5 CRDi 110 CP", "1.6 CRDi 115/128/136 CP", "1.7 CRDi 115/136/141 CP (i40)"],
      },
      {
        name: "Kona I / II & Ioniq",
        yearsRange: [2016, 2026],
        engines: ["1.0 T-GDI 120 CP", "1.6 T-GDI 177/198 CP 4WD", "1.6 GDI Hybrid 141 CP", "1.6 CRDi 115/136 CP", "Kona Electric 39 kWh (136 CP) / 64 kWh (204 CP)", "Ioniq 5 / Ioniq 6 Electric"],
      },
      {
        name: "Santa Fe II / III / IV / V",
        yearsRange: [2006, 2026],
        engines: ["1.6 T-GDI Hybrid 215/230 CP", "1.6 T-GDI Plug-in Hybrid 253/265 CP", "2.0 CRDi 150/185 CP", "2.2 CRDi 150/155/197/200/202 CP 4WD"],
      },
    ],
  },
  {
    brand: "Kia",
    models: [
      {
        name: "Sportage II / III / IV / V",
        yearsRange: [2005, 2026],
        engines: ["1.6 GDI 132/135 CP", "1.6 T-GDI 150/160/177/180 CP 2WD/AWD", "1.6 T-GDI Full Hybrid 210/230 CP", "1.6 T-GDI Plug-in Hybrid 252/265 CP", "2.0 CVVT 141/163 CP", "1.6 CRDi 115/136 CP", "1.7 CRDi 115/141 CP", "2.0 CRDi 112/136/140/184/185 CP AWD"],
      },
      {
        name: "Ceed I / II / III & ProCeed",
        yearsRange: [2007, 2026],
        engines: ["1.0 T-GDI 100/120 CP", "1.4 MPI 90/100/105/109 CP", "1.4 T-GDI 140 CP", "1.5 T-GDI 140/160 CP", "1.6 CVVT / GDI 122/126/135 CP", "1.6 T-GDI GT 204 CP", "1.4 CRDi 90 CP", "1.6 CRDi 90/110/115/128/136 CP"],
      },
      {
        name: "XCeed & Stonic",
        yearsRange: [2017, 2026],
        engines: ["1.0 T-GDI 100/120 CP", "1.2 / 1.25 MPI 84 CP", "1.4 MPI 100 CP", "1.4 T-GDI 140 CP", "1.5 T-GDI 140/160 CP", "1.6 GDI Plug-in Hybrid 141 CP", "1.6 CRDi 115/136 CP"],
      },
      {
        name: "Rio, Picanto, Cerato & Optima",
        yearsRange: [2006, 2024],
        engines: ["1.0 MPI 67 CP", "1.0 T-GDI 100/120 CP", "1.2 / 1.25 MPI 84/85 CP", "1.4 MPI 97/100/109 CP", "1.6 MPI / GDI 122/135 CP", "1.1 / 1.4 CRDi 75/90 CP", "1.6 CRDi 115/136 CP", "1.7 CRDi 136/141 CP (Optima)"],
      },
      {
        name: "Niro, Sorento & EV6",
        yearsRange: [2006, 2026],
        engines: ["1.6 GDI Hybrid / Plug-in 141/183 CP (Niro)", "e-Niro / Niro EV 204 CP", "2.2 CRDi 194/197/200/202 CP AWD (Sorento)", "2.5 CRDi 140/170 CP (Sorento I)", "1.6 T-GDI Hybrid / PHEV 230/265 CP (Sorento IV)", "EV6 Electric 170/229/325 CP"],
      },
    ],
  },
  {
    brand: "Peugeot",
    models: [
      {
        name: "206 / 207 / 208 I & II",
        yearsRange: [2001, 2026],
        engines: ["1.1 / 1.4 8V 60/75 CP", "1.2 PureTech 68/75/82/100/110/130 CP", "1.4 VTi 95 CP / 1.6 VTi 120 CP", "1.4 HDi 68/70 CP", "1.5 BlueHDi 100 CP", "1.6 HDi / e-HDi / BlueHDi 75/90/92/100/110/115/120 CP", "e-208 Electric 136/156 CP"],
      },
      {
        name: "307 / 308 I / II / III",
        yearsRange: [2002, 2026],
        engines: ["1.2 PureTech 110/130 CP", "1.4 16V 90/95 CP", "1.6 16V / VTi 109/120 CP", "1.6 THP / PureTech 150/156/180/225 CP", "1.6 Plug-in Hybrid 180/225 CP", "1.5 BlueHDi 100/130 CP", "1.6 HDi / BlueHDi 90/92/100/109/112/115/120 CP", "2.0 HDi / BlueHDi 110/136/140/150/180 CP"],
      },
      {
        name: "407 & 508 I / II",
        yearsRange: [2004, 2025],
        engines: ["1.2 PureTech 130 CP", "1.6 THP / PureTech 156/165/180/225 CP", "1.6 Plug-in Hybrid 225 CP", "1.8 / 2.0 16V 125/140 CP", "1.5 BlueHDi 130 CP", "1.6 HDi / BlueHDi 110/112/115/120 CP", "2.0 HDi / BlueHDi 136/140/150/160/163/180 CP", "2.2 HDi 170/204 CP"],
      },
      {
        name: "2008 I / II",
        yearsRange: [2013, 2026],
        engines: ["1.2 PureTech 82/100/110/130/155 CP", "1.2 Hybrid 136 CP e-DCS6", "1.4 HDi 68 CP", "1.5 BlueHDi 100/110/130 CP", "1.6 e-HDi / BlueHDi 75/92/100/115/120 CP", "e-2008 Electric 136/156 CP"],
      },
      {
        name: "3008 & 5008 (I / II / III)",
        yearsRange: [2009, 2026],
        engines: ["1.2 PureTech 130 CP", "1.2 Hybrid 136 CP", "1.6 VTi 120 CP / 1.6 THP 156/165/180 CP", "1.6 Plug-in Hybrid 180/225/300 CP", "1.5 BlueHDi 130 CP", "1.6 HDi / e-HDi / BlueHDi 110/112/115/120 CP", "2.0 HDi / BlueHDi 136/150/163/180 CP", "e-3008 Electric 210 CP"],
      },
      {
        name: "Partner / Rifter, Expert & Boxer",
        yearsRange: [2004, 2026],
        engines: ["1.2 PureTech 110 CP", "1.5 BlueHDi 75/100/120/130 CP", "1.6 HDi / BlueHDi 75/90/92/100/115/120 CP", "2.0 HDi / BlueHDi 120/128/130/145/150/163/177/180 CP", "2.2 HDi / BlueHDi 100/120/130/140/150/165 CP"],
      },
    ],
  },
  {
    brand: "Citroën",
    models: [
      {
        name: "C1, C2 & C3 (I / II / III / IV)",
        yearsRange: [2003, 2026],
        engines: ["1.0 VTi 68/72 CP", "1.1 / 1.4 8V 60/73 CP", "1.2 PureTech 68/82/83/100/110 CP", "1.4 16V / VTi 90/95 CP", "1.4 HDi 68/70 CP", "1.5 BlueHDi 100 CP", "1.6 HDi / BlueHDi 75/90/92/100/110 CP", "ë-C3 Electric 113 CP"],
      },
      {
        name: "C3 Aircross & C4 Cactus",
        yearsRange: [2014, 2026],
        engines: ["1.2 PureTech 82/110/130 CP", "1.5 BlueHDi 100/110/120 CP", "1.6 BlueHDi 100 CP"],
      },
      {
        name: "C4 (I / II / III) & C4 X",
        yearsRange: [2004, 2026],
        engines: ["1.2 PureTech 100/110/130/155 CP", "1.2 Hybrid 136 CP", "1.4 16V 88/95 CP", "1.6 16V / VTi / THP 109/120/156 CP", "1.5 BlueHDi 110/130 CP", "1.6 HDi / e-HDi / BlueHDi 90/92/100/109/112/115/120 CP", "2.0 HDi 136/150 CP", "ë-C4 Electric 136/156 CP"],
      },
      {
        name: "C5 (I / II), C5 Aircross & C5 X",
        yearsRange: [2004, 2026],
        engines: ["1.2 PureTech 130 CP", "1.2 Hybrid 136 CP", "1.6 THP / PureTech 156/180 CP", "1.6 Plug-in Hybrid 180/225 CP", "1.5 BlueHDi 130 CP", "1.6 HDi 109/112/115 CP", "2.0 HDi / BlueHDi 136/140/163/180 CP", "2.2 / 2.7 / 3.0 HDi"],
      },
      {
        name: "C-Elysée & C4 Picasso / SpaceTourer",
        yearsRange: [2006, 2023],
        engines: ["1.2 PureTech 82/110/130 CP", "1.6 VTi 115/120 CP", "1.5 BlueHDi 100/130 CP", "1.6 HDi / BlueHDi 92/100/110/115/120 CP", "2.0 HDi / BlueHDi 136/150/163 CP"],
      },
      {
        name: "Berlingo, Jumpy & Jumper",
        yearsRange: [2003, 2026],
        engines: ["1.2 PureTech 110 CP", "1.5 BlueHDi 75/100/120/130 CP", "1.6 HDi / BlueHDi 75/90/92/100/115/120 CP", "2.0 HDi / BlueHDi 120/128/145/150/163/177 CP", "2.2 HDi / BlueHDi 100/120/130/140/150/165 CP"],
      },
    ],
  },
  {
    brand: "Seat",
    models: [
      {
        name: "Leon I / II / III / IV",
        yearsRange: [2001, 2026],
        engines: ["1.0 TSI / eTSI 110/115 CP", "1.2 TSI 86/105/110 CP", "1.4 16V 75/86 CP", "1.4 TSI 122/125/140/150 CP", "1.4 e-Hybrid 204 CP", "1.5 TSI / eTSI 130/150 CP", "1.6 MPI 102/105 CP", "1.8 / 2.0 TSI FR / Cupra", "1.6 TDI 90/105/110/115 CP", "1.9 TDI 90/105/110/130/150 CP", "2.0 TDI 115/140/150/170/184 CP"],
      },
      {
        name: "Ibiza III / IV / V & Cordoba",
        yearsRange: [2002, 2026],
        engines: ["1.0 MPI 75/80 CP", "1.0 TSI 95/110/115 CP", "1.2 12V 60/64/70 CP", "1.2 TSI 86/90/105 CP", "1.4 16V 75/85/86/100 CP", "1.5 TSI 150 CP", "1.4 TDI 70/75/80/90/105 CP", "1.6 TDI 90/95/105/115 CP", "1.9 SDI / TDI 64/101/131 CP"],
      },
      {
        name: "Arona, Ateca & Tarraco",
        yearsRange: [2016, 2026],
        engines: ["1.0 TSI 95/110/115 CP", "1.4 TSI 150 CP", "1.4 e-Hybrid 245 CP", "1.5 TSI 150 CP", "2.0 TSI 190 CP 4Drive", "1.6 TDI 95/115 CP", "2.0 TDI 115/150 CP 2WD/4Drive", "2.0 TDI 190/200 CP 4Drive"],
      },
      {
        name: "Toledo, Altea, Exeo & Alhambra",
        yearsRange: [2002, 2020],
        engines: ["1.2 TSI 86/105/110 CP", "1.4 TSI 122/125/150 CP", "1.6 MPI 102 CP", "1.8 / 2.0 TFSI", "1.6 TDI 105/115 CP", "1.9 TDI 105/115/130 CP", "2.0 TDI 120/140/143/150/170/177/184 CP"],
      },
    ],
  },
  {
    brand: "Cupra",
    models: [
      {
        name: "Formentor",
        yearsRange: [2020, 2026],
        engines: ["1.5 TSI / eTSI 150 CP", "1.4 / 1.5 e-Hybrid 204/245/272 CP", "2.0 TSI 190 CP 4Drive", "2.0 TSI VZ 245/310/333 CP 4Drive", "2.5 TSI VZ5 390 CP", "2.0 TDI 150 CP 2WD/4Drive"],
      },
      {
        name: "Leon & Leon Sportstourer",
        yearsRange: [2020, 2026],
        engines: ["1.5 eTSI 150 CP", "1.4 / 1.5 e-Hybrid 204/245/272 CP", "2.0 TSI 190/245/300/310/333 CP", "2.0 TDI 150 CP"],
      },
      {
        name: "Ateca, Terramar & Born",
        yearsRange: [2019, 2026],
        engines: ["1.5 eTSI 150 CP", "2.0 TSI 190/265/300 CP 4Drive", "1.5 e-Hybrid 204/272 CP", "Born Electric 204/231/326 CP (58/77 kWh)"],
      },
    ],
  },
  {
    brand: "Fiat",
    models: [
      {
        name: "Tipo (Sedan / Hatchback / SW)",
        yearsRange: [2015, 2026],
        engines: ["1.0 FireFly Turbo 100 CP", "1.4 16V 95 CP", "1.4 T-Jet 120 CP (+ GPL)", "1.5 Hybrid 130 CP", "1.6 E.torQ 110 CP Automată", "1.3 MultiJet 95 CP", "1.6 MultiJet 120/130 CP"],
      },
      {
        name: "500, 500X & 500L",
        yearsRange: [2007, 2026],
        engines: ["0.9 TwinAir 85/105 CP", "1.0 Hybrid 70 CP", "1.0 FireFly 120 CP", "1.2 8V 69 CP", "1.3 FireFly 150 CP", "1.4 16V 95/100 CP", "1.4 MultiAir / T-Jet 120/140/170 CP", "1.5 Hybrid 130 CP", "1.3 MultiJet 75/85/95 CP", "1.6 MultiJet 105/120/130 CP", "2.0 MultiJet 140 CP 4x4", "500e Electric 95/118 CP"],
      },
      {
        name: "Punto / Grande Punto / Punto Evo, Panda & Bravo",
        yearsRange: [2003, 2026],
        engines: ["1.0 Hybrid 70 CP (Panda)", "1.2 8V 60/65/69 CP", "1.4 8V / 16V 77/90/95 CP", "1.4 T-Jet 120/150 CP", "1.3 MultiJet 70/75/85/90/95 CP", "1.6 MultiJet 105/120 CP", "1.9 MultiJet 120/150 CP"],
      },
      {
        name: "Doblo, Fiorino / Qubo & Ducato",
        yearsRange: [2003, 2026],
        engines: ["1.4 8V / 16V 73/77/95 CP", "1.3 MultiJet 75/80/90/95 CP", "1.5 BlueHDi 100/130 CP (Doblo III)", "1.6 MultiJet 90/105/120 CP", "1.9 JTD / MultiJet 105/120 CP", "2.0 MultiJet 115/135 CP", "2.2 MultiJet 120/140/160/180 CP (Ducato)", "2.3 MultiJet 120/130/140/150/160/180 CP (Ducato)", "3.0 MultiJet 160/177 CP"],
      },
    ],
  },
  {
    brand: "Honda",
    models: [
      {
        name: "Civic (VII / VIII / IX / X / XI)",
        yearsRange: [2002, 2026],
        engines: ["1.0 VTEC Turbo 126/129 CP", "1.4 i-DSI / i-VTEC 83/99/100 CP", "1.5 VTEC Turbo 182 CP", "1.8 i-VTEC 140/142 CP", "2.0 e:HEV Full Hybrid 184 CP (Civic XI)", "2.0 VTEC Type R 200/310/320/329 CP", "1.6 i-DTEC 120 CP", "2.2 i-CTDi / i-DTEC 140/150 CP"],
      },
      {
        name: "CR-V (II / III / IV / V / VI)",
        yearsRange: [2002, 2026],
        engines: ["1.5 VTEC Turbo 173/193 CP 2WD/AWD", "2.0 i-VTEC 150/155 CP 2WD/AWD", "2.0 i-MMD / e:HEV Full Hybrid 184 CP 2WD/AWD", "2.0 e:PHEV Plug-in Hybrid 184 CP", "1.6 i-DTEC 120 CP 2WD / 160 CP AWD", "2.2 i-CTDi / i-DTEC 140/150 CP AWD"],
      },
      {
        name: "HR-V, ZR-V & Jazz",
        yearsRange: [2004, 2026],
        engines: ["1.2 / 1.3 / 1.4 i-DSI / i-VTEC 78/83/90/100/102 CP (Jazz)", "1.5 e:HEV Hybrid 109/122/131 CP (Jazz / HR-V)", "1.5 i-VTEC 130 CP / 1.5 Turbo 182 CP (HR-V)", "2.0 e:HEV Full Hybrid 184 CP (ZR-V)", "1.6 i-DTEC 120 CP (HR-V)"],
      },
      {
        name: "Accord (VII / VIII)",
        yearsRange: [2003, 2015],
        engines: ["2.0 i-VTEC 155/156 CP", "2.4 i-VTEC 190/201 CP", "2.2 i-CTDi 140 CP", "2.2 i-DTEC 150/180 CP"],
      },
    ],
  },
  {
    brand: "Volvo",
    models: [
      {
        name: "XC60 I / II",
        yearsRange: [2008, 2026],
        engines: ["T4 / T5 / T6 2.0 190/245/250/310 CP", "B4 / B5 / B6 Mild-Hybrid Benzină 197/250/300 CP", "T6 / T8 Twin Engine / Recharge Plug-in Hybrid 340/350/390/455 CP", "2.0 D3 / D4 136/150/163/181/190 CP", "2.0 B4 / B5 Mild-Hybrid Diesel 197/235 CP AWD", "2.4 D3 / D4 / D5 AWD 163/181/185/190/205/215/220 CP"],
      },
      {
        name: "XC90 I / II",
        yearsRange: [2003, 2026],
        engines: ["2.0 T5 / T6 / B5 / B6 AWD 250/300/310/320 CP", "T8 Twin Engine / Recharge Plug-in Hybrid 390/407/455 CP", "2.0 D4 / D5 / B5 Diesel AWD 190/225/235 CP", "2.4 D5 AWD 163/185/200 CP"],
      },
      {
        name: "XC40 & EX30",
        yearsRange: [2018, 2026],
        engines: ["1.5 T2 / T3 129/156/163 CP", "1.5 T4 / T5 Recharge Plug-in Hybrid 211/262 CP", "2.0 T4 / T5 / B3 / B4 / B5 163/190/197/247/250 CP AWD", "2.0 D3 150 CP / D4 190 CP AWD", "XC40 Recharge / EX40 & EX30 Electric 238/272/408/428 CP"],
      },
      {
        name: "S60 / V60 & S90 / V90",
        yearsRange: [2004, 2026],
        engines: ["1.6 / 2.0 T3 / T4 / T5 / B4 / B5 Benzină", "T6 / T8 Recharge Plug-in Hybrid", "1.6 D2 115 CP", "2.0 D2 / D3 / D4 / D5 120/136/150/163/181/190/225/235 CP", "2.0 B4 / B5 Diesel 197/235 CP", "2.4 D5 163/185/205/215 CP"],
      },
      {
        name: "V40, C30 & S40 / V50",
        yearsRange: [2004, 2019],
        engines: ["1.5 / 1.6 / 2.0 T2 / T3 / T4 122/150/152/180/190 CP", "1.6 / 1.8 / 2.0 Benzină 100/125/145 CP", "1.6 D / D2 109/115 CP", "2.0 D / D2 / D3 / D4 120/136/150/177/190 CP", "2.4 D5 180 CP"],
      },
    ],
  },
  {
    brand: "Mazda",
    models: [
      {
        name: "Mazda 3 (BK / BL / BM / BP)",
        yearsRange: [2004, 2026],
        engines: ["1.4 / 1.6 MZR 84/105 CP", "1.5 Skyactiv-G 100 CP", "2.0 Skyactiv-G 120/122/150/165 CP", "2.0 Skyactiv-X / e-Skyactiv X 180/186 CP", "2.5 e-Skyactiv G 140 CP", "1.5 Skyactiv-D 105 CP", "1.6 MZ-CD 109/115 CP", "1.8 Skyactiv-D 116 CP", "2.0 / 2.2 MZR-CD / Skyactiv-D 143/150/185 CP"],
      },
      {
        name: "Mazda 6 (GG / GH / GJ / GL)",
        yearsRange: [2003, 2024],
        engines: ["1.8 / 2.0 MZR 120/147/155 CP", "2.0 Skyactiv-G 145/165 CP", "2.5 Skyactiv-G 192/194 CP", "2.0 MZR-CD 121/136/140/143 CP", "2.2 MZR-CD 125/163/180/185 CP", "2.2 Skyactiv-D 150/175/184 CP"],
      },
      {
        name: "CX-3, CX-30, CX-5 & CX-60",
        yearsRange: [2012, 2026],
        engines: ["2.0 Skyactiv-G 120/121/122/150/160/165 CP 2WD/AWD", "2.0 e-Skyactiv X 180/186 CP 2WD/AWD", "2.5 Skyactiv-G 192/194 CP AWD", "2.5 e-Skyactiv PHEV Plug-in Hybrid 327 CP (CX-60)", "1.5 / 1.8 Skyactiv-D 105/116 CP", "2.2 Skyactiv-D 150/175/184 CP 2WD/AWD", "3.3 e-Skyactiv D 6 cilindri 200/254 CP (CX-60)"],
      },
      {
        name: "Mazda 2 & MX-5",
        yearsRange: [2004, 2026],
        engines: ["1.3 / 1.5 MZR 75/86/102 CP", "1.5 Skyactiv-G 75/90/115 CP", "1.5 Hybrid 116 CP (Mazda 2 Hybrid)", "1.5 / 2.0 Skyactiv-G 132/160/184 CP (MX-5)", "1.4 / 1.5 MZ-CD / Skyactiv-D"],
      },
    ],
  },
  {
    brand: "Nissan",
    models: [
      {
        name: "Qashqai (J10 / J11 / J12)",
        yearsRange: [2007, 2026],
        engines: ["1.2 DIG-T 115 CP", "1.3 DIG-T Mild-Hybrid 140/158/160 CP", "1.5 e-POWER Hybrid 190 CP", "1.6 16V 114/117 CP", "1.6 DIG-T 163 CP", "2.0 16V 141 CP 4x4", "1.5 dCi 106/110/115 CP", "1.6 dCi 130 CP 2WD/4x4", "1.7 Blue dCi 150 CP 4x4", "2.0 dCi 150 CP 4x4"],
      },
      {
        name: "Juke (F15 / F16)",
        yearsRange: [2010, 2026],
        engines: ["1.0 DIG-T 114/117 CP", "1.2 DIG-T 115 CP", "1.6 16V 94/117 CP", "1.6 DIG-T 190/218 CP", "1.6 Hybrid 143 CP", "1.5 dCi 110 CP"],
      },
      {
        name: "X-Trail (T30 / T31 / T32 / T33)",
        yearsRange: [2003, 2026],
        engines: ["1.3 DIG-T 160 CP", "1.5 VC-T Mild-Hybrid 163 CP", "1.5 e-POWER 204/213 CP e-4ORCE 4x4", "1.6 DIG-T 163 CP", "2.0 / 2.5 Benzină 4x4", "1.6 dCi 130 CP 2WD/4x4", "1.7 dCi 150 CP 4x4", "2.0 dCi 150/173/177 CP 4x4", "2.2 dCi 136 CP"],
      },
      {
        name: "Micra, Note, Pulsar & Leaf",
        yearsRange: [2003, 2025],
        engines: ["0.9 / 1.0 IG-T 90/92/100/117 CP", "1.2 16V / DIG-S 65/80/98 CP", "1.4 / 1.6 16V 88/110 CP", "1.2 DIG-T 115 CP", "1.5 dCi 68/86/90/110 CP", "Leaf Electric 24/30/40/62 kWh (109/150/217 CP)"],
      },
      {
        name: "Navara & Pathfinder",
        yearsRange: [2005, 2022],
        engines: ["2.3 dCi 160/163 CP", "2.3 dCi Bi-Turbo 190 CP 4x4", "2.5 dCi 144/171/174/190 CP 4x4", "3.0 V6 dCi 231 CP"],
      },
    ],
  },
  {
    brand: "Suzuki",
    models: [
      {
        name: "Vitara & Grand Vitara",
        yearsRange: [2003, 2026],
        engines: ["1.0 BoosterJet 111 CP", "1.4 BoosterJet 140 CP 2WD/AllGrip", "1.4 BoosterJet Mild-Hybrid 48V 129 CP 2WD/AllGrip", "1.5 DualJet Strong Hybrid 115 CP", "1.6 VVT 106/120 CP 2WD/AllGrip", "2.0 / 2.4 Benzină (Grand Vitara)", "1.6 DDiS 120 CP", "1.9 DDiS 129 CP 4x4"],
      },
      {
        name: "SX4 & S-Cross",
        yearsRange: [2006, 2026],
        engines: ["1.0 BoosterJet 111 CP", "1.4 BoosterJet 140 CP", "1.4 BoosterJet Mild-Hybrid 129 CP 2WD/AllGrip", "1.5 Strong Hybrid 115 CP", "1.5 / 1.6 VVT 99/107/120 CP 4x4", "1.6 DDiS 90/120 CP", "1.9 / 2.0 DDiS 120/135 CP 4x4"],
      },
      {
        name: "Swift, Ignis, Jimny & Swace",
        yearsRange: [2004, 2026],
        engines: ["1.0 BoosterJet 111 CP", "1.2 DualJet / Mild-Hybrid 83/90 CP 2WD/AllGrip", "1.3 VVT 92 CP / 1.3 DDiS 75 CP", "1.4 BoosterJet Swift Sport 129/140 CP", "1.3 / 1.5 VVT 85/102 CP 4x4 (Jimny)", "1.8 Hybrid 122/140 CP (Swace)"],
      },
    ],
  },
  {
    brand: "Mitsubishi",
    models: [
      {
        name: "ASX & Eclipse Cross",
        yearsRange: [2010, 2025],
        engines: ["1.5 MIVEC Turbo 163 CP (Eclipse Cross)", "1.6 MIVEC 117 CP", "2.0 MIVEC 150 CP", "2.4 PHEV Plug-in Hybrid 188 CP 4WD", "1.6 DI-D 114 CP", "1.8 DI-D 116/150 CP 2WD/4WD", "2.2 DI-D 150 CP 4WD"],
      },
      {
        name: "Outlander (II / III) & Pajero",
        yearsRange: [2005, 2024],
        engines: ["2.0 MIVEC 147/150 CP 2WD/4WD", "2.0 / 2.4 PHEV Plug-in Hybrid 203/224 CP 4WD", "2.0 DI-D 140 CP", "2.2 DI-D 150/156/177 CP 4WD", "3.2 DI-D 160/170/190/200 CP 4WD (Pajero)"],
      },
      {
        name: "L200, Lancer, Colt & Space Star",
        yearsRange: [2004, 2025],
        engines: ["1.0 / 1.2 / 1.3 MIVEC 71/80/95 CP (Colt / Space Star)", "1.5 / 1.6 / 1.8 MIVEC 109/117/140/143 CP (Lancer)", "1.8 / 2.0 DI-D 116/140/150 CP (Lancer)", "2.2 DI-D 150 CP 4WD (L200)", "2.4 DI-D 154/181 CP 4WD (L200)", "2.5 DI-D 136/178 CP 4WD (L200)"],
      },
    ],
  },
  {
    brand: "Subaru",
    models: [
      {
        name: "Forester, XV / Crosstrek & Outback",
        yearsRange: [2004, 2026],
        engines: ["1.6i Boxer 114 CP AWD", "2.0i Boxer 150/156 CP AWD", "2.0i e-Boxer Mild-Hybrid 136/150 CP AWD", "2.5i Boxer 165/169/173/175 CP AWD", "2.0XT Turbo 240 CP AWD", "2.0D Boxer Diesel 147 CP AWD"],
      },
      {
        name: "Impreza & Legacy",
        yearsRange: [2004, 2024],
        engines: ["1.5R / 1.6i Boxer 107/114 CP AWD", "2.0R / 2.0i Boxer 150/160 CP AWD", "2.0 WRX / 2.5 WRX STI AWD", "2.0D Boxer Diesel 150 CP AWD"],
      },
    ],
  },
  {
    brand: "Alfa Romeo",
    models: [
      {
        name: "Giulia, Stelvio & Tonale",
        yearsRange: [2016, 2026],
        engines: ["1.5 Hybrid 130/160 CP (Tonale)", "1.3 Plug-in Hybrid Q4 280 CP (Tonale)", "2.0 Turbo Benzină 200/280 CP Q4", "2.9 V6 Bi-Turbo Quadrifoglio 510/520 CP", "1.6 MultiJet 130 CP (Tonale)", "2.2 MultiJet Diesel 150/160/180/190/210 CP Q4"],
      },
      {
        name: "Giulietta, MiTo, 159 & 147",
        yearsRange: [2003, 2021],
        engines: ["1.4 MPI / TB / MultiAir 78/95/105/120/135/150/170 CP", "1.75 TBi 200/235/240 CP", "1.3 JTDM 85/90/95 CP", "1.6 JTDM 105/120 CP", "1.9 JTD / JTDM 115/120/140/150 CP", "2.0 JTDM 136/140/150/170/175 CP", "2.4 JTDM 200/210 CP"],
      },
    ],
  },
  {
    brand: "Jeep",
    models: [
      {
        name: "Renegade, Compass & Avenger",
        yearsRange: [2014, 2026],
        engines: ["1.0 T3 GSE 120 CP", "1.2 Turbo / e-Hybrid 100 CP (Avenger)", "1.3 T4 GSE 130/150 CP", "1.3 T4 4xe Plug-in Hybrid 190/240 CP 4x4", "1.4 MultiAir 140/170 CP", "1.5 e-Hybrid 130 CP", "1.6 E.torQ 110 CP", "1.6 MultiJet 120/130 CP", "2.0 MultiJet 120/140/170 CP 4x4", "Avenger Electric 156 CP"],
      },
      {
        name: "Grand Cherokee, Cherokee & Wrangler",
        yearsRange: [2005, 2026],
        engines: ["2.0 Turbo 272 CP / 2.0 4xe Plug-in Hybrid 380 CP", "3.6 V6 Pentastar 286 CP", "2.0 / 2.2 MultiJet 140/170/195/200 CP 4x4", "2.8 CRD 177/200 CP 4x4", "3.0 V6 CRD / MultiJet 190/218/241/250 CP 4x4"],
      },
    ],
  },
  {
    brand: "Land Rover",
    models: [
      {
        name: "Range Rover Evoque, Velar & Discovery Sport",
        yearsRange: [2011, 2026],
        engines: ["1.5 P300e Plug-in Hybrid 309 CP AWD", "2.0 Si4 / P200 / P250 / P300 200/240/249/300 CP AWD", "2.0 Ingenium Diesel (TD4 / SD4 / D150 / D165 / D180 / D200 / D240) 150/163/180/204/240 CP AWD", "2.2 eD4 / TD4 / SD4 150/190 CP", "3.0 D275 / D300 V6 / L6 Diesel (Velar)"],
      },
      {
        name: "Range Rover Sport, Range Rover, Discovery & Freelander 2",
        yearsRange: [2005, 2026],
        engines: ["2.2 TD4 / SD4 150/160/190 CP 4WD (Freelander 2)", "2.0 SD4 240 CP / P400e Plug-in Hybrid 404 CP", "2.7 TDV6 190 CP", "3.0 TDV6 / SDV6 211/245/249/256/258/292/306 CP", "3.0 D250 / D300 / D350 Ingenium Mild-Hybrid", "3.0 P440e / P460e / P510e Plug-in Hybrid", "4.4 SDV8 339 CP"],
      },
    ],
  },
  {
    brand: "Mini",
    models: [
      {
        name: "One / Cooper / Cooper S (R50 / R56 / F55 / F56)",
        yearsRange: [2002, 2026],
        engines: ["1.2 / 1.5 One 75/95/102 CP", "1.5 Cooper 136/156 CP", "1.6 One / Cooper 90/98/115/120/122 CP", "1.6 / 2.0 Cooper S / JCW 163/175/184/192/204/231 CP", "1.4 / 1.5 / 1.6 One D / Cooper D 75/90/95/109/112/116 CP", "2.0 Cooper SD 143/170 CP", "Cooper SE Electric 184/218 CP"],
      },
      {
        name: "Countryman & Clubman",
        yearsRange: [2008, 2026],
        engines: ["1.5 Cooper 136/170 CP ALL4", "1.5 Cooper SE ALL4 Plug-in Hybrid 220/224 CP", "1.6 Cooper / Cooper S 122/184 CP ALL4", "2.0 Cooper S / JCW 192/231/300/306 CP ALL4", "1.6 / 2.0 Cooper D / Cooper SD 112/143/150/190 CP ALL4"],
      },
    ],
  },
  {
    brand: "Porsche",
    models: [
      {
        name: "Cayenne & Macan",
        yearsRange: [2004, 2026],
        engines: ["2.0 Turbo 245/252/265 CP (Macan)", "2.9 / 3.0 V6 Turbo 340/354/380/440 CP", "3.0 V6 E-Hybrid Plug-in 416/462/470 CP (Cayenne)", "3.0 V6 Diesel 240/245/250/258/262 CP", "4.2 V8 S Diesel 382/385 CP", "Macan Electric 4 / Turbo"],
      },
      {
        name: "Panamera, Taycan & 911",
        yearsRange: [2009, 2026],
        engines: ["2.9 / 3.0 V6 Benzină 330/353/440 CP", "4 E-Hybrid / 4S E-Hybrid Plug-in", "3.0 V6 Diesel 250/300 CP / 4.0 V8 Diesel 422 CP", "Taycan / Taycan 4S / Turbo Electric", "911 Carrera / Carrera 4S / Turbo (997 / 991 / 992)"],
      },
    ],
  },
  {
    brand: "Lexus",
    models: [
      {
        name: "UX, NX & RX",
        yearsRange: [2006, 2026],
        engines: ["UX 250h / 300h Hybrid 184/199 CP 2WD/E-Four", "NX 300h / 350h Hybrid 197/244 CP AWD", "NX 450h+ Plug-in Hybrid 309 CP AWD", "RX 400h / 450h / 350h / 500h Hybrid 272/299/313/371 CP AWD", "RX 450h+ Plug-in Hybrid 309 CP"],
      },
      {
        name: "CT 200h, IS & ES",
        yearsRange: [2006, 2026],
        engines: ["CT 200h 1.8 Hybrid 136 CP", "IS 220d 177 CP / IS 250 V6 208 CP", "IS 300h 2.5 Hybrid 223 CP", "ES 300h 2.5 Hybrid 218 CP"],
      },
    ],
  },
  {
    brand: "Tesla",
    models: [
      {
        name: "Model 3 & Model Y",
        yearsRange: [2018, 2026],
        engines: ["Standard Range / RWD (50/60 kWh — 283/299 CP)", "Long Range Dual Motor AWD (75/82 kWh — 440/498/514 CP)", "Performance Dual Motor AWD (513/534 CP)"],
      },
      {
        name: "Model S & Model X",
        yearsRange: [2013, 2026],
        engines: ["75D / 85D / 90D / 100D Dual Motor AWD", "Long Range Dual Motor AWD (670 CP)", "Plaid Tri-Motor AWD (1020 CP)"],
      },
    ],
  },
  {
    brand: "MG",
    models: [
      {
        name: "ZS, HS / EHS, MG4 & MG3",
        yearsRange: [2020, 2026],
        engines: ["1.5 VTI-tech 106 CP (ZS)", "1.0 T-GDI 111 CP (ZS)", "1.5 Hybrid+ 194/197 CP (MG3 / ZS II)", "1.5 T-GDI 162/170 CP (HS)", "1.5 T-GDI Plug-in Hybrid 258/339 CP (EHS / HS PHEV)", "ZS EV & MG4 Electric (51 / 64 / 77 kWh — 170/204/245 CP)"],
      },
    ],
  },
  {
    brand: "BYD",
    models: [
      {
        name: "Atto 3, Dolphin, Seal & Seal U",
        yearsRange: [2022, 2026],
        engines: ["Atto 3 Electric 204 CP (60.4 kWh)", "Dolphin Electric 95/177/204 CP (44.9 / 60.4 kWh)", "Seal Electric 313 CP RWD / 530 CP AWD (82.5 kWh)", "Seal U DM-i Plug-in Hybrid 218/324 CP", "Seal U Electric 218 CP"],
      },
    ],
  },
  {
    brand: "SsangYong / KGM",
    models: [
      {
        name: "Tivoli, Korando, Torres, Rexton & Musso",
        yearsRange: [2011, 2026],
        engines: ["1.2 T-GDI 128 CP", "1.5 T-GDI 163 CP 2WD/4WD (Tivoli / Korando / Torres)", "1.6 e-XGi 128 CP", "1.6 e-XDi Diesel 115/136 CP", "2.0 e-XDi 149/175 CP", "2.2 e-XDi Diesel 178/181/202 CP 4WD (Rexton / Musso)"],
      },
    ],
  },
  {
    brand: "Chevrolet",
    models: [
      {
        name: "Aveo, Kalos, Spark, Lacetti & Cruze",
        yearsRange: [2004, 2016],
        engines: ["0.8 / 1.0 / 1.2 Benzină 52/68/72/84/86 CP", "1.4 16V 94/100/101 CP / 1.4 Turbo 140 CP", "1.6 16V 109/113/124 CP", "1.8 16V 122/141 CP", "1.3 VCDi 75/95 CP", "1.7 VCDi 130 CP", "2.0 VCDi 121/150/163 CP"],
      },
      {
        name: "Captiva & Orlando",
        yearsRange: [2006, 2016],
        engines: ["1.4 Turbo 140 CP / 1.8 16V 141 CP (Orlando)", "2.4 16V 136/167 CP AWD (Captiva)", "2.0 VCDi 127/150/163 CP", "2.2 VCDi 163/184 CP AWD"],
      },
    ],
  },
  {
    brand: "Iveco",
    models: [
      {
        name: "Daily (35S / 35C / 50C)",
        yearsRange: [2004, 2026],
        engines: ["2.3 HPI / MultiJet 96/106/116/126/136/146/156 CP", "3.0 HPI / HPT / MultiJet 136/146/150/170/176/180/205/210 CP"],
      },
    ],
  },
];

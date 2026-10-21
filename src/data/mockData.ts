import { calculateDiscountPercent } from "@/lib/pricing";

export type RequestStatus = "Nou" | "Contactat" | "Închis";

export interface Offer {
  id: string;
  name: string;
  description?: string;
  partCode: string;
  image: string;
  oldPrice: number;
  promoPrice: number;
  discountPercent: number;
  validUntil?: string;
  isActive: boolean;
  isOfferOfTheDay: boolean;
  createdAt: string;
}

export interface PartQuoteRequest {
  id: string;
  refNumber: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  carEngine: string;
  vinProvided: boolean;
  vinMasked?: string;
  desiredParts: string;
  talonFileName?: string;
  preferredContact: "WhatsApp" | "Telefon";
  status: RequestStatus;
}

export interface InsuranceRequest {
  id: string;
  refNumber: string;
  createdAt: string;
  type: "RCA" | "Locuință";
  name: string;
  phone: string;
  email?: string;
  preferredContact: "WhatsApp" | "Telefon";
  // RCA specific
  plateNumber?: string;
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  carEngine?: string;
  currentPolicyExpiry?: string;
  periodMonths?: 1 | 6 | 12;
  // Locuință specific
  propertyType?: "Apartament" | "Casă";
  locality?: string;
  surfaceMp?: number;
  yearBuilt?: string;
  policyType?: "Obligatorie PAD" | "Facultativă" | "Ambele (PAD + Facultativă)";
  status: RequestStatus;
}

const C_BG = "rgb(10,10,10)";
const C_SURFACE = "rgb(20,20,20)";
const C_BORDER = "rgb(38,38,38)";
const C_TEXT = "rgb(250,250,250)";
const C_MUTED = "rgb(163,163,163)";
const C_ACCENT = "rgb(112,224,0)";

export function createPlaceholderOfferImage(
  label: string,
  code: string,
  iconType: "disc" | "filter" | "oil" | "belt" | "clutch" | "shock" | "spark" | "battery" = "disc"
): string {
  const iconMarkup: Record<string, string> = {
    disc: `
      <circle cx="200" cy="105" r="52" fill="none" stroke="${C_ACCENT}" stroke-width="4"/>
      <circle cx="200" cy="105" r="35" fill="${C_SURFACE}" stroke="${C_MUTED}" stroke-width="2" stroke-dasharray="8 6"/>
      <circle cx="200" cy="105" r="16" fill="${C_BG}" stroke="${C_ACCENT}" stroke-width="3"/>
    `,
    filter: `
      <rect x="162" y="52" width="76" height="104" rx="8" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3"/>
      <line x1="176" y1="72" x2="224" y2="72" stroke="${C_MUTED}" stroke-width="2.5"/>
      <line x1="176" y1="92" x2="224" y2="92" stroke="${C_ACCENT}" stroke-width="2.5"/>
      <line x1="176" y1="112" x2="224" y2="112" stroke="${C_MUTED}" stroke-width="2.5"/>
      <line x1="176" y1="132" x2="224" y2="132" stroke="${C_ACCENT}" stroke-width="2.5"/>
    `,
    oil: `
      <path d="M164 70 L195 70 L205 54 L226 54 L226 70 L240 84 L240 158 L156 158 L156 80 Z" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3"/>
      <circle cx="200" cy="118" r="13" fill="${C_ACCENT}"/>
    `,
    belt: `
      <circle cx="172" cy="92" r="26" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3"/>
      <circle cx="234" cy="126" r="20" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3"/>
      <path d="M152 70 C190 54 256 92 250 138 C242 162 185 164 162 150 C142 136 138 92 152 70 Z" fill="none" stroke="${C_MUTED}" stroke-width="4" stroke-dasharray="9 4"/>
    `,
    clutch: `
      <circle cx="200" cy="105" r="50" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3.5"/>
      <circle cx="200" cy="105" r="32" fill="${C_BG}" stroke="${C_MUTED}" stroke-width="2.5" stroke-dasharray="10 5"/>
      <circle cx="200" cy="105" r="12" fill="${C_ACCENT}"/>
    `,
    shock: `
      <line x1="180" y1="48" x2="220" y2="162" stroke="${C_MUTED}" stroke-width="7" stroke-linecap="round"/>
      <path d="M176 72 L204 66 L186 90 L214 84 L196 108 L220 102" fill="none" stroke="${C_ACCENT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    spark: `
      <rect x="190" y="48" width="20" height="40" rx="3" fill="${C_TEXT}"/>
      <rect x="180" y="88" width="40" height="18" rx="3" fill="${C_ACCENT}"/>
      <rect x="188" y="106" width="24" height="36" fill="${C_SURFACE}" stroke="${C_MUTED}" stroke-width="2.5"/>
    `,
    battery: `
      <rect x="148" y="68" width="104" height="80" rx="8" fill="${C_SURFACE}" stroke="${C_ACCENT}" stroke-width="3"/>
      <rect x="164" y="55" width="16" height="13" rx="2" fill="${C_MUTED}"/>
      <rect x="220" y="55" width="16" height="13" rx="2" fill="${C_ACCENT}"/>
      <path d="M204 88 L190 110 L201 110 L195 130 L212 106 L201 106 Z" fill="${C_ACCENT}"/>
    `,
  };

  const safeCode = code || "ALEXAUTO";
  const safeLabel = label ? label.slice(0, 26) : "Piesă Auto";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="400" height="220">
    <rect width="400" height="220" fill="${C_BG}"/>
    <rect x="12" y="12" width="376" height="196" rx="10" fill="${C_SURFACE}" stroke="${C_BORDER}" stroke-width="1.5"/>
    ${iconMarkup[iconType] || iconMarkup.disc}
    <text x="28" y="190" fill="${C_MUTED}" font-family="monospace" font-size="11">${safeCode}</text>
    <text x="372" y="190" text-anchor="end" fill="${C_TEXT}" font-family="sans-serif" font-size="11" font-weight="600">${safeLabel}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_OFFERS: Offer[] = [
  {
    id: "off-1",
    name: "Kit Distribuție + Pompă Apă Continental 2.0 TDI",
    description: "Curea distribuție ranforsată, role întinzătoare și pompă apă metalică pentru motoare 2.0 TDI.",
    partCode: "03L198119F",
    image: createPlaceholderOfferImage("CONTINENTAL KIT", "03L198119F", "belt"),
    oldPrice: 1120,
    promoPrice: 849,
    discountPercent: calculateDiscountPercent(1120, 849), // 24%
    validUntil: "2026-11-30",
    isActive: true,
    isOfferOfTheDay: true,
    createdAt: "2026-10-21T08:00:00.000Z",
  },
  {
    id: "off-2",
    name: "Set Discuri Frână Față Ventilate Brembo 288mm",
    description: "Set 2 discuri frână față cu protecție anticorozivă UV.",
    partCode: "1K0615301AA",
    image: createPlaceholderOfferImage("BREMBO DISC", "1K0615301AA", "disc"),
    oldPrice: 540,
    promoPrice: 389,
    discountPercent: calculateDiscountPercent(540, 389), // 28%
    validUntil: "2026-11-28",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-20T10:30:00.000Z",
  },
  {
    id: "off-3",
    name: "Ulei Motor Castrol Edge 5W-30 LongLife III 5L",
    description: "Ulei sintetic normă VW 504 00 / 507 00, BMW LL-04.",
    partCode: "G052195M4",
    image: createPlaceholderOfferImage("CASTROL 5W30", "G052195M4", "oil"),
    oldPrice: 250,
    promoPrice: 189,
    discountPercent: calculateDiscountPercent(250, 189), // 24%
    validUntil: "2026-12-15",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-19T14:00:00.000Z",
  },
  {
    id: "off-4",
    name: "Pachet 4 Filtre Revizie Mann-Filter",
    description: "Filtru ulei, aer, polen cu carbon activ și combustibil.",
    partCode: "HU7020Z-KIT",
    image: createPlaceholderOfferImage("MANN-FILTER", "HU7020Z-KIT", "filter"),
    oldPrice: 420,
    promoPrice: 310,
    discountPercent: calculateDiscountPercent(420, 310), // 26%
    validUntil: "2026-11-30",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-18T09:15:00.000Z",
  },
  {
    id: "off-5",
    name: "Kit Ambreiaj + Volantă Masă Dublă LuK",
    description: "Set complet volantă masă dublă, placă, disc și rulment presiune.",
    partCode: "600001700",
    image: createPlaceholderOfferImage("LUK REPSET", "600001700", "clutch"),
    oldPrice: 2650,
    promoPrice: 2120,
    discountPercent: calculateDiscountPercent(2650, 2120), // 20%
    validUntil: "2026-12-10",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-17T11:20:00.000Z",
  },
  {
    id: "off-6",
    name: "Set Plăcuțe Frână Față ATE Ceramic",
    description: "Frânare silențioasă și jante curate fără praf negru.",
    partCode: "13047071842",
    image: createPlaceholderOfferImage("ATE CERAMIC", "13047071842", "disc"),
    oldPrice: 360,
    promoPrice: 265,
    discountPercent: calculateDiscountPercent(360, 265), // 26%
    validUntil: "2026-11-25",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-16T16:45:00.000Z",
  },
  {
    id: "off-7",
    name: "Set 2 Amortizoare Față pe Gaz Sachs",
    description: "Pereche amortizoare punte față cu răspuns dinamic optimizat.",
    partCode: "314883-SET",
    image: createPlaceholderOfferImage("SACHS GAZ", "314883-SET", "shock"),
    oldPrice: 780,
    promoPrice: 585,
    discountPercent: calculateDiscountPercent(780, 585), // 25%
    validUntil: "2026-12-05",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-15T12:10:00.000Z",
  },
  {
    id: "off-8",
    name: "Baterie Auto Varta Silver Dynamic AGM 70Ah",
    description: "Acumulator AGM pentru vehicule cu sistem Start-Stop.",
    partCode: "570901076E39",
    image: createPlaceholderOfferImage("VARTA AGM 70", "570901076E39", "battery"),
    oldPrice: 920,
    promoPrice: 735,
    discountPercent: calculateDiscountPercent(920, 735), // 20%
    validUntil: "2026-12-20",
    isActive: true,
    isOfferOfTheDay: false,
    createdAt: "2026-10-14T15:00:00.000Z",
  },
];

export const INITIAL_PART_REQUESTS: PartQuoteRequest[] = [
  {
    id: "req-demo-1",
    refNumber: "ALX-84920",
    createdAt: "2026-10-21T09:15:00.000Z",
    name: "Marius Dumitrescu",
    phone: "0744123890",
    email: "marius.dumitrescu@exemplu.ro",
    carBrand: "Volkswagen",
    carModel: "Passat B6 / B7 / B8",
    carYear: "2017",
    carEngine: "2.0 TDI 150 CP",
    vinProvided: true,
    vinMasked: "WVWZZZ3CZ********",
    desiredParts: "Kit distribuție complet cu pompă apă (cod 03L198119F) + ulei 5W-30.",
    talonFileName: "talon_passat_b8.jpg",
    preferredContact: "WhatsApp",
    status: "Nou",
  },
  {
    id: "req-demo-2",
    refNumber: "ALX-84871",
    createdAt: "2026-10-20T16:42:00.000Z",
    name: "Elena Radu",
    phone: "0722987654",
    carBrand: "Dacia",
    carModel: "Duster I / II / III",
    carYear: "2019",
    carEngine: "1.5 Blue dCi 115 CP",
    vinProvided: true,
    vinMasked: "UU1HSDJ9*********",
    desiredParts: "Discuri frână față + plăcuțe frână față.",
    preferredContact: "Telefon",
    status: "Contactat",
  },
];

export const INITIAL_INSURANCE_REQUESTS: InsuranceRequest[] = [
  {
    id: "ins-demo-1",
    refNumber: "ASG-39104",
    createdAt: "2026-10-21T10:05:00.000Z",
    type: "RCA",
    name: "Andrei Ionescu",
    phone: "0765432109",
    preferredContact: "WhatsApp",
    plateNumber: "BV 88 ALX",
    carBrand: "Skoda",
    carModel: "Octavia II / III / IV",
    carYear: "2019",
    carEngine: "2.0 TDI 150 CP",
    currentPolicyExpiry: "2026-11-10",
    periodMonths: 12,
    status: "Nou",
  },
  {
    id: "ins-demo-2",
    refNumber: "ASG-38950",
    createdAt: "2026-10-19T14:20:00.000Z",
    type: "Locuință",
    name: "Cristina Matei",
    phone: "0731555888",
    email: "cristina.matei@exemplu.ro",
    preferredContact: "Telefon",
    propertyType: "Apartament",
    locality: "Cluj-Napoca",
    surfaceMp: 68,
    yearBuilt: "2016",
    policyType: "Ambele (PAD + Facultativă)",
    status: "Contactat",
  },
];

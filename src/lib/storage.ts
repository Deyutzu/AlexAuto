import {
  INITIAL_OFFERS,
  INITIAL_PART_REQUESTS,
  INITIAL_INSURANCE_REQUESTS,
  Offer,
  PartQuoteRequest,
  InsuranceRequest,
  RequestStatus,
} from "@/data/mockData";

const KEYS = {
  OFFERS: "alexauto_offers_v3",
  PART_REQUESTS: "alexauto_part_requests_v3",
  INSURANCE_REQUESTS: "alexauto_insurance_requests_v3",
  QUOTE_PREFILL: "alexauto_quote_prefill_v3",
  COOKIE_CONSENT: "alexauto_cookie_consent_v1",
  ADMIN_AUTH: "alexauto_admin_session_v1",
};

export const STORAGE_UPDATE_EVENT = "alexauto-storage-update";

export interface QuotePrefillData {
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  carEngine?: string;
  desiredParts?: string;
  fromOfferTitle?: string;
  fromOfferOem?: string;
  fromOfferPrice?: number;
}

export interface FullBackupPayload {
  version: number;
  exportedAt: string;
  offers: Offer[];
  partRequests: PartQuoteRequest[];
  insuranceRequests: InsuranceRequest[];
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function notifyStorageUpdate(): void {
  if (isBrowser()) {
    window.dispatchEvent(new Event(STORAGE_UPDATE_EVENT));
  }
}

// --- OFFERS ---
export function getOffers(): Offer[] {
  if (!isBrowser()) return INITIAL_OFFERS;
  try {
    const raw = window.localStorage.getItem(KEYS.OFFERS);
    if (!raw) {
      window.localStorage.setItem(KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
      return INITIAL_OFFERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_OFFERS;
  } catch {
    return INITIAL_OFFERS;
  }
}

export function saveOffers(offers: Offer[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.OFFERS, JSON.stringify(offers));
  notifyStorageUpdate();
}

export function addOffer(offer: Omit<Offer, "id" | "createdAt">): Offer {
  const current = getOffers();
  const newOffer: Offer = {
    ...offer,
    id: `off-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  const updatedCurrent = newOffer.isOfferOfTheDay
    ? current.map((o) => ({ ...o, isOfferOfTheDay: false }))
    : current;
  saveOffers([newOffer, ...updatedCurrent]);
  return newOffer;
}

export function updateOffer(updated: Offer): void {
  const current = getOffers();
  const next = current.map((o) => {
    if (o.id === updated.id) return updated;
    if (updated.isOfferOfTheDay) return { ...o, isOfferOfTheDay: false };
    return o;
  });
  saveOffers(next);
}

export function setOfferOfTheDay(id: string, value: boolean): void {
  const current = getOffers();
  const next = current.map((o) => ({
    ...o,
    isOfferOfTheDay: o.id === id ? value : value ? false : o.isOfferOfTheDay,
  }));
  saveOffers(next);
}

export function duplicateOffer(id: string): Offer | null {
  const current = getOffers();
  const source = current.find((o) => o.id === id);
  if (!source) return null;
  const copy: Offer = {
    ...source,
    id: `off-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: `${source.name} (Copie)`,
    isOfferOfTheDay: false,
    createdAt: new Date().toISOString(),
  };
  saveOffers([copy, ...current]);
  return copy;
}

export function deleteOffer(id: string): Offer | null {
  const current = getOffers();
  const target = current.find((o) => o.id === id) || null;
  saveOffers(current.filter((o) => o.id !== id));
  return target;
}

export function restoreDeletedOffer(offer: Offer): void {
  const current = getOffers();
  const cleaned = offer.isOfferOfTheDay
    ? current.map((o) => ({ ...o, isOfferOfTheDay: false }))
    : current;
  saveOffers([offer, ...cleaned]);
}

export function bulkImportOffers(
  newOffers: Omit<Offer, "id" | "createdAt">[]
): number {
  const current = getOffers();
  const now = Date.now();
  const created: Offer[] = newOffers.map((item, idx) => ({
    ...item,
    id: `off-csv-${now}-${idx}`,
    isOfferOfTheDay: false,
    createdAt: new Date(now - idx * 1000).toISOString(),
  }));
  saveOffers([...created, ...current]);
  return created.length;
}

// --- PART QUOTE REQUESTS ---
export function getPartRequests(): PartQuoteRequest[] {
  if (!isBrowser()) return INITIAL_PART_REQUESTS;
  try {
    const raw = window.localStorage.getItem(KEYS.PART_REQUESTS);
    if (!raw) {
      window.localStorage.setItem(
        KEYS.PART_REQUESTS,
        JSON.stringify(INITIAL_PART_REQUESTS)
      );
      return INITIAL_PART_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_PART_REQUESTS;
  } catch {
    return INITIAL_PART_REQUESTS;
  }
}

export function addPartRequest(
  input: Omit<PartQuoteRequest, "id" | "refNumber" | "createdAt" | "status">
): PartQuoteRequest {
  const current = getPartRequests();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const newRequest: PartQuoteRequest = {
    ...input,
    id: `req-${Date.now()}`,
    refNumber: `ALX-${randomDigits}`,
    createdAt: new Date().toISOString(),
    status: "Nou",
  };
  if (isBrowser()) {
    window.localStorage.setItem(
      KEYS.PART_REQUESTS,
      JSON.stringify([newRequest, ...current])
    );
    notifyStorageUpdate();
  }
  return newRequest;
}

export function updatePartRequestStatus(id: string, status: RequestStatus): void {
  if (!isBrowser()) return;
  const current = getPartRequests();
  const next = current.map((r) => (r.id === id ? { ...r, status } : r));
  window.localStorage.setItem(KEYS.PART_REQUESTS, JSON.stringify(next));
  notifyStorageUpdate();
}

export function deletePartRequest(id: string): void {
  if (!isBrowser()) return;
  const current = getPartRequests().filter((r) => r.id !== id);
  window.localStorage.setItem(KEYS.PART_REQUESTS, JSON.stringify(current));
  notifyStorageUpdate();
}

// --- INSURANCE REQUESTS ("Cereri asigurări") ---
export function getInsuranceRequests(): InsuranceRequest[] {
  if (!isBrowser()) return INITIAL_INSURANCE_REQUESTS;
  try {
    const raw = window.localStorage.getItem(KEYS.INSURANCE_REQUESTS);
    if (!raw) {
      window.localStorage.setItem(
        KEYS.INSURANCE_REQUESTS,
        JSON.stringify(INITIAL_INSURANCE_REQUESTS)
      );
      return INITIAL_INSURANCE_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_INSURANCE_REQUESTS;
  } catch {
    return INITIAL_INSURANCE_REQUESTS;
  }
}

export function addInsuranceRequest(
  input: Omit<InsuranceRequest, "id" | "refNumber" | "createdAt" | "status">
): InsuranceRequest {
  const current = getInsuranceRequests();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const newReq: InsuranceRequest = {
    ...input,
    id: `ins-${Date.now()}`,
    refNumber: `ASG-${randomDigits}`,
    createdAt: new Date().toISOString(),
    status: "Nou",
  };
  if (isBrowser()) {
    window.localStorage.setItem(
      KEYS.INSURANCE_REQUESTS,
      JSON.stringify([newReq, ...current])
    );
    notifyStorageUpdate();
  }
  return newReq;
}

export function updateInsuranceRequestStatus(
  id: string,
  status: RequestStatus
): void {
  if (!isBrowser()) return;
  const current = getInsuranceRequests();
  const next = current.map((r) => (r.id === id ? { ...r, status } : r));
  window.localStorage.setItem(KEYS.INSURANCE_REQUESTS, JSON.stringify(next));
  notifyStorageUpdate();
}

export function deleteInsuranceRequest(id: string): void {
  if (!isBrowser()) return;
  const current = getInsuranceRequests().filter((r) => r.id !== id);
  window.localStorage.setItem(KEYS.INSURANCE_REQUESTS, JSON.stringify(current));
  notifyStorageUpdate();
}

// --- QUOTE FORM PREFILL ---
export function setQuotePrefill(data: QuotePrefillData): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.QUOTE_PREFILL, JSON.stringify(data));
  notifyStorageUpdate();
}

export function getQuotePrefill(): QuotePrefillData | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(KEYS.QUOTE_PREFILL);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearQuotePrefill(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEYS.QUOTE_PREFILL);
}

// --- BACKUP & RESTORE (JSON) ---
export function exportFullBackupJson(): string {
  const payload: FullBackupPayload = {
    version: 3,
    exportedAt: new Date().toISOString(),
    offers: getOffers(),
    partRequests: getPartRequests(),
    insuranceRequests: getInsuranceRequests(),
  };
  return JSON.stringify(payload, null, 2);
}

export function restoreFullBackupJson(rawJson: string): {
  valid: boolean;
  error?: string;
} {
  if (!isBrowser()) return { valid: false, error: "Indisponibil pe server." };
  try {
    const parsed = JSON.parse(rawJson) as Partial<FullBackupPayload>;
    if (
      !Array.isArray(parsed.offers) ||
      !Array.isArray(parsed.partRequests) ||
      !Array.isArray(parsed.insuranceRequests)
    ) {
      return {
        valid: false,
        error: "Fișierul JSON nu are structura unui backup AlexAuto valid.",
      };
    }
    window.localStorage.setItem(KEYS.OFFERS, JSON.stringify(parsed.offers));
    window.localStorage.setItem(
      KEYS.PART_REQUESTS,
      JSON.stringify(parsed.partRequests)
    );
    window.localStorage.setItem(
      KEYS.INSURANCE_REQUESTS,
      JSON.stringify(parsed.insuranceRequests)
    );
    notifyStorageUpdate();
    return { valid: true };
  } catch {
    return {
      valid: false,
      error: "Fișierul selectat nu este un fișier JSON valid.",
    };
  }
}

// --- COOKIE CONSENT & ADMIN SESSION ---
export function getCookieConsent(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.COOKIE_CONSENT) === "accepted";
}

export function setCookieConsent(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.COOKIE_CONSENT, "accepted");
}

export function getAdminAuthenticated(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(KEYS.ADMIN_AUTH) === "true";
}

export function setAdminAuthenticated(val: boolean): void {
  if (!isBrowser()) return;
  if (val) {
    window.localStorage.setItem(KEYS.ADMIN_AUTH, "true");
  } else {
    window.localStorage.removeItem(KEYS.ADMIN_AUTH);
  }
}

export function resetAllDemoData(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
  window.localStorage.setItem(
    KEYS.PART_REQUESTS,
    JSON.stringify(INITIAL_PART_REQUESTS)
  );
  window.localStorage.setItem(
    KEYS.INSURANCE_REQUESTS,
    JSON.stringify(INITIAL_INSURANCE_REQUESTS)
  );
  notifyStorageUpdate();
}

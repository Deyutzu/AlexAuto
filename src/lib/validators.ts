export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a 17-character VIN (ISO 3779).
 * Excludes letters I, O, Q.
 */
export function validateVIN(rawVin: string): ValidationResult {
  const vin = rawVin.trim().toUpperCase();
  if (!vin) {
    return { valid: false, error: "Seria de șasiu (VIN) este obligatorie." };
  }
  if (/[IOQ]/.test(vin)) {
    return {
      valid: false,
      error: "Seria VIN nu poate conține literele I, O sau Q.",
    };
  }
  if (!/^[A-HJ-NPR-Z0-9]+$/.test(vin)) {
    return {
      valid: false,
      error: "Seria VIN poate conține doar litere (fără I, O, Q) și cifre.",
    };
  }
  if (vin.length !== 17) {
    return {
      valid: false,
      error: `Seria VIN trebuie să aibă exact 17 caractere (ai introdus ${vin.length}).`,
    };
  }
  return { valid: true };
}

/**
 * Validates Romanian vehicle registration plate (e.g. B 123 ABC, CJ 12 XYZ, etc.).
 */
export function validateRoPlate(rawPlate: string): ValidationResult {
  const cleaned = rawPlate.trim().toUpperCase().replace(/[\s-]+/g, "");
  if (!cleaned) {
    return { valid: false, error: "Numărul de înmatriculare este obligatoriu." };
  }
  const roPlateRegex = /^(B\d{2,3}[A-Z]{3}|[A-Z]{2}\d{2,3}[A-Z]{3}|[A-Z]{1,2}\d{5,6})$/;
  if (!roPlateRegex.test(cleaned)) {
    return {
      valid: false,
      error: "Format invalid. Exemplu valid: B 123 ABC sau CJ 09 XYZ.",
    };
  }
  return { valid: true };
}

/**
 * Validates Romanian phone number.
 */
export function validateRoPhone(rawPhone: string): ValidationResult {
  const cleaned = rawPhone.replace(/[\s.-]+/g, "");
  if (!cleaned) {
    return { valid: false, error: "Numărul de telefon este obligatoriu." };
  }
  if (!/^(\+40|0040|0)7\d{8}$/.test(cleaned)) {
    return {
      valid: false,
      error: "Introdu un număr mobil valid din România (ex: 0744 123 456).",
    };
  }
  return { valid: true };
}

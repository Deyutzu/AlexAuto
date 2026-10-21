export interface PricingValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Computes integer discount percentage: round((oldPrice - promoPrice) / oldPrice * 100)
 */
export function calculateDiscountPercent(oldPrice: number, promoPrice: number): number {
  if (!oldPrice || oldPrice <= 0 || !promoPrice || promoPrice <= 0 || promoPrice >= oldPrice) {
    return 0;
  }
  return Math.round(((oldPrice - promoPrice) / oldPrice) * 100);
}

/**
 * Computes promoPrice from oldPrice and discountPercent, rounded to 2 decimals.
 */
export function calculatePromoPriceFromDiscount(
  oldPrice: number,
  discountPercent: number
): number {
  if (!oldPrice || oldPrice <= 0) return 0;
  const clamped = Math.max(0, Math.min(99, discountPercent));
  const raw = oldPrice * (1 - clamped / 100);
  return Math.round(raw * 100) / 100;
}

/**
 * Validates offer pricing according to business rules:
 * - If hasDiscount is false: only checks oldPrice > 0.
 * - If hasDiscount is true: checks oldPrice > 0, promoPrice > 0 and < oldPrice, discountPercent between 1 and 90.
 */
export function validateOfferPricing(
  oldPrice: number,
  promoPrice: number,
  discountPercent: number,
  hasDiscount: boolean = true
): PricingValidationResult {
  if (!Number.isFinite(oldPrice) || oldPrice <= 0) {
    return {
      valid: false,
      error: "Prețul trebuie să fie mai mare decât 0 lei.",
    };
  }
  if (!hasDiscount) {
    return { valid: true };
  }
  if (!Number.isFinite(promoPrice) || promoPrice <= 0) {
    return {
      valid: false,
      error: "Prețul redus (promoțional) trebuie să fie mai mare decât 0 lei.",
    };
  }
  if (promoPrice >= oldPrice) {
    return {
      valid: false,
      error: "Prețul redus trebuie să fie mai mic decât prețul întreg.",
    };
  }
  if (!Number.isFinite(discountPercent) || discountPercent < 1 || discountPercent > 90) {
    return {
      valid: false,
      error: "Reducerea trebuie să fie cuprinsă între 1% și 90%.",
    };
  }
  return { valid: true };
}

/**
 * Formats a numeric price in Romanian format: "1.234,50 lei"
 */
export function formatPriceLei(value: number): string {
  const safeVal = Number.isFinite(value) ? value : 0;
  const fixed = safeVal.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withThousands},${decPart} lei`;
}

/**
 * Formats discount badge as "-23%"
 */
export function formatDiscountBadge(discountPercent: number): string {
  const rounded = Math.round(discountPercent);
  return `-${rounded}%`;
}

/**
 * Checks if an optional YYYY-MM-DD validUntil date is in the past.
 */
export function isOfferExpired(validUntil?: string): boolean {
  if (!validUntil || !validUntil.trim()) return false;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;
  return validUntil.trim() < todayStr;
}

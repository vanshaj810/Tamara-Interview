/**
 * Profit margin configurations for commodity types
 * All margins are expressed as decimal percentages (e.g., 0.08 = 8%)
 */

export const COMMODITY_MARGINS: Record<string, number> = {
    gold: 0.08,    // 8%
    oil: 0.10,     // 10%
    metals: 0.12,  // 12%
    wheat: 0.15,   // 15%
};

export const DEFAULT_MARGIN = 0.12; // 12% for all other categories

export const MINIMUM_MARGIN = 0.05; // 5% floor after promo discounts

/**
 * Promo code discount rates (applied to margin, not commodity cost)
 */
export const PROMO_DISCOUNTS: Record<string, number> = {
    SAVE10: 0.10, // Reduces margin by 10%
    SAVE20: 0.20, // Reduces margin by 20%
};

/**
 * Installment constraints
 */
export const MIN_INSTALLMENTS = 2;
export const MAX_INSTALLMENTS = 12;

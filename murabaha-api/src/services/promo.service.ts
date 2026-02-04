/**
 * Promo code handling service
 * Applies promotional discounts to profit margins
 */

import { PROMO_DISCOUNTS, MINIMUM_MARGIN } from '../constants/margins';

export interface PromoResult {
    isValid: boolean;
    adjustedMargin: number;
    errorMessage?: string;
}

/**
 * Validates a promo code and returns whether it's valid
 * @param promoCode - The promotional code to validate
 * @returns true if the code is valid, false otherwise
 */
export function isValidPromoCode(promoCode: string | undefined): boolean {
    if (!promoCode) return true; // No promo is valid
    return promoCode.toUpperCase() in PROMO_DISCOUNTS;
}

/**
 * Applies a promo code discount to a margin
 * @param baseMargin - The original margin as a decimal
 * @param promoCode - Optional promotional code
 * @returns PromoResult with adjusted margin and validity
 */
export function applyPromoCode(baseMargin: number, promoCode?: string): PromoResult {
    // No promo code provided - return base margin
    if (!promoCode) {
        return { isValid: true, adjustedMargin: baseMargin };
    }

    const normalizedCode = promoCode.toUpperCase();
    const discount = PROMO_DISCOUNTS[normalizedCode];

    // Invalid promo code
    if (discount === undefined) {
        return {
            isValid: false,
            adjustedMargin: baseMargin,
            errorMessage: `Invalid promo code: ${promoCode}`,
        };
    }

    // Calculate discounted margin
    let adjustedMargin = baseMargin * (1 - discount);

    // Enforce minimum margin floor
    if (adjustedMargin < MINIMUM_MARGIN) {
        adjustedMargin = MINIMUM_MARGIN;
    }

    return { isValid: true, adjustedMargin };
}

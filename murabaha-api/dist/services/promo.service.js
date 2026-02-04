"use strict";
/**
 * Promo code handling service
 * Applies promotional discounts to profit margins
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPromoCode = isValidPromoCode;
exports.applyPromoCode = applyPromoCode;
const margins_1 = require("../constants/margins");
/**
 * Validates a promo code and returns whether it's valid
 * @param promoCode - The promotional code to validate
 * @returns true if the code is valid, false otherwise
 */
function isValidPromoCode(promoCode) {
    if (!promoCode)
        return true; // No promo is valid
    return promoCode.toUpperCase() in margins_1.PROMO_DISCOUNTS;
}
/**
 * Applies a promo code discount to a margin
 * @param baseMargin - The original margin as a decimal
 * @param promoCode - Optional promotional code
 * @returns PromoResult with adjusted margin and validity
 */
function applyPromoCode(baseMargin, promoCode) {
    // No promo code provided - return base margin
    if (!promoCode) {
        return { isValid: true, adjustedMargin: baseMargin };
    }
    const normalizedCode = promoCode.toUpperCase();
    const discount = margins_1.PROMO_DISCOUNTS[normalizedCode];
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
    if (adjustedMargin < margins_1.MINIMUM_MARGIN) {
        adjustedMargin = margins_1.MINIMUM_MARGIN;
    }
    return { isValid: true, adjustedMargin };
}
//# sourceMappingURL=promo.service.js.map
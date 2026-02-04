/**
 * Promo code handling service
 */

const { PROMO_DISCOUNTS, MINIMUM_MARGIN } = require('../constants/margins');

/**
 * Validates a promo code
 * @param {string|undefined} promoCode - The promotional code to validate
 * @returns {boolean} true if valid, false otherwise
 */
function isValidPromoCode(promoCode) {
    if (!promoCode) return true; // No promo is valid
    return promoCode.toUpperCase() in PROMO_DISCOUNTS;
}

/**
 * Applies a promo code discount to a margin
 * @param {number} baseMargin - The original margin as a decimal
 * @param {string|undefined} promoCode - Optional promotional code
 * @returns {{ isValid: boolean, adjustedMargin: number, errorMessage?: string }}
 */
function applyPromoCode(baseMargin, promoCode) {
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

module.exports = { isValidPromoCode, applyPromoCode };

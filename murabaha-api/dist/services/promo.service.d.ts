/**
 * Promo code handling service
 * Applies promotional discounts to profit margins
 */
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
export declare function isValidPromoCode(promoCode: string | undefined): boolean;
/**
 * Applies a promo code discount to a margin
 * @param baseMargin - The original margin as a decimal
 * @param promoCode - Optional promotional code
 * @returns PromoResult with adjusted margin and validity
 */
export declare function applyPromoCode(baseMargin: number, promoCode?: string): PromoResult;
//# sourceMappingURL=promo.service.d.ts.map
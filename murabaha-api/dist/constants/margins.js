"use strict";
/**
 * Profit margin configurations for commodity types
 * All margins are expressed as decimal percentages (e.g., 0.08 = 8%)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_INSTALLMENTS = exports.MIN_INSTALLMENTS = exports.PROMO_DISCOUNTS = exports.MINIMUM_MARGIN = exports.DEFAULT_MARGIN = exports.COMMODITY_MARGINS = void 0;
exports.COMMODITY_MARGINS = {
    gold: 0.08, // 8%
    oil: 0.10, // 10%
    metals: 0.12, // 12%
    wheat: 0.15, // 15%
};
exports.DEFAULT_MARGIN = 0.12; // 12% for all other categories
exports.MINIMUM_MARGIN = 0.05; // 5% floor after promo discounts
/**
 * Promo code discount rates (applied to margin, not commodity cost)
 */
exports.PROMO_DISCOUNTS = {
    SAVE10: 0.10, // Reduces margin by 10%
    SAVE20: 0.20, // Reduces margin by 20%
};
/**
 * Installment constraints
 */
exports.MIN_INSTALLMENTS = 2;
exports.MAX_INSTALLMENTS = 12;
//# sourceMappingURL=margins.js.map
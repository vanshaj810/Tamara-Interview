"use strict";
/**
 * Financial rounding utilities for precise monetary calculations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToTwoDecimals = roundToTwoDecimals;
exports.floorToTwoDecimals = floorToTwoDecimals;
exports.formatCurrency = formatCurrency;
/**
 * Rounds a number to 2 decimal places (banker's rounding avoided, uses standard rounding)
 * @param value - The number to round
 * @returns Number with exactly 2 decimal precision
 */
function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}
/**
 * Floors a number to 2 decimal places (always rounds down)
 * Used for calculating base installment to ensure no overpayment
 * @param value - The number to floor
 * @returns Number floored to 2 decimal places
 */
function floorToTwoDecimals(value) {
    return Math.floor(value * 100) / 100;
}
/**
 * Formats a number to exactly 2 decimal places for display
 * @param value - The number to format
 * @returns String representation with 2 decimal places
 */
function formatCurrency(value) {
    return value.toFixed(2);
}
//# sourceMappingURL=rounding.utils.js.map
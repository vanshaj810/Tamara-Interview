/**
 * Financial rounding utilities for precise monetary calculations
 */

/**
 * Rounds a number to 2 decimal places
 * @param {number} value - The number to round
 * @returns {number} Number with exactly 2 decimal precision
 */
function roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
}

/**
 * Floors a number to 2 decimal places (always rounds down)
 * Used for calculating base installment to ensure no overpayment
 * @param {number} value - The number to floor
 * @returns {number} Number floored to 2 decimal places
 */
function floorToTwoDecimals(value) {
    return Math.floor(value * 100) / 100;
}

/**
 * Formats a number to exactly 2 decimal places for display
 * @param {number} value - The number to format
 * @returns {string} String representation with 2 decimal places
 */
function formatCurrency(value) {
    return value.toFixed(2);
}

module.exports = {
    roundToTwoDecimals,
    floorToTwoDecimals,
    formatCurrency,
};

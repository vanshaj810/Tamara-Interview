/**
 * Financial rounding utilities for precise monetary calculations
 */

/**
 * Rounds a number to 2 decimal places (banker's rounding avoided, uses standard rounding)
 * @param value - The number to round
 * @returns Number with exactly 2 decimal precision
 */
export function roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
}

/**
 * Floors a number to 2 decimal places (always rounds down)
 * Used for calculating base installment to ensure no overpayment
 * @param value - The number to floor
 * @returns Number floored to 2 decimal places
 */
export function floorToTwoDecimals(value: number): number {
    return Math.floor(value * 100) / 100;
}

/**
 * Formats a number to exactly 2 decimal places for display
 * @param value - The number to format
 * @returns String representation with 2 decimal places
 */
export function formatCurrency(value: number): string {
    return value.toFixed(2);
}

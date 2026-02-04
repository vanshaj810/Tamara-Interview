/**
 * Date utility functions for installment schedule generation
 */
/**
 * Adds one month to a given date, handling edge cases for month-end dates.
 * If the day exceeds the target month's length, it adjusts to the last day.
 *
 * @example
 * // Jan 31 + 1 month = Feb 28 (or Feb 29 in leap year)
 * addMonths(new Date('2026-01-31'), 1) => Date for Feb 28, 2026
 */
export declare function addMonths(date: Date, months: number): Date;
/**
 * Formats a Date object to YYYY-MM-DD string
 */
export declare function formatDateToISO(date: Date): string;
/**
 * Parses a YYYY-MM-DD string to a Date object
 */
export declare function parseISODate(dateString: string): Date;
/**
 * Generates an array of due dates for installments
 * Starting one month from purchase date
 */
export declare function generateDueDates(purchaseDate: Date, installmentCount: number): Date[];
//# sourceMappingURL=date.utils.d.ts.map
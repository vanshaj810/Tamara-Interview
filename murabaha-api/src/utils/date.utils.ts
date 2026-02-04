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
export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    const originalDay = result.getDate();

    // Move to the target month
    result.setMonth(result.getMonth() + months);

    // If the day changed (month overflow), set to last day of previous month
    if (result.getDate() !== originalDay) {
        result.setDate(0); // Sets to last day of previous month
    }

    return result;
}

/**
 * Formats a Date object to YYYY-MM-DD string
 */
export function formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string to a Date object
 */
export function parseISODate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Generates an array of due dates for installments
 * Starting one month from purchase date
 */
export function generateDueDates(purchaseDate: Date, installmentCount: number): Date[] {
    const dates: Date[] = [];

    for (let i = 1; i <= installmentCount; i++) {
        dates.push(addMonths(purchaseDate, i));
    }

    return dates;
}

/**
 * Date utility functions for installment schedule generation
 */

/**
 * Adds one month to a given date, handling edge cases for month-end dates.
 * If the day exceeds the target month's length, it adjusts to the last day.
 * 
 * @param {Date} date - The starting date
 * @param {number} months - Number of months to add
 * @returns {Date} New date with months added
 */
function addMonths(date, months) {
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
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD string to a Date object
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date} Parsed date
 */
function parseISODate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Generates an array of due dates for installments
 * Starting one month from purchase date
 * @param {Date} purchaseDate - The purchase date
 * @param {number} installmentCount - Number of installments
 * @returns {Date[]} Array of due dates
 */
function generateDueDates(purchaseDate, installmentCount) {
    const dates = [];

    for (let i = 1; i <= installmentCount; i++) {
        dates.push(addMonths(purchaseDate, i));
    }

    return dates;
}

module.exports = {
    addMonths,
    formatDateToISO,
    parseISODate,
    generateDueDates,
};

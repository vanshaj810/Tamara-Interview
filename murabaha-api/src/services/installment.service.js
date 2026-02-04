/**
 * Installment schedule generation service
 */

const { generateDueDates, parseISODate, formatDateToISO } = require('../utils/date.utils');
const { floorToTwoDecimals, roundToTwoDecimals } = require('../utils/rounding.utils');

/**
 * Calculates the installment schedule with proper rounding
 * Last installment absorbs any rounding differences
 * 
 * @param {number} totalPayable - Total amount to be paid
 * @param {number} installmentCount - Number of installments
 * @param {string} purchaseDateString - Purchase date in YYYY-MM-DD format
 * @returns {{ baseInstallmentAmount: number, schedule: Array }}
 */
function calculateInstallments(totalPayable, installmentCount, purchaseDateString) {
    // Calculate base installment (floor to avoid overpayment in regular installments)
    const baseInstallmentAmount = floorToTwoDecimals(totalPayable / installmentCount);

    // Calculate the sum of all regular installments (excluding last)
    const regularInstallmentsSum = roundToTwoDecimals(baseInstallmentAmount * (installmentCount - 1));

    // Last installment absorbs the rounding difference
    const lastInstallmentAmount = roundToTwoDecimals(totalPayable - regularInstallmentsSum);

    // Generate due dates
    const purchaseDate = parseISODate(purchaseDateString);
    const dueDates = generateDueDates(purchaseDate, installmentCount);

    // Build the schedule
    const schedule = dueDates.map((date, index) => ({
        installment_number: index + 1,
        due_date: formatDateToISO(date),
        amount: index === installmentCount - 1 ? lastInstallmentAmount : baseInstallmentAmount,
    }));

    return { baseInstallmentAmount, schedule };
}

module.exports = { calculateInstallments };

"use strict";
/**
 * Installment schedule generation service
 * Handles calculation and distribution of payment installments
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInstallments = calculateInstallments;
const date_utils_1 = require("../utils/date.utils");
const rounding_utils_1 = require("../utils/rounding.utils");
/**
 * Calculates the installment schedule with proper rounding
 * Last installment absorbs any rounding differences
 *
 * @param totalPayable - Total amount to be paid
 * @param installmentCount - Number of installments
 * @param purchaseDateString - Purchase date in YYYY-MM-DD format
 * @returns InstallmentCalculation with base amount and full schedule
 */
function calculateInstallments(totalPayable, installmentCount, purchaseDateString) {
    // Calculate base installment (floor to avoid overpayment in regular installments)
    const baseInstallmentAmount = (0, rounding_utils_1.floorToTwoDecimals)(totalPayable / installmentCount);
    // Calculate the sum of all regular installments (excluding last)
    const regularInstallmentsSum = (0, rounding_utils_1.roundToTwoDecimals)(baseInstallmentAmount * (installmentCount - 1));
    // Last installment absorbs the rounding difference
    const lastInstallmentAmount = (0, rounding_utils_1.roundToTwoDecimals)(totalPayable - regularInstallmentsSum);
    // Generate due dates
    const purchaseDate = (0, date_utils_1.parseISODate)(purchaseDateString);
    const dueDates = (0, date_utils_1.generateDueDates)(purchaseDate, installmentCount);
    // Build the schedule
    const schedule = dueDates.map((date, index) => ({
        installment_number: index + 1,
        due_date: (0, date_utils_1.formatDateToISO)(date),
        amount: index === installmentCount - 1 ? lastInstallmentAmount : baseInstallmentAmount,
    }));
    return {
        baseInstallmentAmount,
        schedule,
    };
}
//# sourceMappingURL=installment.service.js.map
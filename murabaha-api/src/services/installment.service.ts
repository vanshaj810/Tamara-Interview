/**
 * Installment schedule generation service
 * Handles calculation and distribution of payment installments
 */

import { InstallmentScheduleItem } from '../models/response.model';
import { generateDueDates, parseISODate, formatDateToISO } from '../utils/date.utils';
import { floorToTwoDecimals, roundToTwoDecimals } from '../utils/rounding.utils';

export interface InstallmentCalculation {
    baseInstallmentAmount: number;
    schedule: InstallmentScheduleItem[];
}

/**
 * Calculates the installment schedule with proper rounding
 * Last installment absorbs any rounding differences
 * 
 * @param totalPayable - Total amount to be paid
 * @param installmentCount - Number of installments
 * @param purchaseDateString - Purchase date in YYYY-MM-DD format
 * @returns InstallmentCalculation with base amount and full schedule
 */
export function calculateInstallments(
    totalPayable: number,
    installmentCount: number,
    purchaseDateString: string
): InstallmentCalculation {
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
    const schedule: InstallmentScheduleItem[] = dueDates.map((date, index) => ({
        installment_number: index + 1,
        due_date: formatDateToISO(date),
        amount: index === installmentCount - 1 ? lastInstallmentAmount : baseInstallmentAmount,
    }));

    return {
        baseInstallmentAmount,
        schedule,
    };
}

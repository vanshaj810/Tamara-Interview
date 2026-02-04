/**
 * Installment schedule generation service
 * Handles calculation and distribution of payment installments
 */
import { InstallmentScheduleItem } from '../models/response.model';
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
export declare function calculateInstallments(totalPayable: number, installmentCount: number, purchaseDateString: string): InstallmentCalculation;
//# sourceMappingURL=installment.service.d.ts.map
/**
 * Contract summary generation service
 * Creates Shariah-compliant Murabaha contract summaries
 */

import { formatCurrency } from '../utils/rounding.utils';

/**
 * Generates a Murabaha contract summary paragraph
 * Uses compliant language avoiding interest/lending terminology
 * 
 * @param commodityCost - Original cost of the commodity
 * @param totalPayable - Total amount including profit
 * @param profitAmount - The profit amount
 * @param installmentCount - Number of installments
 * @param baseInstallmentAmount - Regular installment amount
 * @returns Formatted contract summary string
 */
export function generateContractSummary(
    commodityCost: number,
    totalPayable: number,
    profitAmount: number,
    installmentCount: number,
    baseInstallmentAmount: number
): string {
    return `This Murabaha contract confirms our purchase of the commodity on your behalf for SAR ${formatCurrency(commodityCost)}. We are selling it to you at a total price of SAR ${formatCurrency(totalPayable)}, which includes our profit of SAR ${formatCurrency(profitAmount)}. This amount is to be paid in ${installmentCount} equal monthly installments of SAR ${formatCurrency(baseInstallmentAmount)}.`;
}

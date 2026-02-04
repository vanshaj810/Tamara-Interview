"use strict";
/**
 * Contract summary generation service
 * Creates Shariah-compliant Murabaha contract summaries
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContractSummary = generateContractSummary;
const rounding_utils_1 = require("../utils/rounding.utils");
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
function generateContractSummary(commodityCost, totalPayable, profitAmount, installmentCount, baseInstallmentAmount) {
    return `This Murabaha contract confirms our purchase of the commodity on your behalf for SAR ${(0, rounding_utils_1.formatCurrency)(commodityCost)}. We are selling it to you at a total price of SAR ${(0, rounding_utils_1.formatCurrency)(totalPayable)}, which includes our profit of SAR ${(0, rounding_utils_1.formatCurrency)(profitAmount)}. This amount is to be paid in ${installmentCount} equal monthly installments of SAR ${(0, rounding_utils_1.formatCurrency)(baseInstallmentAmount)}.`;
}
//# sourceMappingURL=contract.service.js.map
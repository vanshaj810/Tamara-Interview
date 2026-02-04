/**
 * Contract summary generation service
 */

const { formatCurrency } = require('../utils/rounding.utils');

/**
 * Generates a Murabaha contract summary paragraph
 * @param {number} commodityCost - Original cost of the commodity
 * @param {number} totalPayable - Total amount including profit
 * @param {number} profitAmount - The profit amount
 * @param {number} installmentCount - Number of installments
 * @param {number} baseInstallmentAmount - Regular installment amount
 * @returns {string} Formatted contract summary
 */
function generateContractSummary(
    commodityCost,
    totalPayable,
    profitAmount,
    installmentCount,
    baseInstallmentAmount
) {
    return `This Murabaha contract confirms our purchase of the commodity on your behalf for SAR ${formatCurrency(commodityCost)}. We are selling it to you at a total price of SAR ${formatCurrency(totalPayable)}, which includes our profit of SAR ${formatCurrency(profitAmount)}. This amount is to be paid in ${installmentCount} equal monthly installments of SAR ${formatCurrency(baseInstallmentAmount)}.`;
}

module.exports = { generateContractSummary };

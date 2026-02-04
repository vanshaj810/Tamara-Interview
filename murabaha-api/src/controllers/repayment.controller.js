/**
 * Repayment plan controller
 */

const { v4: uuidv4 } = require('uuid');
const { validateRequest } = require('../validators/request.validator');
const { getBaseMargin, calculateProfit } = require('../services/margin.service');
const { applyPromoCode } = require('../services/promo.service');
const { calculateInstallments } = require('../services/installment.service');
const { generateContractSummary } = require('../services/contract.service');
const { roundToTwoDecimals } = require('../utils/rounding.utils');

/**
 * Handles POST request to create a repayment plan
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
async function createRepaymentPlan(req, res) {
    try {
        // Validate and parse request
        const validation = validateRequest(req.body);

        if (!validation.isValid) {
            return res.status(400).json({
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid request data',
                    details: validation.errors,
                },
            });
        }

        const data = validation.data;

        // Step 1: Get base margin for commodity type
        const baseMargin = getBaseMargin(data.commodity_type);

        // Step 2: Apply promo code if provided
        const promoResult = applyPromoCode(baseMargin, data.promo_code);

        if (!promoResult.isValid) {
            return res.status(400).json({
                error: {
                    code: 'INVALID_PROMO_CODE',
                    message: promoResult.errorMessage || 'Invalid promotional code',
                },
            });
        }

        const finalMargin = promoResult.adjustedMargin;

        // Step 3: Calculate profit and total payable
        const profitAmount = roundToTwoDecimals(calculateProfit(data.commodity_cost, finalMargin));
        const totalPayable = roundToTwoDecimals(data.commodity_cost + profitAmount);

        // Step 4: Generate installment schedule
        const installmentCalc = calculateInstallments(
            totalPayable,
            data.installments,
            data.purchase_date
        );

        // Step 5: Generate contract summary
        const contractSummary = generateContractSummary(
            data.commodity_cost,
            totalPayable,
            profitAmount,
            data.installments,
            installmentCalc.baseInstallmentAmount
        );

        // Step 6: Build response
        const response = {
            repayment_plan_id: uuidv4(),
            customer_id: data.customer_id,
            commodity_cost: roundToTwoDecimals(data.commodity_cost),
            profit_margin_percentage: roundToTwoDecimals(finalMargin * 100),
            profit_amount: profitAmount,
            total_payable: totalPayable,
            base_installment_amount: installmentCalc.baseInstallmentAmount,
            repayment_schedule: installmentCalc.schedule,
            contract_summary: contractSummary,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: {
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred',
            },
        });
    }
}

module.exports = { createRepaymentPlan };

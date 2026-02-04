"use strict";
/**
 * Repayment plan controller
 * Orchestrates the creation of Murabaha repayment plans
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRepaymentPlan = createRepaymentPlan;
const uuid_1 = require("uuid");
const zod_1 = require("zod");
const request_model_1 = require("../models/request.model");
const margin_service_1 = require("../services/margin.service");
const promo_service_1 = require("../services/promo.service");
const installment_service_1 = require("../services/installment.service");
const contract_service_1 = require("../services/contract.service");
const rounding_utils_1 = require("../utils/rounding.utils");
/**
 * Handles POST request to create a repayment plan
 */
async function createRepaymentPlan(req, res) {
    try {
        // Validate and parse request
        const validatedData = request_model_1.RepaymentPlanRequestSchema.parse(req.body);
        // Step 1: Get base margin for commodity type
        const baseMargin = (0, margin_service_1.getBaseMargin)(validatedData.commodity_type);
        // Step 2: Apply promo code if provided
        const promoResult = (0, promo_service_1.applyPromoCode)(baseMargin, validatedData.promo_code);
        if (!promoResult.isValid) {
            const errorResponse = {
                error: {
                    code: 'INVALID_PROMO_CODE',
                    message: promoResult.errorMessage || 'Invalid promotional code',
                },
            };
            res.status(400).json(errorResponse);
            return;
        }
        const finalMargin = promoResult.adjustedMargin;
        // Step 3: Calculate profit and total payable
        const profitAmount = (0, rounding_utils_1.roundToTwoDecimals)((0, margin_service_1.calculateProfit)(validatedData.commodity_cost, finalMargin));
        const totalPayable = (0, rounding_utils_1.roundToTwoDecimals)(validatedData.commodity_cost + profitAmount);
        // Step 4: Generate installment schedule
        const installmentCalc = (0, installment_service_1.calculateInstallments)(totalPayable, validatedData.installments, validatedData.purchase_date);
        // Step 5: Generate contract summary
        const contractSummary = (0, contract_service_1.generateContractSummary)(validatedData.commodity_cost, totalPayable, profitAmount, validatedData.installments, installmentCalc.baseInstallmentAmount);
        // Step 6: Build response
        const response = {
            repayment_plan_id: (0, uuid_1.v4)(),
            customer_id: validatedData.customer_id,
            commodity_cost: (0, rounding_utils_1.roundToTwoDecimals)(validatedData.commodity_cost),
            profit_margin_percentage: (0, rounding_utils_1.roundToTwoDecimals)(finalMargin * 100), // Convert to percentage
            profit_amount: profitAmount,
            total_payable: totalPayable,
            base_installment_amount: installmentCalc.baseInstallmentAmount,
            repayment_schedule: installmentCalc.schedule,
            contract_summary: contractSummary,
        };
        res.status(201).json(response);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errorResponse = {
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid request data',
                    details: error.flatten().fieldErrors,
                },
            };
            res.status(400).json(errorResponse);
            return;
        }
        // Unexpected error
        console.error('Unexpected error:', error);
        const errorResponse = {
            error: {
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred',
            },
        };
        res.status(500).json(errorResponse);
    }
}
//# sourceMappingURL=repayment.controller.js.map
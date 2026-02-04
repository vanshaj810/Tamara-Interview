/**
 * Repayment plan controller
 * Orchestrates the creation of Murabaha repayment plans
 */

import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ZodError } from 'zod';
import { RepaymentPlanRequestSchema, RepaymentPlanRequest } from '../models/request.model';
import { RepaymentPlanResponse, ErrorResponse } from '../models/response.model';
import { getBaseMargin, calculateProfit } from '../services/margin.service';
import { applyPromoCode } from '../services/promo.service';
import { calculateInstallments } from '../services/installment.service';
import { generateContractSummary } from '../services/contract.service';
import { roundToTwoDecimals } from '../utils/rounding.utils';

/**
 * Handles POST request to create a repayment plan
 */
export async function createRepaymentPlan(req: Request, res: Response): Promise<void> {
    try {
        // Validate and parse request
        const validatedData: RepaymentPlanRequest = RepaymentPlanRequestSchema.parse(req.body);

        // Step 1: Get base margin for commodity type
        const baseMargin = getBaseMargin(validatedData.commodity_type);

        // Step 2: Apply promo code if provided
        const promoResult = applyPromoCode(baseMargin, validatedData.promo_code);

        if (!promoResult.isValid) {
            const errorResponse: ErrorResponse = {
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
        const profitAmount = roundToTwoDecimals(calculateProfit(validatedData.commodity_cost, finalMargin));
        const totalPayable = roundToTwoDecimals(validatedData.commodity_cost + profitAmount);

        // Step 4: Generate installment schedule
        const installmentCalc = calculateInstallments(
            totalPayable,
            validatedData.installments,
            validatedData.purchase_date
        );

        // Step 5: Generate contract summary
        const contractSummary = generateContractSummary(
            validatedData.commodity_cost,
            totalPayable,
            profitAmount,
            validatedData.installments,
            installmentCalc.baseInstallmentAmount
        );

        // Step 6: Build response
        const response: RepaymentPlanResponse = {
            repayment_plan_id: uuidv4(),
            customer_id: validatedData.customer_id,
            commodity_cost: roundToTwoDecimals(validatedData.commodity_cost),
            profit_margin_percentage: roundToTwoDecimals(finalMargin * 100), // Convert to percentage
            profit_amount: profitAmount,
            total_payable: totalPayable,
            base_installment_amount: installmentCalc.baseInstallmentAmount,
            repayment_schedule: installmentCalc.schedule,
            contract_summary: contractSummary,
        };

        res.status(201).json(response);
    } catch (error) {
        if (error instanceof ZodError) {
            const errorResponse: ErrorResponse = {
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Invalid request data',
                    details: error.flatten().fieldErrors as Record<string, string[]>,
                },
            };
            res.status(400).json(errorResponse);
            return;
        }

        // Unexpected error
        console.error('Unexpected error:', error);
        const errorResponse: ErrorResponse = {
            error: {
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred',
            },
        };
        res.status(500).json(errorResponse);
    }
}

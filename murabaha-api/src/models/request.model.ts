import { z } from 'zod';
import { MIN_INSTALLMENTS, MAX_INSTALLMENTS } from '../constants/margins';

/**
 * Request validation schema using Zod
 */
export const RepaymentPlanRequestSchema = z.object({
    customer_id: z
        .string()
        .min(1, 'Customer ID is required'),

    commodity_cost: z
        .number()
        .positive('Commodity cost must be a positive number')
        .finite('Commodity cost must be a valid number'),

    commodity_type: z
        .string()
        .min(1, 'Commodity type is required')
        .transform(val => val.toLowerCase()),

    installments: z
        .number()
        .int('Installments must be a whole number')
        .min(MIN_INSTALLMENTS, `Minimum ${MIN_INSTALLMENTS} installments required`)
        .max(MAX_INSTALLMENTS, `Maximum ${MAX_INSTALLMENTS} installments allowed`),

    purchase_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Purchase date must be in YYYY-MM-DD format')
        .refine(val => !isNaN(Date.parse(val)), 'Invalid date'),

    promo_code: z
        .string()
        .optional()
        .transform(val => val?.toUpperCase()),
});

export type RepaymentPlanRequest = z.infer<typeof RepaymentPlanRequestSchema>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepaymentPlanRequestSchema = void 0;
const zod_1 = require("zod");
const margins_1 = require("../constants/margins");
/**
 * Request validation schema using Zod
 */
exports.RepaymentPlanRequestSchema = zod_1.z.object({
    customer_id: zod_1.z
        .string()
        .min(1, 'Customer ID is required'),
    commodity_cost: zod_1.z
        .number()
        .positive('Commodity cost must be a positive number')
        .finite('Commodity cost must be a valid number'),
    commodity_type: zod_1.z
        .string()
        .min(1, 'Commodity type is required')
        .transform(val => val.toLowerCase()),
    installments: zod_1.z
        .number()
        .int('Installments must be a whole number')
        .min(margins_1.MIN_INSTALLMENTS, `Minimum ${margins_1.MIN_INSTALLMENTS} installments required`)
        .max(margins_1.MAX_INSTALLMENTS, `Maximum ${margins_1.MAX_INSTALLMENTS} installments allowed`),
    purchase_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Purchase date must be in YYYY-MM-DD format')
        .refine(val => !isNaN(Date.parse(val)), 'Invalid date'),
    promo_code: zod_1.z
        .string()
        .optional()
        .transform(val => val?.toUpperCase()),
});
//# sourceMappingURL=request.model.js.map
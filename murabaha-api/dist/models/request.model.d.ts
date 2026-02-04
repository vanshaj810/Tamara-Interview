import { z } from 'zod';
/**
 * Request validation schema using Zod
 */
export declare const RepaymentPlanRequestSchema: z.ZodObject<{
    customer_id: z.ZodString;
    commodity_cost: z.ZodNumber;
    commodity_type: z.ZodEffects<z.ZodString, string, string>;
    installments: z.ZodNumber;
    purchase_date: z.ZodEffects<z.ZodString, string, string>;
    promo_code: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    customer_id: string;
    commodity_cost: number;
    commodity_type: string;
    installments: number;
    purchase_date: string;
    promo_code?: string | undefined;
}, {
    customer_id: string;
    commodity_cost: number;
    commodity_type: string;
    installments: number;
    purchase_date: string;
    promo_code?: string | undefined;
}>;
export type RepaymentPlanRequest = z.infer<typeof RepaymentPlanRequestSchema>;
//# sourceMappingURL=request.model.d.ts.map
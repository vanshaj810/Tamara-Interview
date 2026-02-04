/**
 * Response models for the Murabaha repayment plan API
 */

export interface InstallmentScheduleItem {
    installment_number: number;
    due_date: string; // YYYY-MM-DD format
    amount: number;   // 2 decimal places
}

export interface RepaymentPlanResponse {
    repayment_plan_id: string;
    customer_id: string;
    commodity_cost: number;
    profit_margin_percentage: number;
    profit_amount: number;
    total_payable: number;
    base_installment_amount: number;
    repayment_schedule: InstallmentScheduleItem[];
    contract_summary: string;
}

export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, string[]>;
    };
}

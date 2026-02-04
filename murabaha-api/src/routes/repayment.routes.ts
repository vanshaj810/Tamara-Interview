/**
 * Repayment plan API routes
 */

import { Router } from 'express';
import { createRepaymentPlan } from '../controllers/repayment.controller';

const router = Router();

/**
 * POST /api/v1/repayment-plan
 * Creates a new Murabaha repayment plan
 */
router.post('/repayment-plan', createRepaymentPlan);

export default router;

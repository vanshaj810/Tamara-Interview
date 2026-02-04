/**
 * Repayment plan API routes
 */

const express = require('express');
const { createRepaymentPlan } = require('../controllers/repayment.controller');

const router = express.Router();

/**
 * POST /api/v1/repayment-plan
 * Creates a new Murabaha repayment plan
 */
router.post('/repayment-plan', createRepaymentPlan);

module.exports = router;

"use strict";
/**
 * Repayment plan API routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repayment_controller_1 = require("../controllers/repayment.controller");
const router = (0, express_1.Router)();
/**
 * POST /api/v1/repayment-plan
 * Creates a new Murabaha repayment plan
 */
router.post('/repayment-plan', repayment_controller_1.createRepaymentPlan);
exports.default = router;
//# sourceMappingURL=repayment.routes.js.map
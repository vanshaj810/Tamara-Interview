"use strict";
/**
 * Express application configuration
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const repayment_routes_1 = __importDefault(require("./routes/repayment.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// API routes
app.use('/api/v1', repayment_routes_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        error: {
            code: 'NOT_FOUND',
            message: 'The requested resource was not found',
        },
    });
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred',
        },
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map
const request = require('supertest');
const app = require('../../src/app');

describe('Repayment Plan API', () => {
    describe('POST /api/v1/repayment-plan', () => {
        it('should create a repayment plan for valid request', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST001',
                    commodity_cost: 1000.00,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('repayment_plan_id');
            expect(response.body.customer_id).toBe('CUST001');
            expect(response.body.commodity_cost).toBe(1000);
            expect(response.body.profit_margin_percentage).toBe(12);
            expect(response.body.profit_amount).toBe(120);
            expect(response.body.total_payable).toBe(1120);
            expect(response.body.repayment_schedule).toHaveLength(4);
            expect(response.body).toHaveProperty('contract_summary');
        });

        it('should apply gold margin (8%)', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST002',
                    commodity_cost: 5000.00,
                    commodity_type: 'gold',
                    installments: 6,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(201);
            expect(response.body.profit_margin_percentage).toBe(8);
            expect(response.body.profit_amount).toBe(400);
            expect(response.body.total_payable).toBe(5400);
        });

        it('should apply SAVE10 promo code', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST003',
                    commodity_cost: 1000.00,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                    promo_code: 'SAVE10',
                });

            expect(response.status).toBe(201);
            expect(response.body.profit_margin_percentage).toBe(10.8);
            expect(response.body.profit_amount).toBe(108);
        });

        it('should return error for invalid promo code', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST005',
                    commodity_cost: 1000.00,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                    promo_code: 'INVALID',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('INVALID_PROMO_CODE');
        });

        it('should return error for negative commodity cost', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST006',
                    commodity_cost: -100,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        it('should return error for zero commodity cost', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST007',
                    commodity_cost: 0,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        it('should return error for installments less than 2', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST008',
                    commodity_cost: 1000,
                    commodity_type: 'electronics',
                    installments: 1,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        it('should return error for installments greater than 12', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST009',
                    commodity_cost: 1000,
                    commodity_type: 'electronics',
                    installments: 13,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        it('should return error for missing required fields', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST010',
                });

            expect(response.status).toBe(400);
            expect(response.body.error.code).toBe('VALIDATION_ERROR');
        });

        it('should handle month-end date in schedule', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST011',
                    commodity_cost: 1000,
                    commodity_type: 'electronics',
                    installments: 3,
                    purchase_date: '2026-01-31',
                });

            expect(response.status).toBe(201);
            expect(response.body.repayment_schedule[0].due_date).toBe('2026-02-28');
        });

        it('should include proper contract summary', async () => {
            const response = await request(app)
                .post('/api/v1/repayment-plan')
                .send({
                    customer_id: 'CUST012',
                    commodity_cost: 1000,
                    commodity_type: 'electronics',
                    installments: 4,
                    purchase_date: '2026-02-04',
                });

            expect(response.status).toBe(201);
            expect(response.body.contract_summary).toContain('Murabaha contract');
            expect(response.body.contract_summary).toContain('SAR 1000.00');
        });
    });

    describe('GET /health', () => {
        it('should return healthy status', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('healthy');
        });
    });

    describe('404 handling', () => {
        it('should return 404 for unknown routes', async () => {
            const response = await request(app).get('/unknown');
            expect(response.status).toBe(404);
            expect(response.body.error.code).toBe('NOT_FOUND');
        });
    });
});

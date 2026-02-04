const { calculateInstallments } = require('../../src/services/installment.service');

describe('Installment Service', () => {
    describe('calculateInstallments', () => {
        it('should calculate 4 equal installments for 1000 SAR', () => {
            const result = calculateInstallments(1000, 4, '2026-02-04');

            expect(result.baseInstallmentAmount).toBe(250);
            expect(result.schedule).toHaveLength(4);

            const sum = result.schedule.reduce((acc, item) => acc + item.amount, 0);
            expect(sum).toBeCloseTo(1000, 2);
        });

        it('should handle uneven division with last installment absorbing difference', () => {
            const result = calculateInstallments(1000, 3, '2026-02-04');

            expect(result.baseInstallmentAmount).toBe(333.33);
            expect(result.schedule[0].amount).toBe(333.33);
            expect(result.schedule[1].amount).toBe(333.33);
            expect(result.schedule[2].amount).toBe(333.34);

            const sum = result.schedule.reduce((acc, item) => acc + item.amount, 0);
            expect(sum).toBeCloseTo(1000, 2);
        });

        it('should generate correct due dates starting one month after purchase', () => {
            const result = calculateInstallments(1000, 3, '2026-02-04');

            expect(result.schedule[0].due_date).toBe('2026-03-04');
            expect(result.schedule[1].due_date).toBe('2026-04-04');
            expect(result.schedule[2].due_date).toBe('2026-05-04');
        });

        it('should handle month-end edge case (Jan 31 -> Feb 28)', () => {
            const result = calculateInstallments(1000, 3, '2026-01-31');

            expect(result.schedule[0].due_date).toBe('2026-02-28');
            expect(result.schedule[1].due_date).toBe('2026-03-31');
            expect(result.schedule[2].due_date).toBe('2026-04-30');
        });

        it('should handle leap year Feb 29', () => {
            const result = calculateInstallments(1000, 2, '2024-01-31');

            expect(result.schedule[0].due_date).toBe('2024-02-29');
            expect(result.schedule[1].due_date).toBe('2024-03-31');
        });

        it('should assign correct installment numbers', () => {
            const result = calculateInstallments(1000, 4, '2026-02-04');

            expect(result.schedule[0].installment_number).toBe(1);
            expect(result.schedule[1].installment_number).toBe(2);
            expect(result.schedule[2].installment_number).toBe(3);
            expect(result.schedule[3].installment_number).toBe(4);
        });

        it('should handle 2 installments (minimum)', () => {
            const result = calculateInstallments(1000, 2, '2026-02-04');

            expect(result.schedule).toHaveLength(2);
            expect(result.baseInstallmentAmount).toBe(500);
        });

        it('should handle 12 installments (maximum)', () => {
            const result = calculateInstallments(1200, 12, '2026-01-15');

            expect(result.schedule).toHaveLength(12);
            expect(result.baseInstallmentAmount).toBe(100);
            expect(result.schedule[11].due_date).toBe('2027-01-15');
        });
    });
});

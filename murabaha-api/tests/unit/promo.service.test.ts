import { isValidPromoCode, applyPromoCode } from '../../src/services/promo.service';
import { MINIMUM_MARGIN } from '../../src/constants/margins';

describe('Promo Service', () => {
    describe('isValidPromoCode', () => {
        it('should return true for SAVE10', () => {
            expect(isValidPromoCode('SAVE10')).toBe(true);
        });

        it('should return true for SAVE20', () => {
            expect(isValidPromoCode('SAVE20')).toBe(true);
        });

        it('should return true for undefined (no promo)', () => {
            expect(isValidPromoCode(undefined)).toBe(true);
        });

        it('should return false for invalid code', () => {
            expect(isValidPromoCode('INVALID')).toBe(false);
            expect(isValidPromoCode('SAVE30')).toBe(false);
        });

        it('should handle case insensitivity', () => {
            expect(isValidPromoCode('save10')).toBe(true);
            expect(isValidPromoCode('Save20')).toBe(true);
        });
    });

    describe('applyPromoCode', () => {
        it('should return base margin when no promo code', () => {
            const result = applyPromoCode(0.12);
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBe(0.12);
        });

        it('should reduce margin by 10% for SAVE10', () => {
            const result = applyPromoCode(0.12, 'SAVE10');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBeCloseTo(0.108, 5); // 12% * 0.9 = 10.8%
        });

        it('should reduce margin by 20% for SAVE20', () => {
            const result = applyPromoCode(0.12, 'SAVE20');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBeCloseTo(0.096, 5); // 12% * 0.8 = 9.6%
        });

        it('should enforce minimum 5% margin floor', () => {
            // 5% margin with SAVE20 would be 4%, but should floor at 5%
            const result = applyPromoCode(0.05, 'SAVE20');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBe(MINIMUM_MARGIN);
        });

        it('should return error for invalid promo code', () => {
            const result = applyPromoCode(0.12, 'INVALID');
            expect(result.isValid).toBe(false);
            expect(result.adjustedMargin).toBe(0.12); // Returns original
            expect(result.errorMessage).toContain('Invalid promo code');
        });

        it('should handle lowercase promo codes', () => {
            const result = applyPromoCode(0.12, 'save10');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBeCloseTo(0.108, 5);
        });

        it('should apply SAVE10 to gold margin (8%)', () => {
            const result = applyPromoCode(0.08, 'SAVE10');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBeCloseTo(0.072, 5); // 8% * 0.9 = 7.2%
        });

        it('should floor gold margin with SAVE20', () => {
            // 8% with SAVE20 = 6.4%, which is above 5% floor
            const result = applyPromoCode(0.08, 'SAVE20');
            expect(result.isValid).toBe(true);
            expect(result.adjustedMargin).toBeCloseTo(0.064, 5);
        });
    });
});

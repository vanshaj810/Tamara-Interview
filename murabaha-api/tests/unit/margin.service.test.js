const { getBaseMargin, calculateProfit } = require('../../src/services/margin.service');
const { DEFAULT_MARGIN } = require('../../src/constants/margins');

describe('Margin Service', () => {
    describe('getBaseMargin', () => {
        it('should return 8% for gold', () => {
            expect(getBaseMargin('gold')).toBe(0.08);
        });

        it('should return 10% for oil', () => {
            expect(getBaseMargin('oil')).toBe(0.10);
        });

        it('should return 12% for metals', () => {
            expect(getBaseMargin('metals')).toBe(0.12);
        });

        it('should return 15% for wheat', () => {
            expect(getBaseMargin('wheat')).toBe(0.15);
        });

        it('should return default 12% for electronics', () => {
            expect(getBaseMargin('electronics')).toBe(DEFAULT_MARGIN);
        });

        it('should return default 12% for fashion', () => {
            expect(getBaseMargin('fashion')).toBe(DEFAULT_MARGIN);
        });

        it('should handle case insensitivity', () => {
            expect(getBaseMargin('GOLD')).toBe(0.08);
            expect(getBaseMargin('Gold')).toBe(0.08);
        });

        it('should handle whitespace in commodity type', () => {
            expect(getBaseMargin('  gold  ')).toBe(0.08);
        });
    });

    describe('calculateProfit', () => {
        it('should calculate profit correctly for 1000 SAR at 12%', () => {
            expect(calculateProfit(1000, 0.12)).toBe(120);
        });

        it('should calculate profit correctly for 5000 SAR at 8%', () => {
            expect(calculateProfit(5000, 0.08)).toBe(400);
        });

        it('should handle decimal commodity costs', () => {
            expect(calculateProfit(1234.56, 0.10)).toBeCloseTo(123.456, 5);
        });

        it('should return 0 for 0% margin', () => {
            expect(calculateProfit(1000, 0)).toBe(0);
        });
    });
});

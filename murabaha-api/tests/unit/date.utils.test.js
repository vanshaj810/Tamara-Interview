const { addMonths, formatDateToISO, parseISODate, generateDueDates } = require('../../src/utils/date.utils');

describe('Date Utils', () => {
    describe('addMonths', () => {
        it('should add one month to a regular date', () => {
            const date = new Date(2026, 1, 4);
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(2);
            expect(result.getDate()).toBe(4);
        });

        it('should handle Jan 31 -> Feb (non-leap year)', () => {
            const date = new Date(2026, 0, 31);
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(1);
            expect(result.getDate()).toBe(28);
        });

        it('should handle Jan 31 -> Feb (leap year)', () => {
            const date = new Date(2024, 0, 31);
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(1);
            expect(result.getDate()).toBe(29);
        });

        it('should handle Mar 31 -> Apr 30', () => {
            const date = new Date(2026, 2, 31);
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(3);
            expect(result.getDate()).toBe(30);
        });

        it('should handle adding multiple months', () => {
            const date = new Date(2026, 0, 15);
            const result = addMonths(date, 6);
            expect(result.getMonth()).toBe(6);
            expect(result.getDate()).toBe(15);
        });

        it('should handle year boundary', () => {
            const date = new Date(2026, 11, 15);
            const result = addMonths(date, 2);
            expect(result.getFullYear()).toBe(2027);
            expect(result.getMonth()).toBe(1);
            expect(result.getDate()).toBe(15);
        });
    });

    describe('formatDateToISO', () => {
        it('should format date correctly', () => {
            const date = new Date(2026, 1, 4);
            expect(formatDateToISO(date)).toBe('2026-02-04');
        });

        it('should pad single digit month and day', () => {
            const date = new Date(2026, 0, 5);
            expect(formatDateToISO(date)).toBe('2026-01-05');
        });
    });

    describe('parseISODate', () => {
        it('should parse ISO date string correctly', () => {
            const result = parseISODate('2026-02-04');
            expect(result.getFullYear()).toBe(2026);
            expect(result.getMonth()).toBe(1);
            expect(result.getDate()).toBe(4);
        });
    });

    describe('generateDueDates', () => {
        it('should generate correct number of due dates', () => {
            const purchaseDate = new Date(2026, 1, 4);
            const dates = generateDueDates(purchaseDate, 4);
            expect(dates).toHaveLength(4);
        });

        it('should start one month after purchase date', () => {
            const purchaseDate = new Date(2026, 1, 4);
            const dates = generateDueDates(purchaseDate, 2);

            expect(dates[0].getMonth()).toBe(2);
            expect(dates[0].getDate()).toBe(4);
        });
    });
});

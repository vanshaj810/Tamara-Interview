import { addMonths, formatDateToISO, parseISODate, generateDueDates } from '../../src/utils/date.utils';

describe('Date Utils', () => {
    describe('addMonths', () => {
        it('should add one month to a regular date', () => {
            const date = new Date(2026, 1, 4); // Feb 4, 2026
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(2); // March
            expect(result.getDate()).toBe(4);
        });

        it('should handle Jan 31 -> Feb (non-leap year)', () => {
            const date = new Date(2026, 0, 31); // Jan 31, 2026
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(1); // Feb
            expect(result.getDate()).toBe(28); // Last day of Feb 2026
        });

        it('should handle Jan 31 -> Feb (leap year)', () => {
            const date = new Date(2024, 0, 31); // Jan 31, 2024
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(1); // Feb
            expect(result.getDate()).toBe(29); // Leap year
        });

        it('should handle Mar 31 -> Apr 30', () => {
            const date = new Date(2026, 2, 31); // Mar 31, 2026
            const result = addMonths(date, 1);
            expect(result.getMonth()).toBe(3); // Apr
            expect(result.getDate()).toBe(30); // Apr has 30 days
        });

        it('should handle adding multiple months', () => {
            const date = new Date(2026, 0, 15); // Jan 15, 2026
            const result = addMonths(date, 6);
            expect(result.getMonth()).toBe(6); // July
            expect(result.getDate()).toBe(15);
        });

        it('should handle year boundary', () => {
            const date = new Date(2026, 11, 15); // Dec 15, 2026
            const result = addMonths(date, 2);
            expect(result.getFullYear()).toBe(2027);
            expect(result.getMonth()).toBe(1); // Feb
            expect(result.getDate()).toBe(15);
        });
    });

    describe('formatDateToISO', () => {
        it('should format date correctly', () => {
            const date = new Date(2026, 1, 4); // Feb 4, 2026
            expect(formatDateToISO(date)).toBe('2026-02-04');
        });

        it('should pad single digit month and day', () => {
            const date = new Date(2026, 0, 5); // Jan 5, 2026
            expect(formatDateToISO(date)).toBe('2026-01-05');
        });

        it('should handle double digit month and day', () => {
            const date = new Date(2026, 10, 25); // Nov 25, 2026
            expect(formatDateToISO(date)).toBe('2026-11-25');
        });
    });

    describe('parseISODate', () => {
        it('should parse ISO date string correctly', () => {
            const result = parseISODate('2026-02-04');
            expect(result.getFullYear()).toBe(2026);
            expect(result.getMonth()).toBe(1); // Feb (0-indexed)
            expect(result.getDate()).toBe(4);
        });

        it('should parse end of year date', () => {
            const result = parseISODate('2026-12-31');
            expect(result.getFullYear()).toBe(2026);
            expect(result.getMonth()).toBe(11); // Dec
            expect(result.getDate()).toBe(31);
        });
    });

    describe('generateDueDates', () => {
        it('should generate correct number of due dates', () => {
            const purchaseDate = new Date(2026, 1, 4);
            const dates = generateDueDates(purchaseDate, 4);
            expect(dates).toHaveLength(4);
        });

        it('should start one month after purchase date', () => {
            const purchaseDate = new Date(2026, 1, 4); // Feb 4
            const dates = generateDueDates(purchaseDate, 2);

            expect(dates[0].getMonth()).toBe(2); // March
            expect(dates[0].getDate()).toBe(4);
        });

        it('should generate consecutive monthly dates', () => {
            const purchaseDate = new Date(2026, 0, 15); // Jan 15
            const dates = generateDueDates(purchaseDate, 3);

            expect(formatDateToISO(dates[0])).toBe('2026-02-15');
            expect(formatDateToISO(dates[1])).toBe('2026-03-15');
            expect(formatDateToISO(dates[2])).toBe('2026-04-15');
        });
    });
});

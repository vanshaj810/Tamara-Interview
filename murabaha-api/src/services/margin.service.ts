/**
 * Margin calculation service
 * Handles profit margin determination based on commodity type
 */

import { COMMODITY_MARGINS, DEFAULT_MARGIN } from '../constants/margins';

/**
 * Gets the base profit margin for a commodity type
 * @param commodityType - The type/category of commodity (case-insensitive)
 * @returns The base margin as a decimal (e.g., 0.12 for 12%)
 */
export function getBaseMargin(commodityType: string): number {
    const normalizedType = commodityType.toLowerCase().trim();
    return COMMODITY_MARGINS[normalizedType] ?? DEFAULT_MARGIN;
}

/**
 * Calculates the profit amount based on commodity cost and margin
 * @param commodityCost - The base cost of the commodity in SAR
 * @param marginPercentage - The margin as a decimal (e.g., 0.12)
 * @returns The calculated profit amount
 */
export function calculateProfit(commodityCost: number, marginPercentage: number): number {
    return commodityCost * marginPercentage;
}

"use strict";
/**
 * Margin calculation service
 * Handles profit margin determination based on commodity type
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseMargin = getBaseMargin;
exports.calculateProfit = calculateProfit;
const margins_1 = require("../constants/margins");
/**
 * Gets the base profit margin for a commodity type
 * @param commodityType - The type/category of commodity (case-insensitive)
 * @returns The base margin as a decimal (e.g., 0.12 for 12%)
 */
function getBaseMargin(commodityType) {
    const normalizedType = commodityType.toLowerCase().trim();
    return margins_1.COMMODITY_MARGINS[normalizedType] ?? margins_1.DEFAULT_MARGIN;
}
/**
 * Calculates the profit amount based on commodity cost and margin
 * @param commodityCost - The base cost of the commodity in SAR
 * @param marginPercentage - The margin as a decimal (e.g., 0.12)
 * @returns The calculated profit amount
 */
function calculateProfit(commodityCost, marginPercentage) {
    return commodityCost * marginPercentage;
}
//# sourceMappingURL=margin.service.js.map
/**
 * Margin calculation service
 */

const { COMMODITY_MARGINS, DEFAULT_MARGIN } = require('../constants/margins');

/**
 * Gets the base profit margin for a commodity type
 * @param {string} commodityType - The type/category of commodity
 * @returns {number} The base margin as a decimal (e.g., 0.12 for 12%)
 */
function getBaseMargin(commodityType) {
    const normalizedType = commodityType.toLowerCase().trim();
    return COMMODITY_MARGINS[normalizedType] ?? DEFAULT_MARGIN;
}

/**
 * Calculates the profit amount based on commodity cost and margin
 * @param {number} commodityCost - The base cost of the commodity in SAR
 * @param {number} marginPercentage - The margin as a decimal
 * @returns {number} The calculated profit amount
 */
function calculateProfit(commodityCost, marginPercentage) {
    return commodityCost * marginPercentage;
}

module.exports = { getBaseMargin, calculateProfit };

/**
 * Request validation functions
 */

const { MIN_INSTALLMENTS, MAX_INSTALLMENTS } = require('../constants/margins');

/**
 * Validates the repayment plan request
 * @param {Object} body - Request body
 * @returns {{ isValid: boolean, errors: Object, data: Object }} Validation result
 */
function validateRequest(body) {
    const errors = {};

    // Validate customer_id
    if (!body.customer_id || typeof body.customer_id !== 'string' || body.customer_id.trim() === '') {
        errors.customer_id = ['Customer ID is required'];
    }

    // Validate commodity_cost
    if (body.commodity_cost === undefined || body.commodity_cost === null) {
        errors.commodity_cost = ['Commodity cost is required'];
    } else if (typeof body.commodity_cost !== 'number' || isNaN(body.commodity_cost)) {
        errors.commodity_cost = ['Commodity cost must be a valid number'];
    } else if (body.commodity_cost <= 0) {
        errors.commodity_cost = ['Commodity cost must be a positive number'];
    } else if (!isFinite(body.commodity_cost)) {
        errors.commodity_cost = ['Commodity cost must be a finite number'];
    }

    // Validate commodity_type
    if (!body.commodity_type || typeof body.commodity_type !== 'string' || body.commodity_type.trim() === '') {
        errors.commodity_type = ['Commodity type is required'];
    }

    // Validate installments
    if (body.installments === undefined || body.installments === null) {
        errors.installments = ['Installments is required'];
    } else if (typeof body.installments !== 'number' || !Number.isInteger(body.installments)) {
        errors.installments = ['Installments must be a whole number'];
    } else if (body.installments < MIN_INSTALLMENTS) {
        errors.installments = [`Minimum ${MIN_INSTALLMENTS} installments required`];
    } else if (body.installments > MAX_INSTALLMENTS) {
        errors.installments = [`Maximum ${MAX_INSTALLMENTS} installments allowed`];
    }

    // Validate purchase_date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!body.purchase_date || typeof body.purchase_date !== 'string') {
        errors.purchase_date = ['Purchase date is required'];
    } else if (!dateRegex.test(body.purchase_date)) {
        errors.purchase_date = ['Purchase date must be in YYYY-MM-DD format'];
    } else if (isNaN(Date.parse(body.purchase_date))) {
        errors.purchase_date = ['Invalid date'];
    }

    // promo_code is optional, validation happens in promo service

    const isValid = Object.keys(errors).length === 0;

    // Return normalized data
    const data = isValid ? {
        customer_id: body.customer_id,
        commodity_cost: body.commodity_cost,
        commodity_type: body.commodity_type.toLowerCase(),
        installments: body.installments,
        purchase_date: body.purchase_date,
        promo_code: body.promo_code ? body.promo_code.toUpperCase() : undefined,
    } : null;

    return { isValid, errors, data };
}

module.exports = { validateRequest };

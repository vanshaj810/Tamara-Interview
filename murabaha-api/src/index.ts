/**
 * Application entry point
 */

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Murabaha API server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 API endpoint: http://localhost:${PORT}/api/v1/repayment-plan`);
});

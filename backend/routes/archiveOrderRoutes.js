const express = require('express');
const router = express.Router();
const { archiveOrder } = require('../controllers/archiveOrderController'); // Import the controller function

// Define the route for archiving an order
router.post('/api/archive-order', archiveOrder);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create an order and payment details together
router.post('/create', orderController.createOrderAndPayment);

module.exports = router;

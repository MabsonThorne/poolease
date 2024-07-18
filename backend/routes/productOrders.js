const express = require('express');
const router = express.Router();
const productOrdersController = require('../controllers/productOrdersController');

router.post('/create-product-order', productOrdersController.createProductOrder);
router.get('/get-product-orders', productOrdersController.getProductOrders);

module.exports = router;

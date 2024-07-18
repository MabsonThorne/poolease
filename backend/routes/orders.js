const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.get('/:id', ordersController.getOrder);
router.get('/current/:table_id', ordersController.getCurrentOrder);
router.post('/add-item', ordersController.addItemToOrder);
router.put('/transfer/:id', ordersController.transferOrder);
router.get('/', ordersController.getAllOrders);
router.put('/checkout/:id', ordersController.checkoutOrder);
router.post('/start-billing', ordersController.startBilling);
router.put('/end-billing/:id', ordersController.endBilling);
router.post('/update-status/:id', ordersController.updateTableStatus);

module.exports = router;

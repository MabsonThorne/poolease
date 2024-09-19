const express = require('express');
const {
    createBilliardOrder,
    getBilliardOrders,
    getBilliardOrder,
    updateBilliardOrder,
    deleteBilliardOrder,
    checkoutOrder,
    paymentNotify
} = require('../controllers/billiardOrdersController');

const router = express.Router();

router.post('/billiard-orders', createBilliardOrder);
router.get('/billiard-orders', getBilliardOrders);
router.get('/billiard-orders/:userId', getBilliardOrder);
router.put('/billiard-orders/:id', updateBilliardOrder);
router.delete('/billiard-orders/:id', deleteBilliardOrder);

// 路由处理结账和支付通知
router.post('/billiard-orders/checkout', checkoutOrder);
router.post('/payment/notify', paymentNotify);

module.exports = router;

const express = require('express');
const {
    createProductOrder,
    getProductOrders,
    getProductOrder,
    updateProductOrder,
    deleteProductOrder,
    checkoutOrder,
    paymentNotify
} = require('../controllers/productOrdersController');

const router = express.Router();

// 为所有路由添加公共路径前缀
router.use('/product-orders', router);

// 创建商品订单
router.post('/', createProductOrder);

// 获取所有商品订单
router.get('/', getProductOrders);

// 获取指定用户的商品订单
router.get('/:userId', getProductOrder);

// 更新商品订单
router.put('/:id', updateProductOrder);

// 删除商品订单
router.delete('/:id', deleteProductOrder);

// 处理商品订单的结账
router.post('/:id/checkout', checkoutOrder);

// 商品订单的支付回调通知
router.post('/payment/notify', paymentNotify);

module.exports = router;

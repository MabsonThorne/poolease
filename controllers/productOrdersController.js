const axios = require('axios');
const crypto = require('crypto');
const xmlbuilder = require('xmlbuilder');
const xml2js = require('xml2js');
const db = require('../config/db');

// 生成微信支付签名
function generateSign(params, apiKey) {
    const stringA = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
    const stringSignTemp = `${stringA}&key=${apiKey}`;
    return crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();
}

// 创建商品订单
exports.createProductOrder = async (req, res) => {
    const { userId, storeId, totalCost } = req.body;

    try {
        console.log('Creating product order with:', req.body);

        const [orderResult] = await db.execute(
            'INSERT INTO product_orders (user_id, store_id, total_cost, payment_status) VALUES (?, ?, ?, ?)',
            [userId, storeId, totalCost, 'PENDING']
        );

        const orderId = orderResult.insertId;

        console.log('Product order created with ID:', orderId);

        res.status(201).json({ orderId });
    } catch (error) {
        console.error('Error creating product order:', error);
        res.status(500).json({ error: error.message });
    }
};

// 获取所有商品订单
exports.getProductOrders = async (req, res) => {
    try {
        console.log('Fetching all product orders');

        const [orders] = await db.execute('SELECT * FROM product_orders');

        console.log('Fetched product orders:', orders);

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching product orders:', error);
        res.status(500).json({ error: error.message });
    }
};

// 获取指定用户的商品订单
exports.getProductOrder = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            throw new Error('User ID is undefined');
        }

        console.log(`Fetching product order with userId: ${userId}`);

        const [orders] = await db.execute('SELECT * FROM product_orders WHERE user_id = ?', [userId]);

        if (orders.length === 0) {
            console.log(`No orders found for userId ${userId}`);
            return res.status(200).json([]);
        }

        console.log('Fetched product orders:', orders);

        res.status(200).json(orders); 
    } catch (error) {
        console.error(`Error fetching product orders with userId ${userId}:`, error);
        res.status(500).json({ error: error.message });
    }
};

// 更新商品订单
exports.updateProductOrder = async (req, res) => {
    const { id } = req.params;
    const { totalCost } = req.body;

    try {
        console.log(`Updating product order with ID: ${id}`);
        console.log('Update data:', req.body);

        await db.execute(
            'UPDATE product_orders SET total_cost = ? WHERE id = ?',
            [totalCost, id]
        );

        console.log(`Product order with ID ${id} updated successfully`);

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error(`Error updating product order with ID ${id}:`, error);
        res.status(500).json({ error: error.message });
    }
};

// 删除商品订单
exports.deleteProductOrder = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Deleting product order with ID: ${id}`);

        await db.execute('DELETE FROM product_orders WHERE id = ?', [id]);

        console.log(`Product order with ID ${id} deleted successfully`);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(`Error deleting product order with ID ${id}:`, error);
        res.status(500).json({ error: error.message });
    }
};

// 生成支付参数并发起支付
exports.checkoutOrder = async (req, res) => {
    const { orderId, openid } = req.body;

    try {
        console.log(`Processing payment for order ID: ${orderId}`);

        const [orderResult] = await db.execute('SELECT * FROM product_orders WHERE id = ?', [orderId]);

        if (orderResult.length === 0) {
            console.log(`Order with ID ${orderId} not found`);
            return res.status(404).json({ error: 'Order not found' });
        }

        const order = orderResult[0];
        console.log('Fetched order details:', order);

        if (order.payment_status === 'SUCCESS') {
            console.log(`Order with ID ${orderId} has already been paid`);
            return res.status(400).json({ error: 'Order has already been paid' });
        }

        const nonceStr = crypto.randomBytes(16).toString('hex');
        const outTradeNo = `order_${orderId}_${Date.now()}`;
        const totalFee = Math.round(order.total_cost * 100);

        const params = {
            appid: 'wx0e58e1e52489f605',
            mch_id: '1681208148',
            nonce_str: nonceStr,
            body: `商品订单 ${orderId}`,
            out_trade_no: outTradeNo,
            total_fee: totalFee,
            spbill_create_ip: req.ip || '127.0.0.1',
            notify_url: 'https://www.poolease.cn/api/product-orders/payment/notify',
            trade_type: 'JSAPI',
            openid: openid 
        };

        params.sign = generateSign(params, 'gH7J9m4K1L0zX8NcBv3qP2wF5sM6aRrT');

        const xmlRequest = xmlbuilder.create('xml', { encoding: 'utf-8' })
            .ele(params)
            .end({ pretty: true });

        console.log('Generated XML Request:', xmlRequest);

        const response = await axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', xmlRequest, {
            headers: { 'Content-Type': 'application/xml' }
        });

        console.log('WeChat API raw response:', response.data);

        xml2js.parseString(response.data, { explicitArray: false }, async (err, result) => {
            if (err) {
                console.error('Error parsing WeChat API response XML:', err);
                return res.status(500).json({ error: 'Failed to parse WeChat response' });
            }

            const { return_code, result_code, prepay_id } = result.xml;

            if (return_code === 'SUCCESS' && result_code === 'SUCCESS') {
                console.log(`Prepay ID obtained: ${prepay_id}`);

                await db.execute(
                    'UPDATE product_orders SET prepay_id = ? WHERE id = ?',
                    [prepay_id, orderId]
                );

                console.log(`Prepay ID ${prepay_id} saved for order ID ${orderId}`);

                const payParams = {
                    appId: params.appid,
                    timeStamp: `${Math.floor(Date.now() / 1000)}`,
                    nonceStr: nonceStr,
                    package: `prepay_id=${prepay_id}`,
                    signType: 'MD5'
                };

                payParams.paySign = generateSign(payParams, 'gH7J9m4K1L0zX8NcBv3qP2wF5sM6aRrT');

                res.json({
                    orderId,
                    ...payParams
                });
            } else {
                console.error('Failed to obtain prepay_id from WeChat API. Parsed response:', result);
                res.status(500).json({ error: 'Failed to initiate payment' });
            }
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ error: error.message });
    }
};

// 处理微信支付回调通知
exports.paymentNotify = async (req, res) => {
    let xmlData = '';

    req.on('data', (chunk) => {
        xmlData += chunk;
    });

    req.on('end', () => {
        xml2js.parseString(xmlData, { explicitArray: false }, async (err, result) => {
            if (err) {
                console.error('Error parsing payment notification XML:', err);
                return res.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[Error parsing XML]]></return_msg></xml>');
            }

            const data = result.xml;
            const orderId = data.out_trade_no.split('_')[1];

            try {
                await db.execute(
                    'UPDATE product_orders SET payment_status = ?, transaction_id = ? WHERE id = ?',
                    ['SUCCESS', data.transaction_id, orderId]
                );

                console.log(`Order ID ${orderId} marked as paid with transaction ID ${data.transaction_id}`);

                res.send('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>');
            } catch (dbError) {
                console.error('Database error:', dbError);
                res.send('<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[Database update failed]]></return_msg></xml>');
            }
        });
    });
};

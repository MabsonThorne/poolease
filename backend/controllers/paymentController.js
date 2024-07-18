const { WechatPay } = require('wechatpay-node-v3');
const { initializeDatabase } = require('../config');

const pay = new WechatPay({
  appid: wechatConfig.appid,
  mchid: wechatConfig.mchid,
  publicKey: wechatConfig.cert,
  privateKey: wechatConfig.key_file,
});

exports.createPayment = async (req, res) => {
  const { order_id, description, amount } = req.body;
  const db = await initializeDatabase();
  try {
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [order_id]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const result = await pay.transactions.native({
      description,
      out_trade_no: `${order_id}_${Date.now()}`,
      notify_url: 'https://your_domain/wechat/notify',
      amount: {
        total: amount,
        currency: 'CNY',
      },
    });

    res.status(201).json({ qr_code_url: result.code_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.wechatNotify = async (req, res) => {
  try {
    const event = pay.callback.decryptResponse(req.body);

    const { out_trade_no, trade_state } = event;
    const order_id = out_trade_no.split('_')[0];

    if (trade_state === 'SUCCESS') {
      const db = await initializeDatabase();
      await db.run('UPDATE orders SET is_paid = 1 WHERE id = ?', [order_id]);
    }

    res.status(200).send('SUCCESS');
  } catch (error) {
    res.status(500).send('FAIL');
  }
};

const fs = require('fs');
const path = require('path');

const WECHATPAY_APPID = 'your_appid';
const WECHATPAY_MCHID = '1681208148';
const WECHATPAY_KEY = 'your_key';
const WECHATPAY_CERT_PATH = path.resolve(__dirname, 'certificates/apiclient_cert.pem');
const WECHATPAY_KEY_PATH = path.resolve(__dirname, 'certificates/apiclient_key.pem');

const WECHATPAY_CERT = fs.readFileSync(WECHATPAY_CERT_PATH);
const WECHATPAY_KEY_FILE = fs.readFileSync(WECHATPAY_KEY_PATH);

module.exports = {
  appid: WECHATPAY_APPID,
  mchid: WECHATPAY_MCHID,
  key: WECHATPAY_KEY,
  cert: WECHATPAY_CERT,
  key_file: WECHATPAY_KEY_FILE,
};

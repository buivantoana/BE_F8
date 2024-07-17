import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';

// import * as moment from 'moment';
import { Model } from 'mongoose';

@Injectable()
export class VnPayService {
  constructor() {}
  createVnpay(req, res) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    let type = req.body.type
    let tmnCode = 'ICP1188N';
    let secretKey = 'STCAXXDSGQFBOPWRZVYZLSFTVKBPOSON';
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    let returnUrl = ""
    if(type =="wallet"){
      returnUrl =`http://localhost:3000/my_wallet?order_id=${req.body.order_id}` 
    }else if(type=="gift"){
      returnUrl =`http://localhost:3000/learning/${req.body.courses_id}?order_id=${req.body.order_id}&user_id=${req.body.user_id}&vouchers_id=${req.body.vouchers}`;
    }else{
      returnUrl = `http://localhost:3000/courses/${req.body.courses_id}?order_id=${req.body.order_id}&vouchers_id=${req.body.vouchers}`;
    }
    
    let orderId = req.body.order_id;
    let amount = req.body.amount;
    let bankCode = null;
    let locale = 'vn';

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require('crypto');
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.set('Content-Type', 'text/html');
    res.send(JSON.stringify(vnpUrl));
  }
  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
 
}

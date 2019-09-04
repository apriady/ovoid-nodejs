const { APP_ID, APP_VERSION, OS_NAME, OS_VERSION, MAC_ADDRESS, TRANSFER_OVO, TRANSFER_BANK } = require('../config/base')
const { ovo, ovoAws } = require('./helper/request')
const uuid = require('uuid/v4')

class OVOID {
  constructor(authToken) {
    this.authToken = authToken
    this.headers = {
      'app-id': APP_ID,
      'App-Version': APP_VERSION,
      'OS': OS_NAME
    }

  }

  login2FA(mobilePhone) {
    let data = {
        'deviceId': uuid(),
        'mobile': mobilePhone
    };
    return ovo.post('v2.0/api/auth/customer/login2FA', data, this.headers).then(data => {
      return data.refId
    })
  }

  login2FAVerify(refId, verificationCode, mobilePhone) {
    let data = {
      'appVersion': APP_VERSION,
      'deviceId': uuid(),
      'macAddress': MAC_ADDRESS,
      'mobile': mobilePhone,
      'osName': OS_NAME,
      'osVersion': OS_VERSION,
      'pushNotificationId': 'FCM|f4OXYs_ZhuM:APA91bGde-ie2YBhmbALKPq94WjYex8gQDU2NMwJn_w9jYZx0emAFRGKHD2NojY6yh8ykpkcciPQpS0CBma-MxTEjaet-5I3T8u_YFWiKgyWoH7pHk7MXChBCBRwGRjMKIPdi3h0p2z7',
      'refId': refId,
      'verificationCode': verificationCode
    };
    return ovo.post('v2.0/api/auth/customer/login2FA/verify', data, this.headers)
  }

  loginSecurityCode(securityCode, updateAccessToken) {
    let data = {
      'deviceUnixtime': Math.floor(new Date() / 1000),
      'securityCode': securityCode,
      'updateAccessToken': updateAccessToken,
      'message': ''
    };
    return ovo.post('v2.0/api/auth/customer/loginSecurityCode/verify', data, this.headers)
  }

  getBalance() {
    return ovo.get('v1.0/api/front/', null, this._aditionalHeader()).then(resp => {
      return resp.balance
    })
  }

  getBudget() {
    return ovo.get('v1.0/budget/detail', null, this._aditionalHeader())
  }
  
  getUnreadHistory() {
    return ovo.get('v1.0/notification/status/count/UNREAD', null, this._aditionalHeader())
  }
  
  getAllNotification() {
    return ovo.get('v1.0/notification/status/all', null, this._aditionalHeader())
  }

  getWalletTransaction(page, limit = 10) {
    return ovo.get(
      'wallet/v2/transaction',
      {
        page,
        limit,
        productType: '001'
      },
      this._aditionalHeader()
    )
  }

  isOVO(totalAmount, mobilePhone) {
    let data = {
      'totalAmount': totalAmount,
      'mobile': mobilePhone
    };
    return ovo.post('v1.1/api/auth/customer/isOVO', data, this._aditionalHeader())
  }

  transferOvo(to_mobilePhone, amount, message = "") {
    if (amount < 10000) {
        throw new Error('Minimal 10.000');
    }
    let data = {
      'amount': amount,
      'message': message === "" ? 'Sent from ovoid-nodejs' : message,
      'to': to_mobilePhone,
      'trxId': this._generateTrxId(amount, TRANSFER_OVO)
    };
    return ovo.post('v1.0/api/customers/transfer', data, this._aditionalHeader()).catch(err => {
      ovoidError(err)
    })
  }

  getRefBank() {
    return ovo.get('v1.0/reference/master/ref_bank', null, this._aditionalHeader())
  }

  transferInquiry(accountNo, amount, bankCode, bankName, message = "") {
    let data = {
      'accountNo': accountNo,
      'amount': amount,
      'bankCode': bankCode,
      'bankName': bankName,
      'message': message
    };
    return ovo.post('transfer/inquiry', data, this._aditionalHeader())
  }

  transferBank(accountName, accountNo, accountNoDestination, amount, bankCode, bankName, message = "", notes = "") {
    if (amount < 10000) {
      throw new Error('Minimal 10.000');
    }
    let data = {
      'accountName': accountName,
      'accountNo': accountNo,
      'accountNoDestination': accountNoDestination,
      'amount': amount,
      'bankCode': bankCode,
      'bankName': bankName,
      'message': message === "" ? 'Sent from ovoid-nodejs' : message,
      'notes': notes === "" ? 'Sent from ovoid-nodejs' : notes,
      'transactionId': this._generateTrxId(amount, TRANSFER_BANK)
    };
    return ovo.post('transfer/direct', data, this._aditionalHeader())
  }

  getBillers() {
      
    return ovoAws.get('gpdm/ovo/ID/v2/billpay/get-billers', {categoryID:'5C6'}, this._aditionalHeader());
  }
  
  getDenominationByProductId(product_id)
  { 
    return ovoAws.get('gpdm/ovo/ID/v1/billpay/get-denominations/${product_id}', null, this._aditionalHeader());
  }
  
  billerInquiry(billerId, customerId, denomId, productId)
  {
    let data = {
      'biller_id': String(billerId),
      'customer_id': customerId,
      'denomination_id': denomId,
      'payment_method': [
        '001'
      ],
      'phone_number': customerId,
      'product_id': String(productId),
      'period': 0
    };
    return ovoAws.post('gpdm/ovo/ID/v1/billpay/inquiry', data, this._aditionalHeader());
  }
  
  
  customerUnlock(securityCode)
  {
      let data = {
        'appVersion': APP_VERSION,
        'securityCode': securityCode
      };
      return ovo.post('v1.0/api/auth/customer/unlock', data, this._aditionalHeader());
  }
  
  
  pay(billerId, customerId, order_id, productId)
  {
    let data = {
      'biller_id'     : billerId,
      'customer_id'   : customerId,
      'order_id'      : order_id,
      'payment_method': [
        '001'
      ],
      'phone_number': customerId,
      'product_id'  : productId
    };
    return ovoAws.post('gpdm/ovo/ID/v1/billpay/pay', data, this._aditionalHeader());
  }
  
  payCheckStatus(orderId)
  {
    let data = {
      'order_reference': orderId
    };
    return ovoAws.post('gpdm/ovo/ID/v1/billpay/checkstatus', data, this._aditionalHeader());
  }
    
  _aditionalHeader() {
    return {
      'Authorization': this.authToken,
      ...this.headers
    }
  }

  _generateTrxId(amount, actionMark) {
    let data = {
      'actionMark': actionMark,
      'amount': amount
    };
    return ovo.post('v1.0/api/auth/customer/genTrxId', data, this._aditionalHeader());
  }
}

module.exports = OVOID;
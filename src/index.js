const { APP_VERSION, OS_NAME, OS_VERSION, CLIENT_ID, USER_AGENT, TRANSFER_OVO, TRANSFER_BANK } = require('../config/base')
const { ovo, ovoAws, ovoAuth } = require('./helper/request')
const { encryptRSA } = require('./helper/encrypt')
const uuid = require('uuid/v4')

class OVOID {
  constructor(authToken) {
    this.authToken = authToken
    this.headers = {
      'App-Version': APP_VERSION,
      'User-Agent': USER_AGENT,
      'OS': OS_NAME,
      'OS-Version': OS_VERSION,
      'client-id': CLIENT_ID,
    }

  }

  login2FA(mobilePhone, deviceId) {
    let device_id = deviceId || uuid()
    let data = {
      "channel_code": "ovo_android",
      "device_id": device_id,
      "msisdn": mobilePhone,
      "otp": {
        "locale": "ID",
        "sms_hash": "abc"
      }
    }

    return ovoAuth.post('v3/user/accounts/otp', data, this.headers).then(data => {
      return {
        otp_refId: data?.data?.otp?.otp_ref_id,
        device_id: device_id
      }
    })
  }

  login2FAVerify(refId, verificationCode, mobilePhone, device_id) {
    let data = {
      "channel_code": "ovo_android",
      "device_id": device_id,
      "msisdn": mobilePhone,
      "otp": {
        "otp": verificationCode,
        "otp_ref_id": refId,
        "type": "LOGIN"
      }
    };
    return ovoAuth.post('v3/user/accounts/otp/validation', data, this.headers).then(data => data?.data?.otp)
  }

  async loginSecurityCode(securityCode, otp_token, mobilePhone, otpRefId, device_id, pushId = 'XXXXXXXXXX') {
    let data = {
        "channel_code":"ovo_android",
        "credentials":{
          "otp_token": otp_token,
          "password":{
              "format":"rsa",
              "value": await encryptRSA(securityCode, device_id, mobilePhone, otpRefId)
          }
        },
        "device_id": device_id,
        "msisdn": mobilePhone,
        "push_notification_id": pushId
    };
    
    return ovoAuth.post('v3/user/accounts/login', data, this.headers).then(data => data?.data?.auth)
  }

  getProfile() {
    return ovo.get('v3.0/api/front/', null, this._aditionalHeader()).then((resp) => resp.profile)
  }

  getBalance(type) {
    return ovo.get('wallet/inquiry', null, this._aditionalHeader()).then(resp => {
      if (type === 'cash') return resp.data['001'];
      if (type === 'point') return resp.data['600'].card_balance;
      return null;
    });
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

  async transferOvo(to_mobilePhone, amount, message = "") {
    if (amount < 10000) {
        throw new Error('Minimal 10.000');
    }
    let data = {
      'amount': amount,
      'message': message === "" ? 'Sent from ovoid-nodejs' : message,
      'to': to_mobilePhone,
      'trxId': await this._generateTrxId(amount, TRANSFER_OVO)
    };
    return ovo.post('v1.0/api/customers/transfer', data, this._aditionalHeader())
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

  async transferBank(accountName, accountNo, accountNoDestination, amount, bankCode, bankName, message = "", notes = "") {
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
      'transactionId': await this._generateTrxId(amount, TRANSFER_BANK)
    };
    return ovo.post('transfer/direct', data, this._aditionalHeader())
  }

  getBillers() {
      
    return ovoAws.get('gpdm/ovo/ID/v2/billpay/get-billers', {categoryID:'5C6'}, this._aditionalHeader());
  }
  
  getDenominationByProductId(product_id)
  { 
    return ovoAws.get(`gpdm/ovo/ID/v1/billpay/get-denominations/${product_id}`, null, this._aditionalHeader());
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

  logout()
  {
    return ovo.get('v1.0/api/auth/customer/logout', null, this._aditionalHeader());
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
    return ovo.post('v1.0/api/auth/customer/genTrxId', data, this._aditionalHeader()).then(({trxId}) => trxId);
  }
}

module.exports = OVOID;

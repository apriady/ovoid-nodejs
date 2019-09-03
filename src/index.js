const { APP_ID, APP_VERSION, OS_NAME, OS_VERSION, MAC_ADDRESS } = require('../config/base')
const { ovo } = require('./helper/request')
const uuid = require('uuid/v4')
const { ovoidError } = require('./helper/errors')

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
    }).catch(err => {
      ovoidError(err)
    });
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
    return ovo.post('v2.0/api/auth/customer/login2FA/verify', data, this.headers).catch(err => {
      ovoidError(err)
    });
  }

  loginSecurityCode(securityCode, updateAccessToken)
  {
    let data = {
      'deviceUnixtime': Math.floor(new Date() / 1000),
      'securityCode': securityCode,
      'updateAccessToken': updateAccessToken,
      'message': ''
    };
    return ovo.post('v2.0/api/auth/customer/loginSecurityCode/verify', data, this.headers).catch(err => {
      ovoidError(err)
    });
  }

  getBalance()
  {
    return ovo.get('v1.0/api/front/', null, this._aditionalHeader()).then(resp => {
      return resp.balance
    }).catch(err => {
      ovoidError(err)
    });
  }

  getBudget()
  {
    return ovo.get('v1.0/budget/detail', null, this._aditionalHeader()).catch(err => {
      ovoidError(err)
    });
  }
  
  getUnreadHistory()
  {
    return ovo.get('v1.0/notification/status/count/UNREAD', null, this._aditionalHeader()).catch(err => {
      ovoidError(err)
    });
  }
  
  getAllNotification()
  {
    return ovo.get('v1.0/notification/status/all', null, this._aditionalHeader()).catch(err => {
      ovoidError(err)
    });
  }

  getWalletTransaction(page, limit = 10)
  {
    return ovo.get(
      'wallet/v2/transaction',
      {
        page,
        limit,
        productType: '001'
      },
      this._aditionalHeader()
    ).catch(err => {
      ovoidError(err)
    });
  }

  isOVO(totalAmount, mobilePhone)
  {
    let data = {
      'totalAmount': totalAmount,
      'mobile': mobilePhone
    };
    return ovo.post('v1.1/api/auth/customer/isOVO', data, this._aditionalHeader()).catch(err => {
      ovoidError(err)
    });
  }
    
  _aditionalHeader() {
    return {
      'Authorization': this.authToken,
      ...this.headers
    }
  }
}

module.exports = OVOID;
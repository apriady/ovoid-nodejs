const { APP_ID, APP_VERSION, OS_NAME, OS_VERSION, MAC_ADDRESS } = require('../config/base')
const { ovo } = require('./helper/request')
const uuid = require('uuid/v4')
const { NotRegistered, InvalidParameters } = require('./helper/errors')

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
      if(err.message.includes('not registered')) throw new NotRegistered(err.error.message)
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
      throw new InvalidParameters(err.error.message)
    });
  }
}

module.exports = OVOID;
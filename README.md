## <center>Un-Official ovoid API Wrapper for NodeJS</center>

Repository berikut ini merupakan porting dari [ovoid](https://github.com/lintangtimur/ovoid/) untuk NodeJS

![enter image description here](https://raw.githubusercontent.com/notme1001/ovoid-nodejs/master/ovo-unofficial.png)

### Method

  

- [x] login2FA

- [x] login2FAVerify

- [x] loginSecurityCode

- [x] getBalance

- [x] getBudget

- [x] logout

- [x] unreadHistory

- [x] getWalletTransaction

- [x] generateTrxId

- [x] transferOvo

  

### Instalasi

  

`npm install ovoid` atau `yarn add ovoid`

  

### Dokumentasi

```js

const OVOID =  require('ovoid');

let ovoid =  new  OVOID();

```

#### Login

##### Langkah 1

```js

let refId =  await ovoid.login2FA('nomorhandphone');

```

Jika ingin menggunakan deviceId yg sudah pernah dipakai
```js

let refId =  await ovoid.login2FA('nomorhandphone', 'deviceId');

```

> *Response:*
```json
{
  "otp_refId": "a82eddf0-1eee-400b-b8aa-xxxxxx",
  "device_id": "707503a4-9314-xxxx-a931-bf575c08b23b"
}
```

##### Langkah 2

```js

let accessToken =  await ovoid.login2FAVerify(refId.otp_refId,'OTP','nomorhandphone', refId.device_id);

```

> *Response*
```json
{
      "otp_ref_id": "a82eddf0-1eee-400b-b8aa-1cce98fe10a8",
      "type": "LOGIN",
      "expires_at": "1630598216",
      "otp_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlaGFzaCI6IlptWmxZekJrTnpBeU5ESXpOR00zTjJGbU1Ea3daakF6TXpJMk1qTXdNV1UiLCJyYW5kb20iOiJNamt3TmpNM056STQiLCJ2ZXJzaW9uIjoxfQ.xxxxxxxxxxxxxx"
}
```

##### Langkah 3

```js

let authToken =  await ovoid.loginSecurityCode('PINOVO', accessToken.otp_token, 'nomorhandphone', refId.otp_refId, refId.device_id);

```

Jika ingin menggunakan FCM token yg sudah ada
```js

let authToken =  await ovoid.loginSecurityCode('PINOVO', accessToken.otp_token, 'nomorhandphone', refId.otp_refId, refId.device_id, 'FCMToken');

```


##### Untuk mengakses resource selanjutnya

```js

ovoid =  new  OVOID(authToken.refresh_token)

```

  

#### Mendapatkan jumlah notifikasi yang belum terbaca

Mendapatkan jumlah notifikasi akun ovo anda

```js

let unread =  await ovoid.getUnreadHistory();

```

  

#### Mendapatkan notifikasi

Mendapatkan notifikasi akun ovo anda

```js

let notif =  await ovoid.getAllNotification();

```


#### Info profile pengguna

Mendapatkan info profile ovo

```js

let profile =  await ovoid.getProfile();

```

  

#### Mendapatkan balance

Mendapatkan balance ovo anda, tipe wallet yang dapat dipilih :

- cash : OVO Cash

- point : OVO Point

```js

let balanceCash =  await ovoid.getBalance(tipe);

```

  

#### Transfer ke sesama OVO

##### Cek apakah nomor tujuan terdaftar di OVO

```js

let isOVO =  await ovoid.isOVO(nominal, 'nomortujuan');

```

##### Transfer ke nomor tujuan

```js

let transferOvo =  await ovoid.transferOvo('nomortujuan', nominal, 'catatan');

```

  

#### Transfer ke rekening bank

##### Cek kode bank

```js

let getRefBank =  await ovoid.getRefBank();

```

##### Cek tujuan transfer (transfer inquiry)

```js

let transferInquiry =  await ovoid.transferInquiry(no_rekening, nominal, 'kodebank', 'nama bank', 'catatan');

```

##### Transfer ke rekening tujuan

```js

let transferBank =  await ovoid.transferBank('nama penerima', 'nomor_akun_ovo', 'nomor_rekening_tujuan', nominal, 'kodebank', 'nama bank', 'pesan', 'catatan');

```

  

#### Logout

```js

ovoid.logout();

```

  
  
  
  

### License

  

[MIT](https://github.com/apriady/nodejs-bca-scraper/blob/master/LICENSE)

  

### Author

  

[Achmad Apriady](mailto:achmad.apriady@gmail.com)
## <center>Un-Official ovoid API Wrapper for NodeJS</center>
Repository berikut ini merupakan porting dari [ovoid](https://github.com/lintangtimur/ovoid/) untuk NodeJS

### Method

- [x] login2FA
- [x] login2FAVerify
- [x] loginSecurityCode
- [x] getBalance
- [x] getBudget
- [ ] logout
- [x] unreadHistory
- [x] getWalletTransaction
- [x] generateTrxId
- [x] transferOvo

### Instalasi

`npm install ovoid` atau `yarn add ovoid`

### Dokumentasi
```js
const OVOID = require('ovoid');
let ovoid = new OVOID();
```
#### Login
##### Langkah 1
```js
let refId = await ovoid.login2FA('nomorhandphone');
```
##### Langkah 2
```js
let accessToken = await ovoid.login2FAVerify(refId,'OTP','nomorhandphone');
```
##### Langkah 3
```js
let authToken = await ovoid.loginSecurityCode('PINOVO', accesToken);
```
##### Untuk mengakses resource selanjutnya
```js
ovoid = new OVOID(authToken)
```

#### Mendapatkan jumlah notifikasi yang belum terbaca
Mendapatkan jumlah notifikasi akun ovo anda
```js
let unread = await ovoid.getUnreadHistory();
```

#### Mendapatkan notifikasi
Mendapatkan notifikasi akun ovo anda
```js
let notif = await ovoid.getAllNotification();
```

#### Mendapatkan balance
Mendapatkan balance ovo anda, tipe wallet yang dapat dipilih : 
- cash : OVO Cash
- point : OVO Point
```js
let balanceCash = await ovoid.getBalance(tipe);
```

#### Transfer ke sesama OVO
##### Cek apakah nomor tujuan terdaftar di OVO
```js
let isOVO = await ovoid.isOVO(nominal, 'nomortujuan');
```
##### Transfer ke nomor tujuan
```js
let transferOvo = await ovoid.transferOvo('nomortujuan', nominal, 'catatan');
```




## License

[MIT](https://github.com/apriady/nodejs-bca-scraper/blob/master/LICENSE)

## Author

[Achmad Apriady](mailto:achmad.apriady@gmail.com)
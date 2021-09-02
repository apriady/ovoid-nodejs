const OVOID = require('./src/index');

const ovo = new OVOID('eyJhbGciOiJSUzI1NiJ9.eyJleHBpcnlJbk1pbGxpU2Vjb25kcyI6NjA0ODAwMDAwLCJjcmVhdGVUaW1lIjoxNjMwNTk3ODIyMzE5LCJzZWNyZXQiOiJod3Y3ZHFtdWMrekQ1MjBaRGVBemZrYzdwZmQrZ083N005djFFSE5BN3JVSm14Y2xqbkhZOUFodVc0UjhQMENkckxlSEZNWE90VEZaVWtncTJtckFNaHNQaWlteGFsN0ZaMFUwUHIvRGhsczZIR0F4Y0xVUlJ1VU1pS2toaEkrVDRYZGthbkRVdjhqZHNrTWw0TGJvWmo2c0MzdmhhL2RMWXphdFZ4amE1WVNHd0U5ckFUWDY2Y0N0b3JrcmlKblZjWm1UMHNhT2JWWktyQWFlODF3QnBmaldjYW9vbmZTejNobjkxTjhGRHNTa0dIZHNBaWRJelBLbksvTnhEeDdhVUFtTGZkU1pNa0lXZU1kNkNWdjZBdVIrZlY0aVJ4V2EycE96SjJzK0s1ZUJHZUhsdkJIWEY1NHFaWmhOeE9xUlBLUkZWWGl1QkZhSHFYRVIxQU1tK0JLUk93VVpHamtqSVZOelR3MzhSVDQ9In0.gyj1Q9krP8IW2Z93QRQk-8l9WOgoYowG9h9EVKmq8rbi0m9UT_Ty0enC4JY8ORb_ljbR-dhkeqt6ChYw0xhl0cyiLlJMpV-Om9PUP0zdmuYSD9DsKt8BdaLBqjEr73VV6J7_PD3UqlTPAix59fe5AtdFrd8zcw4afefNmr0ELj8KjGIFMVpR7MR4-Ttn4Cx21kthiTAD5XSh8ZRsg8D14xJyL155wzE6RLzwduxM8kw270ETVCr5R4m5zzN19bawXLCQxfLoJ5UQxi8Pg-MhTDKPzMyr3HG7d6ak-hDyRwjbyD6SUnagOeDdl0knDe__B1-H74pAis49JPPCU5Ibaw');

(async () => {
//     otp_refId: 'a82eddf0-1eee-400b-b8aa-1cce98fe10a8',
//   device_id: '707503a4-9314-439f-a931-bf575c08b23b'
//     console.log(await ovo.login2FA('+6285161010164'))
    // console.log(await ovo.login2FAVerify('a82eddf0-1eee-400b-b8aa-1cce98fe10a8', 'cd82f186507a3c61986a250f644f979b1bfca46ca23617773e54cd46c5313662', '+6285161010164', '707503a4-9314-439f-a931-bf575c08b23b'))
    // console.log(await ovo.loginSecurityCode('010101', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlaGFzaCI6IlptWmxZekJrTnpBeU5ESXpOR00zTjJGbU1Ea3daakF6TXpJMk1qTXdNV1UiLCJyYW5kb20iOiJNamt3TmpNM056STQiLCJ2ZXJzaW9uIjoxfQ.EKpSm8wfOKd3d7Sayd8L5dPXqP1IpBx1rFm993DxFCk', '+6285161010164', 'a82eddf0-1eee-400b-b8aa-1cce98fe10a8', '707503a4-9314-439f-a931-bf575c08b23b'))
    console.log(await ovo.getBillers()) // data?.auth?.refresh_token
    // console.log(await ovo.loginSecurityCode('010101', '12312naskdnla', '628112312', '120sad'))
})()

// {
//     response_code: 'OV00000',
//     response_message: 'Success',
//     data: {
//       auth: {
//         access_token: 'eyJhbGciOiJSUzI1NiJ9.eyJleHBpcnlJbk1pbGxpU2Vjb25kcyI6NjA0ODAwMDAwLCJjcmVhdGVUaW1lIjoxNjMwNTk3ODIyMzE5LCJzZWNyZXQiOiJod3Y3ZHFtdWMrekQ1MjBaRGVBemZrYzdwZmQrZ083N005djFFSE5BN3JVSm14Y2xqbkhZOUFodVc0UjhQMENkckxlSEZNWE90VEZaVWtncTJtckFNaHNQaWlteGFsN0ZaMFUwUHIvRGhsczZIR0F4Y0xVUlJ1VU1pS2toaEkrVDRYZGthbkRVdjhqZHNrTWw0TGJvWmo2c0MzdmhhL2RMWXphdFZ4amE1WVNHd0U5ckFUWDY2Y0N0b3JrcmlKblZjWm1UMHNhT2JWWktyQWFlODF3QnBmaldjYW9vbmZTejNobjkxTjhGRHNTa0dIZHNBaWRJelBLbksvTnhEeDdhVUFtTGZkU1pNa0lXZU1kNkNWdjZBdVIrZlY0aVJ4V2EycE96SjJzK0s1ZUJHZUhsdkJIWEY1NHFaWmhOeE9xUlBLUkZWWGl1QkZhSHFYRVIxQU1tK0JLUk93VVpHamtqSVZOelR3MzhSVDQ9In0.gyj1Q9krP8IW2Z93QRQk-8l9WOgoYowG9h9EVKmq8rbi0m9UT_Ty0enC4JY8ORb_ljbR-dhkeqt6ChYw0xhl0cyiLlJMpV-Om9PUP0zdmuYSD9DsKt8BdaLBqjEr73VV6J7_PD3UqlTPAix59fe5AtdFrd8zcw4afefNmr0ELj8KjGIFMVpR7MR4-Ttn4Cx21kthiTAD5XSh8ZRsg8D14xJyL155wzE6RLzwduxM8kw270ETVCr5R4m5zzN19bawXLCQxfLoJ5UQxi8Pg-MhTDKPzMyr3HG7d6ak-hDyRwjbyD6SUnagOeDdl0knDe__B1-H74pAis49JPPCU5Ibaw',
//         token_type: 'Bearer',
//         expires_in: 1630684222,
//         refresh_token: 'eyJhbGciOiJSUzI1NiJ9.eyJleHBpcnlJbk1pbGxpU2Vjb25kcyI6NjA0ODAwMDAwLCJjcmVhdGVUaW1lIjoxNjMwNTk3ODIyMzE5LCJzZWNyZXQiOiJod3Y3ZHFtdWMrekQ1MjBaRGVBemZrYzdwZmQrZ083N005djFFSE5BN3JVSm14Y2xqbkhZOUFodVc0UjhQMENkckxlSEZNWE90VEZaVWtncTJtckFNaHNQaWlteGFsN0ZaMFUwUHIvRGhsczZIR0F4Y0xVUlJ1VU1pS2toaEkrVDRYZGthbkRVdjhqZHNrTWw0TGJvWmo2c0MzdmhhL2RMWXphdFZ4amE1WVNHd0U5ckFUWDY2Y0N0b3JrcmlKblZjWm1UMHNhT2JWWktyQWFlODF3QnBmaldjYW9vbmZTejNobjkxTjhGRHNTa0dIZHNBaWRJelBLbksvTnhEeDdhVUFtTGZkU1pNa0lXZU1kNkNWdjZBdVIrZlY0aVJ4V2EycE96SjJzK0s1ZUJHZUhsdkJIWEY1NHFaWmhOeE9xUlBLUkZWWGl1QkZhSHFYRVIxQU1tK0JLUk93VVpHamtqSVZOelR3MzhSVDQ9In0.gyj1Q9krP8IW2Z93QRQk-8l9WOgoYowG9h9EVKmq8rbi0m9UT_Ty0enC4JY8ORb_ljbR-dhkeqt6ChYw0xhl0cyiLlJMpV-Om9PUP0zdmuYSD9DsKt8BdaLBqjEr73VV6J7_PD3UqlTPAix59fe5AtdFrd8zcw4afefNmr0ELj8KjGIFMVpR7MR4-Ttn4Cx21kthiTAD5XSh8ZRsg8D14xJyL155wzE6RLzwduxM8kw270ETVCr5R4m5zzN19bawXLCQxfLoJ5UQxi8Pg-MhTDKPzMyr3HG7d6ak-hDyRwjbyD6SUnagOeDdl0knDe__B1-H74pAis49JPPCU5Ibaw',
//         scope: 'user'
//       },
//       account: {
//         ovo_id: '0001100614491009',
//         msisdn: '085161010164',
//         account_status: 'REGISTERED',
//         kyc_status: '',
//         authentication: 'PROVIDER_OTP_PASSWORD_ENCRYPTED',
//         push_notification_id: 'fs-DYcGaRbKERLhF4hkQ92:APA91bEjjUFzzFvadIKtdrrqsyrGH26xLRR5-Oyym2l9Ybv0O1cnvqA14ghuTbXz0ogazN-Kw6iGxW2klakANBaVXoFCLrT4hWJJ5FCGOz2o5bGE7RX6XpxndNkcxnqpWat449vBvYSa'
//       }
//     }
//   }
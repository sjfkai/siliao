const CryptoJS = require('crypto-js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  encode(message, secret) {
    return CryptoJS.AES.encrypt(message, secret).toString();
  },
  decode(ciphertext, secret) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secret)
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

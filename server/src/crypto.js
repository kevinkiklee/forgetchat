const crypto = require('crypto')

const generateKey16 = () => {
  return crypto.randomBytes(16).toString('hex')
}

module.exports = {
  generateKey16
}

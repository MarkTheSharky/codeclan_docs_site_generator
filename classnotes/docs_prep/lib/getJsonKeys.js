const path = require('path')

const keyArray = (obj) => {
  const keys = Object.keys(obj)
  return keys.map(key => {
    return path.join(__dirname, '..', '..', key)
  })
}

module.exports = { keyArray }
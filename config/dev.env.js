var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AIP_BASE: '"http://localhost:9092"',
  ACCESS_PATH: 'http://localhost:9092/',
})

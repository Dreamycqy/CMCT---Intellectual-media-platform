const express = require('express')

const config = {
  dev: {
    env: 'development',
    port: '8101',
    basePath: 'http://39.100.31.203:8002',
    newsPath: 'https://api2.newsminer.net',
    amapDetail: 'https://ditu.amap.com',
    jimu: 'https://api.jimuall.com',
  },
  test: {
    env: 'test',
    port: '8101',
    basePath: 'http://39.100.31.203:8002/',
    newsPath: 'https://api2.newsminer.net/',
    amapDetail: 'https://ditu.amap.com/',
    jimu: 'https://api.jimuall.com/',
  },
  production: {
    env: 'production',
    port: '8101',
    basePath: 'http://39.100.31.203:8002/',
    newsPath: 'https://api2.newsminer.net/',
    amapDetail: 'https://ditu.amap.com/',
    jimu: 'https://api.jimuall.com/',
  },
}
module.exports = config[process.env.NODE_ENV || 'development']

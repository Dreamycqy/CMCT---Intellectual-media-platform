const express = require('express')

const config = {
  dev: {
    env: 'development',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
    amapDetail: 'https://ditu.amap.com/',
  },
  test: {
    env: 'test',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
    amapDetail: 'https://ditu.amap.com/',
  },
  production: {
    env: 'production',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
    amapDetail: 'https://ditu.amap.com/',
  },
}
module.exports = config[process.env.NODE_ENV || 'development']

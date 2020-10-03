const express = require('express')

const config = {
  dev: {
    env: 'development',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
  },
  test: {
    env: 'test',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
  },
  production: {
    env: 'production',
    port: '8101',
    basePath: 'http://edukg.cn',
    newPath: 'http://39.100.31.203:8080/res_lib/',
    newsPath: 'https://api2.newsminer.net',
  },
}
module.exports = config[process.env.NODE_ENV || 'development']

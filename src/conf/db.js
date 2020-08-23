/**
 * @description 存储配置
 */
const {
    isProd
} = require('../utils/env')

// 配置
let MYSQL_CONF
let REDIS_CONF

if (!isProd) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2_weibo_db'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (isProd) {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'koa2_weibo_db'
    }
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
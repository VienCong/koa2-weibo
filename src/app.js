const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const useApiRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

const {
    isProd
} = require('./utils/env')

// error handler 前端页面显示
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.keys = [SESSION_SECRET_KEY]

app.use(session({
    key: 'weibo_sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess', // redis key 的前缀，默认是`koa:sess`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // ttl: 24* 60 * 60 * 100, // 默认配置
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes - 路由注册
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(useApiRouter.routes(), useApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling 服务器端显示
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app

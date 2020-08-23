const router = require('koa-router')()

router.prefix('/users')

router.post('/login', async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body
    ctx.body = {
        userName,
        password
    }
})

module.exports = router
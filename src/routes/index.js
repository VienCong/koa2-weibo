const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        message: '你好！',
        isMe: true,
        blogList: [{
            id: 1,
            title: 'aaaa'
        }, {
            id: 2,
            title: 'bbbb'
        }, {
            id: 3,
            title: 'cccc'
        }]
    })
})

router.get('/json', async (ctx, next) => {
    // const session = ctx.session
    // if (session.viewNum == null) {
    //     session.viewNum = 0
    // }
    // session.viewNum++
    ctx.body = {
        title: 'koa2 json',
        // viewNum: session.viewNum
    }
})

router.get('/profile/:userName', async (ctx, next) => {
    const {
        userName
    } = ctx.params
    ctx.body = {
        title: 'this is profile page',
        userName
    }
})

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const {
        userName,
        pageIndex
    } = ctx.params
    ctx.body = {
        title: 'this is loadMore',
        userName,
        pageIndex
    }
})

module.exports = router
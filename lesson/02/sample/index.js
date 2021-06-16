const Koa = require('koa')
const app = new Koa()


app.use(async (ctx, next) => {
    const start = new Date().getTime()
    console.log(`start: ${ctx.url}`)

    await next()

    const end = new Date().getTime()
    console.log(`请求${ctx.url} 耗时: ${end - start}`)
})

// ctx上下文环境，是对request和response的封装
app.use(async (ctx, next) => {
    ctx.body = [
        {
            name: 'tom'
        }
    ]

    await next()
})

app.listen(3000)
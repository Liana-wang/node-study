const KKB = require('./kkb')
const app = new KKB()

// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hi kkb')
// })

// app.use((ctx) => {
//     ctx.body = 'hhhh'
// })

const delay = () => new Promise((resolve, reject) => setTimeout(() => { resolve() }, 3000))

app.use(async (ctx, next) => {
    ctx.body = '1'

    await next()

    ctx.body += '5'
})

app.use(async (ctx, next) => {
    ctx.body += '2'

    await delay()
    await next()

    ctx.body += '4'
})

app.use(async (ctx, next) => {
    ctx.body += '3'
})

app.listen(3000, () => {
    console.log('listen at 3000')
})
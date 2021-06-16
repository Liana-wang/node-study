const http = require('http')
const fs = require('fs')
http.createServer((request, response) => {
    // console.log('there is a request')
    // console.log('request', getPrototyprChain(request))
    // console.log('response', getPrototyprChain(response))
    // response.end('hello node')
    const { url, method, headers } = request
    if (url === '/' && method === 'GET') {
        // 静态页面服务
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
                response.end('500 服务器错误')
            }

            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    }
    // Ajax服务 
    else if (url === '/users' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify([{ name: 'tome' }]))
    }
    //  图片文件服务 
    else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(response)
    }
})
    .listen(3000)

// 获取原型链
function getPrototyprChain(obj) {
    let protoChain = []

    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    }

    return protoChain
}
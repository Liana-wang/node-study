const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
    const { url, method, headers } = request

    console.log(`user: ${url}, method: ${method}`)

    console.log('cookie:', headers.cookie)

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
    else if (url === '/api/users' && method === 'GET') {
        response.setHeader('Set-Cookie', 'cookie1=va222')
        response.writeHead(
            200,
            {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
            }
        )
        response.end(JSON.stringify([{ name: 'tome', age: 20 }]))
    }

    else if (method === 'OPTIONS' && url === '/api/users') {
        response.writeHead(
            200,
            {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Headers': 'X-Token,Content-Type',
                'Access-Control-Allow-Method': 'PUT',
                'Access-Control-Allow-Credentials': 'true',
            }
        )
        response.end()
    }

    else if (method === "POST" && url === "/api/save") {
        let reqData = [];
        let size = 0;
        request.on('data', data => {
            console.log('>>>req on', data);
            reqData.push(data);
            size += data.length;
        });
        request.on('end', function () {
            console.log('end')
            const data = Buffer.concat(reqData, size);
            console.log('data:', size, data.toString())
            response.end(`formdata:${data.toString()}`)
        });
    }
})
    .listen(4000, () => {
        console.log('api listen at ' + 4000)
    })
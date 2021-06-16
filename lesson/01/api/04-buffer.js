// 分配内存空间
const buf1 = Buffer.alloc(10)
console.log('buf1', buf1)

// 存入a
const buf2 = Buffer.from('a')
console.log('buf2', buf2)

// 存入中文
const buf3 = Buffer.from('你好')
console.log('buf3', buf3, buf3.toString('utf-8'))

// 连接
const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4', buf4, buf4.toString())
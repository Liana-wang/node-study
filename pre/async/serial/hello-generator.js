function* func() {
    console.log('one')
    yield '1'
    console.log('two')
    yield '2'
    console.log('three')
    yield '3'
}

const f = func()

console.log('next: ', f.next())  // next: {value: 1, done: false}
console.log('next: ', f.next())  // next: {value: 2, done: false}
console.log('next: ', f.next())  // next: {value: 3, done: false}
console.log('next: ', f.next())  // next: {value: undefined, done: true}

// 也可以使用迭代器的方式
for (const [key, value] of func()) {
    console.log(`${key} : ${value}`)
}
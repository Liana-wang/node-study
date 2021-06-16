const logTime = (name) => {
    console.log(`log...${name}: ${new Date().toLocaleString()}`)
}
// 回调地狱
exports.callback = () => {
    setTimeout(() => {
        logTime('callback1')
        setTimeout(() => {
            logTime('callback2')
        }, 100);
    }, 100);
}

// Promise
const promise = (name, delay = 100) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name)
        resolve()
    }, delay);
})

exports.promise = () => {
    promise('Promise1')
        .then(promise('promise2'))
        .then(promise('primise3'))
}


// generator
exports.generator = () => {
    const generator = function* (name) {
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
    }

    let co = generator => {
        if (it = generator.next().value) {
            it.then(res => {
                co(generator)
            })
        } else {
            return
        }
    }

    co(generator('Co-Generator'))
}


// async await
exports.asyncAwait = async () => {
    await promise('ayncAwait1')
    await promise('ayncAwait2')
    await promise('ayncAwait3')
}


// 事件监听方式
exports.event = () => {
    const asyncEvent = (name) => (event) => {
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100);

        return event
    }

    let arr = [
        asyncEvent('event 1'),
        asyncEvent('event 2'),
        asyncEvent('event 3'),
    ]

    const { EventEmitter } = require('events')
    const event = new EventEmitter()
    let i = 0
    event.on('end', () => i < arr.length && arr[i++](event))
    event.emit('end')

}
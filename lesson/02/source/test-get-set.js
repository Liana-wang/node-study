const kkb = {
    info: {
        name: '开课吧'
    },
    get name() {
        return this.info.name
    },
    set name(val) {
        console.log(`new name is ${val}`)
    }
}

console.log(kkb.name)

kkb.name = 'kaikeba'
console.log(kkb.name)
const fs = require('fs')

test('集成测试 测试生成代码文件', () => {
    // 准备环境
    // 删除测试文件
    fs.rmdirSync(__dirname + '/data/__test__/', {
        recursive: true,
    })

    const src = new (require('../index'))()
    src.genJestSource(__dirname + '/data')
})

test('测试getTestSource', () => {
    const src = new (require('../index'))()
    const ret = src.getTestSource('fun', 'class')
    console.log(ret)
    expect(ret)
        .toBe(`
test('TEST fun', () => {
    const fun = require('../class')
    const ret = fun()
    // expect(ret)
    //  .toBe('test return')
})
        `)
})

test('测试文件名', () => {
    const src = new (require('../index'))()

    const ret = src.getTestFileName('/abc/class.js')
    console.log('getTestFileName: ', ret)

    expect(ret).toBe('/abc/__test__/class.epec.js')
})
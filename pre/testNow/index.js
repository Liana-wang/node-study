const path = require('path')
const fs = require('fs')

module.exports = class TestNow {
    genJestSource(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`

        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件
        let list = fs.readdirSync(sourcePath)

        list
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码
            .filter(v => v.indexOf('.spec') === -1)
            .map(v => this.genTestFile(v))
    }

    genTestFile(filename) {
        console.log('filename: ', filename)

        const testFileName = this.getTestFileName(filename)

        if (fs.existsSync(testFileName)) {
            console.log('该测试文件已存在')

            return
        }

        const mod = require(filename)
        let source
        if (typeof mod === 'object') {
            source = Object.keys(mod)
                .map(v => this.getTestSource(v, path.basename(filename)), true)
                .join('\n')
        } else if (typeof mod === 'function') {
            const baseName = path.basename(filename)
            source = this.getTestSource(baseName.replace('.js', ''), baseName)
        }
        fs.writeFileSync(testFileName, source)
    }


    /**
     * 获取测试代码
     */
    getTestSource(methodName, classFile, isClass = false) {
        console.log('getTestSource: ', methodName)

        return `
test('${'TEST ' + methodName}', () => {
    const ${isClass ? '{' + methodName + '}' : methodName} = require('../${classFile}')
    const ret = ${methodName}()
    // expect(ret)
    //  .toBe('test return')
})
        `
    }


    /**
     * 生成测试文件名
     */
    getTestFileName(filename) {
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extName = path.extname(filename)
        const testName = baseName.replace(extName, `.epec${extName}`)

        return path.format({
            root: dirName + '/__test__/',
            base: testName,
        })
    }
}
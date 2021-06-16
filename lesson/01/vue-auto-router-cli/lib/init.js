const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('../lib/download')
const open = require('open')

module.exports = async (name) => {
    clear()
    const data = await figlet('KKB Welcome')
    log(data)
    // 克隆项目
    await clone('github:su37josephxia/vue-template', name)

    // 安装依赖
    log('安装依赖')
    await spawn('npm', ['install'], { cwd: `./${name}` })
    log(`
👌
=======
安装OK
=======
    `)

    // 打开浏览器
    open('http:localhost:8080')
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}

function spawn(...args) {
    const { spawn } = require('child_process')

    return new Promise((resolve) => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
// node的模块系统
// 1. 内建模块
const os = require('os')
// 2. 第三方模块
const cpuStat = require('cpu-stat')
const getStat = () => {
    const men = os.freemem() / os.totalmem() * 100
    console.log(`内存占用率为${men}%`)
    cpuStat.usagePercent((err, per) => {
        console.log(`CPU占用率为${per}%`)
    })
}
setTimeout(getStat, 1000)
// 3. 自定义模块
const { rmbTurn } = require('./modules/rmb-turn')(6)
console.log(`20块人民币能换${rmbTurn(20)}美元`)


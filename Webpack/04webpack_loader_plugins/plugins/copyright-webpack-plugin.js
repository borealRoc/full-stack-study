// plugin是一个类
class CopyrightWebpackPlugin {
    // opts: 获取插件参数
    constructor(opts) {
        console.log(opts.name)
    }
    //compiler:webpack实例
    apply(compiler) {
        // hooks.emit 定义在某个时刻
        // 异步写法
        compiler.hooks.emit.tapAsync(
            "CopyrightWebpackPlugin",
            (compilation, cb) => {
                compilation.assets["copyRight.txt"] = {
                    source: () => {
                        return "版权归Mr.xu所有";
                    },
                    size: () => {
                        return 1024
                    }
                }
                cb()
            }
        )
        // 同步写法
        compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => {
            console.log('插件的同步方法开始执行')
        })
    }
}
module.exports = CopyrightWebpackPlugin
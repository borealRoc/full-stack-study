// 官方推荐处理loader,query的工具
const loaderUtils = require("loader-utils")

module.exports = function (source) {
    // 1 参数source接收源码
    // console.log('sourder是', source)
    // sourder是 console.log('hello world')
    // return source.replace('world', '史诗王爵')

    // 2. 接收参数
    // 2.1 通过this.query接收
    // console.log('this.query', this.query)
    // this.query { name: 'KING' }
    // const { name } = this.query
    // return source.replace('world', name)
    // 2.2 借助loader-utils接收参数
    const opts = loaderUtils.getOptions(this)
    // console.log('opts', opts)
    // opts { name: 'KING' }
    return source.replace('hello', opts.str)

    // 3 this.callback: 返回多个信息
    // const result = source.replace('world', opts.name)
    // this.callback(null, result)

    // 4 this.async：处理loader里的异步事情
    // const callback = this.async()
    // setTimeout(() => {
    //     const result = source.replace('world', opts.name)
    //     callback(null, result)
    // }, 2000)
}

// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap ?: SourceMap,
//     meta ?: any
// )
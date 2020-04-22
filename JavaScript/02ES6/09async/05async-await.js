// async和await
// 1 基本用法
const sleep = sec => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), sec * 1000)
})
const show = (async () => {
    console.log('aaa')
    // await后面必须跟异步操作[Promise对象]，比如ajax请求, new Promise, generator, 另一个async函数
    const a1 = await sleep(1)
    console.log(`a1的结果是${a1}`)
    console.log('bbb')
    const a2 = await sleep(2)
    console.log(`a2的结果是${a2}`)
    console.log('ccc')
})()
    // aaa
    // a1的结果是undefined 1s后
    // bbb
    // a2的结果是undefined 2s后
    // ccc

    // 2. 错误处理
    (async () => {
        try {
            let data1 = await $.ajax({ url: path1, dataType: 'json' })
            console.log(data1); //{"a": 3, "b": 5}
            if (data1.a + data1.b < 10) {
                try {
                    let data2 = await $.ajax({ url: path2, dataType: 'json' })
                    console.log(data2); // [12, 5, 8, 3]
                } catch (e) {
                    console.log('请求2报错')
                }
            } else {
                try {
                    let data3 = await $.ajax({ url: path3, dataType: 'json' })
                    console.log(data3); //{"name": "blue", "age": 18}
                } catch (e) {
                    console.log('请求3报错')
                }
            }
        } catch (e) {
            console.log('请求1报错')
        }

    })()



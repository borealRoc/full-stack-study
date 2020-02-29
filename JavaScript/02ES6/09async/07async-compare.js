// 回调地狱的解决方式：Promise、generator和async/await的对比

// 1、普通异步方式
// 优点：性能好
// 缺点：多重嵌套,书写复杂
$.ajax({
    url: 'url1',
    success(data1) {
        if (data1.a + data1.b < 10) {
            $.ajax({
                url: 'url2',
                success(data2) {
                    console.log(data2)
                },
                error(err) {
                    console.log('请求2报错')
                }
            })
        } else {
            $.ajax({
                url: 'url3',
                success(data3) {
                    console.log(data3)
                },
                error(err) {
                    console.log('请求3报错')
                }
            })
        }
    },
    error(err) {
        console.log('请求1报错')
    }
})

// 2、同步方式
// 优点：简单明了
// 缺点：性能差, 而且不能保证结果返回顺序
const data1 = $.ajax({ url: 'url1' })
const data2 = $.ajax({ url: 'url2' })
const data3 = $.ajax({ url: 'url3' })

// 3、Promise对象
// 优点：相比普通异步，书写稍微简单
// 缺点：对于有依赖性的请求，处理复杂
const p1 = $.ajax({url: 'url1'})
p1.then(data1 => {
    if (data1.a + data1.b < 10) {
        const p2 = $.ajax({url: 'url2'})
        p2.then(data2 => console.log(data2), err2 => console.log(err2))
    } else {
        const p3 = $.ajax({url: 'url3'})
        p3.then(data3 => console.log(data3), err3 => console.log(err3))
    }
}, err1 => console.log(err1))


// 4、generator函数
// 优点：能处理有依赖性的请求
// 缺点：依赖外部文件
function *req () {
    const g1 = yield $.ajax({url: 'url1'})
    if (g1.a + g1.b < 10) {
        const g2 = yield $.ajax({url: 'url2'})
    } else {
        const g3 = yield $.ajax({url: 'url3'})
    }
}
runner(req)

// 5、async/await
// 优点：能处理有依赖性的请求，原生支持，不需要支持依赖外部文件，书写简单
(async () => {
   const a1 = await $.ajax({url: 'url1'})
   if (a1.a + a1.b < 10) {
       const a2 = await $.ajax({url: 'url2'})
   } else {
       const a3 = await $.ajax({url: 'url3'})
   }
})()
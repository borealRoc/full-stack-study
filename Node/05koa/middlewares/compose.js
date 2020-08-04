async function fn1(next) {
    console.log("fn1 start")
    await next()
    console.log("fn1 end")
}
async function fn2(next) {
    console.log("fn2 start")
    await delay()
    await next()
    console.log("fn2 end")
}
async function fn3(next) {
    console.log("fn3")
}
const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()


function delay() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, 2000)
    })
}
function compose(middlewares) {
    return function () {
        // 执行第0个
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    // promise完成后，再执行下一个
                    return dispatch(i + 1)
                })
            )
        }
    }
}


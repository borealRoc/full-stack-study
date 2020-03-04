// 手写promise
// 1. Promise的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(fn) {
        // Promise状态
        // 一个Promise的当前状态必须是以下三种状态中的一种: 等待状态（Pending） 执行状态（Fulfilled） 和 拒绝状态（Rejected）
        this.state = PENDING
        // 终值
        // 所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值
        this.value = undefined
        // 拒因
        // 拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值
        this.reason = undefined
        // 成功回调队列
        this.onFulfilledCbs = []
        // 失败回调队列
        this.onRejectedCbs = []

        // 成功回调
        const resolve = value => {
            // 使用macro-task机制(setTimeout),确保onFulfilled异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
            setTimeout(() => {
                if (this.state === PENDING) {
                    // pending(等待态)迁移至 fulfilled(执行态)
                    this.state = FULFILLED
                    this.value = value
                    this.onFulfilledCbs.forEach(cb => {
                        this.value = cb(this.value)
                    })
                }
            })
        }
        // 失败回调
        const reject = reason => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    // pending(等待态)迁移至 fulfilled(拒绝态)
                    this.state = REJECTED
                    this.reason = reason
                    this.onRejectedCbs.forEach(cb => {
                        this.reason = cb(this.reason)
                    })
                }
            })
        }

        //马上执行
        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        // typeof onFulfilled === 'function' && this.onFulfilledCbs.push(onFulfilled)
        // typeof onRejected === 'function' && this.onRejectedCbs.push(onRejected)
        // return this

        // 1.then方法必须返回一个promise对象
        let promise2
        return (promise2 = new MyPromise((resolve, reject) => {
            typeof onFulfilled === 'function' && this.onFulfilledCbs.push(value => {
                let x = onFulfilled(value)
                // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
                resolvePromise(promise2, x)
            })
            typeof onRejected === 'function' && this.onRejectedCbs.push(reason => {
                let x = onRejected(reason)
                resolvePromise(promise2, x)
            })
        }))
    }
}

/*
 * 解析then返回值与新Promise对象
 * @param {Object} promise2 新的Promise对象 
 * @param {*} x 上一个then的返回值
 * @param {Function} resolve promise2的resolve
 * @param {Function} reject promise2的reject
 */
const resolvePromise = (promise2, x, resolve, reject) => {

}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
    }, 2000)
}).then(res => {
    console.log(res)
    return res + 1000
}).then(res => console.log(res))
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(fn) {
        this.state = PENDING
        this.value = null
        this.reason = null
        this.onFulFilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = FULFILLED
                    this.value = value
                    this.onFulFilledCallbacks.forEach(cb => {
                        this.value = cb(this.value)
                    })
                }
            })
        }

        const reject = reason => {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = REJECTED
                    this.reason = reason
                    this.onRejectedCallbacks.forEach(cb => {
                        this.reason = cb(this.reason)
                    })
                }
            })
        }

        try {
            fn(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulFilled, onRejected) {
        typeof onFulFilled === 'function' && this.onFulFilledCallbacks.push(onFulFilled)
        typeof onRejected === 'function' && this.onRejectedCallbacks.push(onRejected)
        return this
    }
}
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
})
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then()
    .then()
    .then(res => {
        console.log(res);
    });


// 基本用法
const p1 = new Promise((resolve, reject) => {
    $.ajax({
        url: '',
        success(data) {
            resolve(data)
        },
        error(err) {
            reject(err)
        }
    })
})
p1.then(data => console.log(data), err => console.log(err))

// jquery的ajax请求本质是个promise
$.ajax({
    url: '',
}).then(data => console.log(data), err => console.log(err))

// Promise all 
const ajaxRequest = url => $.ajax({ url: url })
const r1 = ajaxRequest(url1)
const r2 = ajaxRequest(url2)
const r3 = ajaxRequest(url3)
// r1, r2, r3三个请求都[resolve]成功才执行all
Promise.all([r1, r2, r3]).then(arr => {
    let [arr1, arr2, arr3] = arr
    console.log('r1的返回数据', arr1)
    console.log('r2的返回数据', arr2)
    console.log('r3的返回数据', arr3)
}, err => {
    console.log(err)
})

// Promise.race
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('failed')
    }, 500)
})
// p2, p3哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态
Promise.race([p2, p3]).then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)  // 执行结果是'failed',因为它获得比较快
})
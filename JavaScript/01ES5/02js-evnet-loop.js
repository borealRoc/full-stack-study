// JavaScript执行机制
// 1. javascript的特定
// 1.1 javascript是一门单线程语言
// 1.2 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。
// 2. 同步与异步
// 2.1 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）
// 2.2 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件
// 2.3 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行
// 2.4 主线程不断重复上面的第三步
// 3. 宏任务与微任务
// macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
// micro-task(微任务)：Promise，process.nextTick
// 3.1 进入整体代码(宏任务)后，开始第一次循环。
// 3.2 接着执行所有的微任务。
// 3.3 然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
// 在Node环境下，依次输出 1，7，6，8，2，4，3，5，9，11，10，12
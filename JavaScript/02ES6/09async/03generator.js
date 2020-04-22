// Generator函数
// 1. 定义
// function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)
function *g1 () {
    yield 'g1-1'
    yield 'g1-2'
    yield 'g1-3'
    return 'g1-return'
}
// 2. 返回值
// 返回Generator对象
console.log(g1()) //Object [Generator] {}
console.log(g1().toString()) //[object Generator]

// 3. 基本用法
// 生成器函数在执行时能暂停，后面又能从暂停处继续执行
function *g2() {
    console.log('g2-1')
    yield 'g2-2'
    console.log('g2-3')
    yield 'g2-4'
    console.log('g2-5')
    return 'g2-return'
}
const gen2 = g2()
console.log(gen2.next()) // g2-1 { value: 'g2-2', done: false }
console.log(gen2.next()) // g2-3 { value: 'g2-4', done: false }
console.log(gen2.next()) // g2-5 { value: 'g2-return', done: true }

// 4. 传参
// 通过next()传参
function *g4 () {
    let a = yield 'g4-1'
    console.log(a)
    let b = yield 'g4-2'
    console.log(b)
    return 'g4-return'
}
const gen4 = g4()
console.log(gen4.next()) //{ value: 'g4-1', done: false }
console.log(gen4.next('g4-aa')) //g4-aa { value: 'g4-2', done: false }
console.log(gen4.next('g4-bb')) //g4-bb { value: 'g4-return', done: true }

// 5. 利用递归执行生成器中所有步骤
function *g3() {
    yield 'g3-1'
    yield 'g3-2'
    yield 'g3-3'
    return 'g3-return'
}
const gen3 = g3()
const next = gen => {
    let {value, done} = gen.next()
    console.log('利用递归执行生成器中所有步骤',value)
    if (!done) next(gen)
}
next(gen3)
// 利用递归执行生成器中所有步骤 g3-1
// 利用递归执行生成器中所有步骤 g3-2
// 利用递归执行生成器中所有步骤 g3-3
// 利用递归执行生成器中所有步骤 g3-return


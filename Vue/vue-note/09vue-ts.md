# vue-ts
1. ts语法
    - 类型注解
        - 基本类型: string | number | boolean
        - 数组: string[] 或 Array<string>
        - 任意类型：any
    - 函数
        - 参数与返回值的类型注解
            - 必传参、有返回值
            - 可选参?
            - 无返回值值：void
        - 函数重载
    - 类class
        - 修饰符：public[默认], private, protected, readonly, static
            - 可修饰类成员，构造器和方法
        - 构造器
            - 初始化类成员
            - 传参、赋值
        - 计算属性：get, set
        - 继承
            - extends：继承方法
            - super：继承属性
        - 类可以用来约束数据结构
        - class是语法糖,它指向的就是构造函数,等效于构造函数+原型
    - 接口interface
        - 约束数据，仅定义结构，不需要实现
        - 用接口去约束类[仅检测类的公有属性]eg：`interface Person {}; class Me implements Person {}`
        - 面向接口编程eg：`function greet(person: Person) {}`
    - 泛型
        - 约束类型参数化
        - 泛型接口eg：`interface Result<T> {data: T[]}`
        - 泛型函数eg：`function getData<T>(data: T[]): Result<T> {}`
        - 使用泛型eg：`getData<Person>()`
    - 装饰器
        - 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性,访问符或参数上
        - 装饰器组合
            - 由上至下依次对装饰器表达式求值
            - 求值的结果会被当作函数，由下至上依次调用
        - 类装饰器：`function classDes(target: Function)`
        - 方法装饰器: `function methodDes(target: Function, name: string, descriptor: any)`
            - `target[name] === descriptor.value`
        - 访问器装饰器: `function getDes(target: Function, name: string, descriptor: any)`
        - 属性装饰器: `function propertyDes (target: Function, name: string)`
2. vue-ts实战




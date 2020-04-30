<template>
  <div class="ts-test-comp">
    <h2>TS基础语法</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { prototype } from "vue/types/umd";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}

// TypeScript基础语法
// 1. 类型注解
// 1.1 基本类型
const str: string = "字符串";
const num: number = 0;
const bool: boolean = true;
let anyType: any = "任意类型";
anyType = 0;
anyType = true;
const infer = "类型推论";
// 1.2 数组类型
// 1.2.1 数组类型的两种写法
const arr1: string[] = ["数组元素必须是字符串"];
const arr2: Array<number> = [0];
// 1.2.2 数组类型的多种类型
const arr3: (string | number)[] = [0, "数组元素可以是字符串或数字"];
const arr4: any[] = ["数组元素可以是任意数据类型", 0, false, undefined, null];
// 1.3 函数中的类型注解
// 1.3.1 参数与返回值的类型注解
const greet = (name: string): string => `hello, ${name}`;
console.log(greet("xu"));
// 1.3.2 无返回值
const log = (mes: string): void => {
  console.log(mes);
};
log("函数返回值void类型表示无返回值");

// 2. 函数
// 2.1 ts函数中参数如果声明了，就是必选参数[除非参数后面加‘？’]
// 可选参数放在在必选参数后面
const sayHello = (firstName: string, lastName?: string): string =>
  `hello, ${firstName} ${lastName}`;
console.log(sayHello("xu"));
console.log(sayHello("xu", "shao"));
// 2.2 函数重载：多个同名函数，通过参数数量或者类型不同或者返回值不同
// 先声明，再实现
function info(a: { name: string }): string;
function info(a: string): object;
function info(a: { name: string } | string): any {
  if (typeof a === "object") {
    return a.name;
  }
  return { name: a };
}
console.log(info({ name: "-xu-" }));
console.log(info("xuxuxu"));

// 3. 类
// 3.1 修饰符：TypeScript里，成员都默认为 public
// 3.1.1 public：可以自由的访问类里定义的成员
// 3.1.2 private: 不能在声明它的类的外部访问
// 3.1.3 protected: 与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
// 3.1.4 readonly: 将属性设置为只读的,只读属性必须在声明时或构造函数里被初始化
// 上面4个都属于类的实例成员，即仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上
// 3.1.5 static: 静态属性
// 3.1.6 构造器和方法也可以用修饰符
// 3.2 getter和setter
// 截取对对象成员的访问
// 暴露私有属性
// 在vue里面可以用作计算属性
class Person {
  public public_name: string;
  private private_name: string;
  protected protected_name: string;
  readonly readonly_name: string = "i am readonly";
  static static_age: number = 17;

  constructor(theName1: string, theName2: string, theName3: string) {
    this.public_name = theName1;
    this.private_name = theName2;
    this.protected_name = theName3;
  }
  sayAge() {
    console.log("static_age", Person.static_age);
  }
  // 暴露私有属性name2
  get privateName() {
    return this.private_name;
  }
  set privateName(val) {
    this.private_name = val;
  }
}

class Employee extends Person {
  constructor(public_name, private_name, protected_name) {
    super(public_name, private_name, protected_name);
  }
  sayName2() {
    // Property 'private_name' is private and only accessible within class 'Person'
    // console.log(this.private_name)
  }
  sayName3() {
    console.log(this.protected_name);
  }
}
const Person1 = new Person("public_name", "private_name", "protected_name");
console.log(Person1.public_name); //public_name
// Property 'private_name' is private and only accessible within class 'Person'
// console.log(Person1.private_name)
// Property 'protected_name' is protected and only accessible within class 'Person' and its subclasses.
// console.log(Person1.protected_name)
const Person2 = new Employee("Employee1", "Employee2", "Employee3");
Person2.sayName3(); //Employee3
console.log("readonly", Person1.readonly_name); // i am readonly
// Person1.readonly_name = 'modify readonly' //Cannot assign to 'readonly_name' because it is a read-only property.
Person1.sayAge(); //static_age 17
console.log("通过get访问到了Person的私有属性", Person1.privateName); //private_name
Person1.privateName = "set Person1.privateName2";
console.log("通过set设置了Person的私有属性", Person1.privateName); //set Person1.privateName2

// 3.3 类可以用来约束数据结构
class Shape {
  protected area: number;

  constructor(public color: string, width: number, height: number) {
    this.area = width * height;
  }

  shoutout() {
    return (
      "I'm " + this.color + " with an area of " + this.area + " cm squared."
    );
  }
}
class Square extends Shape {
  constructor(color: string, side: number) {
    super(color, side, side);
  }
  shoutout() {
    return "我是" + this.color + " 面积是" + this.area + "平方厘米";
  }
}
const square: Square = new Square("blue", 2);
console.log(square.shoutout()); //我是blue 面积是4平方厘米

// 4. 接口
// 4.1 interface，仅用来约束数据结构，不做具体方法实现
// 4.2 为什么不用类？因为用类来约束数据结构过程比较繁琐[比如要初始化...]
interface MySelf {
  firstName: string;
  lastName: string;
  sayHello(): string; //要求以MySelf接口为数据结构约束的变量必须有sayHello方法
}
// 面向接口编程
const greeting = (person: MySelf) => person.sayHello();
const user = {
  firstName: "Xu",
  lastName: "King",
  sayHello: function() {
    return `Hello, ${this.firstName} ${this.lastName}`;
  }
};
console.log("面向接口编程", greeting(user)); //Hello, Xu King
// 4.3 用接口去强制一个类去符合某种契约
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会检查类是否具有某些私有成员
class Me implements MySelf {
  public public_me = "public_me";
  private private_me = "private_me";
  // Type 'Me' is missing the following properties from type 'MySelf': firstName, lastNameVetur(2420)
  // constructor(public public_me = "", public private_me = "") {}
  constructor(public firstName = "", public lastName = "") {
    this.public_me = firstName;
    this.private_me = lastName;
  }
  sayHello() {
    return "Hello, " + this.firstName + " " + this.lastName;
  }
}
const me = new Me("__xu__", "--shao--");
console.log("类实现接口", me.sayHello()); //Hello, __xu__ --shao--

// 5. 泛型
// 泛型是指在定义函数，接口或类的时候，不预先指定具体的类型， 而在使用的时候再指定类型的一种特性
// 定义普通接口
interface Feature {
  id: number;
  name: string;
  version?: string;
}
// 定义泛型接口
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
// 定义泛型函数【使用泛型接口】
function getData<T>(data: T[]): Result<T> {
  // const data: T[] = [
  //   { id: 1, name: "类型注解", version: "2.0" },
  //   { id: 2, name: "编译型语 " },
  //   { id: 3, version: "3.0" }
  // ];
  return { ok: 1, data };
}
const data = [
  { id: 1, name: "类型注解", version: "2.0" },
  { id: 2, name: "编译型语 " }
  // { id: 3, version: "3.0" }
];
// 使用泛型【使用泛型函数】
const features = getData<Feature>(data).data;
console.log("泛型", features);

// 6. 装饰器
// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，属性,访问符或参数上
// 装饰器实际上是工厂函数，传人一个对象，输出处理后的新对象
// 6.1 装饰器组合
// 6.1.1 由上至下依次对装饰器表达式求值
// 6.1.2 求值的结果会被当作函数，由下至上依次调用
function f() {
  console.log("f(): evaluated");
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  };
}
function g() {
  console.log("g(): evaluated");
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  };
}
class C {
  @f()
  @g()
  method() {}
}
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

// 6.3 类装饰器
// 6.3.1 类的构造函数作为其唯一的参数
function ClassDes(target: any) {
  console.log("target是：", target);
  target.prototype.log = function() {
    console.log("bar是：", this.bar);
  };
  
}
@ClassDes
class Foo {
  bar = "~~bar~~"
}
const foo = new Foo();
foo.log()
// target是： ƒ Foo() {}
// bar是： ~~bar~~
// 6.3.2 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}
@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter("world"));
// _class {property: "property", hello: "override", newProperty: "new property"}

// 6.4 方法装饰器
// 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数
// 6.4.1 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 6.4.2 成员的名字
// 6.4.3 成员的属性描述符
function MethodDds(target: any, name: string, descriptor: any) {
  console.log("方法装饰器的三个参数分别是", target, name, descriptor);
  console.log("用方法装饰器修改之前的descriptor.value", descriptor.value);
  const laterMethod = descriptor.value;
  descriptor.value = function(val: string) {
    console.log("用方法装饰器修改之后的descriptor.value", descriptor.value);
    laterMethod.call(this, val);
  };
  return descriptor;
}
class Foo2 {
  foo = "原来的foo值";
  @MethodDds
  sayFoo(val: string) {
    this.foo = val;
    console.log(this.foo)
  }
}
const foo2 = new Foo2();
foo2.sayFoo("后来的foo值");
// 方法装饰器的三个参数分别是 {constructor: ƒ, sayFoo: ƒ} sayFoo {writable: true, enumerable: false, configurable: true, value: ƒ}
// 用方法装饰器修改之前的descriptor.value ƒ sayFoo(val) {
//       this.foo = val;
//       console.log(this.foo);
//     }
// 用方法装饰器修改之后的descriptor.value ƒ (val) {
//     console.log("用方法装饰器修改之后的descriptor.value", descriptor.value);
//     laterMethod.call(this, val);
//   }
// 后来的foo值

// 6.5 访问器装饰器
// 访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数
// 6.5.1 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
// 6.5.2 成员的名字
// 6.5.3 成员的属性描述符
function getterDes(val: boolean) {
  return function(target: any, name: string, descriptor: any) {
    console.log("访问器装饰器的是三个参数是", target, name, descriptor);
    console.log("访问器装饰器装饰前的descriptor", descriptor);
    descriptor.configurable = val;
    console.log("访问器装饰器装饰后的descriptor", descriptor);
  };
}
class Point {
  private _x: number;
  constructor(x: number) {
    this._x = x;
  }
  @getterDes(false)
  get x() {
    return this._x;
  }
}
const point = new Point(1000);
console.log(point.x);
// 访问器装饰器的是三个参数是 {constructor: ƒ} x {set: undefined, enumerable: false, configurable: true, get: ƒ}
// 访问器装饰器装饰前的descriptor {set: undefined, enumerable: false, configurable: true, get: ƒ}
// 访问器装饰器装饰后的descriptor {set: undefined, enumerable: false, configurable: false, get: ƒ}
// 1000

// 6.6 属性装饰器
// 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数
// 6.6.1 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 6.6.2 成员的名字
function propertyDes(target: any, name: string) {
  console.log("属性装饰器的两个参数是", target, name);
  console.log("属性装饰器装饰前的target[name]", target[name]);
  target[name] = "我是在属性装饰器装饰被修改赋值的";
  console.log("属性装饰器装饰后的target[name]", target[name]);
}
class Foo3 {
  @propertyDes
  foo3: string;
}
const foo3 = new Foo3();
console.log(foo3.foo3);
// 属性装饰器的两个参数是 {constructor: ƒ} foo3
// 属性装饰器装饰前的target[name] undefined
// 属性装饰器装饰后的target[name] 我是在属性装饰器装饰被修改赋值的
// 我是在属性装饰器装饰被修改赋值的
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

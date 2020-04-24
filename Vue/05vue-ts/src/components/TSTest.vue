<template>
  <div class="ts-test-comp">
    <h2>TS基础语法及VueTS实战</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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
    // Property 'name2' is private and only accessible within class 'Person'
    // console.log(this.name2)
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
// Cannot assign to 'readonly_name' because it is a read-only property.
// Person1.readonly_name = 'modify readonly'
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
  sayHello(): string; //要求以Person接口为数据结构约束的变量必须有sayHello方法
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
  constructor(public firstName = "", public lastName = "") {}
  sayHello() {
    return "Hello, " + this.firstName + " " + this.lastName;
  }
}
const me = new Me("__xu__", "--shao--");
console.log("类实现接口", me.sayHello()); //Hello, __xu__ --shao--

// 5. 泛型
// 泛型是指在定义函数，接口或类的时候，不预先指定具体的类型， 而在使用的时候再指定类型的一种特性
// 定义泛型接口
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
// 定义泛型函数

// 6. 装饰器
// 装饰器实际上是工厂函数，传人一个对象，输出处理后的新对象
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

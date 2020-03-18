<template>
  <div class="com-pratice">
    <h1 class="com-pratice-hd">{{course}}{{title}}</h1>
    <div class="com-pratice-ctn">
      <ul class="com-lists">
        <li class="com-list">
          <h2>1. 组件传值、通信</h2>
          <dl>
            <dt>1.1 父组件 => 子组件</dt>
            <dd><router-link to="/course">1.1.1 属性props</router-link></dd>
            <dd><router-link to="/course">1.1.2 引用refs -- [不建议使用,相当于在子组件直接更改Prop]</router-link></dd>
            <dd><router-link to="/course">1.1.3 子组件chidren -- [不建议使用,相当于在子组件直接更改Prop]</router-link></dd>
          </dl>
          <dl>
            <dt>1.2 子组件 => 父组件</dt>
            <dd><router-link to="/course">1.2.1 自定义事件</router-link></dd>
          </dl>
          <dl>
            <dt>1.3 兄弟组件</dt>
            <dd><router-link to="/course">1.3.1 通过共同的父组件，用事件把数据传给父组件，再由父组件传给子组件</router-link></dd>
            <dd><router-link to="/course">1.3.2 通过共同的祖辈组件搭桥，$parent或$root</router-link></dd>
            <dd>1.3.3 上面两种方式本质上是一样的，但方式一比较容易好[容易理解]</dd>
          </dl>
          <dl>
            <dt>1.4 祖先和后代之间</dt>
            <dd><router-link to="/course">1.4.1 provide/inject：能够实现祖先给后代传值</router-link></dd>
          </dl>
          <dl>
            <dt>1.5 任意两个组件之间</dt>
            <dd><router-link to="/course">1.5.1 事件总线：创建一个Bus类负责事件派发、监听和回调管理</router-link></dd>
            <dd>1.5.2 Vuex</dd>
          </dl>
        </li>
        <li class="com-list">
          <h2>2. 插槽</h2>
          <dl>
            <dd>2.1 匿名插槽</dd>
            <dd>2.2 具名插槽</dd>
            <dd>2.3 作用域插槽</dd>
          </dl>
        </li>
      </ul>
      <div class="com-ctt">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComPratice",
  props: {
    title: String,
    course: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.com-pratice-hd {
  text-align: center;
  line-height: 100px;
}
.com-pratice-ctn {
  display: flex;
}
.com-lists,
.com-ctt {
  flex: 1;
  padding-left: 20px;
}
h1 {
  color: red;
}
h2 {
  color: green;
}
ul {
  list-style: none;
}
dt {
  color: blue;
  padding-left: 1em;
}
dd {
  padding-left: 2em;
}
dl {
  line-height: 2;
}
</style>

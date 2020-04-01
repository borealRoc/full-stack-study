<template>
  <div class="com-pratice">
    <h1 class="com-pratice-hd">{{course}}{{title}}</h1>
    <div class="com-pratice-ctn">
      <ul class="com-lists">
        <li class="com-list">
          <h2>1. 组件传值、通信</h2>
          <dl>
            <dt>1.1 父组件 => 子组件</dt>
            <dd>
              <router-link to="/course">1.1.1 属性props</router-link>
            </dd>
            <dd>
              <router-link to="/course">1.1.2 引用refs -- [不建议使用,相当于在子组件直接更改Prop]</router-link>
            </dd>
            <dd>
              <router-link to="/course">1.1.3 子组件chidren -- [不建议使用,相当于在子组件直接更改Prop]</router-link>
            </dd>
          </dl>
          <dl>
            <dt>1.2 子组件 => 父组件</dt>
            <dd>
              <router-link to="/course">1.2.1 自定义事件</router-link>
            </dd>
          </dl>
          <dl>
            <dt>1.3 兄弟组件</dt>
            <dd>
              <router-link to="/course">1.3.1 通过共同的父组件，用事件把数据传给父组件，再由父组件传给子组件</router-link>
            </dd>
            <dd>
              <router-link to="/course">1.3.2 通过共同的祖辈组件搭桥，$parent或$root</router-link>
            </dd>
            <dd>1.3.3 上面两种方式本质上是一样的，但方式一比较容易好[容易理解]</dd>
          </dl>
          <dl>
            <dt>1.4 祖先和后代之间</dt>
            <dd>
              <router-link to="/course">1.4.1 provide/inject：能够实现祖先给后代传值</router-link>
            </dd>
          </dl>
          <dl>
            <dt>1.5 任意两个组件之间</dt>
            <dd>
              <router-link to="/course">1.5.1 事件总线：创建一个Bus类负责事件派发、监听和回调管理</router-link>
            </dd>
            <dd>1.5.2 Vuex: 创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更</dd>
          </dl>
        </li>
        <li class="com-list">
          <h2>2. 插槽</h2>
          <dl>
            <dt>2.1 插入内容</dt>
            <dd>
              <router-link to="/popup">2.1.1 匿名插槽</router-link>
            </dd>
            <dd>
              <router-link to="/popup">2.1.2 具名插槽</router-link>
            </dd>
            <dd>
              <router-link to="/popup">2.1.3 作用域插槽</router-link>
            </dd>
          </dl>
        </li>
        <li class="com-list">
          <h2>3. 组件设计</h2>
          <dl>
            <dt>3.1 组件设计</dt>
            <dd>
              <router-link to="/useMyForm">3.1.1 组件传值，通信和插槽综合运用：模仿Element-UI设计Form表单组件</router-link>
            </dd>
            <dd @click="showDialog">3.1.2 动态组件实例的创建：设计一个Dialog组件</dd>
            <dd>
              <router-link to="/useTree">3.1.3 递归组件: 设计一个Tree组件</router-link>
            </dd>
          </dl>
        </li>
        <li class="com-list">
          <h2>4. Vuex数据管理</h2>
          <dl>
            <dt><router-link to="/vuexBasicUse">4.1 Vuex核心概念</router-link></dt>
            <dd>4.1.1 state -- 状态: 保存数据</dd>
            <dd>4.1.2 getters -- state的计算属性</dd>
            <dd>4.1.3 mutations -- 变更:修改state[commit]</dd>
            <dd>4.1.4 actions -- 动作: 业务逻辑[dispatch]</dd>
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
import MyPopup from "@/components/popup/MyPopup.vue";

export default {
  name: "ComPratice",
  props: {
    title: String,
    course: String
  },
  methods: {
    showDialog() {
      const notice = this.$create(MyPopup, {
        message: "动态组件实例的创建--弹窗组件",
        duration: 2000
      });
      notice.show();
    }
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

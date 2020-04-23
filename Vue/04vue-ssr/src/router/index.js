import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";

Vue.use(Router);

// 每次用户请求都应该是全新router实例??
// 因为每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染。所以这里导出的是创建Router实例的工厂函数。
export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/home", component: Home},
      { path: "/about", component: About},
    ],
  });
}
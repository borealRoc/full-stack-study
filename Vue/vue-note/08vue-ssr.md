# SSR
1. 传统jsp vs SPA vs SSR
    - <https://juejin.im/post/5c9a05eef265da60ec282b28>
2. nuxt
    - 安装 `npx create-nuxt-app <项目名>`
    - 启动：`npm run dev`
    - 路由
        - 在/pages文件下新建页面时，会自动生成对应路由
        - 导航: `<nuxt-link>`
        - 导航渲染页：`<nuxt/>`
        - 动态路由：`pages/detail/_id.vue`
        - 嵌套路由：`pages/detail/_id.vue` + `pages/detail.vue`
        - 扩展路由：`nuxt.config.js` -- `router: {extendRoutes () {}}`
    - 视图
        - 默认布局： `layouts/default.vue`
        - 自定义布局： `export default {layout: 'blank'}`
        - 自定义错误页面： `layouts/error.vue`
    - 异步数据
        - asyncData
            - 此方法在加载（渲染）组件（页面组件，即pages文件夹下的文件，不包含components下的）之前在服务端或路由更新之前被调用，即可以进行异步获取数据并返回当前组件
            - 它是在组件初始化前被调用的, 所以该方法没有办法通过this来引用组件的实例对象
            - 第一个参数为当前页面的上下文
        - fetch
            - 该方法用于渲染页面（页面组件加载前被调用【服务端或切换至目标路由之前】）前填充应用的状态树（store）数据,与asyncData方法类似，不同的是它不会设置组件的数据
            - 第一个参数为当前页面的上下文
    - 中间件
        - 路由跳转之前会运行中间件函数，常用于权限控制、数据处理、校验等
        - 在应用中的特定页面设置中间件: `middleware: 'authenticated'`
    - 插件
        - nuxt初始化时执行一次，用于插件初始化、拦截器定义、接口注入等
    - nuxtServerInit
        - 只会在服务器初始化的时候执行一次
        - 必须声明在store根模块index.js
    - 部署
        - 先进行编译构建: `npm run build`
        - 再启动 Nuxt 服务: `npm start`
        - 静态应用部署, Nuxt.js 可依据路由配置将应用静态化，使得我们可以将应用部署至任何一个静态站点主机服务商: `npm run generate`
3. vue-ssr
    - <https://segmentfault.com/a/1190000020249126>
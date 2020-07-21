# vue最佳实践
1. 项目配置--vue.config.js
    - webpack-chiin[链式操作]: 修改webpack配置
2. 项目结构
    - src
        - /api: 前端请求
        - /directive: 自定义指令
        - /icons: 图标文件
        - /layout: 布局文件
        - /store: 模块化[user, per]
        - /utils: 全局公共方法[eg: axios请求方法封装]
    - .env.development: 后端接口公共路径
    - vue.config.js: vue-cli的webpack拓展
3. 权限控制
    - 路由分为两种：constantRoutes 和 asyncRoutes
    - 导航菜单根据权限动态显示
    - 按钮级别权限：自定义指令
4. 数据交互
    - 请求拦截: 把本地保存的token发给服务器 --> 服务器验证浏览器传过来的token
    - 响应拦截: 服务器对有异常[普通异常和token异常登]的请求返回错误信息 --> 浏览器接收异常
    - 本地mock: 修改vue.config.js，给devServer添加相关代码
    - 线上mock: esay-mock<https://easy-mock.com/>
    - 解决跨域[代理]
    ```javascript
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: {
            // /dev-api/user/login  => /user/login
            ["^" + process.env.VUE_APP_BASE_API]: ""  
        }
      }
    },
    ```
5. UI库
    - PC：element-ui
    - Mobile: cube-ui
6. 测试
    - 黑盒测试[E2E端到端]：根据测试用例测试功能
    - 白盒测试[Unit单元测试]: 针对内部核心逻辑写测试代码
        - 在vue中，unit测试推荐用Mocha+Chai或者Jest，e2e测试推荐用cypress   
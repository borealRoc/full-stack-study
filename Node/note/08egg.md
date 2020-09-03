# egg
## 一、基本用法
1. 约定优于配置
    - `app.js` 自定义启动时的初始化工作(生命周期)
    - `app/router.js`: 路由 —— 描述请求 URL 和具体承担执行动作的 Controller 的对应关系
    - `app/controller/**`: 控制器 —— 解析用户的输入，处理后返回相应的结果
    - `app/service/**`: 服务 —— 编写业务逻辑层
    - `app/model/**`: 模型层 —— 数据库相关
    - `app/middleware/**`: 编写中间件
    - `app/public/**`: 放置静态资源, 自动部署到静态资源服务器
    - `app/extend/**` 用于框架的扩展, 比如编写helper工具函数
    - `config/config.{env}.js`: 用于编写配置文件
    - `config/plugin.js`: 用于配置需要加载的插件
## 二、原理 —— 基于Koa实现MVC框架

## 三、更佳实践
1. 添加swagger-doc自动生成路由和接口文档：`npm install egg-swagger-doc-feat -s`
    - 1.1 `app/contract/index.js` 定义`baseRequest`和`baseResponse`
    - 1.2 `/app/contract/user.js` 定义`createUserRequest`
    - 1.3 `config/plugin.js` 添加swaggerdoc插件
    - 1.4 `config/config.default.js` 编写swaggerdoc配置
    - 1.5 `controller/user.js` 添加UserController, 通过注释的方式测试能否生成接口文档
2. 增加异常处理中间件
    - 2.1 `app/middleware/error_handler.js` 编写错误异常处理中间件
    - 2.2 `config/config.default.js` 注册错误异常处理中间件 `config.middleware = ['errorHandler']`
3. helper⽅法实现统⼀响应格式
    - `app/extend/helper.js` 编写“统一响应格式”的工具函数
    ```javascript
     exports.success = ({ ctx, res = null, msg = '请求成功' })=> {
        ctx.body = {
            code: 0,
            data: res,
            msg
        }
        ctx.status = 200
    }
    ```
    - `controller/user.js` 调用helper `ctx.helper.success({ctx, res})`
4. Validate检查: `npm i egg-validate -s`
    - 4.1 `config/plugin.js` 添加validate插件
    - 4.2 在接口中执行校验 `ctx.validate(ctx.rule.createUserRequest)`
5. 三层结构
    - 5.1 添加Model层：`npm i egg-mongoose -S`
        - 5.1.1 `config/plugin.js`: 添加mongoose插件
        - 5.1.2 `config.default.js`: 编写mongoose配置
        - 5.1.3 `model/user.js`: 定义 UserSchema
    - 5.2. 添加Service层：`npm i egg-bcrypt -s //egg-bcrypt用于加密`
        - 5.2.1 `config/plugin.js`: 添加bcrypt插件
        - 5.2.2 `service/user.js` 创建⽤户, 从mongoose[UserModel]获取用户数据
        ```javascript
        async create(payload) {
            const { ctx } = this
            payload.password = await ctx.genHash(payload.password)
            return ctx.model.User.create(payload)
        }
        ```
    - 5.3 `controller/user.js` 调用 UserService , 在 /api/user 接口返回用户数据
    ```javascript
    async create() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(ctx.rule.createUserRequest)
        // 组装参数
        const payload = ctx.request.body || {}
        // 调⽤ Service 进⾏业务处理
        const res = await service.user.create(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx, res})
    }
    ```
6. 通过生命周期初始化数据：`app.js //写在didReady()里面`
7. 用户鉴权：`npm i egg-jwt -s`
    - 7.1 `config/plugin.js`: 添加jwt插件
    - 7.2 `config.default.js`: 编写jwt配置
    ```javascript
    config.jwt = {
        secret: 'Great4-M', //自己保存的密文
        match: /^\/api/, // 表示所有以/api/开头的接口都要鉴权
    }
    ```
    - 7.3 `service/actionToken.js` 设置jwt规则
    ```javascript
    return ctx.app.jwt.sign({
        data: {
            _id: _id // 将用户id设为jwt data
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) //设置过期时间为一周
    }, ctx.app.config.jwt.secret) // 将自己保存的密文结合用户id进行加密
    ```
    - 7.4 `service/userAccess.js` 登录鉴权逻辑，生成Token令牌
    - 7.5 `controller/userAccess.js` 登录，登出接口
    - 7.6 `contract/userAccess.js` 定义`loginRequest`, 生成登陆，登出接口文档
8. 文件上传：`npm i await-stream-ready stream-wormhole image-downloader -s`
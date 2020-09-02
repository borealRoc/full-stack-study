# egg
## 一、基本用法
1. 约定优于配置
    - `aopp/router.js`: 路由 —— 描述请求 URL 和具体承担执行动作的 Controller 的对应关系
    - `app/controller/**`: 控制器 —— 解析用户的输入，处理后返回相应的结果
    - `app/service/**`: 服务 —— 编写业务逻辑层
    - `app/model/**`: 模型层 —— 数据库相关
    - `config/config.{env}.js`: 用于编写配置文件
    - `config/plugin.js`: 用于配置需要加载的插件
## 二、原理（未完后续）
1. 路由处理
2. 控制器：抽取routes中业务逻辑至controller
3. 服务：抽离通用逻辑至service文件夹，利于复用

## 三、更佳实践
1. 添加swagger-doc自动生成路由和接口文档：`npm install egg-swagger-doc-feat -s`
2. 增加异常处理中间件: `app/middleware/error_handler.js`
3. helper⽅法实现统⼀响应格式: `app/extend/helper.js`
4. Validate检查: `npm i egg-validate -s`
5. 添加Model层：`npm i egg-mongoose -S`
6. 添加Service层：`npm i egg-bcrypt -s`
7. 通过生命周期初始化数据
8. 用户鉴权：`npm i egg-jwt -s`
9. 文件上传：`npm i await-stream-ready stream-wormhole image-downloader -s`
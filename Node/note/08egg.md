# egg
## 一、基本用法
1. 约定优于配置
    - `aopp/router.js`: 路由 —— 描述请求 URL 和具体承担执行动作的 Controller 的对应关系
    - `app/controller/**`: 控制器 —— 解析用户的输入，处理后返回相应的结果
    - `app/service/**`: 服务 —— 编写业务逻辑层
    - `app/model/**`: 模型层 —— 数据库相关
    - `config/config.{env}.js`: 用于编写配置文件
    - `config/plugin.js`: 用于配置需要加载的插件
## 二、原理
1. 路由处理
2. 控制器：抽取routes中业务逻辑至controller
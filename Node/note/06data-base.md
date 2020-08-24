# 数据持久化
1. 文件系统 - fs
2. 关系型数据库 - mysql
    - MySQL 安装、配置
        - MySQL服务端：MySQL
        - MySQL客户端：Navicat for MySQL
    - MySQL基础概念
        - 库：文件夹，不能存放数据，只能管理表
        - 表：文件，存放数据
        - 字段：列
        - 行：一条数据
    - node原生驱动
        - 常规写法：`npm i mysql -S`
        - ES2017写法：`npm i mysql2 -S`
    - Sequlize
        - 基于Promise的ORM(像操作对象一样操作数据库)
    - 拓展：MySQL和Oracle都是常见的关系型数据库
        - MySQL: 免费; 绝大多数普通应用; 性能很高、安全性很高; 容灾略差
        - Oracle: 收费; 金融、医疗; 容灾特别强
3. 文档型数据库 - mongodb
4. 键值对数据库 - redis
# 数据持久化
1. 文件系统 - Node·fs
2. 关系型数据库 - mysql
    - 2.1 安装、配置
        - MySQL服务端：MySQL
        - MySQL客户端：Navicat for MySQL
    - 2.2 概念解析
        - 库：文件夹，不能存放数据，只能管理表
        - 表：文件，存放数据
        - 字段：列
        - 行：一条数据
    - 2.3 node原生驱动
        - 常规写法：`npm i mysql -S`
        - ES2017写法：`npm i mysql2 -S`
    - 2.4 Sequlize
        - 基于Promise的ORM(像操作对象一样操作数据库)
        - `npm i sequelize mysql2 -S`
    - 2.5 拓展：MySQL和Oracle都是常见的关系型数据库
        - MySQL: 免费; 绝大多数普通应用; 性能很高、安全性很高; 容灾略差
        - Oracle: 收费; 金融、医疗; 容灾特别强
3. 文档型数据库 - mongodb
    - 3.1 安装
    - 3.2 概念解析

    |说明|SQL概念|MongoDB概念|Mongoose概念
    |-|-|-|-|
    |数据库|database|new MongoDB() 实例|Mongoose
    |表|table|collection(集合)|模板（schema）+ 模型（Model）
    |列(字段)|column|field|field
    |行|row|document(文档)|instance(实例)
    |索引|index|index|index
    |主键|primary key|primary key(MongoDB自动将_id字段设置为主键)|primary key(Mongoose自动将_id字段设置为主键)
    |表关联|table joins|不支持，只能嵌入|不支持

    - 3.3 node原生驱动: `npm install mongodb -S`
    - 3.4 ODM-Mongoose: `npm install mongoose -S`
        - 通过关系型数据库的思想来设计非关系型数据库
        - 基于mongodb驱动
4. 键值对数据库 - redis
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

    |说明|SQL概念|Sequlize概念|MongoDB概念|Mongoose概念
    |-|-|-|-|-|
    |数据库|database|new Sequlize()实例|new MongoDB() 实例|Mongoose
    |表|table|模型(Modal)|collection(集合)|模板（schema）+ 模型（Model）
    |列(字段)|column|modal.key|field|field
    |行|row|modal[key].val|document(文档)|instance(实例)
    |索引|index|index|index|index
    |主键|primary key|可以自定义id|primary key(MongoDB自动将_id字段设置为主键)|primary key(Mongoose自动将_id字段设置为主键)
    |表关联|table joins|支持|不支持，只能嵌入|不支持

    - 3.3 node原生驱动: `npm install mongodb -S`
    - 3.4 ODM-Mongoose: `npm install mongoose -S`
        - 通过关系型数据库的思想来设计非关系型数据库
        - 基于mongodb驱动
4. 键值对数据库 - redis
5. 各种数据基础写法对比
    - 5.1 mysql
    ```javascript
    (async () => {
        const mysql = require('mysql2/promise')
        const cfg = {}
        const connect = await mysql.createConnection(cfg)
        // 建表、增删查改
        const sql_operator = await connect.execute(SQL_SENTENCE)
    })()
    ``` 
    - 5.2 sequlize
    ```javascript
    (async () => {
        const Sequlize = require('sequlize')
        const cfg = {}
        const connect = new Sequlize(cfg)
        // 定义模型（创建表）、增删查改
        const Model = connect.define("model_name", {
            field_1: {},
            field_2: {}
        })
        const insert_op = await Model.create({field_1: 'field_1_val',field_2: 'field_2_val'})
        const find_op = await Model.findOne({where: {field_1: 'field_1_val'}})
        const update_op = await Model.update({field_2: 'field_22_val'}, {{where: {field_1: 'field_1_val'}})
        const delete_op = await Model.destroy({where: {field_1: 'field_1_val'}}) 
    })()
    ``` 
    - 5.3 mongobd
    ```javascript
    (async () => {
        const { MongoClient: MongoDB } = require('mongodb')
        const cfg = {}
        const client = new MongoDB(config)
        let mongodb_connect = await client.connect()
        // 创建数据库（mysql和sequlize创建数据库的步骤定义在配置中cfg）
        const mongodb_database = client.db('mongodb_database_name')
        // 创建集合（表）、增删查改
        const mongodb_collection = mongodb_database.collection('mongodb_collection_name')
        const insert_op = await mongodb_collection.insertOne({field: 'field_1_val', field_2: 'field_2_val'})
        const find_op = await mongodb_collection.findOne()
        const update_op = await mongodb_collection.updateOne({field: 'field_1_val'}, {$set: {field: 'field_11_val', field_2: 'field_22_val'}})
        const delete_op = await mongodb_collection.deleteOne({field_1: 'field_11_val'})
        // 关闭连接
        client.close()
    })()
    ```
    - 5.4 mongoose
    ```javascript
    const mongoose = require('mongoose')
    const cfg = {}
    const mongoose_connect = mongoose.connect(cfg).connection
    mongoose_connect.once('open', async () => {
        // 定义一个Schema
        const Schema = mongoose.Schema({
            field_1: String,
            field_2: String,
        })
        // 创建集合（表）、增删查改
        // Schema + Model = Collection
        const Model = mongoose.model('Mongoose_Model_Name', Schema)
        const insert_op = await Model.create({field: 'field_1_val', field_2: 'field_2_val'})
        const find_op = await Model.find({field: 'field_1_val'})
        const update_op = await Model.updateOne({field: 'field_1_val'}, {$set: {field: 'field_11_val', field_2: 'field_22_val'}})
        const delete_op = await Model.deleteOne({field_1: 'field_11_val'})
    })
    ```
// 基于Promise的ORM(像操作对象一样操作数据库)， 持多种数据库、事务、关联等

(async () => {
    const Sequelize = require("sequelize")

    // 建立连接
    const sequelize = new Sequelize("20200312", "root", "QSXdr1991", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    })

    // 定义模型[创建表]
    const Fruit = sequelize.define("Fruit", {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    }, {
        // 避免自动生成时间戳字段
        timestamps: false
    })
    // 同步数据库，force: true则会删除已存在表 
    let ret = await Fruit.sync({ force: true })

    // 增
    ret = await Fruit.create({ name: "香蕉", price: 3.5 })
    ret = await Fruit.create({ name: "苹果", price: 4.5 })
    ret = await Fruit.create({ name: "葡萄", price: 5.5 })

    // 查
    ret = await Fruit.findAll()
    console.log('查', JSON.stringify(ret))
})()
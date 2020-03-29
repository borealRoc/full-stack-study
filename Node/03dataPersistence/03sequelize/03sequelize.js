// 基于Promise的ORM(像操作对象一样操作数据库)， 持多种数据库、事务、关联等
(async () => {
    const Sequelize = require("sequelize")

    // 1. 建立连接
    const sequelize = new Sequelize("20200312", "root", "QSXdr1991", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    })

    // 2. 定义模型[创建表]
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            // Getters & Setters:可用于定义伪属性或映射到数据库字段的保护属性
            // Getters & Setters(1): 定义为属性的一部分
            // get() {
            //     const fname = this.getDataValue("name")
            //     const price = this.getDataValue("price")
            //     const stock = this.getDataValue("stock")
            //     return `${fname}(价格:¥${price} 库存:${stock}kg)`
            // }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            // 校验
            validate: {
                isFloat: { msg: "价格字段请输入数字" },
                min: { args: [0], msg: "价格字段必须大于0" }
            }
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                isNumeric: { msg: "库存字段请输入数字" }
            }
        },
        // UUID-主键
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
    }, {
        // 避免自动生成时间戳字段
        timestamps: false,
        // Getters & Setters(2): 定义为模型选项options中
        getterMethods: {
            amount() {
                return this.getDataValue("stock") + "kg"
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg')
                const v = val.slice(0, idx)
                this.setDataValue('stock', v)
            }
        }
    })
    // 2.2 模型扩展:可添加模型实方法或类方法扩展模型
    // 2.2.1 添加类级别方法
    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉', '芒果', '椰子'] // 热带水果
        return tropicFruits.includes(name) ? '热带水果' : '其他水果'
    }
    // 2.2.2 添加实例级别方法
    Fruit.prototype.totalPrice = function (count) {
        return (this.price * count).toFixed(2)
    }
    // 2.3 同步数据库，force: true则会删除已存在表 
    let ret = await Fruit.sync({ force: true })

    // 3. 操作数据库的方法
    // 3.1 增
    ret = await Fruit.create({ name: "苹果", price: 4.5 })
    ret = await Fruit.create({ name: "葡萄", price: 5.5 })
    ret = await Fruit.create({ name: "香蕉", price: 3.5 })
    ret = await Fruit.create({ name: "梨", price: 2.5 })
    ret = await Fruit.create({ name: "西瓜", price: 1.5 })

    // 3.2 对整个表格进行操作
    // 3.2.1 通过模型实例对每一条数据进行操作
    Fruit.findAll().then(fruits => {
        fruits.forEach((fruit, n) => {
            // 修改amount，触发setterMethods
            fruit.amount = `${100 * (n + 1)}kg`
            // 修改后执行save()，保存修改
            fruit.save()
            // 读取amount，触发getterMethods
            console.log('fruit.amount', fruit.amount)
            // 使用类方法
            console.log(`${fruit.name}是${Fruit.classify(fruit.name)}`)
            // 使用实例方法
            console.log(`买5kg${fruit.name}需要￥${fruit.totalPrice(5)}`)
        })
    })
    // 3.2.2 分页
    Fruit.findAll({
        offset: 0,
        limit: 2,
    })
    // 3.2.3 排序 
    Fruit.findAll({
        order: [['price', 'DESC']],
    })
    // 3.2.4 聚合
    Fruit.max("price").then(max => {
        console.log("聚合max", max)
    })
    Fruit.sum("price").then(sum => {
        console.log("聚合sum", sum)
    })

    // 3.3 查
    ret = await Fruit.findAll()
    console.log('查找所有数据', JSON.stringify(ret))
    // 3.3.1 通过属性查询
    Fruit.findOne({ where: { name: "香蕉" } }).then(fruit => {
        // fruit是首个匹配项，若没有则为null
        console.log('通过属性查询', fruit.get())
    })
    // 3.3.2 指定查询字段
    Fruit.findOne({ attributes: ['name'] }).then(fruit => {
        // fruit是首个匹配项，若没有则为null
        console.log('指定查询字段', fruit.get())
    })
    // 3.3.3 获取数据和总条数
    Fruit.findAndCountAll().then(result => {
        console.log('获取数据和总条数result', result)
        console.log('获取数据和总条数result.count', result.count)
        console.log('获取数据和总条数result.rows.length', result.rows.length)
    })
    // 3.3.4 查询操作符
    const Op = Sequelize.Op
    Fruit.findAll({
        // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
        where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
    }).then(fruits => {
        console.log('查询操作符', fruits)
    })
    // 3.3.5 或语句 
    Fruit.findAll({
        // where: { [Op.or]:[{price: { [Op.lt]:4 }}, {stock: { [Op.gte]: 100}}] }
        where: { price: { [Op.or]: [{ [Op.gt]: 3 }, { [Op.lt]: 2 }] } }
    }).then(fruits => {
        console.log('或语句', fruits[0].get())
    })

    // 3.4 改
    // 方式1
    // Fruit.findById(1).then(fruit => {
    //     fruit.price = 4
    //     fruit.save().then(() => console.log('update!!!!'))
    // })
    // 方式2
    Fruit.update({ price: 6.5 }, { where: { name: "香蕉" } }).then(r => {
        console.log('更新成功')
    })

    // 3.5 删
    // 方式1
    Fruit.findOne({ where: { name: "香蕉" } }).then(r => r.destroy())
    // 方式2
    Fruit.destroy({ where: { name: "苹果" } }).then(r => console.log(r))
})()
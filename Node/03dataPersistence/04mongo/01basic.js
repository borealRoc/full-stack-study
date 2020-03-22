(async () => {
    const { MongoClient: MongoDB } = require('mongodb')
    // 1. 创建客户端
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            userNewUrlParser: true
        }
    )
    let ret
    // 2. 创建连接
    ret = await client.connect()
    // 3. 创建数据库'test'
    const db = client.db('test')
    // 4. 创建集合'fruits'
    const fruits = db.collection('fruits')

    // 5. 添加文档
    ret = await fruits.insertOne({
        name: '芒果',
        price: 20.1
    })
    console.log('添加文档', JSON.stringify(ret))
    // 6. 查询文档
    ret = await fruits.findOne()
    console.log('查询文档:', ret)
    // 7. 更新文档
    ret = await fruits.updateOne({ name: '芒果' },
        { $set: { name: '香蕉', price: 2000 } })
    console.log('更新文档', JSON.stringify(ret.result))
    // 8. 删除文档
    ret = await fruits.deleteOne({ name: '芒果' })
    await fruits.deleteMany()
})()

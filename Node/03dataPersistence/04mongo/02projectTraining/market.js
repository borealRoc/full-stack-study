const express = require("express")
const app = express()
const path = require("path")
const mongo = require("./models/db")

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./market.html"))
})

app.get("/api/list", async (req, res) => {
    // 分页查询
    const { page, category, keyword } = req.query
    // 构造条件
    const condition = {}
    if (category) {
        condition.category = category
    }
    if (keyword) {
        condition.name = { $regex: new RegExp(keyword) }
    }
    console.dir(condition)
    try {
        const col = mongo.col("markets")
        // 数据总条数
        const total = await col.find().count()
        console.log(`total是${total}`)
        // 每页10条
        const fruits = await
            col.find(condition) //增加搜索条件
                .skip((page - 1) * 10) //skip()方法来跳过指定数量的数据
                .limit(10) // limit()方法来读取指定数量的数据
                .toArray()
        res.json({ ok: 1, data: { fruits, pagination: { total, page } } })
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/category", async (req, res) => {
    const col = mongo.col("markets")
    const data = await col.distinct('category')
    res.json({ ok: 1, data })
})

app.listen(3000)
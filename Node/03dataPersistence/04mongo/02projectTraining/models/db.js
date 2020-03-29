const conf = require('./conf')
const { EventEmitter } = require('events')
const { MongoClient } = require('mongodb')

class Mongodb {
    constructor(conf) {
        this.conf = conf
        this.emmiter = new EventEmitter()
        // 1. 创建客户端
        this.client = new MongoClient(conf.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // 2. 创建连接
        this.client.connect(err => {
            if (err) throw err
            console.log('连接成功')
            this.emmiter.emit('connect')
        })
    }
    // 3. 创建数据库dbName和集合colName
    col(colName, dbName = conf.dbName) {
        return this.client.db(dbName).collection(colName);
      }
    once(event,cb){
        this.emmiter.once(event,cb)
    }
}

module.exports = new Mongodb(conf)
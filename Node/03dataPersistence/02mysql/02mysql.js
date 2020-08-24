// node原生驱动

(async () => {
    const mysql = require('mysql2/promise')
    // 连接配置
    const cfg = {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "QSXdr1991", // 数据库密码 
        database: "20200312" // 数据库
    }
    // 创建连接
    const connection = await mysql.createConnection(cfg)

    // 创建表
    const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`
    let ret = await  connection.execute(CREATE_TABLE)
    console.log('创建表', ret)

    // 增
    const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
    ret = await connection.execute(INSERT_SQL, ['message'])
    console.log('增:', ret)

    // 删
    const DELETE_SQL = `DELETE FROM test WHERE ID = 1`
    ret = await connection.execute(DELETE_SQL)
    console.log('删:', ret)

    // 改
    const UPDATE_SQL = `UPDATE test SET  message = 'hello world'`
    ret = await connection.execute(UPDATE_SQL)
    console.log('改:', ret)

    // 查
    const SELECT_SQL = `SELECT * FROM test`
    // ret = await connection.execute(SELECT_SQL)
    const [rows, fields] = await connection.execute(SELECT_SQL)
    console.log('查:', rows)
})()
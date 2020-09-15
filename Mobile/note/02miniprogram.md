# 小程序
## 一、云开发（Serverless）
1. 云开发四大能力
    - 云函数：无需自建服务器，在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码
    - 云存储：无需自建存储和 CDN，在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
    - 数据库：无需自建数据库，一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库
    - 云调用：原生微信服务集成，基于云函数免鉴权使用小程序开放接口的能力，包括服务端调用、获取开放数据等能力
2. 实战
    - 2.1 根据图书 isbn 码展示图书信息
        - 2.1.1 开发思路
            - 借助⼩程序的扫码能⼒，获取图书的isbn码
            - 借助云函数，实现对isbn对应的图书 信息抓取（豆瓣爬虫）
        - 2.2.2 开发流程
            - (1) 调整项⽬⽬录：`project.config.json`
            ```json
                "miniprogramRoot": "mp/", //⼩程序的内容都放进来
                "cloudfunctionRoot": "fn/",//云函数⽬录
            ```
            - (2)  调用小程序扫码 API:` \page\book\book.js`
            ```javascript
                scanCode() {
                    wx.scanCode({
                        success: res => {
                            // 成功可以获得图书的isbn码
                            const isbn = res.result
                        }
                    })
                }
            ```
            - (3) 配置，编写和部署云函数
                - (3)-1 初始化云开发环境 `miniprogram\app.js` 
                ```javascript
                    wx.cloud.init({
                        // 是否在将⽤户访问记录到⽤户管理中，在控制台中可⻅
                        traceUser: true
                    })
                ```
                - (3)-2 右键fn⽬录新建云函数（命名为"book"）: `\cloudfunctions\book\index.js` 
                ```javascript
                    const cloud = require("wx-server-sdk")
                    cloud.init()
                    //  wx.cloud.callFunction的时候，就会执⾏这个main函数
                    exports.main = async (event, context) => {
                        // 从 event 参数获取小程序前端传过来的数据
                        const {isbn} = event
                        // ... 爬虫逻辑
                    };
                ```
                - (3)-3 上传并部署云函数 不然没有效果
            - (4) ⼩程序内调⽤云函数: `\page\book\book.js` 
            ```javascript
                scanCode() {
                    wx.scanCode({
                        success: res => {
                            wx.cloud.callFunction({
                                name: 'book', //云函数名称
                                data: {
                                    isbn, //传给云函数的数据
                                },
                                success: res => {
                                    // 成功后可以从res参数获取图书信息
                                }
                            })
                        }
                    })
                }
            ```
            - (5) 入库操作：`\page\book\book.js` 
            ```javascript
                // 初始化 需要先获取数据库的引⽤
                const db = wx.cloud.database()
                scanCode() {
                    wx.scanCode({
                        success: res => {
                            wx.cloud.callFunction({
                                name: 'book', //云函数名称
                                data: {
                                    isbn, //传给云函数的数据
                                },
                                success: res => {
                                    // 成功后可以从res参数获取图书信息
                                    // 把图书信息入库，存入 'book_collection' 集合，这个集合要提前到‘小程序开发工具--云开发控制台--数据库--集合名称’那里创建
                                    db.collection('book_collection').add({
                                        data: res.result,
                                        success: res => {
                                            // 入库成功的回调
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            ```
            - （6）读库操作：`\page\bookLists\bookLists.js` 
            ```javascript
                const db = wx.cloud.database()
                db.collection("book_collection").get({
                    success: res => {
                        // 读库读到的数据都放在 res.data 里面
                    }
                })
            ```




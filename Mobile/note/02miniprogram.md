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
            - 借助云函数，实现对isbn对应的图书信息抓取（豆瓣爬虫）
        - 2.2.2 开发流程
            - (1) 调整项⽬⽬录：`project.config.json`
            ```json
                "miniprogramRoot": "mp/", //⼩程序的内容都放进来
                "cloudfunctionRoot": "fn/",//云函数⽬录
            ```
            - (2) 调用小程序扫码 API:` \page\book\book.js`
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
                - (3)-3 右键上传并部署云函数
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
                db.collection("book_collection").get({
                    success: res => {
                        // 读库读到的数据都放在 res.data 里面
                    }
                })
            ```
            - (7) 分页显示：`\page\bookLists\bookLists.js` 
            ```javascript
                getBookLists() {
                    const PAGE_ACCOUNT = 5
                    db.collection('book_collection')
                    .orderBy('create_time', 'desc')
                    .skip(this.data.page * PAGE_ACCOUNT)
                    .limit(PAGE_ACCOUNT)
                    .get().then(res => {})
                }
                // 页面上拉触底事件的处理函数
                onReachBottom: function () {
                    this.setData({
                        page: this.data.page + 1
                    }, () => {
                        this.getBookLists()
                    })
                },

            ```
3. taro 
    - 3.1 简介
        - 官网：<https://taro.aotu.io/>
        - UI 组件：<https://taro-ui.aotu.io/#/>
        - 安装：`npm i -g @tarojs/cli`
        - 创建项目：`taro init demo`
        - 简介：Taro 是⼀套遵循 React 语法规范的多端开发解决⽅案。uni-app 是⼀套遵循 Vue 语法规范的多端开发解决⽅案
            - 微信/头条/百度/支付宝小程序
            - 网页H5、React-Native、原生APP
    - 3.2 微信⼩程序转taro <https://taro-docs.jd.com/taro/docs/taroize>
        - 在命令⾏中定位到⼩程序项⽬的根⽬录, 执行 `taro convert`
            - ⼩程序的⽬录，不是云函数的
        - 转换后的代码保存在根⽬录下的 taroConvert ⽂件夹下
        - 定位到 taroConvert ⽬录执⾏ npm install 命令之后就可以使⽤ taro build 命令编译到对应平台的代码
        - ⾥⾯会含有微信⼩程序和taro的混合语法，需要安装 `npm i @tarojs/with-weapp`, 就可以在taro⾥⽀持微信⼩程序的语法了
    - 3.3 实战
        - 3.3.1 使⽤ taro-ui遇到的坑：在小程序端报 ` Error: Cannot find module './style/index.scss'` 的解决方法：<https://www.cnblogs.com/chenlw/p/13254815.html>
        - 3.3.2 使⽤ mobx 遇到的坑: `" 'mobx' does not contain an export named '_allowStateReadsEnd'.` 的解决方法：把`mobx-react`删了再重装一遍


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
    - 2.2 小程序支付 
        - 前端API：<https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html>
        - 后端API：<https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=3_1#>  
        - 网上教程：<https://www.jianshu.com/p/ddccf5f95e8c> <https://blog.csdn.net/qiushi_1990/article/details/106679387>  
        <img src="wxpay.jpg"/>  

        - 2.2.1 开发思路  
            - （1）用户下单，将购买的**商品Id**，**商品数量**，**openId** 等传给到服务器
            ```javascript
            // client/pages/pay-list/index.js
            wx.cloud.callFunction({
                name: 'emall-pay',
                data: {
                    type: 'unifiedorder', // 预下单 去商户端下单
                    data: {
                        goodId, // 商品id
                    }
                }
            })
            ```
            - （2）微信支付云函数逻辑
            ```javascript
            // /cloud/functions/emall-pay/index.js
            // 1. 借助微信官方提供的云开发工具库
            const {WXPay,  WXPayConstants, WXPayUtil} = require('wx-js-utils')
            const ip = require('ip')
            // 2. 这几个是有商户权限后，提供的配置
            const {
                ENV, //环境ID
                MCHID, //商户id
                KEY, //密钥
                CERT_FILE_CONTENT, //证书
                TIMEOUT // 超时
            } = require('./config/index')
            // 3. 初始化云环境
            cloud.init({env: ENV})

            exports.main = async function (event) {
                // 4. 通过云调用获取微信调用上下文
                const {
                    OPENID, //小程序用户 openid
                    APPID //小程序 AppID
                } = cloud.getWXContext() 
                // 5. 新建支付对象
                const pay = new WXPay({
                    appId: APPID,
                    mchId: MCHID,
                    key: KEY,
                    certFileContent: CERT_FILE_CONTENT,
                    timeout: TIMEOUT,
                    signType: WXPayConstants.SIGN_TYPE_MD5,
                    useSandbox: false // 不使用沙箱环境
                })
                // 6. 服务端查询数据库
                const db = cloud.database()
                // 6.1 获取商品信息collection
                const goodCollection = db.collection('goods')
                // 6.2 获取订单信息collection
                const orderCollection = db.collection('orders')
                
                const { type, data } = event
                // 7. 订单状态 
                switch (type) {
                    // 7.1 统一下单（分别在微信支付侧和云开发数据库生成订单）
                    case: 'unifiedorder':
                        // 7.1.1 云数据库查询商品
                        const { goodId } = data
                        let goods = await goodCollection.doc(goodId).get()
                        let good = goods.data
                        // 7.2 拼凑订单参数
                        const curTime = Date.now()
                        const out_trade_no = `${goodId}-${curTime}` //商户订单号,自定义的,z这里采用商品id+时间戳
                        const body = good.name //商品描述
                        const spbill_create_ip = ip.address() || '127.0.0.1' //终端IP
                        const notify_url = 'http://www.qq.com' // 异步接收微信支付结果通知的回调地址。云函数暂时没有外网地址和HTTP触发地，所以暂时随便填个地址
                        const total_fee = good.price //订单总金额，单位为分
                        const time_stamp = '' + Math.ceil(Date.now() / 1000)
                        const sign_type = WXPayConstants.SIGN_TYPE_MD5 // 签名类型，默认为MD5
                        const orderParam = {
                            body,
                            spbill_create_ip,
                            notify_url,
                            out_trade_no,
                            total_fee,
                            openid: OPENID,
                            trade_type: 'JSAPI', //交易类型，小程序取值为JSAPI
                            time_stamp,
                        }
                        // 7.3 在微信支付服务端生成该订: unifiedOrder函数，其实就是发起了一次网络请求
                        const {return_code,...restData} = await pay.payunifiedOrder(orderParam)
                        // 7.4 请求结果
                        let order_id = null
                        if (return_code === 'SUCCESS' && restData.result_code === 'SUCCESS') {
                            // 7.5 请求成功可以获得预支付id
                            const {prepay_id,nonce_str} = restData
                            // 7.6 生成微信支付签名，为后面在小程序端进行支付打下基础
                            const sign = WXPayUtil.generateSignature({
                                appId: APPID,
                                nonceStr: nonce_str,
                                package: `prepay_id=${prepay_id}`,
                                signType: 'MD5',
                                timeStamp: time_stamp
                            }, KEY)
                            // 7.7 在数据库生成订单记录
                            const orderData = {
                                out_trade_no,
                                time_stamp,
                                nonce_str,
                                sign,
                                sign_type,
                                body,
                                total_fee,
                                prepay_id,
                                status: 0, // 0表示刚创建订单
                                _openid: OPENID,
                            }
                            const order = await orderCollection.add({data: orderData})
                            order_id = order.id
                        }
                        return {
                            code: return_code === 'SUCCESS' ? 0 : 1,
                            data: {
                                out_trade_no, time_stamp, order_id, ...restData
                            }
                        }
                    // 7.2 订单查询
                    case 'orderquery': {}
                    // 7.3 进行微信支付及更新订单状态
                    case 'payorder': {}
                    // 7.4 关闭订单
                    case 'closeorder': {}
                    // 7.5 申请退款
                    case 'refund': {}
                    // 7.6 查询退款情况
                    case 'queryrefund': {}
                }
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
    - 3.4 为什么 taro 和 umi-app 跨端框架，渲染比原生小程序性能还要好？
        - 小程序的 setData 每次都会重新渲染
        - taro 和 uni-app 的 setData, 都会做 diff, 再 setData
    - 3.5 Mobx
    ```javascript
    // 3.5.1 新建 todoStore
    // src/store/todo.js
    import { observable } from 'mobx'
    const todoStore = observable({
        todos: [],
        addTodo(item) {
            this.todos.push(item)
        },
    })
    export dafault todoStore

    // 3.5.2 添加 store 和 provider
    // src/app.js
    import { Provider } from '@tarojs/mobx'
    import todoStore from '@/store/todoStore'

    const store = {todoStore,}
    // ...
    <Provider store = {store}>
        <Index/>
    </Provider>

    // 3.5.3 使用 mobx
    // src/pages/index/index
    import {observer, inject} from '@tarojs/mobx'
    @inject(store)
    @observer
    export default class Index extends Component ({
        handleClick = val => {
            this.props.store.todoStore.addTodo(val)
        }
        const { todoStore } = this.props.store
        render () {
            return (
                <button onClick={this.handleClick}></button>
            )
        }
    })
    ```


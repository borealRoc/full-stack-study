# 网络编程
## 一、基础概念
1. OSI七层交换参考模型
    - 物理层：物理学家，工程师关心 ——材料，电压
    - 链路层：内网寻址 —— ICMP协议[pin命令]
    - 网络层：外网寻址 —— IP协议
    - 传输层：通信稳定性 —— TCP、UDP
    - 表现层：实际不存在（本意统一各个网络结构，这个功能后来被传输层替代）
    - 会话层：实际不存在（通信本身是无状态的，它的存在是为了记录状态，但没用）
    - 应用层：应用细节 —— HTTP协议
    > 实际应用，五层模型，表现层和会话层不包括
2. TCP协议 vs UDP协议
    - TCP 传输控制协议（应用：文件下载、聊天）
        - 保证到达
        - 保证质量
        - 保证顺序
    - UDP 用户数据协议（对质量没有绝对要求，对延时有很高要求，应用：直播）
        - 不保证到达
        - 不保证质量
        - 不保证顺序
## 二、HTTP协议
1. 特点
    - 1.1 无连接：服务器处理完客户端的请求，并收到客户端收到响应的应答后，即断开连接
    - 1.2 无状态：服务器对事务处理没有记忆能力
2. HTTP协议详解之URL【http://host:port/abs_path】
    - 2.1 http：表示要通过HTTP协议来定位⽹络资源
    - 2.2 host：表示合法的Internet主机域名或者IP地址
    - 2.3 port：指定⼀个端⼝号，为空则使⽤缺省端⼝80
    - 2.4 abs_path：指定请求资源的URI
        - 如果URL中没有给出abs_path，那么当它作为请求URI时，必须以“/”的形式给出，通常这个⼯作浏览器⾃动帮我们完成
3. HTTP协议详解之请求篇：由三部分组成：请求⾏、消息报头、请求正⽂
    - 3.1 请求行: Method Request-URI HTTP-Version CRLF [CRLF表示回车或换行]
        - EG: `GET /form.html HTTP/1.1 (CRLF)`
        - Method：请求方法
            - GET 请求获取Request-URI所标识的资源
            - POST 在Request-URI所标识的资源后附加新的数据
            - HEAD 请求获取由Request-URI所标识的资源的响应消息报头
            - PUT 请求服务器存储⼀个资源，并⽤Request-URI作为其标识
            - DELETE 请求服务器删除Request-URI所标识的资源
            - OPTIONS 请求查询服务器的性能，或者查询与资源相关的选项和需求
            - TRACE 请求服务器回送收到的请求信息，主要⽤于测试或诊断
            - CONNECT 保留将来使⽤
        - Request-URI: 请求地址
        - HTTP-Version: 协议
    - 3.2 请求报头
    - 3.3 请求正文：客户端发送给服务器的数据
4. HTTP协议详解之响应篇：由三个部分组成：状态⾏、消息报头、响应正⽂
    - 4.1 状态行：HTTP-Version Status-Code Reason-Phrase CRLF [CRLF表示回车或换行]
        - EG: `HTTP/1.1 200 OK （CRLF）`
        - HTTP-Version: 服务器HTTP协议的版本
        - Status-Code: 服务器发回的响应状态代码
            - 状态代码有三位数字组成，第⼀个数字定义了响应的类别，且有五种可能取值
                - 1xx：指示信息--表示请求已接收，继续处理
                - 2xx：成功--表示请求已被成功接收
                    - 200 OK 客户端请求成功
                    - 206 Partial Content 服务器已经成功处理了部分 GET 请求。类似于迅雷这类的 HTTP下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载
                - 3xx：重定向--要完成请求必须进⾏更进⼀步的操作
                    - 301 Moved Permanently 永久重定向
                    - 302 Found 临时重定向
                    - 304 Not Modified 客户端缓存的资源是最新的，要客户端使用缓存
                - 4xx：客户端错误--请求有语法错误或请求⽆法实现
                    - 400 Bad Request 客户端请求有语法错误，不能被服务器所理解
                    - 401 Unauthorized 请求未经授权
                    - 403 Forbidden 服务器收到请求，但是拒绝提供服务
                    - 404 Not Found 请求资源不存在
                - 5xx：服务器端错误--服务器未能实现合法的请求
                    - 500 Internal Server Error 服务器发⽣不可预期的错误
                    - 503 Server Unavailable 服务器当前不能处理客户端的请求，⼀段时间后可能恢复正常
        - Reason-Phrase: 状态代码的⽂本描述
    - 4.2 响应报头
    - 4.3 响应正文：服务器返回的资源的内容
5. HTTP协议详解之消息报头篇：包括普通报头、请求报头、响应报头、实体报头
    - 每⼀个报头域都是由 **名字+“:”+空格+值** 组成，消息报头域的名字是⼤⼩写⽆关的
    - 5.1 普通报头：在普通报头中，有少数报头域⽤于所有的请求和响应消息，但并不⽤于被传输的实体，只⽤于传输的消息。eg：
        - Cache-Control
        - Date
        - Connection
    - 5.2 请求报头: 允许客户端向服务器端传递请求的附加信息以及客户端⾃身的信息。eg：
        - Accept：指定客户端接受哪些类型的信息 eg：`Accept：image/gif`
        - Accept-Encoding: 指定可接受的内容编码 eg：`Accept-Encoding: gzip`
        - Accept-Language: 指定⼀种⾃然语⾔ 。eg：`Accept-Language: zh-cn`
        - Accept-Charset: 指定客户端接受的字符集 eg：`Accept-Charset: iso-8859-1, gb2312`
        - Authorization: Authorization请求报头域主要⽤于证明客户端有权查看某个资源。当浏览器访问⼀个⻚⾯时，如果收到服务器的响应代码为401（未授权），可以发送⼀个包含Authorization请求报头域的请求，要求服务器对其进⾏验证。
        - Host: 指定被请求资源的Internet主机和端⼝号，它通常从HTTP URL中提取出来
        - User-Agent: 允许客户端将它的操作系统、浏览器和其它属性告诉服务器
    - 5.3 响应报头：响应报头允许服务器传递不能放在状态⾏中的附加响应信息，以及关于服务器的信息和对Request-URI所标识的资源进⾏下⼀步访问的信息。eg：
        - Location: 重定向接受者到⼀个新的位置
        - Server：包含了服务器⽤来处理请求的软件信息。与User-Agent请求报头域是相对应的
    - 5.4 实体报头：定义了关于实体正⽂和请求所标识的资源的元信息。
        - Content-Type: 指明发送给接收者的实体正⽂的媒体类型，eg：`Content-Type:application/json;charset=UTF-8`
        - Content-Length: 指明实体正⽂的⻓度, eg: `Content-Length: 53`
        - Content-Encoding：指明资源的编码方式，eg: `Content-Encoding：gzip`
        - Content-Language：指明资源所⽤的⾃然语⾔，eg: `Content-Language: da`
6. GET 和 POST 的区别<https://segmentfault.com/a/1190000018129846>
    - 6.1 表面上：
        -  get 使用URL传参, 而 post 将数据放在BODY中
        -  get 的URL会有长度上的限制，则 post 的数据则可以非常大
        -  post 比 get 安全，因为数据在地址栏上不可见
        <img src="http.png"/>
    - 6.2 本质上
        - 6.2.1 get 和 post 与数据如何传递没有关系
            - 在HTTP协议中，使用哪个Method与应用层的数据如何传输是没有相互关系的
            - get 数据放在 url，post 数据放在 body，只是HTML标准对HTTP协议的用法的约定
        - 6.2.2 HTTP协议对 get 和 post 都没有对长度的限制
            - HTTP协议明确地指出了，HTTP头和Body都没有长度的要求。而对于URL长度上的限制，有两方面的原因造成
                - 浏览器：浏览器对URL长度做限制
                - 服务器：URL长了，对服务器处理是一种负担
        - 6.2.3 安全不安全和 get 、 post 没有关系
            - 从传输的角度来说，他们都是不安全的，因为 HTTP 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文。要想安全传输，就只有加密，也就是 HTTPS。
    - 6.3 所以说，上面列举的 get 和 post 的区别，只是浏览器对HTTP协议实现上的区别，而不是 get 和 post 的本质区别
    - 6.4 get 和 post 方法没有实质区别，只是报文格式不同
        - 不带参数时他们的区别就仅仅是报文的前几个字符不同而已
            - get 方法请求报文第一行是这样的 GET /uri HTTP/1.1 \r\n
            - post 方法请求报文第一行是这样的 POST /uri HTTP/1.1 \r\n
        - 带参数时报文的区别呢？ 在约定中，GET 方法的参数应该放在 url 中，POST 方法参数应该放在 body 中
            - 但是，可以在 URL 上写参数，然后方法使用 POST；也可以在 Body 写参数，然后方法使用 GET。当然，这需要服务端支持。
## 跨域
## 爬虫
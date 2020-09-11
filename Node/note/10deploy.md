# 部署
1. 利用node多进程 cluster 构建一个高可用的node环境
    - 故障恢复
    - 多核利用
    - 多进程共享端口【node cluster模块底层实现的】<https://www.sohu.com/a/247732550_796914>
2. PM2
    - 2.1 特点
        - 内建负载均衡（使用Node cluster 集群模块、子进程，可以参考朴灵的《深入浅出node.js》一书第九章）
        - 线程守护，keep alive
        - 0秒停机重载，维护升级的时候不需要停机
        - 现在 Linux (stable) & MacOSx (stable) & Windows (stable).多平台支持
        - 停止不稳定的进程（避免无限循环）
        - 控制台检测 <https://id.keymetrics.io/api/oauth/login#/register>
        - 提供 HTTP API
    - 2.2 使用
        - 安装：`npm install -g pm2`
        - 启动：`pm2 start app.js --watch -i 2`
            - watch 监听文件变化
            - -i 启动多少个实例
            - 根据机器CPU核数，开启对应数目的进程 `pm2 start app.js -i max`
            - 通过配置文件启动: `pm2 start process.yml`
        - 停止所有进程：`pm2 stop all`
        - 显示所有进程：`pm2 list`
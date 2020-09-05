var cluster = require('cluster');
var os = require('os');
// 获取CPU 的数量
var numCPUs = os.cpus().length;

var process = require('process')

var workers = {};
if (cluster.isMaster) {
    // 主进程分支

    cluster.on('exit', (worker, code, signal) => {
        // 当子进程报错，关闭该子进程
        console.log('工作进程 %d 关闭 (%s). 重启中...',
            worker.process.pid, signal || code);
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    });

    // 开启子进程
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        console.log('init ... pid', worker.process.pid)
        workers[worker.process.pid] = worker;
    }
} else {
    // 子进程分支
    var app = require('./app');
    app.listen(3000);
}
// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM', function () {
    for (var pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});

require('./test')
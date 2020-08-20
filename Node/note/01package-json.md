# package.json
## 一、基础
1. name: 包名
2. version：包版本
    - npm 模块的完整的版本号⼀般是【主版本 . 次要版本 . ⼩版本】
        - 指定版本：`'npm-demo': '1.10.1'`
        - 次要版本不变：`'npm-demo': '~0.8.2'`
        - 主版本不变：`'npm-demo': '^5.0.0'`
3. description: 包描述
4. keywords: 包关键字，作用和包描述类似
5. main：项目入口
6. license: 许可证
7. author: 作者
8. contributors: 贡献者
9. 依赖包
    - dependencies: 生产，线上的依赖包，应⽤依赖，业务依赖 `npm i xxx -S`
    - devDependencies: 主要是存放用于本地开发的，开发环境依赖,通常是单元测试或者打包⼯具等 `npm i xxx -D`
    - peerDependencies：指定当前包兼容的宿主版本
    ```json
    {
        "name": "webpack-my-plugin",
        "version": "0.0.1",
        "peerDependencies": {
            "webpack": "4.x"
        }
    }
    ```
    - 当别⼈使⽤我们的插件时，peerDependencies就会告诉明确告诉使⽤⽅需要安装该插件哪个宿主版本
10. private: 如果设为true，⽆法通过 npm publish 发布代码
    ```json
    {
        "private": true
    }
    ```
11. engines: 指定项目依赖的node环境，npm版本等
    ```json
    "engines": {
        "node": ">=8",
        "npm": ">=4.0.0"
    }
    ```
## 二、难点
1. script: 指定运行脚本命令的npm命令行缩写
2. cross-env: 运行跨平台设置和使用环境变量的脚本
    - windows不支持持NODE_ENV=development的设置方式
    - 解决：cross-env能够提供一个设置环境变量的scripts，使得能够以linux方式设置环境变量，在windows上也能兼容运行
    - `npm install --save-dev cross-env`
    ```json
    {
        "scripts": {
            "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
        }
    }
    ```
3. 通配符
    - * 表示任意⽂件名
    - ** 表示任意⼀层⼦⽬录
```json
"lint": "jshint *.js"
"lint": "jshint **/*.js"
``` 
4. 脚本传参符号：--
    ```json
    {
        "scripts": {
            "server": "webpack-dev-server --mode=development --open --iframe=true"
        }
    }
    ```
5. 脚本执行顺序
    - 并⾏执⾏（即同时的平⾏执⾏），可以使⽤ & 符号 `$ npm run script1.js & npm run script2.js`
    - 继发执⾏（即只有前⼀个任务成功，才执⾏下⼀个任务），可以使⽤ &&符号 `$ npm run script1.js && npm run script2.js`
6. 拿到package.json的变量：通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段
    ```json
    {
        "name": "foo",
        "version": "1.2.5",
        "scripts": {
            "view": "node view.js"
        }
    }
    ```
    ```javascript
    console.log(process.env.npm_package_name); // foo
    console.log(process.env.npm_package_version); // 1.2.5
    ```
7. bin: 来指定各个内部命令对应的可执行文件的路径
    - 全局安装, 可以在命令行中执行这个文件
    - 本地安装, 可以在当前工程目录的命令行中执行该文件
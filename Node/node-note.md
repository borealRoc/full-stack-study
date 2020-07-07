1. KeystoneJS <https://www.keystonejs.com/>
2. pupteer
# package.json
- 依赖包
    - dependencies: 生产，线上的依赖包 `npm i xxx -S`
    - devDependencies: 主要是存放用于本地开发的 `npm i xxx -D`
- cross-env: 运行跨平台设置和使用环境变量的脚本
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
- 脚本传参符号：--
    ```json
    {
        "scripts": {
            "server": "webpack-dev-server --mode=development --open --iframe=true"
        }
    }
    ```
- 拿到package.json的变量：通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段
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
- bin:  来指定各个内部命令对应的可执行文件的路径
    - 全局安装, 可以在命令行中执行这个文件
    - 本地安装, 可以在当前工程目录的命令行中执行该文件
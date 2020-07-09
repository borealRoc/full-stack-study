const path = require("path");
const { DllPlugin } = require("webpack");

module.exports = {
    entry: {
        react: ["react", "react-dom"]
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "../dll"),
        filename: "[name].dll.js", //react.dll.js,
        library: "react"
    },
    plugins: [
        new DllPlugin({
            //生成manifest.json文件，并指定他的输出位置
            path: path.join(__dirname, "../dll", "[name]-manifest.json"),
            name: "react" //!name要和library的名称一致
        })
    ]
};
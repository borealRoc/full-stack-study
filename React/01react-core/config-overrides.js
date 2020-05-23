const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd",
        // antd库的目录：/Users/xusp/Desktop/studySpace/full-stack-study/React/01react-core/node_modules/antd/es
        libraryDirectory: "es",
        style: "css",
    }),
    addDecoratorsLegacy(), //配置装饰器
);

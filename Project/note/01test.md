# 自动化测试
## 一、测试的好处
1. 节省⼿动测试的时间
2. 提升项目可维护性
    - git commit 的 hook, 在每次 commit 之前，要确保测试通过，才能 commit 
        - 借助 `npm i husky -s` <https://github.com/typicode/husky>
        ```json
        // package.json
        {
        "husky": {
            "hooks": {
            "pre-commit": "npm test",
            "pre-push": "npm test",
            "...": "..."
            }
        }
        }
        ```
## 二、jest 语法
1. describe: 定义一个测试套件
2. it：定义一个测试用例
3. expect：断言
4. toBe：断言的期望结果
## 三、vue 自动化测试
1. 在vue中，推荐使用Mocha+chai 或者gitjest
2. vue 自动化测试 —— 借助 `npm i @vue/test-utils -S` <https://vue-test-utils.vuejs.org/zh/>
    - 2.1 测试基本的mounted, created 和 初始 data 
    - 2.2 测试点击事件 `import { mount } from '@vue/test-utils'`
    - 2.3 axios 异步测试 `import { shallowMount, createLocalVue } from '@vue/test-utils'`
        - 临时Vue的实例: `const localVue = createLocalVue()`
        - 初始化容器: `wrapper = shallowMount(TestAxios, {localVue,stub:['app-button']})`
    - 2.4 全局组件测试
    - 测试覆盖率：在 package.json 增加如下配置。执行完 `npm run test:unit`后，不仅会在控制台显示测试的覆盖率（jest⾃带覆盖率，如果⽤的mocha，需要使⽤istanbul来统计覆盖率），还会在项目的 `/coverage/lcov-report/index.html` 目类下生成测试报告
    ```json
    "jest": {
        "collectCoverage": true,
        "collectCoverageFrom": [
        "src/components/**/*.{js,vue}"
        ]
    },
    ```
## 四、React 自动化测试
1. 也是使⽤jest来做⾃动化测试 <https://jestjs.io/docs/en/tutorial-react>
## 五 node 自动化测试
1. koa 接口
2. 中间件
## 六、E2E测试
1. <https://www.cypress.io/>
2. 在实际开发中，应该更重视单元测试，而非 e2e 测试
## 七、TDD开发模式
1. 所谓 TDD 就是测试驱动开发模式，就是我们开发⼀个新功能，先把测试写好，然后测试跑起来，会报
错，我们再开始写代码，挨个的把测试跑绿，功能也就完成了
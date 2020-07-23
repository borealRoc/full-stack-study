# 虚拟DOM
<https://juejin.im/post/5d36cc575188257aea108a74>
1. 真实DOM和其解析流：创建DOM树[HTML]->创建Style Rules[CSS]->构建Render树[HTML+CSS]->布局Layout[HTML+CSS+坐标]->绘制Painting[页面]
    - 第一步，构建 DOM 树：用 HTML 分析器，分析 HTML 元素，构建一棵 DOM 树
    - 第二步，生成样式表：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表
    - 第三步，构建 Render 树：将 DOM 树和样式表关联起来，构建一棵 Render 树（Attachment）。每个 DOM 节点都有 *attach* 方法，接受样式信息，返回一个 render 对象（又名 renderer），这些 render 对象最终会被构建成一棵 Render 树
    - 第四步，确定节点坐标：根据 Render 树结构，为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标
    - 第五步，绘制页面：根据 Render 树和节点显示坐标，然后调用每个节点的 *paint* 方法，将它们绘制出来
    - 注意点：
        - DOM 树的构建是文档加载完成开始的？ 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局
        - Render 树是 DOM 树和 CSS 样式表构建完毕后才开始构建的？ 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染
        - CSS 的解析注意点？ CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢
        - JS 操作真实 DOM 的代价？ 用我们传统的开发模式，原生 JS 或 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次更新操作，因此会马上执行流程，最终执行10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
2. 虚拟DOM的好处
    - 虚拟 DOM 就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有 10 次更新 DOM 的动作，虚拟 DOM 不会立即操作 DOM，而是将这 10 次更新的 diff 内容保存到本地一个 JS 对象中，最终将这个 JS 对象一次性 attch 到 DOM 树上，再进行后续操作，避免大量无谓的计算量。所以，用 JS 对象模拟 DOM 节点的好处是，页面的更新可以先全部反映在 JS 对象(虚拟 DOM )上，操作内存中的 JS 对象的速度显然要更快，等更新完成后，再将最终的 JS 对象映射成真实的 DOM，交由浏览器去绘制。
3. 虚拟DOM是什么: 用JS对象描述DOM节点，更新之前做diff，达到最小操作dom的效果

4. 虚拟DOM如何新建
    ```javascript
    function createElement(tag, data, children) { 
        return {
            flags, //节点标记：text或html
            tag,  //节点标签
            data, //节点属性
            key,  //列表循环的key属性
            children, //子元素
            childrenFlags, //子元素类型：EMPTY, SINGLE, MULTIPLE
            el, //挂载节点
        }
    }
    if (childrenFlags === 'SINGLE') {
        children = {
            flags: TEXT,
            tag: null,
            data: null,
            // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
            children: text,
            // 文本节点没有子节点
            childFlags: EMPTY
        }
    }
    ```
5. 虚拟DOM如何渲染: 
    ```javascript
    function render () {
        if () {
            // 首次渲染，执行挂载
            mount(vnode, ctn)
        } else {
            // 再次渲染，更新
            patch(oldVnode, newVnode, ctn)
        }
    }
    ```
6. 虚拟DOM如何更新: patch && diff
    - patch：难点在于patchElement，即新旧两个vnode对象，flags都是HTML，其它vnode属性不一样，包括：
        - 更新tag: `patchVnode(prev, next, ctn)`
        - 更新data: `patchData(el, key, prevVal, nextVal)`
        - 更新children: `patchChildren(prev.childFlags, next.childFlags, prev.Children, nextChildren, el)`等...
    - diff: 上面的属性更新难点在于patchChildren，要做diff算法，而diff算法的难点又在于：当 prev.childFlags 和 next.childFlags 都是 multiple，即两个数组的对比和更新
        - 老数组的某些子项目在新数组中还存在，并且位置发生了变化：移动
        - 新数组多了一些老数组没有的项目：新增
        - 新数组少了一些老数组有的项目：移除
7. vue中的虚拟DOM
    - webpack的`vue-loader vue-template-compiler`: 该模块可用于将 Vue 2.0 模板预编译为渲染函数（template => ast => render）
    - vue-template-compiler 的代码是从 vue 源码中抽离的！对比一下 vue-template-compiler 和 vue 关于编译的 API,发现对于 compile 等函数是一致，只是 vue-template-compiler 开放的参数和方法更多。
    ```javascript
    // 1解析: template => ast 
    const ast = parse(template.trim(), options)
    // 2优化：比如静态节点标记
    if (options.optimize !== false) {
        optimize(ast, options)
    }
    // 3生成可供render执行的代码
    const code = generate(ast, options)
    ```
8. react中的虚拟DOM：通过webpack的`@babel/preset-react`这个loader把JSX转化成新建vnode的函数
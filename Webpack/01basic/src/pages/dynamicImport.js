document.addEventListener('click', async () => {
    const element = document.createElement('div')
    // 在注释中使用了 webpackChunkName。結合webpack.config.js的output.chunkFilename: '[name].bundle.js',这样做会导致我们的 bundle 被命名为 lodash.bundle.js 
    // 在注释中使用webpackPrefetch，在网络空闲时，能预import lodash
    const { default: _ } = await import(/* webpackChunkName: "lodash" *//* webpackPrefetch: true */'lodash')
    element.innerHTML = _.join(['Hello', 'webpack'], '**')
    document.body.appendChild(element)
})
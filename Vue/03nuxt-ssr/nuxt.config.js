
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  // 扩展路由
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "foo",
        path: "/foo",
        component: resolve(__dirname, "pages/admin.vue")
      });
    },
    // 全局配置
    // middleware: ['auth']
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    "@/plugins/interceptor"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // 整合axios
    '@nuxtjs/axios',
    // nuxt cookie跨平台获取
    "cookie-universal-nuxt"
  ],
  axios: {
    proxy: true
  },
  proxy: {
    "/api": "http://localhost:8080"
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

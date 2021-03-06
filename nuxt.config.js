
export default {
  mode: 'spa',
  router: {
    base: '/',// for base path
    // mode: 'hash'
    extendRoutes(routes, resolve) {
      routes.push({
        path     : '/index.html',
        alias    : '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  generate: {
    subFolders: false
  },
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
      { rel: 'icon', type: 'image/x-icon', href: '/Dancy40.png' }
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
    '@/assets/top.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
  //   publicPath: 'public/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

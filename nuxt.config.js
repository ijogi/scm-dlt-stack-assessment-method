
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'SCM DApp Assessment',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { type: 'text/css', rel: 'stylesheet', href: '/styles/index.css' },
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
  ],
  bootstrapVue: {
    icons: true
  },
  buildModules: [
    '@nuxtjs/composition-api/module'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuex-persist'],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

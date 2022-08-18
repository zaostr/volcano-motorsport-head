// import webpack from 'webpack'
import { i18nPages, getDynamicRoutes, excludeRoutes } from './utils/routes'

require('dotenv').config()

export default {
  target: 'static',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Volcano Motorsport',
    titleTemplate: 'Volcano Motorsport :: %s',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Volcano Motorsport'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Volcano Motorsport'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/organisms/Loading.vue',

  /*
   ** Global CSS entry point
   */
  css: ['~/assets/styles/main.scss'],

  /*
   ** Middleware
   */
  router: {
    middleware: 'fetchCommonData'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Doc: https://swiperjs.com/api/
    { src: '~/plugins/nuxt-swiper.js', ssr: false },
    // Doc: https://github.com/vtimofeev/vue-check-view/
    { src: '~/plugins/vue-check-view', ssr: false },
    // Doc: https://medium.com/@helena.wuv/how-to-internationalize-your-next-nuxt-project-using-vue-i18n-d9c51e28a564
    { src: '~/plugins/i18n' },
    // Doc: https://www.npmjs.com/package/vue-masonry-css
    { src: '~/plugins/masonry' }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      '@nuxtjs/axios'
      /* {
        baseURL: process.env.BACKEND_API_BASE_URL || 'http://localhost:3000',
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      } */
    ],
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://www.npmjs.com/package/@nuxtjs/sitemap
    // '@nuxtjs/sitemap',
    // Doc: https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    [
      'nuxt-i18n',
      {
        parsePages: false, // Disable babel parsing nuxt
        locales: [
          {
            name: 'En',
            code: 'en',
            iso: 'en-US',
            file: 'en.js'
          },
          {
            name: 'Es',
            code: 'es',
            iso: 'es-ES',
            file: 'es.js'
          }
        ],
        pages: i18nPages,
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        detectBrowserLanguage: {
          // If enabled, a cookie is set once a user has been redirected to his
          // preferred language to prevent subsequent redirections
          // Set to false to redirect every time
          useCookie: true,
          // Cookie name
          cookieKey: 'i18n_redirected',
          // Set to always redirect to value stored in the cookie, not just once
          alwaysRedirect: false,
          // If no locale for the browsers locale is a match, use this one as a fallback
          fallbackLocale: 'en'
        }
      }
    ]
  ],

  // @nuxtjs/style-resources config
  styleResources: {
    scss: ['~/assets/styles/variables.scss']
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    progress: false
  },

  pwa: {
    icon: {
      fileName: 'webclip.png'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // "Module not found: Error: Can't resolve 'fs' .../dotenv/lib'" error fix for ApiService
      config.node = { fs: 'empty' }
      // To prevent too big chunks
      if (ctx && ctx.isClient) {
        config.optimization.splitChunks.maxSize = 256000
      }
    }
    /*
     ** Remove all locales from moment
     */
    // plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  },

  /* server: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3000
  }, */

  generate: {
    fallback: true,
    routes() {
      return getDynamicRoutes()
    },
    // these routes contain truly dynamic data
    exclude: excludeRoutes
  }
  /* sitemap: {
    hostname: process.env.APP_PROTOCOL + '://' + process.env.APP_HOST,
    exclude: ['/error'],
    // gzip: true,
    routes() {
    // you dont want to do it twice...
      return getDynamicRoutes()
    }
  } */
}

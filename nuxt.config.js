export default {
  telemetry: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  server: {
    host: "0.0.0.0"
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Awakened Redstone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'theme-color', name: 'theme-color', content: '#b23030' },
      { hid: 'color-scheme', name: 'color-scheme', content: 'light dark' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap' }
    ]
  },

  router: {
    middleware: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tooltip.js',
    '~/plugins/vue-notification.js',
    '~/plugins/xss.js',
    '~/plugins/vue-syntax.js',
    '~/plugins/shorthands.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
    '@nuxtjs/color-mode',
    'cookie-universal-nuxt'
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  robots: {
    Sitemap: 'https://awakenedredstone.com/sitemap.xml'
  },
  sitemap: {
    exclude: [],
    hostname: getDomain(),
    routes: ['mods']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    https: true,
    baseURL: 'https://api.awakenedredstone.com/v1/',
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  },
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime']
  },

  markdownit: {
    runtime: true,
    preset: 'default',
    html: true,
    linkify: true,
    breaks: false
  },
  loading: {
    color: 'green',
    height: '3px'
  },

  env: {
    version: process.env.VERSION_ID || 'unknown',
    domain: getDomain()
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-tooltip', 'vue-notification'],
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    },
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-private-methods',
          {
            loose: true
          }
        ]
      ]
    }
  }
}

function getDomain() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL
    } else if (process.env.HEROKU_APP_NAME) {
      return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    } else {
      return 'https://awakenedredstone.com'
    }
  } else {
    return 'http://localhost:3000'
  }
}

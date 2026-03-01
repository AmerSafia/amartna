import { defineConfig } from '#q-app/wrappers'

export default defineConfig((/* ctx */) => {
  return {
    boot: [],

    css: ['app.scss'],

    extras: [
      'material-icons',
      'fontawesome-v6',
      'mdi-v7'
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      vueRouterMode: 'history'
    },

    devServer: {
      open: true
    },

    framework: {
      config: {
        brand: {
          primary: '#6366F1',
          secondary: '#22C55E',
          accent: '#F59E0B',
          dark: '#0F1729',
          'dark-page': '#0F1729',
          positive: '#22C55E',
          negative: '#EF4444',
          info: '#3B82F6',
          warning: '#F59E0B'
        },
        notify: {
          position: 'top',
          timeout: 2500
        }
      },
      lang: 'ar',
      plugins: ['Notify', 'Dialog', 'Loading', 'Dark']
    },

    animations: [],
    ssr: { pwa: false },
    pwa: {},
    cordova: {},
    capacitor: {},
    electron: {},
    bex: {}
  }
})

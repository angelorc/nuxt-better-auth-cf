// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-01-28',

  devtools: { enabled: true },

  modules: ['@nuxt/eslint'],

  nitro: {
    experimental: {
      asyncContext: true,
    },
    rollupConfig: {
      external: ['pg-native', 'cloudflare:sockets'],
    },
  },
})
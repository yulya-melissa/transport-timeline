// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/transport-timeline/',
  },

  nitro: {
    preset: 'github-pages'
  },

  typescript: {
    strict: false,
    shim: false
  },

  devtools: { enabled: true }
})
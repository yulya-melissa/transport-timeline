const basePath = process.env.NODE_ENV === 'production' ? '/transport-timeline/' : '/'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: basePath,
  },

  vite: {
    base: basePath,
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

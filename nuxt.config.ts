// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    baseURL: '/transport-timeline/',
    buildAssetsDir: 'assets', 
  },

  nitro: {
    preset: 'github-pages',
    static: true, 
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  experimental: {
    payloadExtraction: false 
  },

  ssr: true,
  devtools: { enabled: true }
})
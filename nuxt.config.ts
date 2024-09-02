// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiKey: process.env.API_KEY,
    },
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/variables.scss";',
        },
      },
    },
  },
  googleFonts: {
    families: {
      'Noto+Sans': true,
    }
  }
})
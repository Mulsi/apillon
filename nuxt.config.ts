// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-icon', '@nuxtjs/google-fonts', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      'IBM Plex Sans': [100, 200, 300, 400, 600, 700]
    },
    display: 'swap',
  },
  pages: true,
  plugins: [
    { src: '~/plugins/base64.ts' },
  ],
  runtimeConfig: {
    public: {
      APILLON_API_KEY: process.env.NUXT_APILLON_API_KEY,
      APILLON_API_KEY_SECRET: process.env.NUXT_APILLON_API_KEY_SECRET,
      BASE_URL: process.env.NUXT_BASE_URL,
    }
  }
})
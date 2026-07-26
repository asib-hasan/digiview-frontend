import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://demo3.ctpbd.info/api',
    }
  },

  // Custom theme tokens (no @import tailwindcss — @nuxt/ui handles it)
  css: ['~/assets/css/main.css'],

  // pathPrefix: false → <HeroSection> works instead of <HomeHeroSection>
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@vueuse/core',
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  app: {
    head: {
      title: 'ATT — Asian Traffic Technologies Ltd',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Asian Traffic Technologies Ltd — Leading provider of Intelligent Transportation Systems, Toll Collection, Traffic Monitoring, and Access Control solutions in Bangladesh.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
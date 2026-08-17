import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSR Mode: True Server-Side Rendering (Requires Node.js server deployment)
  ssr: true,

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'https://admin.digiview.biz/api',
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
      title: 'Digiview — Professional Broadcast & Media Solutions',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Digiview Broadcast Technologies — Leading provider of 4K TV & Radio Studio Infrastructure, Live Event Coverage, OB Vans, and Media Production Software in Bangladesh.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'shortcut icon', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
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
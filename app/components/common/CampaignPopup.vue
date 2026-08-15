<template>
  <Transition name="popup-fade">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      aria-modal="true" 
      role="dialog"
    >
      <!-- Backdrop with blur -->
      <div 
        class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        @click="closePopup"
      ></div>

      <!-- Modal Card -->
      <div 
        class="relative bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full border border-slate-700/50 z-10 animate-popup-scale transform transition-all duration-300"
      >
        <!-- Floating Close Button -->
        <button 
          @click.stop="closePopup" 
          class="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-[#e32727] text-white flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-md group cursor-pointer"
          aria-label="Close pop-up"
        >
          <Icon name="lucide:x" class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        <!-- Full Clickable Banner Area -->
        <div 
          @click="handleBannerClick"
          class="block relative group overflow-hidden cursor-pointer"
        >
          <!-- Full Image Container -->
          <div class="w-full relative aspect-[16/10] sm:aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
            <img 
              v-if="settings.popup_image"
              :src="settings.popup_image" 
              :alt="settings.popup_title || 'Campaign Offer'" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-8">
              <Icon name="lucide:sparkles" class="w-16 h-16 text-[#e32727]" />
            </div>

            <!-- Bottom Gradient Overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none"></div>

            <!-- Overlay Content (Title + Button) -->
            <div class="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-auto">
              <div class="max-w-md">
                <h3 v-if="settings.popup_title" class="text-lg sm:text-2xl font-black text-white leading-tight tracking-tight drop-shadow-md group-hover:text-red-400 transition-colors">
                  {{ settings.popup_title }}
                </h3>
              </div>

              <div v-if="settings.popup_button_text" class="shrink-0">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e32727] group-hover:bg-red-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                >
                  <span>{{ settings.popup_button_text }}</span>
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useNuxtApp, useAsyncData, useRoute, navigateTo } from '#app'

const { $api } = useNuxtApp()
const route = useRoute()
const isOpen = ref(false)
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

const { data: settingsResponse } = await useAsyncData('global-settings-popup', () => 
  $api('/public/settings') as Promise<any>
)

const settings = computed(() => settingsResponse.value?.data || {})

const closePopup = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  isOpen.value = false
}

const handleBannerClick = async () => {
  const url = settings.value?.popup_button_link?.trim()
  closePopup()
  if (!url) return

  if (url.startsWith('/') || url.startsWith('#')) {
    await navigateTo(url)
  } else if (url.startsWith('http://') || url.startsWith('https://')) {
    if (typeof window !== 'undefined') {
      try {
        const parsed = new URL(url)
        if (parsed.host === window.location.host) {
          await navigateTo(parsed.pathname + parsed.search + parsed.hash)
          return
        }
      } catch (e) {}
      window.location.href = url
    }
  } else {
    await navigateTo(`/${url}`)
  }
}

onMounted(() => {
  if (import.meta.client) {
    const isHomePage = route.path === '/'
    const isStatusOn = settings.value.popup_status === '1' || 
                       settings.value.popup_status === 1 || 
                       settings.value.popup_status === true || 
                       settings.value.popup_status === 'true'

    if (isHomePage && isStatusOn) {
      setTimeout(() => {
        if (route.path === '/') {
          isOpen.value = true
          // Auto close after 10 seconds
          autoCloseTimer = setTimeout(() => {
            closePopup()
          }, 10000)
        }
      }, 500) // Smooth initial delay on home page reload/open
    }
  }
})

onBeforeUnmount(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>

<style scoped>
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

@keyframes popupScale {
  0% {
    opacity: 0;
    transform: scale(0.93) translateY(15px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popup-scale {
  animation: popupScale 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>

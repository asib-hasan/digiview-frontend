<template>
  <div class="relative w-full overflow-hidden bg-slate-900 group aspect-[16/7] sm:aspect-[2.5/1] md:aspect-[1920/600] max-h-[600px]">
    
    <!-- Full Width Image Slider -->
    <div class="absolute inset-0 z-0">
      <transition-group :name="transitionName" tag="div" class="w-full h-full relative">
        <div 
          v-for="(image, index) in images" 
          :key="image.src || index"
          v-show="currentIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <component 
            :is="image.url ? (image.url.startsWith('http') ? 'a' : 'NuxtLink') : 'div'"
            :href="image.url && image.url.startsWith('http') ? image.url : undefined"
            :to="image.url && !image.url.startsWith('http') ? image.url : undefined"
            :target="image.url && image.url.startsWith('http') ? '_blank' : undefined"
            class="w-full h-full block relative group/slide"
          >
            <!-- Banner Image (1920x600) -->
            <img 
              :src="image.src" 
              :alt="image.alt || image.title"
              class="absolute inset-0 w-full h-full object-cover slider-image"
            />

            <!-- Modern Gradient Overlay for Title, Subtitle & Link -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 flex items-end pb-6 sm:pb-8 md:pb-10 lg:pb-12 px-6 sm:px-10 md:px-14 lg:px-20">
              <div v-if="image.title" class="max-w-3xl space-y-1.5 sm:space-y-2.5">
                <!-- Title -->
                <h2 class="text-lg sm:text-2xl md:text-3xl lg:text-[36px] font-black text-white tracking-tight drop-shadow-xl leading-tight">
                  {{ image.title }}
                </h2>

                <!-- Subtitle / Middle Text (Smaller font as requested) -->
                <p v-if="image.subtitle" class="text-xs sm:text-sm md:text-base font-medium text-slate-200 drop-shadow-md leading-snug">
                  {{ image.subtitle }}
                </p>
                
                <!-- Action Button -->
                <div v-if="image.url" class="pt-1.5 sm:pt-2">
                  <div class="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#e32727] hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 shadow-lg group-hover/slide:scale-105">
                    <span>Explore Details</span>
                    <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/slide:translate-x-1" />
                  </div>
                </div>

              </div>
            </div>
          </component>
        </div>
      </transition-group>
    </div>

    <!-- Navigation Arrows -->
    <div class="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
      <button 
        @click="prevSlide" 
        class="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#e32727] transition-all duration-300 pointer-events-auto shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
        aria-label="Previous slide"
      >
        <Icon name="lucide:chevron-left" class="w-6 h-6" />
      </button>
      <button 
        @click="nextSlide" 
        class="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#e32727] transition-all duration-300 pointer-events-auto shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
        aria-label="Next slide"
      >
        <Icon name="lucide:chevron-right" class="w-6 h-6" />
      </button>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
      <button 
        v-for="(_, index) in images" 
        :key="index"
        @click="setCurrentIndex(index)"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'w-8 bg-[#e32727]' : 'w-2.5 bg-white/50 hover:bg-white/75'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const { $api } = useNuxtApp()

// Fetch dynamic banners
const { data: bannerResponse } = await useAsyncData('banners', () => $api('/public/banners') as Promise<any>)
const images = computed(() => {
  const dynamicBanners = bannerResponse.value?.data || []
  if (dynamicBanners.length > 0) {
    return dynamicBanners.map((b: any) => ({
      src: b.banner,
      alt: b.title,
      title: b.title,
      subtitle: b.subtitle,
      url: b.url
    }))
  }
  return [
    { src: '/images/banner1.png', alt: 'Live Broadcast Event', title: 'Live Broadcast Event', subtitle: 'kiloview live streaming solutions', url: '/products' }
  ]
})

const currentIndex = ref(0)
const transitionName = ref('slide-left')
let timer: any = null

const startAutoSlide = () => {
  timer = setInterval(() => {
    nextSlide()
  }, 5000)
}

const nextSlide = () => {
  if (images.value.length > 0) {
    transitionName.value = 'slide-left'
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }
  stopAutoSlide()
  startAutoSlide()
}

const prevSlide = () => {
  if (images.value.length > 0) {
    transitionName.value = 'slide-right'
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  }
  stopAutoSlide()
  startAutoSlide()
}

const stopAutoSlide = () => {
  if (timer) clearInterval(timer)
}

const setCurrentIndex = (index: number) => {
  if (index > currentIndex.value) {
    transitionName.value = 'slide-left'
  } else if (index < currentIndex.value) {
    transitionName.value = 'slide-right'
  }
  currentIndex.value = index
  stopAutoSlide()
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* Fast Snappy Slide Transitions (0.5s) with Zoom Scale Fade */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from {
  transform: translateX(100%) scale(1.08);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%) scale(0.92);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%) scale(1.08);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%) scale(0.92);
  opacity: 0;
}

/* Subtle continuous zoom animation for active banner image */
.slider-image {
  animation: zoomInOut 16s ease-in-out infinite alternate;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.07);
  }
}
</style>

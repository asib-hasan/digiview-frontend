<template>
  <div class="relative w-full overflow-hidden bg-slate-900 group mt-16 md:mt-20 h-[40vh] md:h-[50vh] lg:h-[60vh]">
    
    <!-- Image Slider -->
    <div class="absolute inset-0 z-0">
      <transition-group name="fade" tag="div" class="w-full h-full relative">
        <div 
          v-for="(image, index) in images" 
          :key="image.src"
          v-show="currentIndex === index"
          class="absolute inset-0 w-full h-full"
        >
          <img 
            :src="image.src" 
            :alt="image.alt"
            class="absolute inset-0 w-full h-full object-cover slider-image"
          />
        </div>
      </transition-group>
      
      <!-- Subtle Overlay to ensure good contrast if anything is added later, though user requested no text -->
      <div class="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
    </div>
    <!-- Navigation Arrows -->
    <div class="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
      <button 
        @click="prevSlide" 
        class="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-[#e32727] transition-colors pointer-events-auto shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Previous slide"
      >
        <Icon name="lucide:chevron-left" class="w-6 h-6" />
      </button>
      <button 
        @click="nextSlide" 
        class="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-[#e32727] transition-colors pointer-events-auto shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Next slide"
      >
        <Icon name="lucide:chevron-right" class="w-6 h-6" />
      </button>
    </div>

    <!-- Navigation dots -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
      <button 
        v-for="(_, index) in images" 
        :key="index"
        @click="setCurrentIndex(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'"
        aria-label="Go to slide"
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
      alt: b.title
    }))
  }
  return [
    { src: '/images/banner1.png', alt: 'Broadcast Studio' }
  ]
})

const currentIndex = ref(0)
let timer: any = null

const startAutoSlide = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }, 5000)
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
  stopAutoSlide()
  startAutoSlide()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  stopAutoSlide()
  startAutoSlide()
}

const stopAutoSlide = () => {
  if (timer) clearInterval(timer)
}

const setCurrentIndex = (index: number) => {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Subtle zoom effect for the image to make it feel alive/animated */
.slider-image {
  animation: zoomInOut 20s infinite alternate linear;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>

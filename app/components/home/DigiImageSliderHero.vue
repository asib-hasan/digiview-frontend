<template>
  <div class="relative w-full overflow-hidden bg-slate-900 group mt-16 md:mt-20 h-[40vh] md:h-[50vh] lg:h-[60vh]">
    
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
            <!-- Banner Image -->
            <img 
              :src="image.src" 
              :alt="image.alt"
              class="absolute inset-0 w-full h-full object-cover slider-image"
            />

            <!-- Modern Gradient Overlay for Title & Link -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 flex items-end pb-10 md:pb-14 px-6 md:px-16 lg:px-24">
              <div v-if="image.title" class="max-w-3xl space-y-3">
                <!-- Animated Title -->
                <h2 class="text-xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-xl leading-tight">
                  {{ image.title }}
                </h2>
                
                <!-- Modern Action Button -->
                <div v-if="image.url" class="pt-1">
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#e32727] backdrop-blur-md text-white text-xs md:text-sm font-bold rounded-lg transition-all duration-300 border border-white/20 group-hover/slide:border-[#e32727] group-hover/slide:bg-[#e32727]">
                    <span>Explore Details</span>
                    <Icon name="lucide:arrow-right" class="w-4 h-4 transition-transform group-hover/slide:translate-x-1" />
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
      url: b.url
    }))
  }
  return [
    { src: '/images/banner1.png', alt: 'Broadcast Studio', title: 'Broadcast Studio', url: '' }
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

<template>
  <section 
    class="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-slate-900 group"
    @mouseenter="pauseAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides -->
    <transition-group name="slide-fade" tag="div" class="w-full h-full relative">
      <div 
        v-for="(slide, index) in slides" 
        v-show="currentSlide === index"
        :key="slide.id"
        class="absolute inset-0 w-full h-full"
      >
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img v-if="slide.image" :src="slide.image" class="absolute inset-0 w-full h-full object-cover" :alt="slide.title" />
          <!-- Dark overlay for text readability -->
          <div class="absolute inset-0 bg-black/80"></div>
          
          <!-- Tech Animation Background -->
          <TechHeroAnimation />
        </div>

        <!-- Content -->
        <div class="relative z-10 w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div class="max-w-3xl">

            <h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight mb-6 animate-fade-up drop-shadow-2xl">
              <span v-html="slide.title"></span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-200 leading-relaxed font-medium max-w-2xl mb-10 animate-fade-up delay-200 drop-shadow-md">
              {{ slide.description }}
            </p>
            

          </div>
        </div>
      </div>
    </transition-group>

    <!-- Navigation Arrows -->
    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
      aria-label="Previous Slide"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
      aria-label="Next Slide"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Pagination Dots -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
      <button 
        v-for="(slide, index) in slides" 
        :key="`dot-${slide.id}`"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300 outline-none"
        :class="currentSlide === index ? 'bg-accent-500 w-8' : 'bg-white/50 hover:bg-white/80'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TechHeroAnimation from './TechHeroAnimation.vue'

const slides = [
  {
    id: 1,
    title: 'Intelligent<br/><span class="text-accent-500">Transportation</span><br/>Systems',
    description: 'Asian Traffic Technologies Ltd delivers world-class toll collection, traffic monitoring, and highway management systems across Bangladesh.',
    secondaryLabel: 'Contact Us',
    secondaryLink: '/contact',
    image: '/slider/hero_traffic_system.png', 
  },
  {
    id: 2,
    title: 'Seamless<br/><span class="text-accent-500">Electronic Toll</span><br/>Collection',
    description: 'Pioneering advanced ETC solutions with RFID technology to reduce congestion and improve national highway efficiency.',
    secondaryLabel: 'Learn More',
    secondaryLink: '/solutions/toll-management',
    image: '/slider/hero_toll_collection.png',
  },
  {
    id: 3,
    title: 'Advanced<br/><span class="text-accent-500">Access Control</span><br/>& Security',
    description: 'Comprehensive hardware and software solutions for securing industrial facilities, ports, and critical infrastructure.',
    secondaryLabel: 'View Services',
    secondaryLink: '/services',
    image: '/slider/hero_access_security.png',
  }
]

const currentSlide = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  autoplayTimer = setInterval(nextSlide, 6000) 
}

const pauseAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  pauseAutoplay()
})
</script>

<style scoped>
/* Slide transition animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

/* Staggered text animations for active slide */
.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease-out forwards;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

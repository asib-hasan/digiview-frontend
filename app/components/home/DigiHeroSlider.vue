<template>
  <div class="relative w-full h-[700px] overflow-hidden bg-slate-950 group mt-16 md:mt-24">
    <!-- Cyberpunk grid background -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>

    <div 
      v-for="(slide, index) in slides" 
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <div class="absolute inset-0 bg-slate-900 mix-blend-color z-10 opacity-60"></div>
      <img 
        :src="slide.image" 
        :alt="slide.title"
        class="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-[10000ms] ease-out opacity-60"
        :class="currentSlide === index ? 'scale-110' : 'scale-100'"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
      
      <!-- Content -->
      <div class="absolute inset-0 flex items-center z-20">
        <div class="container mx-auto px-4 md:px-8">
          <div class="max-w-3xl transform transition-all duration-1000 delay-300 relative"
               :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
            
            <!-- Glowing accent line -->
            <div class="absolute -left-8 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] hidden md:block"></div>

            <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold tracking-widest mb-6 uppercase shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {{ slide.badge }}
            </span>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              {{ slide.title }}
            </h1>
            <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light">
              {{ slide.description }}
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/products" class="relative group overflow-hidden px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2 uppercase tracking-wider">
                <span class="relative z-10 flex items-center gap-2">
                  Explore Products
                  <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div class="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              </NuxtLink>
              <NuxtLink to="#" class="px-8 py-4 bg-slate-800/50 hover:bg-slate-700 text-white font-bold rounded-lg backdrop-blur-md border border-slate-600 transition-all flex items-center gap-2 uppercase tracking-wider hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-4">
      <button 
        v-for="(_, index) in slides" 
        :key="`dot-${index}`"
        @click="goToSlide(index)"
        class="w-12 h-1 rounded transition-all duration-300 relative overflow-hidden bg-slate-700"
        aria-label="Go to slide"
      >
        <div class="absolute inset-0 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-transform duration-[6000ms] ease-linear origin-left"
             :style="{ transform: currentSlide === index ? 'scaleX(1)' : 'scaleX(0)' }">
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    image: '/slider/1.webp',
    badge: 'Broadcast Technologies',
    title: 'NEXT-GEN CAMERA SYSTEMS',
    description: 'Empower your studio with state-of-the-art camera solutions designed for modern broadcasting, cinematic production, and zero-latency live streaming.',
  },
  {
    image: '/slider/2.webp',
    badge: 'Studio Equipment',
    title: 'INTELLIGENT STUDIO AUTOMATION',
    description: 'From AI-driven lighting to advanced audio mixing consoles, discover everything you need to build a world-class production environment.',
  }
]

const currentSlide = ref(0)
let slideInterval: any = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoplay()
}

const startAutoplay = () => {
  slideInterval = setInterval(nextSlide, 6000)
}

const stopAutoplay = () => {
  if (slideInterval) clearInterval(slideInterval)
}

const resetAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

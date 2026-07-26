<template>
  <section class="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8 mb-16">
      
      <!-- Section Heading -->
      <div class="text-center max-w-2xl mx-auto animate-fade-in-up">
        <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727]">
          GLOBAL PARTNERS
        </div>
        <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
          Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Partners</span>
        </h2>
      </div>

    </div>

    <!-- Marquee Slider Container -->
    <div class="relative w-full flex flex-col items-center overflow-hidden py-4 animate-fade-in-up animation-delay-200">
      
      <!-- Left/Right Gradients -->
      <div class="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

      <!-- Marquee Track Wrapper -->
      <div class="flex overflow-hidden group w-full">
        
        <!-- Track 1 -->
        <div class="flex shrink-0 animate-marquee min-w-full gap-8 px-4 items-center justify-around">
          <div 
            v-for="(vendor, idx) in vendors" 
            :key="`t1-${idx}`" 
            class="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#e32727]/30 transition-all duration-300 p-8 flex items-center justify-center group/card h-32 w-72 shrink-0 cursor-pointer"
          >
            <div class="w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover/card:scale-110">
              <img v-if="vendor.logo" :src="vendor.logo" :alt="vendor.title" class="max-h-full max-w-full object-contain" />
              <span v-else class="text-xl font-bold text-slate-800">{{ vendor.title }}</span>
            </div>
          </div>
        </div>
        
        <!-- Track 2 (Duplicate for seamless loop) -->
        <div class="flex shrink-0 animate-marquee min-w-full gap-8 px-4 items-center justify-around" aria-hidden="true">
          <div 
            v-for="(vendor, idx) in vendors" 
            :key="`t2-${idx}`" 
            class="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#e32727]/30 transition-all duration-300 p-8 flex items-center justify-center group/card h-32 w-72 shrink-0 cursor-pointer"
          >
            <div class="w-full h-full flex items-center justify-center transition-all duration-500 transform group-hover/card:scale-110">
              <img v-if="vendor.logo" :src="vendor.logo" :alt="vendor.title" class="max-h-full max-w-full object-contain" />
              <span v-else class="text-xl font-bold text-slate-800">{{ vendor.title }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data, pending: loading } = await useAsyncData('vendors-list', () => $api('/public/vendors') as Promise<any>)

const vendors = computed(() => data.value?.data || []);
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

/* Pause the animation when hovering over the track */
.group:hover .animate-marquee {
  animation-play-state: paused;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
.animation-delay-200 { animation-delay: 200ms; }
</style>

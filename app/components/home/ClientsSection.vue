<template>
  <section v-if="clientImages.length > 0" class="py-16 bg-white border-b border-slate-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div class="text-center" v-animate="'animate-fade-up'">
        <h2 class="text-2xl font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-200 pb-4 inline-block px-8">Our Clients</h2>
      </div>
    </div>
    
    <!-- Clients Slider -->
    <div class="relative w-full overflow-hidden group" v-animate="'animate-fade-in delay-200'">
      <!-- Gradient masks for smooth edges -->
      <div class="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <div class="flex animate-marquee opacity-80 group-hover:opacity-100 transition-opacity duration-500 w-max hover:[animation-play-state:paused]">
        <!-- Duplicate lists for seamless loop -->
        <div v-for="n in 2" :key="n" class="flex gap-16 md:gap-24 items-center px-8 md:px-12 w-max">
          <div v-for="(image, idx) in clientImages" :key="`c-${idx}-${n}`" class="flex items-center justify-center transition-transform hover:scale-110 flex-shrink-0 cursor-pointer">
            <img :src="image.logo" :alt="image.title" class="h-14 md:h-16 w-auto max-w-[140px] md:max-w-[180px] object-contain drop-shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data: clientsResponse } = await useAsyncData('home-clients', () => $api('/public/clients') as Promise<any>)

const clientImages = computed(() => {
  const dynamicClients = clientsResponse.value?.data || []
  return dynamicClients
    .filter((c: any) => Boolean(c.logo))
    .map((c: any) => ({
      logo: c.logo,
      title: c.title
    }))
})
</script>

<style scoped>
.animate-marquee {
  animation: marquee 40s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

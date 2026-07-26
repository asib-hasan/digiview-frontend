<template>
  <section class="py-20 md:py-32 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727] animate-fade-in-up">
          WHY CHOOSE US
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight animate-fade-in-up animation-delay-200">
          The Trusted Name in <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Broadcasting</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        <div v-for="(feature, index) in features" :key="feature.id" class="group bg-white p-8 md:p-10 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden animate-fade-in-up" :class="{'animation-delay-200': index % 3 === 1, 'animation-delay-400': index % 3 === 2}">
          <div class="relative z-10 flex flex-col gap-5 items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e32727] group-hover:bg-[#e32727] group-hover:text-white transition-colors duration-300">
              <Icon :name="feature.icon || 'lucide:zap'" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-extrabold text-slate-800">{{ feature.title }}</h3>
            <p class="text-slate-600 leading-relaxed text-sm">{{ feature.short_description }}</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data: featuresResponse } = await useAsyncData('home-features', () => $api('/public/features') as Promise<any>)

const features = computed(() => featuresResponse.value?.data || [])
</script>

<style scoped>
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
.animation-delay-400 { animation-delay: 400ms; }
</style>

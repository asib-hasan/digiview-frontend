<template>
  <NuxtLink :to="link" class="group flex flex-col bg-white border border-slate-200 hover:border-accent-500 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
    <!-- Top yellow accent line -->
    <div class="absolute top-0 left-0 w-full h-1 bg-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-10"></div>
    
    <!-- Image Area -->
    <div class="h-64 bg-slate-50 flex items-center justify-center p-8 overflow-hidden relative border-b border-slate-100">
      <div class="absolute inset-0 bg-primary-900/5 group-hover:bg-transparent transition-colors z-0"></div>
      <img :src="image" :alt="title" class="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm" />
    </div>

    <!-- Content Area -->
    <div class="p-8 flex flex-col flex-grow">
      <h3 class="text-xl font-black text-primary-900 uppercase tracking-tight mb-4 leading-tight group-hover:text-accent-600 transition-colors">
        {{ title }}
      </h3>
      <p class="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
        {{ description }}
      </p>

      <!-- Specifications Snippet -->
      <ul class="space-y-2.5 mb-8" v-if="specs && specs.length">
        <li v-for="(spec, idx) in specs.slice(0, 2)" :key="idx" class="flex items-start gap-2.5 text-xs text-slate-500 font-medium">
          <svg class="w-4 h-4 text-accent-500 flex-shrink-0 translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span class="leading-relaxed">{{ spec }}</span>
        </li>
      </ul>

      <!-- CTA -->
      <div class="mt-auto flex items-center gap-2.5 text-xs font-black text-primary-900 group-hover:text-accent-500 transition-colors uppercase tracking-widest">
        View Specs
        <svg class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  specs?: string[]
  link: string
}>()
</script>

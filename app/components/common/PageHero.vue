<template>
  <section class="relative bg-slate-900 pt-36 pb-16 md:pt-40 md:pb-20 overflow-hidden flex flex-col items-center justify-center text-center">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img :src="bgImage || '/slider/1.webp'" alt="Page Background" class="w-full h-full object-cover opacity-50" />
      <div class="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 flex flex-col items-center">
      <!-- Title with Bracket Design -->
      <div class="relative inline-block px-10 py-4 mb-4">
        <!-- Top Left Corner -->
        <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/80"></div>
        <!-- Top Right Corner -->
        <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/80"></div>
        <!-- Bottom Left Corner -->
        <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/80"></div>
        <!-- Bottom Right Corner -->
        <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/80"></div>
        
        <h1 class="text-3xl md:text-4xl lg:text-[40px] font-black text-white uppercase tracking-[0.2em] leading-none">
          {{ title }}
        </h1>
      </div>
      
      <!-- Breadcrumb -->
      <nav class="flex items-center justify-center gap-2 text-[15px] font-medium text-slate-300">
        <NuxtLink to="/" class="hover:text-white transition-colors">
          Home
        </NuxtLink>
        <span class="text-slate-400 mx-1">/</span>
        <span v-if="parent" class="flex items-center gap-2">
          <NuxtLink :to="parentTo" class="hover:text-white transition-colors">{{ parent }}</NuxtLink>
          <span class="text-slate-400 mx-1">/</span>
        </span>
        <span class="text-white">{{ title }}</span>
      </nav>
      
      <p v-if="subtitle" class="text-lg text-slate-300 max-w-2xl leading-relaxed mt-6">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  parent?: string
  parentTo?: string
  bgImage?: string
}>()
</script>

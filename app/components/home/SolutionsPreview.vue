<template>
  <!-- Solutions Preview -->
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <div class="text-center mb-14">
        <div v-animate="'animate-fade-up'" class="inline-flex items-center gap-2 mb-4">
          <span class="w-10 h-0.5 bg-accent-500"></span>
          <span class="text-primary-700 text-sm font-bold uppercase tracking-wider">What We Offer</span>
        </div>
        <h2 v-animate="'animate-fade-up delay-100'" class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Comprehensive ITS Solutions
        </h2>
        <p v-animate="'animate-fade-up delay-200'" class="text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Digital technologies that accelerate Bangladesh's economic growth. From toll collection to highway management — we provide end-to-end intelligent transportation systems.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <ItemCard
          v-for="(s, index) in solutions.slice(0, 8)"
          :key="s.slug"
          v-animate="`animate-fade-up delay-${(index + 3) * 100}`"
          :to="'/solutions/toll-management'"
          :title="s.title"
          :description="s.shortDesc"
          :icon="s.icon"
          :color="s.color"
        />
      </div>

      <div class="text-center" v-animate="'animate-fade-up delay-700'">
        <NuxtLink to="/solutions" class="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-700 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-primary-700/20">
          View All Solutions
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { solutions } from '~/data/solutions'
</script>

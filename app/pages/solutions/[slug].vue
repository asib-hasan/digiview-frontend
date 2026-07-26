<template>
  <div v-if="solution">
    <PageHero
      :title="solution.title"
      :subtitle="solution.shortDesc"
      label="Solutions"
      parent="Solutions"
      parent-to="/solutions"
    />

    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Back to List -->
        <NuxtLink to="/solutions" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
          Back to List
        </NuxtLink>

        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Image Column (Left Side) -->
          <div v-if="solution.image" class="lg:col-span-5 lg:sticky lg:top-24 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <img :src="solution.image" :alt="solution.title" class="w-full h-full object-cover" />
          </div>

          <!-- Content Column (Right Side) -->
          <div :class="solution.image ? 'lg:col-span-7' : 'lg:col-span-12 max-w-4xl'">
            <!-- Icon + label -->
            <div class="flex items-center gap-4 mb-8">
              <div v-if="!solution.image" :class="['w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg flex-shrink-0', solution.color || 'from-slate-700 to-slate-900']">
                <component :is="iconComponent" :size="32" />
              </div>
              <div>
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">ATT Solution</div>
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900">{{ solution.title }}</h2>
              </div>
            </div>

            <!-- Dynamic Content (from Summernote) -->
            <div v-if="solution.content" class="prose prose-slate max-w-none prose-lg mb-10" v-html="solution.content"></div>

            <!-- Fallback for current static data -->
            <template v-else>
              <!-- Description -->
              <div class="prose prose-slate max-w-none mb-10">
                <p class="text-slate-600 leading-relaxed text-lg">{{ solution.description }}</p>
              </div>

              <!-- Features -->
              <div class="bg-slate-50 rounded-2xl p-8 mb-10">
                <h3 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Key Features & Capabilities
                </h3>
                <div class="grid sm:grid-cols-2 gap-3">
                  <div v-for="feature in solution.features" :key="feature" class="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                    <svg class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    <span class="text-sm text-slate-700 font-medium">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 state -->
  <div v-else class="min-h-screen flex items-center justify-center text-center px-4">
    <div>
      <div class="text-6xl font-black text-slate-200 mb-4">404</div>
      <h1 class="text-2xl font-bold text-slate-800 mb-3">Solution Not Found</h1>
      <p class="text-slate-500 mb-6">The solution you're looking for doesn't exist.</p>
      <NuxtLink to="/solutions" class="px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl">Back to Solutions</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as icons from '@lucide/vue'
import { solutions } from '~/data/solutions'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const solution = computed(() => solutions.find(s => s.slug === slug.value))
const otherSolutions = computed(() => solutions.filter(s => s.slug !== slug.value))
const iconComponent = computed(() => (icons as any)[solution.value?.icon ?? 'Activity'] || icons.Activity)

useSeoMeta({
  title: computed(() => solution.value ? `${solution.value.title} — ATT Solutions` : 'Solution Not Found'),
  description: computed(() => solution.value?.shortDesc ?? ''),
})

// 404 if not found
if (!solution.value && import.meta.server) {
  throw createError({ statusCode: 404, message: 'Solution not found' })
}
</script>

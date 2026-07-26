<template>
  <div class="py-12 md:py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div v-if="title || description" class="text-center mb-16">
        <h2 v-animate="'animate-fade-up'" class="text-3xl md:text-5xl font-black text-primary-900 uppercase tracking-tight mb-4">
          <span v-if="highlight" class="text-accent-500">{{ highlight }}</span>
          {{ title }}
        </h2>
        <p v-if="description" v-animate="'animate-fade-up delay-100'" class="text-lg text-slate-600 max-w-3xl mx-auto">
          {{ description }}
        </p>
      </div>

      <!-- Grid Items -->
      <div class="space-y-16 md:space-y-24">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          :id="item.id"
          class="flex flex-col md:flex-row gap-8 lg:gap-16 items-center scroll-mt-24"
          :class="{'md:flex-row-reverse': index % 2 !== 0}"
        >
          <!-- Image Container -->
          <div v-animate="index % 2 !== 0 ? 'animate-slide-left' : 'animate-fade-up'" class="w-full md:w-1/2 relative group overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/50 rounded-[30px]">
            <div class="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <!-- Accent Corner -->
            <div class="absolute bottom-0 right-0 w-16 h-16 bg-accent-500 z-20 flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>

          <!-- Content Container -->
          <div v-animate="index % 2 === 0 ? 'animate-slide-left' : 'animate-fade-up'" class="w-full md:w-1/2 flex flex-col justify-center">
            <div class="border-l-[6px] border-accent-500 pl-6 mb-6">
              <h3 class="text-2xl md:text-4xl font-bold text-primary-900 uppercase tracking-tight mb-4">
                {{ item.title }}
              </h3>
              <p class="text-slate-600 text-lg leading-relaxed">
                {{ item.description }}
              </p>
            </div>
            
            <ul v-if="item.features" class="space-y-3 mb-8">
              <li v-for="(feature, fIndex) in item.features" :key="fIndex" class="flex items-start gap-3">
                <svg class="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span class="text-slate-700 font-medium">{{ feature }}</span>
              </li>
            </ul>

            <div>
              <NuxtLink 
                v-if="item.link" 
                :to="item.link"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-900 hover:bg-accent-500 text-white hover:text-primary-900 font-bold uppercase tracking-wider transition-all duration-300"
              >
                {{ item.linkLabel || 'Learn More' }}
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
export interface GridItem {
  id?: string
  title: string
  description: string
  image: string
  features?: string[]
  link?: string
  linkLabel?: string
}

defineProps<{
  title?: string
  highlight?: string
  description?: string
  items: GridItem[]
}>()
</script>

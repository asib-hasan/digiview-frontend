<template>
  <section class="py-12 md:py-20 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up">
        <div class="max-w-2xl">
          <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727]">
            BROWSE BY CATEGORY
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Shop Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Top Categories</span>
          </h2>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in-up animation-delay-200">
        
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
        >
          <!-- Background Image -->
          <img :src="category.image" :alt="category.title" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          
          <!-- Content -->
          <div class="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
            <h3 class="text-2xl font-black text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{{ category.title }}</h3>
            
            <NuxtLink :to="`/products?category=${category.slug}`" class="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg text-sm w-4/5 shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-[#e32727] hover:text-white">
              Shop All <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data: topResponse } = await useAsyncData('home-top-categories', () => $api('/public/home-top-categories') as Promise<any>)

const categories = computed(() => {
  const topCategories = topResponse.value?.data || []
  return topCategories.map((c: any) => ({
    title: c.title,
    slug: c.slug,
    image: c.image || '/products/default-category.webp'
  }))
})
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
</style>

<template>
  <section class="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-fade-in-up">
        <div class="max-w-2xl">
          <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727]">
            PRODUCT SHOWCASE
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Products</span>
          </h2>
        </div>
      </div>

      <!-- Product Grid (E-commerce Style) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-fade-in-up animation-delay-400">
        
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group"
        >
          <!-- Image Container -->
          <div class="aspect-square bg-slate-50 rounded-xl overflow-hidden relative mb-6">
            <img :src="product.image" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            
            <!-- Badges -->
            <div v-if="product.isNew" class="absolute top-4 left-4 bg-[#e32727] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
              New
            </div>
            
            <!-- Hover Action Overlay -->
            <NuxtLink :to="`/products/${product.slug}`" class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-[#e32727] hover:scale-110 transition-all shadow-xl">
                 <Icon name="lucide:eye" class="w-5 h-5" />
               </button>
            </NuxtLink>
          </div>
          
          <!-- Info -->
          <div class="flex-1 flex flex-col">
            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Icon name="lucide:tag" class="w-3 h-3 text-[#e32727]" /> {{ product.category }}
            </p>
            <h3 class="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-[#e32727] transition-colors">
              <NuxtLink :to="`/products/${product.slug}`">{{ product.title }}</NuxtLink>
            </h3>
            <p class="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">
              {{ product.shortDesc }}
            </p>
            
            <!-- Actions -->
            <div class="flex items-center gap-2 mt-auto">
              <NuxtLink :to="`/products/${product.slug}`" class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 px-3 rounded-lg text-xs font-bold transition-colors text-center shadow-sm">
                Read more..
              </NuxtLink>
              <NuxtLink :to="`/products/${product.slug}?tab=specifications`" class="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center rounded-lg transition-colors border border-slate-200" title="View Specifications">
                <Icon name="lucide:file-text" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
      
      <!-- View All Button -->
      <div class="mt-16 text-center animate-fade-in-up animation-delay-600">
        <NuxtLink to="/products" class="inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 hover:border-[#e32727] text-slate-800 hover:text-[#e32727] font-bold rounded-xl transition-all shadow-sm hover:shadow-md uppercase tracking-widest text-sm">
          Browse Full Catalog <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data: featuredResponse } = await useAsyncData('home-featured-products', () => $api('/public/home-featured-products') as Promise<any>)

const products = computed(() => {
  const featured = featuredResponse.value?.data || []
  return featured.map((p: any) => ({
    title: p.title,
    slug: p.slug,
    category: p.category,
    shortDesc: p.short_description || '',
    image: p.image || '/product.png',
    isNew: false
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
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }

/* Truncate text nicely for descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

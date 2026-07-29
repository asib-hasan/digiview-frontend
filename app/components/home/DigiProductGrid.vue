<template>
  <section class="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading with Dynamic DB Categories -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up">
        <div class="max-w-xl">
          <div class="mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727]">
            PRODUCT SHOWCASE
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Featured <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Equipment</span>
          </h2>
        </div>

        <!-- Real Categories from Database -->
        <div v-if="categoryTabs.length > 0" class="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
          <button
            v-for="tab in categoryTabs"
            :key="tab.value"
            @click="activeCategory = tab.value"
            class="px-4 py-2 text-sm font-bold transition-all relative cursor-pointer"
            :class="activeCategory === tab.value 
              ? 'text-[#e32727] border-b-2 border-[#e32727] -mb-[5px]' 
              : 'text-slate-500 hover:text-slate-800'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
        
        <div 
          v-for="(product, index) in filteredProducts" 
          :key="index"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col h-full group"
        >
          <!-- Image Showcase -->
          <div class="aspect-square bg-[#f8f9fa] rounded-xl p-4 relative overflow-hidden flex items-center justify-center mb-5">
            <img 
              :src="product.image" 
              :alt="product.title" 
              class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
            
            <!-- Category Tag -->
            <span v-if="product.category" class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              {{ product.category }}
            </span>

            <!-- Quick Action Overlay on Hover -->
            <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <NuxtLink 
                :to="`/products/${product.slug}`" 
                class="px-4 py-2 bg-white text-slate-900 hover:bg-[#e32727] hover:text-white font-bold rounded-lg text-xs transition-colors shadow-md flex-1 text-center"
              >
                View Details
              </NuxtLink>
              <NuxtLink 
                :to="`/products/${product.slug}?tab=specifications`" 
                class="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-lg transition-colors" 
                title="Specifications"
              >
                <Icon name="lucide:file-text" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-800 mb-2 leading-snug group-hover:text-[#e32727] transition-colors line-clamp-2">
                <NuxtLink :to="`/products/${product.slug}`">{{ product.title }}</NuxtLink>
              </h3>
              <p class="text-slate-500 text-xs line-clamp-2 mb-6">
                {{ product.shortDesc }}
              </p>
            </div>
            
            <!-- Footer Action -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span class="text-xs font-semibold text-slate-400">
                Authorized Dealer
              </span>
              <NuxtLink 
                :to="`/products/${product.slug}`" 
                class="text-xs font-bold text-[#e32727] hover:text-red-700 inline-flex items-center gap-1 group/link"
              >
                <span>Explore</span>
                <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>

      <!-- Empty State when no products match filter -->
      <div v-if="filteredProducts.length === 0" class="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-6">
        <Icon name="lucide:package-open" class="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 class="text-base font-bold text-slate-700">No Products in This Category</h3>
        <button @click="activeCategory = 'all'" class="text-sm font-bold text-[#e32727] hover:underline mt-2">
          View All Featured Products
        </button>
      </div>

      <!-- View All Catalog CTA -->
      <div class="mt-14 text-center">
        <NuxtLink 
          to="/products" 
          class="inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 hover:border-[#e32727] text-slate-800 hover:text-[#e32727] font-bold rounded-xl transition-all shadow-sm hover:shadow-md uppercase tracking-widest text-sm"
        >
          <span>Browse Full Catalog</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { $api } = useNuxtApp()
const { data: featuredResponse } = await useAsyncData('home-featured-products-v2', () => $api('/public/home-featured-products') as Promise<any>)

const activeCategory = ref('all')

// Categories extracted directly by the backend from the featured products (with fallback)
const categoryTabs = computed(() => {
  const cats = featuredResponse.value?.categories || []
  const tabs = [{ name: 'All Featured', value: 'all' }]
  if (Array.isArray(cats) && cats.length > 0) {
    cats.forEach((c: any) => {
      if (c && c.name) {
        tabs.push({
          name: c.name,
          value: c.value || c.name
        })
      }
    })
  } else {
    // Foolproof fallback: if backend categories are not cached yet, extract unique categories from products
    const featuredProducts = featuredResponse.value?.data || []
    const uniqueCats = Array.from(new Set(featuredProducts.map((p: any) => p.category).filter(Boolean)))
    uniqueCats.forEach((name: any) => {
      tabs.push({
        name: String(name),
        value: String(name)
      })
    })
  }
  return tabs
})

const products = computed(() => {
  const featured = featuredResponse.value?.data || []
  return featured.map((p: any) => ({
    title: p.title,
    slug: p.slug,
    category: p.category || '',
    shortDesc: p.short_description || '',
    image: p.image || '/product.png'
  }))
})

const filteredProducts = computed(() => {
  const all = products.value
  if (activeCategory.value === 'all') {
    return all.slice(0, 8)
  }
  return all.filter((p: any) => p.category === activeCategory.value).slice(0, 8)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

/* Truncate text nicely for descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

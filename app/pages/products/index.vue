<template>
  <div class="bg-slate-50 min-h-screen pb-20">
    <PageHero
      title="Our Products"
      label="Product Range"
    />

    <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-12">
      <!-- Mobile Filter Toggle -->
      <div class="lg:hidden mb-6 flex justify-between items-center">
        <h2 class="text-xl font-bold text-slate-800">Products ({{ filteredProducts.length }})</h2>
        <button 
          @click="mobileFilterOpen = true"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Icon name="lucide:sliders-horizontal" class="w-4 h-4" /> Filters
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        
        <!-- Sidebar Filter (Desktop) & Mobile Drawer -->
        <div 
          class="fixed inset-0 z-50 lg:static lg:block lg:w-72 shrink-0 transition-transform duration-300"
          :class="mobileFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        >
          <!-- Mobile Overlay -->
          <div 
            v-if="mobileFilterOpen" 
            @click="mobileFilterOpen = false"
            class="absolute inset-0 bg-slate-900/50 lg:hidden"
          ></div>
          
          <!-- Filter Panel -->
          <div class="absolute lg:static top-0 left-0 h-full lg:h-auto w-4/5 max-w-xs lg:w-full bg-white lg:bg-transparent shadow-2xl lg:shadow-none p-6 lg:p-0 overflow-y-auto lg:overflow-visible flex flex-col gap-8">
            
            <div class="flex items-center justify-between lg:hidden mb-2">
              <h3 class="text-xl font-bold text-slate-800">Filters</h3>
              <button @click="mobileFilterOpen = false" class="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-lg">
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>

            <!-- Category Filter -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="lucide:tag" class="w-4 h-4 text-[#e32727]" /> Category
              </h3>
              <div class="space-y-3">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" :value="cat" v-model="selectedCategories" class="w-5 h-5 rounded border-slate-300 text-[#e32727] focus:ring-[#e32727]" />
                  <span class="text-slate-600 group-hover:text-slate-900 transition-colors">{{ cat }}</span>
                </label>
              </div>
            </div>

            <hr class="border-slate-200" />

            <!-- Brand Filter -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 flex items-center gap-2">
                <Icon name="lucide:award" class="w-4 h-4 text-[#e32727]" /> Brand
              </h3>
              <div class="space-y-3">
                <label v-for="brand in brands" :key="brand" class="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" :value="brand" v-model="selectedBrands" class="w-5 h-5 rounded border-slate-300 text-[#e32727] focus:ring-[#e32727]" />
                  <span class="text-slate-600 group-hover:text-slate-900 transition-colors">{{ brand }}</span>
                </label>
              </div>
            </div>

            <button 
              v-if="selectedCategories.length || selectedBrands.length"
              @click="clearFilters"
              class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
            
          </div>
        </div>

        <!-- Main Product Grid -->
        <div class="flex-1">
          
          <div class="hidden lg:flex justify-between items-center mb-8">
            <h2 class="text-2xl font-black text-slate-800">Products</h2>
            <span class="text-slate-500 font-medium">Page {{ pagination?.current_page || 1 }} of {{ pagination?.last_page || 1 }}</span>
          </div>

          <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div 
              v-for="product in filteredProducts" 
              :key="product.slug"
              class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group animate-fade-in-up"
            >
              <!-- Image Container -->
              <NuxtLink :to="`/products/${product.slug}`" class="aspect-[4/3] bg-white border border-slate-50 rounded-xl overflow-hidden relative mb-6 block">
                <img :src="product.image || '/product.png'" :alt="product.title" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                
                <!-- Hover Action Overlay -->
                <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-[#e32727] hover:scale-110 transition-all shadow-xl">
                     <Icon name="lucide:eye" class="w-5 h-5" />
                   </div>
                </div>
              </NuxtLink>
              
              <!-- Info -->
              <div class="flex-1 flex flex-col">
                <p class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Icon name="lucide:tag" class="w-3 h-3 text-[#e32727]" /> {{ product.category }}
                </p>
                <h3 class="text-[15px] font-bold text-slate-800 mb-2 leading-tight group-hover:text-[#e32727] transition-colors">
                  <NuxtLink :to="`/products/${product.slug}`">{{ product.title }}</NuxtLink>
                </h3>
                <p class="text-slate-500 text-sm mb-6 flex-1 line-clamp-2">
                  {{ product.short_description }}
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
          
          <!-- Pagination -->
          <div v-if="filteredProducts.length > 0 && pagination?.last_page > 1" class="flex justify-center gap-2 mt-12">
            <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-semibold shadow-sm">Previous</button>
            <span class="px-4 py-2 flex items-center justify-center font-medium text-slate-600 bg-white border border-slate-100 rounded-lg shadow-sm">{{ currentPage }} / {{ pagination.last_page }}</span>
            <button @click="currentPage++" :disabled="currentPage === pagination.last_page" class="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-semibold shadow-sm">Next</button>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <Icon name="lucide:search-x" class="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-slate-800 mb-2">No products found</h3>
            <p class="text-slate-500 mb-6">We couldn't find any products matching your selected filters.</p>
            <button @click="clearFilters" class="px-6 py-2.5 bg-[#e32727] text-white font-bold rounded-xl shadow-md">
              Clear All Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const { $api } = useNuxtApp()
const mobileFilterOpen = ref(false)

const route = useRoute()

const getCategoryFromQuery = (query: any) => {
  const q = query.categories || query.category
  return q ? (q as string).split(',') : []
}

const getBrandFromQuery = (query: any) => {
  const q = query.brands || query.brand
  return q ? (q as string).split(',') : []
}

// Filter State
const selectedCategories = ref<string[]>(getCategoryFromQuery(route.query))
const selectedBrands = ref<string[]>(getBrandFromQuery(route.query))
const currentPage = ref(1)

// Sync from route query if navigated from another component while already on page
watch(() => route.query, (newQuery) => {
  selectedCategories.value = getCategoryFromQuery(newQuery)
  selectedBrands.value = getBrandFromQuery(newQuery)
  currentPage.value = 1
}, { deep: true })

// Fetch Filter Options
const { data: filterOptions } = await useAsyncData('filterOptions', () => $api('/public/products/filter-options') as Promise<any>)
const categories = computed(() => filterOptions.value?.categories || [])
const brands = computed(() => filterOptions.value?.brands || [])

// Query Params Computed
const queryParams = computed(() => {
  return {
    categories: selectedCategories.value.join(','),
    brands: selectedBrands.value.join(','),
    page: currentPage.value
  }
})

// Fetch Products dynamically with filters
const { data: productsData } = await useAsyncData('products', () => $api('/public/products', { query: queryParams.value }) as Promise<any>, { watch: [queryParams] })

const filteredProducts = computed(() => productsData.value?.data || [])
const pagination = computed(() => productsData.value?.meta || { current_page: 1, last_page: 1 })

// Reset page to 1 when filters change
watch([selectedCategories, selectedBrands], () => {
  currentPage.value = 1
})

const clearFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  currentPage.value = 1
}

useSeoMeta({
  title: 'Products — Digiview Broadcast',
  description: 'Browse Digiview\'s full product range: 4K cameras, switchers, monitors, and broadcast equipment.',
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
  animation: fadeInUp 0.4s ease-out forwards;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Scrollbar for Drawer */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>

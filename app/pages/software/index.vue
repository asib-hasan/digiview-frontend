<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Hero Section -->
    <PageHero
      title="Broadcast & Enterprise Software"
      label="Software Solutions & Suites"
    />

    <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-12">
      <!-- Search Bar & Counter -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900">Software Solutions</h2>
          <p class="text-xs text-slate-500 mt-0.5">Explore genuine digital software licenses & broadcast suites</p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <Icon name="lucide:search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            v-model="searchQuery" 
            @input="handleSearch"
            type="text" 
            placeholder="Search software..." 
            class="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#e32727]/20 focus:border-[#e32727] outline-none transition-all"
          />
          <button v-if="searchQuery" @click="clearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <Icon name="lucide:x" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="py-24 text-center">
        <div class="inline-block w-10 h-10 border-4 border-slate-200 border-t-[#e32727] rounded-full animate-spin"></div>
        <p class="mt-4 text-sm font-semibold text-slate-500">Loading software licenses...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="softwareList.length === 0" class="py-24 text-center bg-white rounded-3xl border border-slate-200/80 p-8 max-w-xl mx-auto">
        <div class="w-16 h-16 bg-red-50 text-[#e32727] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:cpu" class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">No Software Found</h3>
        <p class="text-sm text-slate-500 mb-6">
          {{ searchQuery ? `No software matched your search "${searchQuery}".` : 'No software products available at the moment.' }}
        </p>
        <button 
          v-if="searchQuery || selectedBrand" 
          @click="resetFilters" 
          class="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <!-- Software Grid (Compact Product Card Style) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="item in softwareList" 
          :key="item.id"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full group animate-fade-in-up"
        >
          <!-- Image Container -->
          <NuxtLink :to="`/software/${item.slug}`" class="aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden relative mb-4 block flex items-center justify-center p-3">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500" 
            />
            <div v-else class="text-slate-500 flex flex-col items-center">
              <Icon name="lucide:cpu" class="w-8 h-8 opacity-50" />
            </div>

            <!-- Software Badge -->
            <span class="absolute top-2 left-2 px-2 py-0.5 bg-white/95 text-slate-900 font-bold text-[9px] uppercase tracking-wider rounded-md shadow-xs">
              Software
            </span>

            <!-- Brand Pill -->
            <span v-if="item.brand" class="absolute top-2 right-2 px-2 py-0.5 bg-slate-950/80 text-white font-bold text-[9px] rounded-md shadow-xs">
              {{ item.brand }}
            </span>

            <!-- Hover Action Overlay -->
            <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:text-[#e32727] hover:scale-110 transition-all shadow-xl">
                 <Icon name="lucide:eye" class="w-4 h-4" />
               </div>
            </div>
          </NuxtLink>
          
          <!-- Info -->
          <div class="flex-1 flex flex-col">
            <p v-if="item.product_type" class="text-[#e32727] text-[10px] font-bold uppercase tracking-widest mb-1.5 line-clamp-1">
              {{ item.product_type }}
            </p>
            <h3 class="text-[14px] font-bold text-slate-800 mb-1.5 leading-snug group-hover:text-[#e32727] transition-colors line-clamp-2">
              <NuxtLink :to="`/software/${item.slug}`">{{ item.title }}</NuxtLink>
            </h3>
            <p class="text-slate-500 text-xs mb-4 flex-1 line-clamp-2 leading-relaxed">
              {{ item.short_description }}
            </p>
            
            <!-- Actions -->
            <div class="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
              <NuxtLink :to="`/software/${item.slug}`" class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 px-3 rounded-lg text-xs font-bold transition-colors text-center shadow-xs">
                Read more..
              </NuxtLink>
              <button 
                @click="openQuoteModal(item)"
                class="w-9 h-9 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center rounded-lg transition-colors border border-slate-200 shrink-0" 
                title="Request Price / License"
              >
                <Icon name="lucide:file-text" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="mt-12 flex justify-center items-center gap-2">
        <button 
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="lucide:chevron-left" class="w-5 h-5" />
        </button>
        <span class="px-4 text-sm font-bold text-slate-700">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </span>
        <button 
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="lucide:chevron-right" class="w-5 h-5" />
        </button>
      </div>

    </div>

    <!-- License / Quote Modal -->
    <RequestPriceModal
      v-if="quoteModalOpen"
      :is-open="quoteModalOpen"
      :product-id="selectedProductId"
      :product-title="selectedProductTitle"
      @close="quoteModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHero from '~/components/common/PageHero.vue'
import RequestPriceModal from '~/components/common/RequestPriceModal.vue'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const searchQuery = ref((route.query.search as string) || '')
const currentPage = ref(Number(route.query.page) || 1)
let searchTimer: any = null

const queryParams = computed(() => {
  const params: any = {
    page: currentPage.value
  }
  if (searchQuery.value) params.search = searchQuery.value
  return params
})

const { data: softwareData, pending, refresh } = await useAsyncData(
  'software-list',
  () => $api('/public/software', { query: queryParams.value }) as Promise<any>,
  { watch: [queryParams] }
)

const softwareList = computed(() => softwareData.value?.data || [])
const pagination = computed(() => softwareData.value?.meta || { current_page: 1, last_page: 1 })

const handleSearch = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
  }, 400)
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const changePage = (p: number) => {
  currentPage.value = p
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

// Quote Modal
const quoteModalOpen = ref(false)
const selectedProductId = ref<number | null>(null)
const selectedProductTitle = ref('')

const openQuoteModal = (item: any) => {
  selectedProductId.value = item.id
  selectedProductTitle.value = item.title
  quoteModalOpen.value = true
}

useSeoMeta({
  title: 'Broadcast & Enterprise Software — Digiview Broadcast',
  description: 'Official genuine commercial licenses for Adobe Creative Cloud, Kaspersky Security, DaVinci Resolve Studio, and vMix Pro in Bangladesh.',
})
</script>

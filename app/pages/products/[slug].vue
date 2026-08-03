<template>
  <div v-if="product" class="bg-white min-h-screen pb-20 overflow-x-hidden">
    <!-- Header Section -->
    <div class="pt-32 md:pt-40 pb-6 md:pb-8 bg-white border-b border-slate-100">
      <div class="container mx-auto px-4 md:px-8">
        
        <NuxtLink to="/products" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#e32727] transition-colors mb-4 md:mb-6 print:hidden">
          <Icon name="lucide:arrow-left" class="w-4 h-4" /> Back to Products
        </NuxtLink>
        
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 mb-3 tracking-tight leading-snug break-words">{{ product.title }}</h1>
        
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] md:text-[11px] text-slate-500 font-medium print:hidden mt-3 md:mt-0">
          <span v-if="product.dvCode">DV {{ product.dvCode.replace('DV ', '') }}</span>
          <span v-if="product.dvCode && product.mfrCode" class="text-slate-300">•</span>
          <span v-if="product.mfrCode">MFR {{ product.mfrCode.replace('MFR ', '') }}</span>
          
          <div class="md:ml-3 md:pl-3 md:border-l border-slate-200">
            <button @click="shareProduct" class="flex items-center gap-1.5 hover:text-[#e32727] transition-colors bg-slate-50 md:bg-transparent px-3 py-1.5 md:p-0 rounded-lg md:rounded-none">
              <Icon name="lucide:share-2" class="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div class="container mx-auto px-4 md:px-8 pt-8 md:pt-10">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left Column: Image Gallery -->
        <div class="lg:col-span-7 flex flex-col gap-4 min-w-0">
          <!-- Main Image -->
          <div class="border border-slate-200 bg-white aspect-[4/3] sm:aspect-video md:aspect-auto md:min-h-[500px] flex items-center justify-center relative p-4 md:p-8 w-full min-w-0">
            <img :src="activeImage" :alt="product.title" class="max-w-full max-h-full object-contain" />
          </div>
          
          <!-- Thumbnails -->
          <div v-if="allImages.length > 1" class="flex gap-3 w-full overflow-x-auto print:hidden pb-2 pt-1 px-1 scrollbar-hide min-w-0">
            <button 
              v-for="(img, idx) in allImages" 
              :key="idx"
              @click="activeImage = img"
              class="w-24 h-24 border-2 overflow-hidden shrink-0 transition-all bg-white flex items-center justify-center p-2"
              :class="activeImage === img ? 'border-[#e32727]' : 'border-slate-200 hover:border-slate-400'"
            >
              <img :src="img" :alt="`${product.title} thumbnail ${idx + 1}`" class="max-w-full max-h-full object-contain" />
            </button>
          </div>
        </div>

        <!-- Right Column: Details & Actions -->
        <div class="lg:col-span-5 min-w-0">
          <h3 v-if="product.highlights && product.highlights.length > 0" class="text-[17px] font-bold text-slate-900 mb-6">Product Highlights:</h3>
          
          <ul v-if="product.highlights && product.highlights.length > 0" class="space-y-1.5 md:space-y-2 mb-6 md:mb-8">
            <li v-for="(spec, index) in product.highlights" :key="index" class="flex items-start gap-3 text-sm md:text-[15px] text-slate-600">
              <span class="mt-1.5 md:mt-2 w-2 h-2 rounded-full bg-[#e32727] shrink-0 shadow-[0_0_8px_rgba(227,39,39,0.5)]"></span>
              <span class="leading-relaxed font-medium break-words">{{ spec }}</span>
            </li>
          </ul>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-2 sm:gap-3 print:hidden mt-3">
            <button 
              @click="isPriceModalOpen = true" 
              class="px-3 sm:px-8 py-3.5 bg-slate-500 hover:bg-slate-600 text-white font-bold transition-colors flex-1 text-center rounded-xl shadow-md uppercase tracking-widest text-[11px] sm:text-sm whitespace-nowrap"
            >
              Request For Price
            </button>
            
            <a 
              :href="`https://wa.me/18001234567?text=Hi, I am interested in ${product.title} (${product.dvCode})`" 
              target="_blank"
              class="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] shrink-0 bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20bd5a] hover:scale-105 rounded-xl transition-all shadow-sm"
              title="WhatsApp"
            >
              <Icon name="fa-brands:whatsapp" class="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            
            <button 
              @click="printPage"
              class="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] shrink-0 bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20bd5a] hover:scale-105 rounded-xl transition-all shadow-sm"
              title="Print"
            >
              <Icon name="lucide:printer" class="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </button>
          </div>
          
          <!-- Overview Description -->
          <div class="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200">
            <h3 class="text-[17px] font-normal text-slate-900 mb-3 md:mb-4">Overview:</h3>
            <p class="text-sm md:text-[15px] text-slate-600 leading-relaxed break-words">{{ product.short_description }}</p>
          </div>
        </div>

      </div>

      <!-- Tabs Section -->
      <div class="mt-12 md:mt-16 pt-8 border-t border-slate-200 print:hidden">
        <div class="flex flex-wrap gap-2 md:gap-4 border-b border-slate-200 pb-4">
          <button 
            v-for="tab in ['Description', 'Specifications', 'Accessories', 'Downloads']"
            :key="tab"
            @click="activeTab = tab.toLowerCase()"
            class="px-6 py-2.5 rounded-lg text-sm md:text-[15px] font-semibold transition-colors"
            :class="activeTab === tab.toLowerCase() ? 'bg-slate-300 text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'"
          >
            {{ tab }}
          </button>
        </div>
        
        <div class="py-8 min-h-[200px]">
          <div v-if="activeTab === 'description'" class="prose prose-sm md:prose-base max-w-none text-slate-600">
            <div v-if="product.description" v-html="product.description"></div>
            <p v-else class="italic text-slate-400">No description available.</p>
          </div>
          <div v-if="activeTab === 'specifications'" class="text-slate-600">
            <h4 class="font-bold text-slate-900 mb-4">Technical Specifications</h4>
            <div v-if="product.specs" class="prose prose-sm md:prose-base max-w-none text-slate-600" v-html="product.specs"></div>
            <div v-else class="text-sm text-slate-500 italic">No specifications available.</div>
          </div>
          <div v-if="activeTab === 'accessories'" class="animate-fade-in">

            <!-- Minimal Categorized Accessories Side-by-Side Layout -->
            <div v-if="categorizedAccessories.length > 0" class="flex flex-col md:flex-row gap-6 items-start">
              
              <!-- Minimal Left Sidebar: Category List -->
              <div class="w-full md:w-60 flex-shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                <button
                  v-for="(catGroup, idx) in categorizedAccessories"
                  :key="catGroup.id"
                  @click="activeAccessoryCategoryIndex = idx"
                  class="w-full text-left px-4 py-3 text-xs md:text-sm font-semibold flex items-center justify-between transition-all"
                  :class="[
                    activeAccessoryCategoryIndex === idx
                      ? 'bg-red-50/70 text-[#e32727] font-bold border-l-4 border-[#e32727] pl-3'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                  ]"
                >
                  <span class="truncate pr-2">{{ catGroup.name }}</span>
                  <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 flex-shrink-0" :class="{ 'text-[#e32727]': activeAccessoryCategoryIndex === idx, 'text-slate-300': activeAccessoryCategoryIndex !== idx }" />
                </button>
              </div>

              <!-- Right Content Area: Active Category Products Grid -->
              <div class="flex-1 w-full min-w-0">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-base font-bold text-slate-800">{{ activeAccessoryCategory?.name }}</h3>
                  <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {{ activeAccessoryCategory?.products?.length || 0 }} Items
                  </span>
                </div>

                <div v-if="activeAccessoryCategory?.products && activeAccessoryCategory.products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div
                    v-for="acc in activeAccessoryCategory.products"
                    :key="acc.id"
                    class="group bg-white border border-slate-200 hover:border-[#e32727] rounded-xl p-3 transition-all duration-300 hover:shadow-md flex flex-col relative"
                  >
                    <!-- Image -->
                    <div class="bg-slate-50 rounded-lg p-4 aspect-square flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100/80 transition-colors">
                      <img :src="acc.image || '/product.png'" :alt="acc.title" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                    </div>

                    <!-- Content -->
                    <div class="pt-3 flex flex-col flex-grow">
                      <p v-if="acc.mfr_code || acc.dv_code" class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 truncate">{{ acc.mfr_code || acc.dv_code }}</p>
                      <h4 class="font-bold text-slate-800 text-xs line-clamp-2 leading-snug group-hover:text-[#e32727] transition-colors mb-3">
                        <NuxtLink :to="'/products/' + acc.slug" class="focus:outline-none">
                          <span class="absolute inset-0" aria-hidden="true" />
                          {{ acc.title }}
                        </NuxtLink>
                      </h4>

                      <div class="mt-auto pt-1 relative z-20">
                        <NuxtLink :to="'/products/' + acc.slug" class="inline-flex items-center gap-1 text-[11px] font-bold text-[#e32727] hover:underline">
                          View Details <Icon name="lucide:arrow-right" class="w-3 h-3" />
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="text-slate-400 italic text-xs py-8 text-center bg-white border border-slate-200 rounded-xl">
                  No items assigned to this accessory category.
                </div>
              </div>

            </div>

            <div v-else class="text-slate-400 italic text-xs py-8 text-center bg-white border border-slate-200 rounded-xl">
              No accessories found.
            </div>
          </div>
          <div v-if="activeTab === 'downloads'" class="animate-fade-in">
            <h2 class="text-2xl font-black text-slate-800 mb-6">Downloads</h2>
            
            <div v-if="!auth.isAuthenticated" class="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center max-w-2xl mx-auto">
               <Icon name="lucide:lock" class="w-12 h-12 text-blue-400 mx-auto mb-4" />
               <h3 class="text-lg font-bold text-slate-800 mb-2">Login Required</h3>
               <p class="text-slate-600 mb-6 max-w-md mx-auto">You need to be logged in to view and download product resources. Please log in or create an account to continue.</p>
               <button @click="isAuthModalOpen = true" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                 Log In to Access
               </button>
            </div>
            
            <div v-else-if="downloads.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div v-for="dl in downloads" :key="dl.id" class="group flex flex-col p-5 border border-slate-200 rounded-2xl hover:border-[#e32727] hover:shadow-lg bg-white transition-all duration-300">
                <div class="flex items-center gap-4 mb-5">
                  <div class="w-14 h-14 rounded-xl bg-red-50 text-[#e32727] flex items-center justify-center shrink-0 group-hover:bg-[#e32727] group-hover:text-white transition-colors">
                    <Icon :name="dl.type === 'pdf' ? 'lucide:file-text' : 'lucide:link'" class="w-6 h-6" />
                  </div>
                  <div class="flex-grow">
                    <h4 class="text-[15px] font-bold text-slate-800 group-hover:text-[#e32727] transition-colors line-clamp-1 mb-1">{{ dl.title }}</h4>
                    <div class="text-xs text-slate-500 flex items-center gap-2">
                      <span class="uppercase font-black tracking-widest text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{{ dl.type === 'pdf' ? 'PDF' : 'LINK' }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 mt-auto">
                  <a v-if="dl.type === 'pdf'" :href="dl.file_path" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#e32727] hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors shadow-sm">
                    <Icon name="lucide:download" class="w-3.5 h-3.5" /> Download
                  </a>
                  <a v-else :href="dl.link_url" target="_blank" class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#e32727] hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors shadow-sm">
                    <Icon name="lucide:external-link" class="w-3.5 h-3.5" /> Open Link
                  </a>
                </div>
              </div>

            </div>
            <div v-else class="text-slate-500 italic text-sm">No downloads available for this product.</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Price Request Modal -->
    <RequestPriceModal 
      v-if="product"
      :is-open="isPriceModalOpen" 
      :product-id="product.id"
      :product-title="product.title"
      @close="isPriceModalOpen = false" 
    />
    
    <!-- Auth Modal -->
    <AuthModal
      :is-open="isAuthModalOpen"
      @close="isAuthModalOpen = false"
    />
  </div>

  <div v-else class="min-h-screen flex items-center justify-center text-center px-4 bg-slate-50">
    <div>
      <div class="text-6xl font-black text-slate-200 mb-4">404</div>
      <h1 class="text-2xl font-bold text-slate-800 mb-3">Product Not Found</h1>
      <NuxtLink to="/products" class="px-6 py-3 bg-[#e32727] text-white font-semibold rounded-xl">Back to Products</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const { $api } = useNuxtApp()
const route = useRoute()
const auth = useAuthStore()
const slug = computed(() => route.params.slug as string)

const { data: response, pending, error } = await useAsyncData(`product-${slug.value}`, () => 
  $api(`/public/products/${slug.value}`)
)

const product = computed(() => response.value?.data)
const categorizedAccessories = computed(() => product.value?.categorized_accessories || [])
const activeAccessoryCategoryIndex = ref(0)
const activeAccessoryCategory = computed(() => {
  if (categorizedAccessories.value.length > 0) {
    return categorizedAccessories.value[activeAccessoryCategoryIndex.value] || categorizedAccessories.value[0]
  }
  return null
})
const downloads = computed(() => product.value?.downloads || [])

const allImages = computed(() => {
  if (!product.value) return []
  const imgs = []
  if (product.value.image) imgs.push(product.value.image)
  if (product.value.images && Array.isArray(product.value.images)) {
    product.value.images.forEach(img => {
      const url = typeof img === 'string' ? img : img.image
      if (url && url !== product.value.image) imgs.push(url)
    })
  }
  return imgs.length ? imgs : ['/product.png']
})

const activeImage = ref('')
const activeTab = ref((route.query.tab as string) || 'description')
const isPriceModalOpen = ref(false)
const isAuthModalOpen = ref(false)

// Initialize active image when product is found
watch(product, (newProduct) => {
  if (newProduct) {
    activeImage.value = allImages.value[0]
  }
}, { immediate: true })

const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value?.title,
        url: window.location.href
      })
    } catch (err) {
      console.log('Share failed:', err)
    }
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

const printPage = () => {
  window.print()
}

useSeoMeta({
  title: computed(() => product.value ? `${product.value.title} — Digiview Broadcast` : 'Product Not Found'),
  description: computed(() => product.value?.short_description ?? ''),
})
</script>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }
  .container {
    padding: 0;
    max-width: 100%;
  }
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <header class="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-slate-200">
    
    <!-- Top Bar: Logo, Search, Contact & Icons -->
    <div class="border-b border-slate-100">
      <div class="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0 relative group">
          <img src="/images/logo.png" alt="Digiview Logo" class="relative h-10 object-contain group-hover:opacity-80 transition-opacity" />
        </NuxtLink>

        <!-- Search Bar (Middle) -->
        <div class="hidden lg:flex flex-1 min-w-[280px] max-w-2xl relative mx-3 xl:mx-8">
          <form @submit.prevent="submitSearch" class="w-full flex items-center bg-white border border-slate-300 hover:border-slate-400 focus-within:!border-[#e32727] rounded-full shadow-xs transition-all focus-within:shadow-sm">
            <input 
              type="text" 
              v-model="searchQuery"
              @input="handleSearch"
              @blur="closeSearchDropdown"
              @focus="searchQuery.trim() ? showSearchDropdown = true : null"
              placeholder="Search products" 
              class="flex-1 min-w-0 bg-transparent text-[14px] py-2.5 pl-6 pr-2 focus:outline-none text-slate-700 placeholder:text-slate-400" 
            />
            <button type="submit" aria-label="Search" class="shrink-0 p-2 mr-3 text-[#e32727] hover:scale-110 transition-transform focus:outline-none flex items-center justify-center">
              <Icon v-if="isSearching" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:search" class="w-5 h-5 stroke-[2]" />
            </button>
          </form>

          <!-- Search Dropdown -->
          <div 
            v-if="showSearchDropdown" 
            class="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden"
          >
            <div v-if="isSearching" class="p-6 text-center text-slate-500">
              <Icon name="lucide:loader-2" class="w-6 h-6 animate-spin mx-auto mb-2" />
              <p class="text-sm font-semibold">Searching products...</p>
            </div>
            
            <div v-else-if="searchResults.length === 0" class="p-6 text-center text-slate-500">
              <p class="text-sm font-semibold">No products found for "{{ searchQuery }}"</p>
            </div>
            
            <div v-else class="flex flex-col max-h-[400px] overflow-y-auto">
              <div 
                v-for="product in searchResults" 
                :key="product.id"
                @click="selectSearchResult(product)"
                class="flex items-center gap-4 p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none transition-colors"
              >
                <img :src="product.image || '/product.png'" :alt="product.title" class="w-12 h-12 object-contain bg-white rounded-lg border border-slate-100 p-1 shrink-0" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-[13px] font-bold text-slate-800 truncate group-hover:text-[#e32727] transition-colors">{{ product.title }}</h4>
                  <p class="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">{{ product.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info & Social Icons (Right) -->
        <div class="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          <!-- Call Us -->
          <div class="flex items-center gap-3 xl:border-r xl:border-slate-200 xl:pr-6">
            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#e32727] shrink-0">
              <Icon name="lucide:phone-call" class="w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] xl:text-[11px] text-slate-500 font-bold uppercase tracking-wider">Call Us Now</span>
              <a :href="`tel:${settings.hotline || settings.phone || '+8801711548676'}`" class="text-slate-800 hover:text-[#e32727] font-black text-[13px] xl:text-[15px] tracking-wide transition-colors whitespace-nowrap">{{ settings.hotline || settings.phone || '+88 01711 548676' }}</a>
            </div>
          </div>

          <!-- Social Icons -->
          <div class="hidden xl:flex items-center gap-2">
            <a v-if="settings.facebook" :href="settings.facebook" target="_blank" aria-label="Facebook" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white transition-all bg-slate-50 border border-slate-100 hover:border-transparent">
              <Icon name="lucide:facebook" class="w-4 h-4" />
            </a>
            <a v-if="settings.instagram" :href="settings.instagram" target="_blank" aria-label="Instagram" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#E4405F] hover:text-white transition-all bg-slate-50 border border-slate-100 hover:border-transparent">
              <Icon name="lucide:instagram" class="w-4 h-4" />
            </a>
            <a v-if="settings.youtube" :href="settings.youtube" target="_blank" aria-label="YouTube" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#FF0000] hover:text-white transition-all bg-slate-50 border border-slate-100 hover:border-transparent">
              <Icon name="lucide:youtube" class="w-4 h-4" />
            </a>
            <a v-if="settings.linkedin" :href="settings.linkedin" target="_blank" aria-label="LinkedIn" class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#0A66C2] hover:text-white transition-all bg-slate-50 border border-slate-100 hover:border-transparent">
              <Icon name="lucide:linkedin" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          class="lg:hidden text-slate-800 hover:text-[#e32727] focus:outline-none transition-colors p-2 pr-0 ml-auto"
        >
          <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-7 h-7" />
        </button>

      </div>
    </div>

    <!-- Bottom Bar: Navigation Links -->
    <div class="container mx-auto px-4 md:px-8">
      <nav class="hidden lg:flex items-center justify-between">
        <div class="flex items-center gap-8">
          <div 
            v-for="(link, index) in navLinks" 
            :key="index"
            class="relative group"
          >
            <NuxtLink 
              :to="link.path"
              class="text-[14px] font-semibold text-slate-700 hover:text-[#e32727] transition-colors py-3.5 flex items-center gap-1.5 cursor-pointer"
              :class="link.hasDropdown ? 'border-b-2 border-transparent hover:border-[#e32727]' : ''"
            >
              {{ link.name }}
              <Icon 
                v-if="link.hasDropdown" 
                name="lucide:chevron-down" 
                class="w-3.5 h-3.5 text-slate-400 group-hover:text-[#e32727] group-hover:-rotate-180 transition-transform duration-300" 
              />
            </NuxtLink>
            
            <!-- Desktop Dropdown -->
            <div 
              v-if="link.hasDropdown" 
              class="absolute top-full bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden"
              :class="(link.isMegaMenu || link.isBrandsMenu) ? 'w-[850px] left-0 p-6' : 'w-56 left-0 flex flex-col'"
            >
              <!-- Standard Dropdown -->
              <template v-if="!link.isMegaMenu && !link.isBrandsMenu">
                <NuxtLink 
                  v-for="(subLink, sIndex) in link.subMenu" 
                  :key="sIndex"
                  :to="subLink.path"
                  class="px-5 py-3 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#e32727] transition-colors border-b border-slate-50 last:border-0 flex items-center gap-3 group/item"
                >
                  <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#e32727] absolute" />
                  <span class="group-hover/item:translate-x-5 transition-transform">{{ subLink.name }}</span>
                </NuxtLink>
              </template>
              
              <!-- Regular Mega Menu -->
              <template v-else-if="link.isMegaMenu">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <NuxtLink 
                    v-for="(cat, cIdx) in link.megaCategories" 
                    :key="cIdx"
                    :to="cat.path"
                    class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group/mega"
                  >
                    <div class="w-12 h-12 rounded-xl bg-red-50 text-[#e32727] flex items-center justify-center shrink-0 group-hover/mega:scale-110 group-hover/mega:bg-[#e32727] group-hover/mega:text-white transition-all shadow-sm overflow-hidden">
                      <img v-if="cat.icon && cat.icon.includes('/')" :src="cat.icon" :alt="cat.name" class="w-full h-full object-cover" />
                      <Icon v-else :name="cat.icon || 'lucide:monitor-play'" class="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div class="flex items-center">
                      <h4 class="text-[14px] font-bold text-slate-800 group-hover/mega:text-[#e32727] transition-colors leading-tight">{{ cat.name }}</h4>
                    </div>
                  </NuxtLink>
                </div>
                
                <!-- Mega Menu Banner -->
                <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-4">
                  <div class="flex items-center gap-3">
                    <div class="px-3 py-1 bg-[#e32727] text-white text-[10px] font-black uppercase rounded tracking-widest shadow-sm">New</div>
                    <span class="text-sm font-bold text-slate-600">Explore the latest 4K Broadcast Systems</span>
                  </div>
                  <NuxtLink to="/products" class="text-sm font-bold text-[#e32727] hover:text-slate-900 transition-colors flex items-center gap-1 group/btn">
                    View All Products <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </NuxtLink>
                </div>
              </template>

              <!-- Brands Mega Menu -->
              <template v-else-if="link.isBrandsMenu">
                <div class="flex gap-6">
                  <div class="w-2/3">
                    <h4 class="text-[11px] font-black tracking-widest text-slate-500 uppercase mb-4">Featured Brands:</h4>
                    <div class="grid grid-cols-4 gap-3">
                      <NuxtLink 
                        v-for="brand in link.brands" 
                        :key="brand.name" 
                        :to="brand.path" 
                        class="border border-slate-200 rounded-xl aspect-square p-3 flex items-center justify-center hover:border-[#e32727] hover:shadow-md transition-all group/brand bg-white overflow-hidden"
                        :title="brand.name"
                      >
                        <Icon v-if="brand.icon" :name="brand.icon" class="w-12 h-12 text-slate-700 group-hover/brand:text-[#e32727] transition-colors" />
                        <img v-else-if="brand.logo" :src="brand.logo" :alt="brand.name" class="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                      </NuxtLink>
                    </div>
                  </div>
                  <NuxtLink 
                    :to="settings.top_deal_link || '/products'"
                    class="w-1/3 rounded-xl overflow-hidden relative group/banner cursor-pointer block aspect-square"
                  >
                    <img 
                      :src="settings.top_deal_image || '/images/banner2.png'" 
                      :alt="settings.top_deal_title || 'Top Deals'" 
                      class="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700" 
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                      <div class="bg-[#e32727] text-white text-[10px] font-black uppercase px-2 py-1 rounded inline-block mb-2 w-fit">
                        {{ settings.top_deal_tag || 'Top Deals' }}
                      </div>
                      <h4 class="text-white font-bold text-lg leading-tight mb-1">
                        {{ settings.top_deal_title || 'Pro Photography Gear' }}
                      </h4>
                      <p v-if="settings.top_deal_subtitle" class="text-white/80 text-xs">
                        {{ settings.top_deal_subtitle }}
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </template>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Dropdown (Floating Box) -->
    <div 
      v-show="mobileMenuOpen" 
      class="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100"
    >
      <div class="px-4 py-4 max-h-[70vh] overflow-y-auto">
        <nav class="flex flex-col gap-1">
          
          <div v-for="(link, index) in navLinks" :key="index">
            <!-- Mobile Parent Link -->
            <div 
              class="py-3 px-3 text-[14px] font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex justify-between items-center transition-colors cursor-pointer"
              :class="{ 'text-[#e32727]': activeMobileDropdown === link.name }"
              @click="link.hasDropdown ? toggleMobileDropdown(link.name) : handleMobileNav(link.path)"
            >
              {{ link.name }}
              <Icon 
                v-if="link.hasDropdown" 
                name="lucide:chevron-down" 
                class="w-4 h-4 transition-transform duration-300" 
                :class="activeMobileDropdown === link.name ? '-rotate-180 text-[#e32727]' : 'text-slate-400'"
              />
            </div>
            
            <!-- Mobile Submenu -->
            <div v-if="link.hasDropdown && activeMobileDropdown === link.name" class="pl-3 pr-2 py-1 flex flex-col gap-1 border-l-2 border-[#e32727]/20 ml-5 mb-2 mt-1">
              <NuxtLink 
                v-for="(subLink, sIndex) in link.subMenu" 
                :key="sIndex"
                :to="subLink.path"
                class="py-2.5 px-3 text-[13px] font-bold text-slate-600 hover:text-[#e32727] hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                @click="mobileMenuOpen = false"
              >
                <Icon name="lucide:arrow-right" class="w-3 h-3 text-[#e32727]" />
                {{ subLink.name }}
              </NuxtLink>
            </div>
          </div>
          
          <div class="pt-4 mt-2 border-t border-slate-100">
             <form @submit.prevent="submitMobileSearch" class="flex gap-2">
               <!-- Mobile Search Bar -->
               <div class="relative flex-1">
                 <input 
                   v-model="mobileSearchQuery" 
                   type="text" 
                   placeholder="Search products" 
                   class="w-full bg-white border border-slate-300 text-[14px] rounded-full py-2.5 pl-5 pr-11 focus:outline-none focus:border-[#e32727] transition-colors font-medium text-slate-700 placeholder:text-slate-400 shadow-xs" 
                 />
                 <button type="submit" aria-label="Search" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#e32727] hover:scale-110 transition-transform">
                   <Icon name="lucide:search" class="w-5 h-5 stroke-[2]" />
                 </button>
               </div>
             </form>
          </div>
        </nav>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp, useAsyncData } from '#app';

const { $api } = useNuxtApp()
const router = useRouter()
const mobileMenuOpen = ref(false)
const activeMobileDropdown = ref<string | null>(null)

const { data: settingsResponse } = await useAsyncData('global-settings-header', () => $api('/public/settings') as Promise<any>)
const settings = computed(() => settingsResponse.value?.data || {})

// Search State
const searchQuery = ref('')
const mobileSearchQuery = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)
const showSearchDropdown = ref(false)

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const submitSearch = () => {
  if (!searchQuery.value.trim()) return
  showSearchDropdown.value = false
  router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
}

const submitMobileSearch = () => {
  if (!mobileSearchQuery.value.trim()) return
  mobileMenuOpen.value = false
  router.push(`/products?search=${encodeURIComponent(mobileSearchQuery.value.trim())}`)
}

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    showSearchDropdown.value = false
    return
  }
  
  showSearchDropdown.value = true
  isSearching.value = true
  
  searchTimeout = setTimeout(async () => {
    try {
      const response = await $api('/public/products/search?q=' + encodeURIComponent(searchQuery.value)) as any
      searchResults.value = response.data || []
    } catch (err) {
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }, 400) // 400ms debounce
}

const closeSearchDropdown = () => {
  setTimeout(() => {
    showSearchDropdown.value = false
  }, 200) // Delay to allow click on dropdown items
}

const selectSearchResult = (product: any) => {
  showSearchDropdown.value = false
  searchQuery.value = ''
  router.push(`/products/${product.slug}`)
}

const handleMobileNav = (path: string) => {
  mobileMenuOpen.value = false
  router.push(path)
}

const toggleMobileDropdown = (name: string) => {
  if (activeMobileDropdown.value === name) {
    activeMobileDropdown.value = null
  } else {
    activeMobileDropdown.value = name
  }
}

const { data: categoriesResponse } = await useAsyncData('header-categories', () => $api('/public/navbar-categories') as Promise<any>)
const { data: brandsResponse } = await useAsyncData('header-brands', () => $api('/public/navbar-brands') as Promise<any>)
const { data: navbarSolutionsResponse } = await useAsyncData('header-solutions', () => $api('/public/navbar-solutions') as Promise<any>)

const dynamicCategories = computed(() => {
  const cats = categoriesResponse.value?.data || []
  return cats.map((c: any) => ({
    name: c.name,
    path: `/products?categories=${encodeURIComponent(c.name)}`,
    icon: c.icon || 'lucide:monitor-play',
    description: c.description || 'View products'
  }))
})

const dynamicBrands = computed(() => {
  const brs = brandsResponse.value?.data || []
  return brs.map((b: any) => ({
    name: b.title,
    path: `/products?brands=${encodeURIComponent(b.title)}`,
    logo: b.logo,
    icon: !b.logo ? 'mdi:star-circle' : null
  }))
})

const dynamicSolutions = computed(() => {
  const items = navbarSolutionsResponse.value?.data || []
  if (items.length > 0) {
    return items.map((s: any) => ({
      name: s.title,
      path: `/solutions#solution-${s.id}`
    }))
  }
  return []
})

const navLinks = computed(() => [
  { name: 'Home', path: '/', hasDropdown: false },
  { 
    name: 'Products', 
    path: '/products', 
    hasDropdown: true,
    isMegaMenu: true,
    megaCategories: dynamicCategories.value,
    subMenu: dynamicCategories.value.map((c: any) => ({ name: c.name, path: c.path }))
  },
  { 
    name: 'Brands', 
    path: '/brands', 
    hasDropdown: true,
    isBrandsMenu: true,
    brands: dynamicBrands.value,
    subMenu: [
      ...dynamicBrands.value.slice(0, 4).map((b: any) => ({ name: b.name, path: b.path })),
      { name: 'View All Brands', path: '/brands' }
    ]
  },
  { 
    name: 'Solutions', 
    path: '/solutions', 
    hasDropdown: true,
    subMenu: dynamicSolutions.value
  },
  { name: 'Services', path: '/services', hasDropdown: false },
  { 
    name: 'Resources', 
    path: '#', 
    hasDropdown: true,
    subMenu: [
      { name: 'Software', path: '/software' },
      { name: 'News', path: '/news' },
      { name: 'Knowledge Base', path: '/knowledge-base' }
    ]
  },
  { name: 'About Us', path: '/about', hasDropdown: false },
  { name: 'Contact Us', path: '/contact', hasDropdown: false }
])
</script>

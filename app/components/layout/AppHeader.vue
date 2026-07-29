<template>
  <header class="absolute top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-slate-200">
    
    <!-- Top Bar: Logo, Search, Contact & Icons -->
    <div class="border-b border-slate-100">
      <div class="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0 relative group">
          <img src="/images/logo.png" alt="Digiview Logo" class="relative h-10 object-contain group-hover:opacity-80 transition-opacity" />
        </NuxtLink>

        <!-- Search Bar (Middle) -->
        <div class="hidden lg:flex flex-1 max-w-2xl relative mx-8">
          <div class="w-full relative bg-white border-2 border-[#e32727] rounded-full overflow-hidden shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md group">
            <input 
              type="text" 
              v-model="searchQuery"
              @input="handleSearch"
              @blur="closeSearchDropdown"
              @focus="searchQuery.trim() ? showSearchDropdown = true : null"
              placeholder="Search products, brands, and categories..." 
              class="w-full bg-transparent text-[14px] py-2.5 pl-6 pr-28 focus:outline-none text-slate-700 placeholder:text-slate-400" 
            />
            <button aria-label="Search" class="absolute right-0 top-0 h-full flex items-center justify-center px-8 bg-[#e32727] text-white hover:bg-red-700 transition-colors font-bold text-[14px]">
              <Icon v-if="isSearching" name="lucide:loader-2" class="w-4 h-4 mr-1.5 animate-spin" />
              <Icon v-else name="lucide:search" class="w-4 h-4 mr-1.5" />
              Search
            </button>
          </div>

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
        <div class="hidden lg:flex items-center gap-6">
          <!-- Call Us -->
          <div class="flex items-center gap-3 border-r border-slate-200 pr-6">
            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#e32727]">
              <Icon name="lucide:phone-call" class="w-5 h-5" />
            </div>
            <div class="flex flex-col">
              <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Call Us Now</span>
              <a :href="`tel:${settings.hotline || settings.phone || '+8801711548676'}`" class="text-slate-800 hover:text-[#e32727] font-black text-[15px] tracking-wide transition-colors">{{ settings.hotline || settings.phone || '+88 01711 548676' }}</a>
            </div>
          </div>

          <!-- Social Icons -->
          <div class="flex items-center gap-2">
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
                        class="border border-slate-200 rounded-lg aspect-square p-2 flex flex-col items-center justify-center hover:border-[#e32727] hover:shadow-md transition-all group/brand bg-white"
                      >
                        <Icon v-if="brand.icon" :name="brand.icon" class="w-10 h-10 text-slate-700 group-hover/brand:text-[#e32727] transition-colors mb-2" />
                        <img v-else-if="brand.logo" :src="brand.logo" class="w-12 h-12 object-contain mb-2 opacity-80 group-hover/brand:opacity-100 transition-opacity" />
                        <span class="text-[11px] font-bold text-slate-600 group-hover/brand:text-[#e32727] text-center line-clamp-1">{{ brand.name }}</span>
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="w-1/3 rounded-xl overflow-hidden relative group/banner cursor-pointer block aspect-square">
                    <img src="/images/banner2.png" alt="Featured Gear" class="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-700" />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                      <div class="bg-[#e32727] text-white text-[10px] font-black uppercase px-2 py-1 rounded inline-block mb-2 w-fit">Top Deals</div>
                      <h4 class="text-white font-bold text-lg leading-tight mb-1">Pro Photography Gear</h4>
                      <p class="text-white/80 text-xs">Save up to $500 on select items</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="flex items-center ml-auto pl-8 gap-4">
          <div v-if="auth.isAuthenticated" class="relative group">
            <button class="text-[14px] font-bold text-slate-700 hover:text-[#e32727] transition-colors py-2 flex items-center gap-1.5 cursor-pointer">
              <Icon name="lucide:user" class="w-4 h-4" />
              {{ auth.getUser?.name }}
              <Icon name="lucide:chevron-down" class="w-3.5 h-3.5 text-slate-400 group-hover:text-[#e32727] group-hover:-rotate-180 transition-transform duration-300" />
            </button>
            <div class="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-2 z-50">
               <NuxtLink to="/profile" class="text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-2">
                 <Icon name="lucide:user-cog" class="w-4 h-4" /> My Profile
               </NuxtLink>
               <div class="h-px bg-slate-100 my-1"></div>
               <button @click="handleLogout" class="text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-[#e32727] rounded-lg transition-colors flex items-center gap-2">
                 <Icon name="lucide:log-out" class="w-4 h-4" /> Logout
               </button>
            </div>
          </div>
          <button 
            v-else
            @click="isAuthModalOpen = true"
            class="text-[14px] font-bold text-slate-700 hover:text-[#e32727] transition-colors py-2 flex items-center gap-1.5"
          >
            <Icon name="lucide:log-in" class="w-4 h-4" />
            Sign In
          </button>
        </div>
      </nav>
    </div>
    
    <AuthModal :is-open="isAuthModalOpen" @close="isAuthModalOpen = false" />

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
             <div class="flex gap-2 mb-4">
               <!-- Mobile Search Bar -->
               <div class="relative flex-1">
                 <Icon name="lucide:search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input type="text" placeholder="I am looking for..." class="w-full bg-slate-50 border border-slate-200 text-[13px] rounded-lg py-3 pl-9 pr-4 focus:outline-none focus:border-[#e32727] transition-colors font-medium" />
               </div>
             </div>
             
             <NuxtLink 
               v-if="!auth.isAuthenticated"
               to="#" 
               @click.prevent="isAuthModalOpen = true; mobileMenuOpen = false"
               class="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
             >
               <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#e32727] shadow-sm">
                 <Icon name="lucide:log-in" class="w-5 h-5" />
               </div>
               <div class="flex flex-col">
                 <span class="text-sm font-bold">Sign In / Register</span>
                 <span class="text-[11px] text-slate-500">Access your account</span>
               </div>
             </NuxtLink>
             <div v-else class="flex flex-col border-t border-slate-100">
               <div class="p-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {{ auth.getUser?.name?.charAt(0) }}
                  </div>
                  <div>
                    <div class="text-sm font-bold text-slate-800">{{ auth.getUser?.name }}</div>
                    <div class="text-[11px] text-slate-500">{{ auth.getUser?.email }}</div>
                  </div>
               </div>
               <NuxtLink to="/profile" @click="mobileMenuOpen = false" class="px-4 py-3 flex items-center gap-3 text-slate-700 hover:bg-slate-50 font-bold text-sm border-t border-slate-50">
                  <Icon name="lucide:user-cog" class="w-4 h-4" /> My Profile
               </NuxtLink>
               <button @click="handleLogout(); mobileMenuOpen = false" class="px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 font-bold text-sm border-t border-slate-50">
                  <Icon name="lucide:log-out" class="w-4 h-4" /> Log Out
               </button>
             </div>
          </div>
        </nav>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp, useAsyncData } from '#app';
import { toast } from 'vue3-toastify';

const auth = useAuthStore();
const { $api } = useNuxtApp()
const router = useRouter()
const mobileMenuOpen = ref(false)
const activeMobileDropdown = ref<string | null>(null)
const isAuthModalOpen = ref(false);

const { data: settingsResponse } = await useAsyncData('global-settings-header', () => $api('/public/settings') as Promise<any>)
const settings = computed(() => settingsResponse.value?.data || {})

const handleLogout = async () => {
  try {
    await $api('/public/auth/logout', { method: 'POST' });
  } catch (err) {
    console.error(err);
  } finally {
    auth.clearAuth();
    toast.success('Logged out successfully');
    router.push('/');
  }
};

// Search State
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const isSearching = ref(false)
const showSearchDropdown = ref(false)

let searchTimeout: ReturnType<typeof setTimeout> | null = null

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

const { data: categoriesResponse } = await useAsyncData('header-categories', () => $api('/public/categories') as Promise<any>)
const { data: brandsResponse } = await useAsyncData('header-brands', () => $api('/public/brands') as Promise<any>)

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
  return brs.slice(0, 12).map((b: any) => ({
    name: b.title,
    path: `/products?brands=${encodeURIComponent(b.title)}`,
    logo: b.logo,
    icon: !b.logo ? 'mdi:star-circle' : null
  }))
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
    subMenu: [
      { name: 'Studio Broadcasting', path: '/solutions/studio-broadcasting' },
      { name: 'Live Event Coverage', path: '/solutions/live-event' },
      { name: 'Post-Production', path: '/solutions/post-production' }
    ]
  },
  { name: 'Services', path: '/services', hasDropdown: false },
  { 
    name: 'Resources', 
    path: '#', 
    hasDropdown: true,
    subMenu: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blogs' }
    ]
  },
  { name: 'Contact Us', path: '/contact', hasDropdown: false }
])
</script>

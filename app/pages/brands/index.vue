<template>
  <div class="brands-page bg-white min-h-screen">
    <PageHero
      title="Our Brands"
      subtitle="We are authorized distributors and partners for globally recognized broadcast, audio-visual, and media technology brands."
    />

    <!-- Brands Grid Section -->
    <section class="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div class="container mx-auto px-4 md:px-8">
        
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Explore <span class="text-[#e32727]">Top Manufacturers</span>
          </h2>
          <p class="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Click on any brand below to view our complete catalog of equipment and solutions from that manufacturer.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e32727]"></div>
        </div>

        <!-- Brands Grid (Square Type Cards) -->
        <div v-else-if="brands.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <NuxtLink
            v-for="brand in brands"
            :key="brand.id"
            :to="`/products?brands=${encodeURIComponent(brand.title)}`"
            class="group bg-white border border-slate-200 rounded-2xl aspect-square p-6 flex flex-col items-center justify-center hover:border-[#e32727] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <!-- Top Right Red Accent on Hover -->
            <div class="absolute -top-10 -right-10 w-20 h-20 bg-[#e32727]/10 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

            <!-- Brand Logo -->
            <div class="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
              <img
                v-if="brand.logo"
                :src="brand.logo"
                :alt="brand.title"
                class="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
              <Icon
                v-else
                name="lucide:award"
                class="w-12 h-12 text-slate-400 group-hover:text-[#e32727] transition-colors"
              />
            </div>

            <!-- Brand Title -->
            <h3 class="text-sm font-bold text-slate-700 group-hover:text-[#e32727] text-center line-clamp-1 transition-colors">
              {{ brand.title }}
            </h3>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <Icon name="lucide:package-open" class="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-slate-700">No Brands Found</h3>
          <p class="text-sm text-slate-500 mt-1">Check back later for our updated brand partners.</p>
        </div>

      </div>
    </section>

    <!-- Featured Showcase Section (Square Related Image & Logo) -->
    <section class="py-20 bg-white border-t border-slate-200">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-block bg-red-50 text-[#e32727] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Authorized Partnership
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-6">
              World-Class Broadcast Solutions
            </h2>
            <p class="text-slate-600 leading-relaxed mb-6">
              We collaborate closely with leading international manufacturers to bring state-of-the-art cameras, audio desks, switchers, and studio gear to broadcasters across Bangladesh.
            </p>
            <NuxtLink
              to="/products"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#e32727] hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Browse All Products</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <!-- Square Related Image Banner -->
          <div class="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
            <img
              src="/images/banner2.png"
              alt="Featured Gear"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <span class="text-[#e32727] font-black text-xs uppercase tracking-widest mb-1">Premium Quality</span>
              <h3 class="text-white font-black text-2xl">Broadcast Studio Excellence</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

useHead({
  title: 'Our Brands | Digiview',
  meta: [
    { name: 'description', content: 'Explore our authorized broadcast, audio-visual, and media technology brand partners.' }
  ]
})

const { $api } = useNuxtApp()

const { data: brandsResponse, pending } = await useAsyncData('all-brands', () => $api('/public/brands') as Promise<any>)

const brands = computed(() => brandsResponse.value?.data || [])
</script>

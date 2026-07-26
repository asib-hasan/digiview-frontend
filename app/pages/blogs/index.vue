<template>
  <div class="blogs-page bg-white min-h-screen">
    <PageHero
      title="Latest Insights"
      subtitle="Stay up to date with the latest trends, technologies, and innovations in the broadcast and media industry."
      label="DIGIVIEW BLOG"
    />

    <section class="py-20 md:py-28 bg-[#f8f9fa]">
      <div class="container mx-auto px-4 md:px-8">
        
        <div class="text-center mb-16">
          <div v-observe class="section-label-center" :class="{ 'animate-fade-up': observed.has($el) }">News & Articles</div>
          <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 leading-tight mt-4" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            Explore our <span class="text-[#e32727]">industry insights</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="(blog, index) in blogs" 
            :key="blog.id"
            v-observe
            class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col"
            :class="{ [`animate-fade-up delay-${(index + 1) * 200}`]: observed.has($el) }"
          >
            <!-- Image Container -->
            <div class="relative aspect-[4/3] overflow-hidden shrink-0">
              <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              
              <!-- Date Badge -->
              <div class="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-900 flex flex-col items-center justify-center w-14 h-14 rounded-xl shadow-lg border border-slate-100">
                <span class="text-lg font-black leading-none">{{ getDay(blog.date) }}</span>
                <span class="text-[10px] font-bold uppercase tracking-widest">{{ getMonth(blog.date) }}</span>
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
            </div>

            <!-- Content Area -->
            <div class="p-8 flex flex-col flex-grow">
              <div class="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span class="flex items-center gap-1 text-[#e32727]">
                  <Icon name="lucide:tag" class="w-3 h-3" /> {{ blog.category }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="lucide:user" class="w-3 h-3" /> By {{ blog.author || 'Admin' }}
                </span>
              </div>
              
              <h3 class="text-xl font-black text-slate-800 mb-4 leading-snug group-hover:text-[#e32727] transition-colors line-clamp-2">
                <NuxtLink :to="`/blogs/${blog.slug}`">
                  {{ blog.title }}
                </NuxtLink>
              </h3>
              
              <p class="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                {{ blog.excerpt }}
              </p>

              <div class="mt-auto">
                <NuxtLink :to="`/blogs/${blog.slug}`" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#e32727] transition-colors border-b-2 border-transparent group-hover:border-[#e32727] pb-1">
                  Read Article <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const { $api } = useNuxtApp()

const { data: blogResponse } = await useAsyncData('blogs', () => $api('/public/blogs') as Promise<any>)

const blogs = computed(() => {
  return blogResponse.value?.data || []
})

useSeoMeta({
  title: 'Blogs — Digiview Broadcast',
  description: 'Read the latest insights and news from Digiview about broadcasting technology, 4K studios, audio systems, and post-production workflows.',
})

// Scroll-triggered animation
const observed = reactive(new Set<Element>())

const vObserve = {
  mounted(el: Element) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observed.add(el)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
  },
}

// Helpers
const getDay = (dateString: string) => {
  const parts = dateString.split(' ')
  if (parts.length > 1) {
    return parts[1].replace(',', '')
  }
  return '01'
}

const getMonth = (dateString: string) => {
  const parts = dateString.split(' ')
  if (parts.length > 0) {
    return parts[0].substring(0, 3)
  }
  return 'Jan'
}
</script>

<style scoped>
.section-label-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #e32727;
  margin-bottom: 1rem;
}
.section-label-center::before,
.section-label-center::after {
  content: '';
  width: 2rem;
  height: 2px;
  background: #e32727;
}

/* Truncate text nicely */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

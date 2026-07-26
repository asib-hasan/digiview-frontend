<template>
  <section class="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading -->
      <div class="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 animate-fade-in-up">
        <div class="max-w-2xl">
          <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727]">
            BROADCAST INSIGHTS
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            Latest <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">News & Articles</span>
          </h2>
        </div>
        
        <NuxtLink to="#" class="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl shadow-sm hover:shadow-md hover:border-[#e32727] hover:text-[#e32727] transition-all duration-300 uppercase tracking-widest text-xs">
          View All Posts <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <article 
          v-for="(post, index) in blogPosts" 
          :key="index"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up"
          :class="`animation-delay-${index * 200}`"
        >
          <!-- Image Container -->
          <div class="relative aspect-[4/3] overflow-hidden">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            
            <!-- Date Badge -->
            <div class="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-900 flex flex-col items-center justify-center w-14 h-14 rounded-xl shadow-lg border border-slate-100">
              <span class="text-lg font-black leading-none">{{ post.day }}</span>
              <span class="text-[10px] font-bold uppercase tracking-widest">{{ post.month }}</span>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-500"></div>
          </div>
          
          <!-- Content -->
          <div class="p-8">
            <div class="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span class="flex items-center gap-1 text-[#e32727]">
                <Icon name="lucide:tag" class="w-3 h-3" /> {{ post.category }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="lucide:user" class="w-3 h-3" /> By Admin
              </span>
            </div>
            
            <h3 class="text-xl font-black text-slate-800 mb-4 leading-snug group-hover:text-[#e32727] transition-colors line-clamp-2">
              <NuxtLink :to="post.link">
                {{ post.title }}
              </NuxtLink>
            </h3>
            
            <p class="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
              {{ post.excerpt }}
            </p>
            
            <NuxtLink :to="post.link" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#e32727] transition-colors border-b-2 border-transparent group-hover:border-[#e32727] pb-1">
              Read Article <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </article>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { $api } = useNuxtApp()
const { data: latestResponse } = await useAsyncData('home-latest-blogs', () => $api('/public/latest-blogs') as Promise<any>)

const blogPosts = computed(() => {
  const blogs = latestResponse.value?.data || []
  return blogs.map((b: any) => {
    // Parse date for day and month
    const parts = b.date ? b.date.split(' ') : []
    const day = parts.length > 1 ? parts[1].replace(',', '') : '01'
    const month = parts.length > 0 ? parts[0].substring(0, 3) : 'Jan'

    return {
      title: b.title,
      excerpt: b.excerpt,
      category: b.category,
      day,
      month,
      image: b.image,
      link: `/blogs/${b.slug}`
    }
  })
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
.animation-delay-0 { animation-delay: 0ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }

/* Truncate text nicely */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

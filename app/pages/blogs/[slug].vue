<template>
  <div class="blog-detail-page bg-white min-h-screen pt-40 md:pt-48 pb-20">
    <div v-if="blog" class="container mx-auto px-4 md:px-8 max-w-7xl">
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        <!-- Main Content (Left) -->
        <div class="lg:col-span-2">
          
          <!-- Article Header -->
          <div class="mb-10 text-slate-900">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#e32727] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
              {{ blog.category }}
            </div>
            
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight text-slate-900">
              {{ blog.title }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span class="flex items-center gap-2"><Icon name="lucide:calendar" class="w-4 h-4 text-[#e32727]" /> {{ blog.date }}</span>
              <span class="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span class="flex items-center gap-2"><Icon name="lucide:user" class="w-4 h-4 text-[#e32727]" /> {{ blog.author || 'Admin' }}</span>
            </div>
          </div>

          <!-- Featured Image -->
          <div class="rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
            <img :src="blog.image" :alt="blog.title" class="w-full h-[300px] md:h-[450px] object-cover" />
          </div>
          
          <!-- Article Content -->
          <div class="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-800 prose-a:text-[#e32727] hover:prose-a:text-slate-900 prose-img:rounded-2xl prose-img:shadow-lg">
            <div v-html="blog.content"></div>
          </div>
          
          <!-- Back Button -->
          <div class="mt-16 pt-8 border-t border-slate-100">
            <NuxtLink to="/blogs" class="inline-flex items-center gap-3 px-8 py-4 bg-slate-50 hover:bg-[#e32727] text-slate-700 hover:text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-colors duration-300">
              <Icon name="lucide:arrow-left" class="w-4 h-4" /> Back to all articles
            </NuxtLink>
          </div>
        </div>
        
        <!-- Sidebar (Right) -->
        <aside class="lg:col-span-1">
          <div class="sticky top-32 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <div class="w-1.5 h-6 bg-[#e32727] rounded-full"></div> Latest Articles
            </h3>
            
            <div class="flex flex-col gap-6">
              <NuxtLink 
                v-for="latest in latestBlogs" 
                :key="latest.id"
                :to="`/blogs/${latest.slug}`"
                class="group flex gap-4 items-start"
              >
                <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-100 shadow-sm">
                  <img :src="latest.image" :alt="latest.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <div class="text-[10px] font-bold text-[#e32727] uppercase tracking-widest mb-1">{{ latest.category }}</div>
                  <h4 class="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#e32727] transition-colors line-clamp-2 mb-1">{{ latest.title }}</h4>
                  <div class="text-xs font-semibold text-slate-400">{{ latest.date }}</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </aside>
        
      </div>
    </div>
    
    <!-- 404 State -->
    <div v-else class="container mx-auto px-4 py-40 text-center">
      <h1 class="text-4xl font-black text-slate-800 mb-4">Article Not Found</h1>
      <p class="text-slate-600 mb-8">The blog article you are looking for does not exist.</p>
      <NuxtLink to="/blogs" class="inline-flex items-center gap-3 px-8 py-3 bg-[#e32727] text-white font-bold rounded-lg hover:bg-slate-900 transition-colors">
        View All Articles
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { $api } = useNuxtApp()

const { data: blogResponse } = await useAsyncData(`blog-${route.params.slug}`, () => 
  $api(`/public/blogs/${route.params.slug}`) as Promise<any>
)

const blog = computed(() => {
  return blogResponse.value?.data
})

const latestBlogs = computed(() => {
  return blogResponse.value?.latest_articles || []
})

useSeoMeta({
  title: computed(() => blog.value ? `${blog.value.title} — Digiview Broadcast` : 'Article Not Found'),
  description: computed(() => blog.value?.excerpt || 'Blog article details.'),
})
</script>

<style>
/* Prose overrides since we aren't using the typography plugin explicitly */
.prose p {
  margin-bottom: 1.5em;
  line-height: 1.8;
  color: #475569;
}
.prose h3 {
  font-size: 1.5rem;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.prose ul {
  list-style-type: disc;
  padding-left: 1.625em;
  margin-bottom: 1.5em;
}
.prose li {
  margin-bottom: 0.5em;
  color: #475569;
}
.prose strong {
  color: #0f172a;
  font-weight: 700;
}

/* Line clamp for sidebar */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <div class="py-12 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- Main Content Area -->
        <div class="lg:w-3/4 space-y-12">
          
          <!-- Highlighted/Featured Post -->
          <div v-if="featuredPost" v-animate="'animate-fade-up'" class="bg-white rounded-[30px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group">
            <div class="relative h-64 md:h-96 overflow-hidden bg-slate-200">
              <img :src="featuredPost.image" :alt="featuredPost.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-4 left-4 bg-accent-500 text-primary-900 text-xs font-bold uppercase px-3 py-1">
                Featured
              </div>
            </div>
            <div class="p-6 md:p-8 border-l-4 border-l-transparent group-hover:border-l-accent-500 transition-colors">
              <div class="text-sm text-slate-500 mb-3 flex items-center gap-4">
                <span class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>
                  {{ featuredPost.date }}
                </span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-primary-900 mb-4 group-hover:text-accent-600 transition-colors">
                <NuxtLink :to="featuredPost.link">{{ featuredPost.title }}</NuxtLink>
              </h2>
              <p class="text-slate-600 mb-6 line-clamp-3">
                {{ featuredPost.excerpt }}
              </p>
              <NuxtLink :to="featuredPost.link" class="inline-flex items-center gap-2 text-primary-900 font-bold hover:text-accent-500 transition-colors uppercase text-sm">
                Read More
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Regular Posts Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(post, index) in posts" :key="post.id" v-animate="`animate-fade-up delay-${(index + 1) * 100}`" class="bg-white rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col">
              <div class="relative h-48 overflow-hidden bg-slate-200">
                <img :src="post.image" :alt="post.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div class="p-6 flex-1 flex flex-col border-b-4 border-b-transparent group-hover:border-b-accent-500 transition-colors">
                <div class="text-xs text-slate-500 mb-2">{{ post.date }}</div>
                <h3 class="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
                  <NuxtLink :to="post.link">{{ post.title }}</NuxtLink>
                </h3>
                <p class="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                  {{ post.excerpt }}
                </p>
                <NuxtLink :to="post.link" class="text-primary-900 font-bold hover:text-accent-500 transition-colors text-sm uppercase flex items-center gap-1 mt-auto">
                  Read More
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>

        <!-- Sidebar -->
        <aside class="lg:w-1/4 space-y-8">
          <!-- Search -->
          <div v-animate="'animate-fade-up delay-200'" class="bg-white p-8 border border-slate-100 rounded-[20px] shadow-lg shadow-slate-200/50">
            <h3 class="text-xl font-bold text-primary-900 uppercase mb-5 flex items-center gap-3">
              <span class="w-1.5 h-6 bg-accent-500 rounded-full"></span>
              Search
            </h3>
            <div class="relative">
              <input type="text" placeholder="Search..." class="w-full pl-4 pr-10 py-2 border border-slate-300 focus:outline-none focus:border-accent-500 rounded bg-slate-50 text-sm">
              <button class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-accent-500">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
              </button>
            </div>
          </div>

          <!-- Categories -->
          <div v-animate="'animate-fade-up delay-300'" class="bg-white p-8 border border-slate-100 rounded-[20px] shadow-lg shadow-slate-200/50">
            <h3 class="text-xl font-bold text-primary-900 uppercase mb-5 flex items-center gap-3">
              <span class="w-1.5 h-6 bg-accent-500 rounded-full"></span>
              Categories
            </h3>
            <ul class="space-y-2">
              <li v-for="cat in categories" :key="cat.name">
                <NuxtLink :to="cat.link" class="flex items-center justify-between text-slate-600 hover:text-accent-500 group">
                  <span class="text-sm group-hover:pl-1 transition-all">{{ cat.name }}</span>
                  <span class="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{{ cat.count }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </aside>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Post {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  link: string
}

export interface Category {
  name: string
  count: number
  link: string
}

defineProps<{
  featuredPost?: Post
  posts: Post[]
  categories: Category[]
}>()
</script>

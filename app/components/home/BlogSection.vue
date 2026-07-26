<template>
  <section class="py-24 bg-slate-50 border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100 mb-4">
            Latest Insights
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">News & Articles</h2>
          <p class="text-slate-500 text-lg">Stay updated with the latest trends in traffic technology, toll management, and infrastructure development.</p>
        </div>
        <NuxtLink to="/blogs" class="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors gap-2 group flex-shrink-0">
          View All Blogs
          <svg class="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <article v-for="blog in recentBlogs" :key="blog.id" class="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group flex flex-col">
          <NuxtLink :to="`/blogs/${blog.slug}`" class="block h-52 bg-slate-100 relative overflow-hidden">
            <!-- Decorative gradient fallback since we don't have guaranteed images -->
            <img v-if="blog.image" :src="blog.image" :alt="blog.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div v-else class="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-lg shadow-sm">
              {{ blog.category }}
            </div>
          </NuxtLink>
          
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ blog.date }}
              </span>
            </div>
            
            <NuxtLink :to="`/blogs/${blog.slug}`" class="block group-hover:text-blue-600 transition-colors">
              <h3 class="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">{{ blog.title }}</h3>
            </NuxtLink>
            
            <p class="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
              {{ blog.excerpt }}
            </p>
            
            <NuxtLink :to="`/blogs/${blog.slug}`" class="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link mt-auto">
              Read Article
              <svg class="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { blogs } from '~/data/blogs'

// Show only the first 3 blogs on the homepage
const recentBlogs = blogs.slice(0, 3)
</script>

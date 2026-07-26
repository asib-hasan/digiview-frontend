<template>
  <div class="max-w-4xl mx-auto space-y-4">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      v-animate="`animate-fade-up delay-${(index + 1) * 100}`"
      class="border border-slate-200 bg-white transition-all duration-300 overflow-hidden rounded-xl"
      :class="{ 'border-l-4 border-l-accent-500 shadow-md': activeIndex === index, 'border-l-4 border-l-transparent': activeIndex !== index }"
    >
      <button 
        @click="toggle(index)"
        class="w-full flex items-center justify-between p-5 md:p-6 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
        :class="{ 'bg-primary-900 text-white hover:bg-primary-800': activeIndex === index }"
      >
        <div class="flex items-center gap-4 text-left">
          <div 
            class="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            :class="activeIndex === index ? 'bg-accent-500 text-primary-900' : 'bg-slate-200 text-slate-500'"
          >
            <span class="font-bold font-mono">{{ index + 1 }}</span>
          </div>
          <h3 
            class="text-lg md:text-xl font-bold uppercase tracking-wide"
            :class="activeIndex === index ? 'text-white' : 'text-primary-900'"
          >
            {{ item.title }}
          </h3>
        </div>
        
        <div 
          class="flex-shrink-0 transition-transform duration-300"
          :class="{ 'rotate-180 text-accent-500': activeIndex === index, 'text-slate-400': activeIndex !== index }"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      <!-- Content -->
      <div 
        v-show="activeIndex === index"
        class="p-6 md:p-8 border-t border-slate-100 animate-fade-in"
      >
        <div class="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-primary-900">
          <div v-html="item.content"></div>
        </div>
        
        <ul v-if="item.list" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <li v-for="(listItem, lIndex) in item.list" :key="lIndex" class="flex items-start gap-2">
            <svg class="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-slate-700">{{ listItem }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface AccordionItem {
  title: string
  content: string
  list?: string[]
}

defineProps<{
  items: AccordionItem[]
}>()

const activeIndex = ref<number | null>(0)

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

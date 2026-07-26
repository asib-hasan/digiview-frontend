<template>
  <div class="relative max-w-5xl mx-auto py-12">
    <!-- Center Line -->
    <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 hidden md:block"></div>

    <div class="space-y-12">
      <div 
        v-for="(event, index) in events" 
        :key="index"
        class="relative flex flex-col md:flex-row items-center w-full"
        :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
      >
        <!-- Center Node -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent-500 border-4 border-white shadow-md z-10 hidden md:block"></div>

        <!-- Content -->
        <div class="w-full md:w-1/2 px-4 md:px-12 group">
          <div 
            class="bg-white p-6 rounded shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-md relative"
            :class="index % 2 === 0 ? 'border-l-4 border-l-accent-500 md:border-l-0 md:border-r-4 md:border-r-accent-500' : 'border-l-4 border-l-accent-500'"
          >
            <!-- Connector Arrow (Desktop) -->
            <div 
              class="hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-[12px] border-transparent"
              :class="index % 2 === 0 ? '-left-6 border-r-white' : '-right-6 border-l-white'"
            ></div>
            <div 
              class="hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-[13px] border-transparent -z-10"
              :class="index % 2 === 0 ? '-left-[26px] border-r-slate-100' : '-right-[26px] border-l-slate-100'"
            ></div>

            <div class="text-accent-500 font-bold text-xl mb-2">{{ event.year }}</div>
            <h3 class="text-xl font-bold text-primary-900 mb-3">{{ event.title }}</h3>
            <p class="text-slate-600 leading-relaxed text-sm md:text-base">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TimelineEvent {
  year: string
  title: string
  description: string
}

defineProps<{
  events: TimelineEvent[]
}>()
</script>

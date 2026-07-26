<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Stats -->
        <div class="grid grid-cols-2 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            v-animate="`animate-fade-up delay-${index * 100}`"
            :class="['rounded-2xl p-8 text-center relative overflow-hidden', stat.bg]"
          >
            <div class="absolute inset-0 opacity-5 hero-grid"></div>
            <div :class="['text-4xl md:text-5xl font-black mb-2', stat.textColor]">
              <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
            </div>
            <div class="text-sm font-semibold text-slate-600">{{ stat.label }}</div>
            <div class="text-xs text-slate-400 mt-1">{{ stat.sub }}</div>
          </div>
        </div>

        <!-- Right: Why ATT -->
        <div>
          <div v-animate="'animate-fade-up'" class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-50 text-accent-600 text-xs font-semibold rounded-full border border-accent-200 mb-5">
            Why Choose ATT
          </div>
          <h2 v-animate="'animate-fade-up delay-100'" class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            The Trusted Partner for Bangladesh's Infrastructure
          </h2>
          <p v-animate="'animate-fade-up delay-200'" class="text-slate-500 leading-relaxed mb-8">
            With over 25 years of experience, ATT combines deep local knowledge with world-class technology partnerships to deliver ITS solutions that work reliably in Bangladesh's challenging environment.
          </p>

          <div class="space-y-4">
            <div v-for="(point, index) in points" :key="point.title" v-animate="`animate-fade-up delay-${(index + 3) * 100}`" class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100">
                <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="point.icon" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-slate-900 mb-0.5">{{ point.title }}</div>
                <div class="text-sm text-slate-500">{{ point.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedCounter from '../common/AnimatedCounter.vue'

const stats = [
  { value: 25, suffix: '+', label: 'Years Experience', sub: 'Since 1999', bg: 'bg-blue-50', textColor: 'text-blue-700' },
  { value: 100, suffix: '+', label: 'Projects Delivered', sub: 'Nationwide', bg: 'bg-accent-50', textColor: 'text-accent-600' },
  { value: 50, suffix: '+', label: 'Clients Served', sub: 'Govt & Private', bg: 'bg-green-50', textColor: 'text-green-700' },
  { value: 8, suffix: '', label: 'Core Solutions', sub: 'ITS Domains', bg: 'bg-purple-50', textColor: 'text-purple-700' },
]

const points = [
  {
    title: 'End-to-End Project Delivery',
    text: 'From initial design and procurement through installation, commissioning, and long-term maintenance.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Certified Local Expertise',
    text: 'Our teams are certified and trained on all major ITS platforms with decades of Bangladesh-specific experience.',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    title: '24/7 Support & Maintenance',
    text: 'Round-the-clock emergency support and preventive maintenance contracts to maximize system uptime.',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>

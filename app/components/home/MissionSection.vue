<template>
  <!-- Mission Section -->
  <section class="pb-20 bg-transparent relative z-20 -mt-24 lg:-mt-32">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-8 lg:p-16 relative overflow-hidden">
        <!-- Background Blur -->
        <div class="absolute top-0 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div v-animate="'animate-fade-up'" class="inline-flex items-center gap-2 mb-4">
            <span class="w-10 h-0.5 bg-accent-500"></span>
            <span class="text-primary-700 text-sm font-bold uppercase tracking-wider">Our Purpose</span>
          </div>
          <h2 v-animate="'animate-fade-up delay-100'" class="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Leading Bangladesh's<br/>
            <span class="text-primary-600">Transportation Future</span>
          </h2>
          <p v-animate="'animate-fade-up delay-200'" class="text-slate-600 leading-relaxed mb-6">
            To hold the leadership in Bangladesh by means of continuous strive in offering quality management for Operation & Maintenance of ETC of Roads & Highways.
          </p>
          <p v-animate="'animate-fade-up delay-300'" class="text-slate-600 leading-relaxed mb-8">
            To become the market leader for Highways Systems Technology development in Bangladesh, leveraging cutting-edge ITS technologies.
          </p>
          <div v-animate="'animate-fade-up delay-400'">
            <NuxtLink to="/about" class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200">
              Learn more about ATT
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Mission/Vision cards -->
        <div class="grid grid-cols-1 gap-8">
          <div v-for="(card, index) in cards" :key="card.title" v-animate="`animate-fade-up delay-${(index + 2) * 100}`" class="bg-slate-50 rounded-2xl p-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative z-10 border border-slate-100">
            <!-- Icon pop -->
            <div class="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 group-hover:scale-110 transition-transform">
              <svg v-if="index === 0" class="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <svg v-else class="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <div class="ml-6">
              <h3 class="text-primary-900 font-black text-2xl uppercase tracking-wide mb-3 flex items-center gap-2">
                <span class="w-1 h-6 bg-accent-500"></span>
                {{ card.title }}
              </h3>
              <p class="text-slate-600 leading-relaxed text-lg">{{ card.text }}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'Our Mission',
    text: 'Continuous quality improvement in the operation and maintenance of Electronic Toll Collection systems for Roads & Highways across Bangladesh.',
  },
  {
    title: 'Our Vision',
    text: 'To become the undisputed market leader for Highways Systems Technology development in Bangladesh, setting regional standards for ITS excellence.',
  },
]
</script>

<template>
  <div class="solutions-page bg-white min-h-screen">
    <PageHero
      title="Our Solutions"
      subtitle="From fully equipped studio broadcasting to live event coverage and high-end post-production, we engineer workflows that perform flawlessly."
      label="BROADCAST EXCELLENCE"
    />

    <!-- Introduction Section -->
    <section class="py-20 md:py-28 bg-white overflow-hidden border-b border-slate-100">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <!-- Text -->
          <div class="order-2 lg:order-1">
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">
              Innovation in Broadcasting
            </div>
            <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 mb-6 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Architecting</span> the future of media production
            </h2>
            <p v-observe class="text-slate-600 mb-8 leading-relaxed text-[15px] md:text-lg font-medium" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              In a rapidly evolving digital landscape, off-the-shelf equipment isn't enough. We design, procure, and integrate comprehensive broadcast solutions that guarantee unmatched reliability, superior 4K quality, and scalable IP workflows for tomorrow's demands.
            </p>
            <div v-observe class="flex items-center gap-4" :class="{ 'animate-fade-up delay-600': observed.has($el) }">
              <div class="flex -space-x-4">
                <div class="w-12 h-12 rounded-full border-2 border-white bg-slate-200"><img src="/slider/1.webp" class="w-full h-full object-cover rounded-full" /></div>
                <div class="w-12 h-12 rounded-full border-2 border-white bg-slate-300"><img src="/slider/2.webp" class="w-full h-full object-cover rounded-full" /></div>
                <div class="w-12 h-12 rounded-full border-2 border-white bg-slate-400"><img src="/slider/1.webp" class="w-full h-full object-cover rounded-full" /></div>
                <div class="w-12 h-12 rounded-full border-2 border-white bg-[#e32727] flex items-center justify-center text-white text-xs font-bold">+50</div>
              </div>
              <p class="text-sm font-bold text-slate-700">Studios successfully built across the region</p>
            </div>
          </div>
          <!-- Image -->
          <div class="order-1 lg:order-2 relative" v-observe :class="{ 'animate-image-reveal': observed.has($el) }">
             <div class="rounded-3xl overflow-hidden shadow-2xl">
               <img src="/images/solutions/studio.png" alt="Broadcast Innovation" class="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
             </div>
             <!-- Floating animated badge -->
             <div class="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
               <div class="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-[#e32727]">
                 <Icon name="lucide:activity" class="w-7 h-7" />
               </div>
               <div>
                 <p class="text-slate-800 font-black text-lg">99.9%</p>
                 <p class="text-slate-500 text-xs font-bold uppercase tracking-wider">Uptime Guaranteed</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Solutions (Zig-Zag Pattern) -->
    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        
        <div class="text-center mb-16 md:mb-24">
          <div v-observe class="section-label-center" :class="{ 'animate-fade-up': observed.has($el) }">Core Solutions</div>
          <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 leading-tight mt-4" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            <span class="text-[#e32727]">Purpose-built</span> for professionals
          </h2>
        </div>

        <div class="space-y-24 md:space-y-36">
          <div 
            v-for="(solution, index) in solutions" 
            :key="solution.id"
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center group/solution"
          >
            <!-- Image Side -->
            <div 
              v-observe 
              class="relative" 
              :class="[
                index % 2 === 1 ? 'lg:order-2' : 'lg:order-1',
                { 'animate-image-reveal': observed.has($el) }
              ]"
            >
              <div class="rounded-[2.5rem] overflow-hidden shadow-2xl relative border-[8px] border-white z-10">
                <img :src="solution.image" :alt="solution.title" class="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover/solution:scale-110" />
                <div class="absolute inset-0 bg-[#e32727]/10 group-hover/solution:bg-transparent transition-colors duration-500"></div>
              </div>
              
              <!-- Decorative background element -->
              <div class="absolute -inset-4 md:-inset-6 bg-slate-200 rounded-[3rem] z-0 opacity-0 group-hover/solution:opacity-100 transition-opacity duration-700 transform group-hover/solution:-rotate-3"></div>
            </div>

            <!-- Content Side -->
            <div 
              v-observe 
              class="relative z-20"
              :class="[
                index % 2 === 1 ? 'lg:order-1' : 'lg:order-2',
                { 'animate-fade-up delay-300': observed.has($el) }
              ]"
            >
              <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-[#e32727] text-xs font-black mb-6 tracking-[0.2em] uppercase">
                <Icon :name="solution.icon || 'lucide:cpu'" class="w-4 h-4" />
                Solution 0{{ index + 1 }}
              </div>
              
              <h3 class="text-3xl md:text-5xl font-black text-slate-800 mb-6 leading-tight group-hover/solution:text-[#e32727] transition-colors duration-300">
                {{ solution.title }}
              </h3>
              
              <p class="text-slate-600 mb-10 text-[15px] md:text-lg leading-relaxed">
                {{ solution.short_description }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="feature in solution.features" :key="feature" class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="lucide:check" class="w-3.5 h-3.5 text-[#e32727]" />
                  </div>
                  <span class="text-slate-700 font-bold text-sm">{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>

    <!-- Capabilities / Advantages (Creative Animation Grid) -->
    <section class="py-20 md:py-28 bg-white overflow-hidden border-t border-slate-100">
      <div class="container mx-auto px-4 md:px-8">
        <div class="text-center mb-16 md:mb-20">
          <div v-observe class="section-label-center" :class="{ 'animate-fade-up': observed.has($el) }">The Digiview Advantage</div>
          <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 leading-tight mt-4" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            Why leading networks choose us
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(adv, idx) in advantages" :key="idx" v-observe class="p-8 rounded-3xl bg-[#f8f9fa] hover:bg-[#e32727] group transition-colors duration-500 shadow-sm hover:shadow-xl" :class="{ [`animate-fade-up delay-${(idx + 1) * 200}`]: observed.has($el) }">
            <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#e32727] mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Icon :name="adv.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-black text-slate-800 mb-4 group-hover:text-white transition-colors duration-500">{{ adv.title }}</h3>
            <p class="text-slate-500 leading-relaxed text-sm group-hover:text-red-100 transition-colors duration-500">{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const { $api } = useNuxtApp()
const { data: solutionsResponse } = await useAsyncData('solutions', () => $api('/public/solutions') as Promise<any>)
const solutions = computed(() => solutionsResponse.value?.data || [])

useSeoMeta({
  title: 'Solutions — Digiview Broadcast',
  description: 'Explore Digiview\'s broadcasting solutions, including studio setups, live event coverage, and high-end post-production workflows.',
})

const advantages = [
  { icon: 'lucide:cpu', title: 'Future-Proof Workflows', desc: 'We integrate scalable IP and 4K architectures that ensure your facility remains relevant and powerful for years to come.' },
  { icon: 'lucide:shield-check', title: 'Guaranteed Reliability', desc: 'Broadcast cannot afford downtime. We source only authentic, top-tier equipment and configure it for maximum redundancy and uptime.' },
  { icon: 'lucide:headphones', title: 'Expert Local Support', desc: 'Our certified engineers are based in Bangladesh, providing you with rapid on-site maintenance and 24/7 technical assistance.' },
]

// ── Scroll-triggered animation (Intersection Observer) ──
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
</script>

<style scoped>
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e32727;
  margin-bottom: 1rem;
}
.section-label::before {
  content: '';
  width: 2rem;
  height: 2px;
  background: #e32727;
}

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

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounceSlow 4s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.2); }
}
.animate-pulse-slow {
  animation: pulseSlow 5s ease-in-out infinite;
}
</style>

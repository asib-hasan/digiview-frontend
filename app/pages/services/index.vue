<template>
  <div class="services-page bg-white min-h-screen">
    <PageHero
      title="Our Services"
      subtitle="From complete studio design and system integration to 24/7 technical support, we provide end-to-end solutions for your broadcast and media infrastructure."
    />

    <!-- Partners Marquee (Animated Ticker) -->
    <section class="py-8 bg-slate-900 border-y border-slate-800 overflow-hidden shadow-inner">
      <div class="flex overflow-hidden relative">
        <!-- Fade masks for edges -->
        <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        
        <div class="animate-marquee flex gap-12 md:gap-20 items-center px-8">
           <!-- Repeat twice for infinite scroll effect -->
           <template v-for="i in 2" :key="i">
             <div v-for="brand in brands" :key="`p-${i}-${brand.id}`" class="text-slate-500 font-black text-xl md:text-3xl uppercase tracking-[0.2em] whitespace-nowrap hover:text-white transition-colors duration-500 cursor-default flex items-center">
               <span class="text-[#e32727] mr-4 opacity-50">/</span> {{ brand.title }}
             </div>
           </template>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        
        <div class="text-center mb-16 md:mb-24 relative">
          <div v-observe class="section-label-center" :class="{ 'animate-fade-up': observed.has($el) }">What We Do</div>
          <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 leading-tight mt-4" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            <span class="text-[#e32727]">Comprehensive solutions</span> for broadcasters
          </h2>
        </div>

        <div class="space-y-20 md:space-y-36">
          <div 
            v-for="(service, index) in services" 
            :key="service.id" 
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center group/service"
          >
            <!-- Image Side -->
            <div 
              v-observe 
              class="relative order-1" 
              :class="[
                index % 2 === 1 ? 'lg:order-2' : '',
                { 'animate-image-reveal': observed.has($el) }
              ]"
            >
              <!-- Animated Spinning Badge (Only on first item) -->
              <div v-if="index === 0" class="absolute -top-12 -left-12 w-36 h-36 z-30 hidden lg:block opacity-90 hover:opacity-100 transition-opacity">
                <div class="w-full h-full relative">
                  <svg viewBox="0 0 160 160" class="w-full h-full animate-spin-circle">
                    <defs>
                      <path id="circlePath" d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
                    </defs>
                    <text fill="#e32727" font-size="13" font-weight="900" letter-spacing="4">
                      <textPath href="#circlePath">★ PROFESSIONAL ★ BROADCAST ★ EQUIPMENT ★</textPath>
                    </text>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                      <Icon name="lucide:video" class="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Main Image Box with Parallax Hover -->
              <div class="rounded-2xl overflow-hidden shadow-2xl relative transform transition-transform duration-700 group-hover/service:-translate-y-2">
                <img :src="service.image || '/slider/1.webp'" :alt="service.title" class="w-full h-[400px] md:h-[500px] object-cover hover:scale-110 transition-transform duration-1000" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none"></div>
              </div>
              
              <!-- Floating Icon -->
              <div class="absolute -bottom-6 -right-6 md:right-auto md:-left-6 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 border border-slate-100 transition-transform duration-500 group-hover/service:scale-110" :class="index % 2 === 1 ? 'md:-right-6 md:left-auto' : ''">
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-[#e32727] to-[#991b1b] flex items-center justify-center text-white shadow-inner">
                  <Icon :name="service.icon || 'lucide:settings'" class="w-8 h-8" />
                </div>
              </div>
            </div>

            <!-- Content Side -->
            <div 
              v-observe 
              class="order-2"
              :class="[
                index % 2 === 1 ? 'lg:order-1' : '',
                { 'animate-fade-up delay-300': observed.has($el) }
              ]"
            >
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#e32727] text-xs font-black mb-6 tracking-widest uppercase shadow-sm border border-red-100">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e32727]"></span>
                </span>
                Service 0{{ index + 1 }}
              </div>
              
              <h3 class="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight group-hover/service:text-[#e32727] transition-colors duration-500">
                {{ service.title }}
              </h3>
              
              <p class="text-slate-600 mb-8 text-[15px] md:text-lg leading-relaxed font-medium">
                {{ service.short_description }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-2">
                <div v-for="(highlight, hIdx) in service.features" :key="highlight" class="flex items-start gap-3 group/item">
                  <div class="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#e32727] transition-colors">
                    <Icon name="lucide:check" class="w-3.5 h-3.5 text-[#e32727] group-hover/item:text-white transition-colors" />
                  </div>
                  <span class="text-slate-700 font-bold text-sm group-hover/item:text-[#e32727] transition-colors">{{ highlight }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>

    <!-- Animated Impact / Stats Section -->
    <section class="py-16 md:py-24 bg-[#e32727] relative overflow-hidden">
       <!-- Diagonal stripe pattern -->
       <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px);"></div>
       <!-- Glowing orb -->
       <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 blur-3xl rounded-full mix-blend-overlay pointer-events-none"></div>
       
       <div class="container mx-auto px-4 md:px-8 relative z-10">
         <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/20 text-center">
            <div v-for="(stat, idx) in stats" :key="idx" v-observe class="px-4 py-4 md:py-0" :class="{ [`animate-fade-up delay-${(idx + 1) * 200}`]: observed.has($el) }">
              <h3 class="text-5xl md:text-6xl font-black text-white mb-2 flex items-center justify-center drop-shadow-md">
                <AnimatedCounter :value="Number(stat.value) || 0" :duration="2500" />
                <span class="text-red-200">+</span>
              </h3>
              <p class="text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm">{{ stat.label }}</p>
            </div>
         </div>
       </div>
    </section>

    <!-- Our Process (Animated Timeline) -->
    <section class="py-20 md:py-28 bg-white overflow-hidden relative">
      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="text-center mb-16 md:mb-24">
          <div v-observe class="section-label-center" :class="{ 'animate-fade-up': observed.has($el) }">Our Process</div>
          <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 leading-tight mt-4" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            <span class="text-[#e32727]">How we</span> bring your vision to life
          </h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
          <!-- Animated Connecting Line (Desktop) -->
          <div class="hidden md:block absolute top-[48px] left-[10%] right-[10%] h-1 bg-slate-100 z-0 rounded-full overflow-hidden">
             <div v-observe class="h-full bg-[#e32727] w-0" :class="{ 'animate-progress-bar': observed.has($el) }"></div>
          </div>
          
          <div v-for="(step, idx) in processSteps" :key="idx" v-observe class="relative z-10 text-center group/step" :class="{ [`animate-fade-up delay-${(idx + 1) * 200}`]: observed.has($el) }">
            <div class="w-24 h-24 mx-auto bg-white border-4 border-slate-50 shadow-xl rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover/step:scale-110 group-hover/step:border-[#e32727] group-hover/step:text-[#e32727] group-hover/step:shadow-red-500/20 transition-all duration-500">
              <Icon :name="processIcons[idx % processIcons.length]" class="w-8 h-8" />
            </div>
            <div class="inline-block px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black rounded-full mb-4 uppercase tracking-[0.2em] group-hover/step:bg-[#e32727] group-hover/step:text-white transition-colors">
              Phase 0{{ idx + 1 }}
            </div>
            <h3 class="text-xl font-black text-slate-800 mb-3 group-hover/step:text-[#e32727] transition-colors">{{ step.title }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium px-4">{{ step.short_description }}</p>
          </div>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import AnimatedCounter from '~/components/common/AnimatedCounter.vue'

const { $api } = useNuxtApp()

// Fetch Services
const { data: servicesResponse } = await useAsyncData('services', () => $api('/public/services') as Promise<any>)
const services = computed(() => servicesResponse.value?.data || [])

// Fetch Brands
const { data: brandsResponse } = await useAsyncData('brands', () => $api('/public/brands') as Promise<any>)
const brands = computed(() => brandsResponse.value?.data || [])

useSeoMeta({
  title: 'Services — Digiview Broadcast',
  description: 'Explore Digiview\'s professional services including studio design, installation, commissioning, and preventive maintenance for broadcast infrastructure.',
})

// ── Data for new sections ──

const { data: countersResponse } = await useAsyncData('counters', () => $api('/public/counters') as Promise<any>)
const stats = computed(() => countersResponse.value?.data || [])

const { data: processesResponse } = await useAsyncData('processes', () => $api('/public/processes') as Promise<any>)
const processSteps = computed(() => processesResponse.value?.data || [])

const processIcons = [
  'lucide:messages-square', 
  'lucide:pen-tool', 
  'lucide:package-check', 
  'lucide:rocket'
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

/* ── Custom Animations ── */

@keyframes scrollText {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  display: inline-flex;
  white-space: nowrap;
  animation: scrollText 35s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}

@keyframes spinCircle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-circle {
  animation: spinCircle 12s linear infinite;
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.3; transform: scale(1) translateX(-50%); }
  50% { opacity: 0.6; transform: scale(1.1) translateX(-45%); }
}
.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

@keyframes progressBar {
  0% { w: 0; }
  100% { width: 100%; }
}
.animate-progress-bar {
  animation: progressBar 2s ease-out forwards;
  animation-delay: 0.5s;
}
</style>

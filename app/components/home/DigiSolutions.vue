<template>
  <section class="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Section Heading -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727] animate-fade-in-up">
          OUR SOLUTIONS
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight animate-fade-in-up animation-delay-200">
          Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Broadcast</span> Services
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Solution 1 -->
        <div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img src="/slider/1.webp" alt="Live IP Broadcasting" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <!-- Floating Icon -->
            <div class="absolute -bottom-8 right-8 w-16 h-16 bg-[#e32727] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:bg-slate-900 transition-colors">
              <Icon name="lucide:radio" class="w-6 h-6" />
            </div>
          </div>
          <!-- Content -->
          <div class="p-8 pt-12 relative">
            <h3 class="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#e32727] transition-colors">Live IP Broadcasting</h3>
            <p class="text-slate-600 mb-6 leading-relaxed text-sm">
              Seamlessly transmit live, uncompressed high-definition video over IP networks with our industry-leading encoding technologies.
            </p>
            <NuxtLink to="#" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#e32727] transition-colors">
              Discover More <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Solution 2 -->
        <div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-200">
          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img src="/slider/2.webp" alt="Studio System Integration" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <!-- Floating Icon -->
            <div class="absolute -bottom-8 right-8 w-16 h-16 bg-[#e32727] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:bg-slate-900 transition-colors">
              <Icon name="lucide:monitor-play" class="w-6 h-6" />
            </div>
          </div>
          <!-- Content -->
          <div class="p-8 pt-12 relative">
            <h3 class="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#e32727] transition-colors">Studio System Integration</h3>
            <p class="text-slate-600 mb-6 leading-relaxed text-sm">
              Complete turnkey solutions for television studios, including routing, switching, and multi-viewer monitoring setups.
            </p>
            <NuxtLink to="#" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#e32727] transition-colors">
              Discover More <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

        <!-- Solution 3 -->
        <div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up animation-delay-400">
          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img src="/slider/1.webp" alt="Cloud Media Production" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <!-- Floating Icon -->
            <div class="absolute -bottom-8 right-8 w-16 h-16 bg-[#e32727] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white group-hover:bg-slate-900 transition-colors">
              <Icon name="lucide:cloud" class="w-6 h-6" />
            </div>
          </div>
          <!-- Content -->
          <div class="p-8 pt-12 relative">
            <h3 class="text-2xl font-black text-slate-800 mb-4 group-hover:text-[#e32727] transition-colors">Cloud Media Production</h3>
            <p class="text-slate-600 mb-6 leading-relaxed text-sm">
              Modernize your workflow with scalable cloud-based editing, storage, and playout solutions designed for modern broadcasters.
            </p>
            <NuxtLink to="#" class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#e32727] transition-colors">
              Discover More <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
</style>

<template>
  <section class="py-24 relative overflow-hidden bg-slate-900 flex justify-center items-center">
    <!-- Background overlay -->
    <div class="absolute inset-0 z-0">
      <img src="/slider/1.webp" alt="Broadcast Background" class="w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
    </div>

    <!-- Decorative Red Slash -->
    <div class="absolute right-0 top-0 w-1/3 h-full bg-[#e32727] transform translate-x-1/2 skew-x-[-20deg] opacity-90 z-0"></div>

    <div class="container mx-auto px-4 md:px-8 relative z-10">
      <div class="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-10 md:p-16 rounded-3xl shadow-2xl max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div class="max-w-2xl text-center lg:text-left">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Ready to Upgrade Your <span class="text-[#e32727]">Broadcast</span> Infrastructure?
          </h2>
          <p class="text-slate-400 text-lg">
            Contact our engineering team today for a free consultation and customized system design tailored to your network's needs.
          </p>
        </div>

        <div class="flex-shrink-0 flex flex-col sm:flex-row gap-6">
          <NuxtLink to="#" class="px-8 py-4 bg-[#e32727] hover:bg-white hover:text-slate-900 text-white font-bold rounded-xl transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(227,39,39,0.4)] hover:shadow-none flex items-center justify-center gap-2">
            Get a Quote <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

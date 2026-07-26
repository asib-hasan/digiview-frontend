<template>
  <div class="bg-[#e32727] py-6 border-y border-red-700 overflow-hidden relative flex items-center">
    
    <!-- Left Fade Overlay -->
    <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#e32727] to-transparent z-10"></div>
    
    <!-- Marquee Track -->
    <div class="flex whitespace-nowrap animate-marquee">
      <div v-for="i in 3" :key="i" class="flex items-center">
        
        <span class="mx-8 text-white font-black text-2xl md:text-3xl uppercase tracking-widest drop-shadow-sm">
          Live Broadcasting
        </span>
        <Icon name="lucide:asterisk" class="w-8 h-8 text-white/50 animate-spin-slow" />
        
        <span class="mx-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-black text-2xl md:text-3xl uppercase tracking-widest" style="-webkit-text-stroke: 1px rgba(255,255,255,0.3);">
          Zero Latency
        </span>
        <Icon name="lucide:asterisk" class="w-8 h-8 text-white/50 animate-spin-slow" />
        
        <span class="mx-8 text-white font-black text-2xl md:text-3xl uppercase tracking-widest drop-shadow-sm">
          Studio Integration
        </span>
        <Icon name="lucide:asterisk" class="w-8 h-8 text-white/50 animate-spin-slow" />
        
        <span class="mx-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 font-black text-2xl md:text-3xl uppercase tracking-widest" style="-webkit-text-stroke: 1px rgba(255,255,255,0.3);">
          4K Video Systems
        </span>
        <Icon name="lucide:asterisk" class="w-8 h-8 text-white/50 animate-spin-slow" />

      </div>
    </div>

    <!-- Right Fade Overlay -->
    <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#e32727] to-transparent z-10"></div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-33.33333%); }
}

.animate-marquee {
  animation: marquee 25s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
</style>

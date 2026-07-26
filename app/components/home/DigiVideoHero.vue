<template>
  <div class="relative w-full overflow-hidden bg-slate-900 group mt-16 md:mt-20 pt-16 pb-20 md:pt-20 md:pb-28">
    
    <!-- Video Background & Dark Overlay -->
    <div class="absolute inset-0 z-0">
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="https://demo.awaikenthemes.com/assets/videos/ultracam-video.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-slate-950/70 mix-blend-multiply z-10 pointer-events-none"></div>
    </div>

    <!-- Content container -->
    <div class="container mx-auto px-4 md:px-8 relative z-20">
      <!-- Centered Hero Text -->
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div class="mb-6 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727] animate-fade-in-up">
          DIGIVIEW BROADCAST
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight animate-fade-in-up animation-delay-200">
          Advanced Broadcast & Media Solutions
        </h1>
        
        <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-400">
          Professional-grade video transmission, studio equipment, and high-definition broadcasting solutions for the modern media industry.
        </p>
        

      </div>
    </div>
  </div>
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
.animation-delay-600 { animation-delay: 600ms; }
.animation-delay-800 { animation-delay: 800ms; }
</style>

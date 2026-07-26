<template>
  <section class="py-20 md:py-32 bg-white overflow-hidden">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        <!-- Left: Image Composition -->
        <div class="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
          
          <!-- Image 1 -->
          <div class="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10 animate-fade-in-up">
            <img src="/slider/2.webp" alt="Security Control Room" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          
          <!-- Image 2 (Overlapping) -->
          <div class="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-8 border-white animate-fade-in-up animation-delay-200">
            <img src="/slider/1.webp" alt="CCTV Camera" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          <!-- Experience Circle -->
          <div class="absolute top-1/4 -right-4 md:right-8 lg:-right-4 z-30 w-32 h-32 md:w-40 md:h-40 bg-[#e32727] rounded-full flex flex-col items-center justify-center text-white shadow-xl animate-spin-slow-pulse">
            <span class="text-3xl md:text-4xl font-black">{{ new Date().getFullYear() - 2001 }}+</span>
            <span class="text-xs md:text-sm font-bold uppercase tracking-widest text-center px-4 mt-1">Years<br/>Exp</span>
          </div>

        </div>

        <!-- Right: Text Content -->
        <div class="max-w-xl">
          <div class="mb-4 inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#e32727] animate-fade-in-up">
            ABOUT DIGIVIEW
          </div>
          
          <h2 class="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight animate-fade-in-up animation-delay-200">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e32727] to-red-600">Pioneering</span> Broadcast Technologies
          </h2>
          
          <p class="text-slate-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
            We specialize in providing professional-grade broadcast and media equipment. Our mission is to deliver innovative technology for television networks, live events, and independent creators worldwide.
          </p>

          <div class="flex flex-col gap-8 animate-fade-in-up animation-delay-600">
            
            <!-- Experience Box -->
            <div class="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-[#e32727] flex-shrink-0">
                <Icon name="lucide:monitor-play" class="w-8 h-8" />
              </div>
              <h3 class="text-lg font-bold text-slate-800">
                We Have More Than <span class="text-[#e32727] text-2xl font-black mx-1">{{ new Date().getFullYear() - 1998 }}</span>+ Years of Broadcast Experience
              </h3>
            </div>

            <!-- Contact/Action Row -->
            <div class="flex items-center gap-8 mt-2">
              <NuxtLink to="#" class="px-8 py-3.5 bg-slate-800 text-white font-bold rounded hover:bg-[#e32727] transition-colors uppercase tracking-widest text-sm shadow-lg">
                More About Us
              </NuxtLink>
              
              <div class="flex items-center gap-4 hidden sm:flex">
                <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#e32727]">
                  <Icon name="lucide:phone-call" class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Directly 24/7</p>
                  <a href="tel:456789254" class="text-lg font-black text-slate-800 hover:text-[#e32727] transition-colors">+(1) 456 789 254</a>
                </div>
              </div>
            </div>

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
.animation-delay-600 { animation-delay: 600ms; }

@keyframes spin-slow-pulse {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.animate-spin-slow-pulse {
  animation: spin-slow-pulse 6s ease-in-out infinite;
}
</style>

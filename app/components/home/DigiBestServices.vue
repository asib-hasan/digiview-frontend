<template>
  <div class="relative w-full py-16">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        <!-- Service Card 1 -->
        <div class="group bg-white p-8 md:p-10 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div class="relative z-10 flex flex-col gap-5 items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e32727] group-hover:bg-[#e32727] group-hover:text-white transition-colors duration-300">
              <Icon name="lucide:camera" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-extrabold text-slate-800">Professional Broadcast Cameras</h3>
            <p class="text-slate-600 leading-relaxed text-sm">State-of-the-art 4K/8K visual capture systems designed for live events, newsrooms, and studio production.</p>
          </div>
        </div>

        <!-- Service Card 2 -->
        <div class="group bg-white p-8 md:p-10 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div class="relative z-10 flex flex-col gap-5 items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e32727] group-hover:bg-[#e32727] group-hover:text-white transition-colors duration-300">
              <Icon name="lucide:satellite-dish" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-extrabold text-slate-800">Live Video Transmission</h3>
            <p class="text-slate-600 leading-relaxed text-sm">Uncompressed SDI/HD-SDI fiber optic transmission for zero-latency, long-distance broadcast feeds.</p>
          </div>
        </div>

        <!-- Service Card 3 -->
        <div class="group bg-white p-8 md:p-10 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
          <div class="relative z-10 flex flex-col gap-5 items-center text-center">
            <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-[#e32727] group-hover:bg-[#e32727] group-hover:text-white transition-colors duration-300">
              <Icon name="lucide:monitor-play" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-extrabold text-slate-800">Studio & Media Equipment</h3>
            <p class="text-slate-600 leading-relaxed text-sm">Fully integrated encoding, decoding, and switching systems for seamless television and media production.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

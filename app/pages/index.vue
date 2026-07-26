<template>
  <div class="bg-slate-50 min-h-screen text-slate-800 selection:bg-amber-500/30 selection:text-amber-900 overflow-hidden">
    <DigiImageSliderHero />
    <DigiProductGrid />
    <DigiBestServices />
    <DigiCategories />
    <DigiBlog />
    <DigiVendor />
  </div>
</template>

<script setup lang="ts">
import DigiImageSliderHero from '~/components/home/DigiImageSliderHero.vue'
import DigiBestServices from '~/components/home/DigiBestServices.vue'
import DigiAboutUs from '~/components/home/DigiAboutUs.vue'
import DigiCategories from '~/components/home/DigiCategories.vue'
import DigiProductGrid from '~/components/home/DigiProductGrid.vue'
import DigiBlog from '~/components/home/DigiBlog.vue'
import DigiVendor from '~/components/home/DigiVendor.vue'
import DigiCTA from '~/components/home/DigiCTA.vue'

useSeoMeta({
  title: 'Digiview — Advanced Broadcast Technologies',
  description: 'Digiview — Your trusted partner for professional broadcasting equipment, camera systems, and futuristic studio parts.',
})
</script>

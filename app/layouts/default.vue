<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <CampaignPopup />
  </div>
</template>

<script setup lang="ts">
import CampaignPopup from '~/components/common/CampaignPopup.vue'
</script>

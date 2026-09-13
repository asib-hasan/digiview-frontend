<script setup lang="ts">
const route = useRoute()
navigateTo(`/news/${route.params.slug}`, { redirectCode: 301 })
</script>

<template>
  <div></div>
</template>

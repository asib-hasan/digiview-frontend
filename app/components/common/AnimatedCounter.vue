<template>
  <span ref="target" class="inline-block">
    <span v-if="prefix">{{ prefix }}</span>{{ displayValue }}<span v-if="suffix">{{ suffix }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' },
})

const target = ref(null)
const displayValue = ref(0)
let animated = false

const animate = () => {
  if (animated) return
  animated = true
  const start = 0
  const end = props.value
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // easeOutQuart
    const ease = 1 - Math.pow(1 - progress, 4)
    displayValue.value = Math.floor(start + (end - start) * ease)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      displayValue.value = end
    }
  }

  requestAnimationFrame(update)
}

useIntersectionObserver(target, ([entry]) => {
  if (entry.isIntersecting) {
    animate()
  }
})
</script>

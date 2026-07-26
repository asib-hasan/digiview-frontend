<template>
  <div class="traffic-light-trails absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-100">
    <div 
      v-for="(trail, index) in trails" 
      :key="index"
      class="light-trail"
      :class="trail.direction === 'left' ? 'dir-left' : 'dir-right'"
      :style="{
        top: `${trail.top}%`,
        height: `${trail.height}px`,
        width: `${trail.width}px`,
        animationDuration: `${trail.duration}s`,
        animationDelay: `${trail.delay}s`,
        left: trail.direction === 'right' ? '-300px' : 'auto',
        right: trail.direction === 'left' ? '-300px' : 'auto',
        backgroundColor: trail.color,
        boxShadow: `0 0 15px 2px ${trail.color}`
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Trail {
  top: number
  height: number
  width: number
  duration: number
  delay: number
  direction: 'left' | 'right'
  color: string
}

const trails = ref<Trail[]>([])

const generateTrails = () => {
  const newTrails: Trail[] = []
  const numTrails = 40 // Total number of light trails

  for (let i = 0; i < numTrails; i++) {
    const isLeft = Math.random() > 0.5
    // Red/amber lights for tail lights, White/Yellow for headlights
    const color = isLeft 
      ? (Math.random() > 0.8 ? '#fb923c' : '#ef4444') // amber or Red
      : (Math.random() > 0.8 ? '#fef08a' : '#ffffff') // Yellow or White
      
    newTrails.push({
      top: 10 + Math.random() * 80, // Spread across 10% to 90% vertically
      height: 2 + Math.random() * 3, // 2px to 5px thick
      width: 50 + Math.random() * 250, // 50px to 300px long
      duration: 2 + Math.random() * 4, // 2s to 6s crossing time
      delay: Math.random() * 3, // 0s to 3s delay before starting
      direction: isLeft ? 'left' : 'right',
      color
    })
  }
  
  trails.value = newTrails
}

onMounted(() => {
  generateTrails()
})
</script>

<style scoped>
.light-trail {
  position: absolute;
  border-radius: 9999px;
  opacity: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  filter: blur(1px);
}

.dir-left {
  animation-name: moveLeft;
}

.dir-right {
  animation-name: moveRight;
}

@keyframes moveRight {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(calc(100vw + 600px));
    opacity: 0;
  }
}

@keyframes moveLeft {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(calc(-100vw - 600px));
    opacity: 0;
  }
}
</style>

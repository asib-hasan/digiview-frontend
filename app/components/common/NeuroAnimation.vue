<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
    <canvas ref="canvasRef" class="w-full h-full opacity-60"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []
let width = 0
let height = 0

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 0.8
    this.vy = (Math.random() - 0.5) * 0.8
    this.radius = Math.random() * 1.5 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(59, 130, 246, 0.8)' // Accent color (Blue)
    ctx.fill()
  }
}

const resize = () => {
  if (!canvasRef.value) return
  width = canvasRef.value.clientWidth
  height = canvasRef.value.clientHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
  initParticles()
}

const initParticles = () => {
  particles = []
  // Adjust particle count based on screen size, limit to 80 for performance
  const numParticles = Math.min(Math.floor((width * height) / 15000), 80)
  
  for (let i = 0; i < numParticles; i++) {
    // Distribute particles more heavily on the left and right sides
    let x = Math.random() * width
    if (x > width * 0.25 && x < width * 0.75) {
        if (Math.random() > 0.5) {
            x = (Math.random() * 0.2) * width // Left 20%
        } else {
            x = (0.8 + Math.random() * 0.2) * width // Right 20%
        }
    }
    
    const y = Math.random() * height
    particles.push(new Particle(x, y))
  }
}

const animate = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i]!
    p1.update()
    p1.draw(ctx)

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]!
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 120) * 0.5})` // Fade lines based on distance
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('resize', resize)
  resize()
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationFrameId)
})
</script>

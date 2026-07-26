<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
    <!-- Tech Grid Background -->
    <div class="absolute inset-0 tech-grid opacity-20"></div>

    <!-- Top Left Corner Animation -->
    <div class="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96">
      <!-- Corner Border -->
      <div class="absolute top-6 left-6 md:top-10 md:left-10 w-32 h-32 md:w-48 md:h-48 border-l-2 border-t-2 border-accent-500/40 corner-pulse"></div>
      
      <!-- Pulsing Node -->
      <div class="absolute top-10 left-10 md:top-14 md:left-14 w-2 h-2 rounded-full bg-accent-400 shadow-[0_0_12px_#3b82f6] animate-ping duration-1000"></div>
      
      <!-- Scanning Line Vertical -->
      <div class="absolute top-6 left-6 md:top-10 md:left-10 w-[2px] h-20 md:h-32 bg-gradient-to-b from-transparent via-accent-400 to-transparent animate-scan-vertical"></div>
      
      <!-- Tech Data bars -->
      <div class="absolute top-6 left-12 flex gap-1">
        <div class="w-1 h-3 bg-accent-500/60 animate-pulse delay-75"></div>
        <div class="w-1 h-5 bg-accent-500/60 animate-pulse delay-150"></div>
        <div class="w-1 h-2 bg-accent-500/60 animate-pulse delay-300"></div>
      </div>
    </div>

    <!-- Bottom Right Corner Animation -->
    <div class="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96">
      <!-- Corner Border -->
      <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-32 h-32 md:w-48 md:h-48 border-r-2 border-b-2 border-accent-500/40 corner-pulse" style="animation-delay: -2s;"></div>
      
      <!-- Pulsing Node -->
      <div class="absolute bottom-10 right-10 md:bottom-14 md:right-14 w-2 h-2 rounded-full bg-accent-400 shadow-[0_0_12px_#3b82f6] animate-ping duration-1000" style="animation-delay: 0.5s;"></div>
      
      <!-- Scanning Line Horizontal -->
      <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-20 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-accent-400 to-transparent animate-scan-horizontal"></div>

      <!-- Tech Data bars -->
      <div class="absolute bottom-6 right-12 flex gap-1 flex-row-reverse">
        <div class="w-1 h-4 bg-accent-500/60 animate-pulse delay-100"></div>
        <div class="w-1 h-2 bg-accent-500/60 animate-pulse delay-200"></div>
        <div class="w-1 h-6 bg-accent-500/60 animate-pulse delay-500"></div>
      </div>
    </div>

    <!-- Floating Digital Nodes (Traffic/Data simulation) -->
    <div 
      v-for="node in nodes" 
      :key="node.id" 
      class="data-node"
      :class="node.color"
      :style="node.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Node {
  id: number
  color: string
  style: any
}

const nodes = ref<Node[]>([])

onMounted(() => {
  const newNodes: Node[] = []
  const numNodes = window.innerWidth < 768 ? 10 : 25

  for (let i = 0; i < numNodes; i++) {
    const isAccent = Math.random() > 0.5
    newNodes.push({
      id: i,
      color: isAccent ? 'bg-accent-400 shadow-[0_0_8px_currentColor]' : 'bg-white shadow-[0_0_8px_currentColor]',
      style: {
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 5}s`
      }
    })
  }
  nodes.value = newNodes
})
</script>

<style scoped>
.tech-grid {
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.corner-pulse {
  animation: pulse-border 4s ease-in-out infinite alternate;
}

@keyframes pulse-border {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

.animate-scan-vertical {
  animation: scan-v 3s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

@keyframes scan-v {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(128px); opacity: 0; } /* Matches typical md:h-32 */
}

.animate-scan-horizontal {
  animation: scan-h 3s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

@keyframes scan-h {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(-128px); opacity: 0; }
}

.data-node {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  opacity: 0;
  animation: float-node linear infinite;
}

@keyframes float-node {
  0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translate(60px, -40px) scale(1.5); opacity: 0; }
}
</style>

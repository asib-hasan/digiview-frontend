<template>
  <!-- Using bg-[#f8f9fa] to match standard site background, pt-36 to clear header -->
  <div class="min-h-[85vh] bg-[#f8f9fa] flex flex-col justify-center py-16 pt-36 px-4">
    
    <!-- Standard fixed max-width container, preventing squishing on wide screens -->
    <div class="w-full max-w-[380px] mx-auto">
      
      <!-- Card wrapper with professional styling -->
      <div class="bg-white p-8 border border-slate-200/80 rounded-2xl shadow-sm">
        
        <div class="mb-6">
          <h2 class="text-2xl font-black text-slate-800 tracking-tight">
            Sign In
          </h2>
          <p class="text-sm text-slate-500 mt-1 font-medium">
            Access your Digiview account
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="form.email"
              placeholder="name@company.com"
              class="appearance-none block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#e32727] focus:ring-4 focus:ring-[#e32727]/5 text-sm font-semibold transition-all shadow-sm"
            />
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="password" class="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <a href="#" class="text-[11px] font-bold text-[#e32727] hover:text-slate-900 transition-colors uppercase tracking-wider">
                Forgot password?
              </a>
            </div>
            
            <div class="relative">
              <input 
                id="password" 
                name="password" 
                :type="showPassword ? 'text' : 'password'" 
                autocomplete="current-password" 
                required 
                v-model="form.password"
                placeholder="••••••••"
                class="appearance-none block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#e32727] focus:ring-4 focus:ring-[#e32727]/5 text-sm font-semibold transition-all shadow-sm"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Remember Me Checkbox -->
          <div class="flex items-center pt-1">
            <label class="flex items-center gap-2 cursor-pointer group">
              <div class="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  v-model="form.remember"
                  class="peer sr-only" 
                />
                <div class="w-4 h-4 border border-slate-300 rounded peer-checked:bg-[#e32727] peer-checked:border-[#e32727] transition-all flex items-center justify-center">
                   <Icon name="lucide:check" class="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
              </div>
              <span class="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors select-none">Remember this device</span>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#e32727] hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e32727] disabled:opacity-50 transition-colors duration-300"
            >
              <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin mr-2" />
              Sign In
            </button>
          </div>
        </form>

        <div class="mt-6 pt-4 border-t border-slate-100 text-center">
          <p class="text-xs text-slate-500 font-semibold">
            New to Digiview? 
            <NuxtLink to="/signup" class="font-bold text-[#e32727] hover:text-slate-900 transition-colors ml-1">
              Create an account
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/')
  }, 1000)
}
</script>

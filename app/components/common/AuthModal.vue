<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
    
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-[450px] flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
        <div class="flex space-x-6">
          <button 
            @click="activeTab = 'login'" 
            class="text-lg font-bold pb-1 transition-colors"
            :class="activeTab === 'login' ? 'text-[#e32727] border-b-2 border-[#e32727]' : 'text-slate-500 hover:text-slate-800'"
          >
            Log In
          </button>
          <button 
            @click="activeTab = 'register'" 
            class="text-lg font-bold pb-1 transition-colors"
            :class="activeTab === 'register' ? 'text-[#e32727] border-b-2 border-[#e32727]' : 'text-slate-500 hover:text-slate-800'"
          >
            Register
          </button>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Area -->
      <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
        
        <!-- Login Form -->
        <form v-if="activeTab === 'login'" @submit.prevent="submitLogin" class="space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Email Address</label>
            <input 
              v-model="loginForm.email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Password</label>
            <input 
              v-model="loginForm.password" 
              type="password" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-2.5 mt-2 bg-[#e32727] hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            {{ isSubmitting ? 'Logging in...' : 'Log In' }}
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="submitRegister" class="space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Full Name<span class="text-red-500">*</span></label>
            <input 
              v-model="registerForm.name" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Email Address<span class="text-red-500">*</span></label>
            <input 
              v-model="registerForm.email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Phone<span class="text-red-500">*</span></label>
            <input 
              v-model="registerForm.phone" 
              type="tel" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>
          
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Company/Address:</label>
            <input 
              v-model="registerForm.address" 
              type="text" 
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Password<span class="text-red-500">*</span></label>
            <input 
              v-model="registerForm.password" 
              type="password" 
              required
              minlength="8"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>
          
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Confirm Password<span class="text-red-500">*</span></label>
            <input 
              v-model="registerForm.password_confirmation" 
              type="password" 
              required
              minlength="8"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-2.5 mt-2 bg-[#e32727] hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNuxtApp } from '#app'
import { useAuthStore } from '~/stores/auth'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])
const { $api } = useNuxtApp()
const auth = useAuthStore()

const activeTab = ref('login')
const isSubmitting = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  password_confirmation: ''
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const closeModal = () => {
  emit('close')
}

const submitLogin = async () => {
  isSubmitting.value = true
  try {
    const response: any = await $api('/public/auth/login', {
      method: 'POST',
      body: loginForm.value
    })

    auth.setAuth(response.customer, response.token)
    toast.success('Logged in successfully!')
    emit('success')
    closeModal()
  } catch (error: any) {
    console.error('Login error:', error)
    toast.error(error.data?.message || 'Login failed. Please check your credentials.')
  } finally {
    isSubmitting.value = false
  }
}

const submitRegister = async () => {
  if (registerForm.value.password !== registerForm.value.password_confirmation) {
    toast.error('Passwords do not match.')
    return
  }

  isSubmitting.value = true
  try {
    const response: any = await $api('/public/auth/register', {
      method: 'POST',
      body: registerForm.value
    })

    auth.setAuth(response.customer, response.token)
    toast.success('Account created successfully!')
    emit('success')
    closeModal()
  } catch (error: any) {
    console.error('Registration error:', error)
    toast.error(error.data?.message || 'Registration failed. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
</style>

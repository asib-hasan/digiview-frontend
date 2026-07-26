<template>
  <div class="bg-slate-50 min-h-screen pt-40 md:pt-48 pb-20">
    <div class="container mx-auto px-4 md:px-8 max-w-3xl">
      
      <!-- Header -->
      <div class="flex items-center gap-5 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div class="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 text-[#e32727] flex items-center justify-center text-3xl font-black shadow-sm shrink-0">
          {{ auth.getUser?.name?.charAt(0) }}
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{{ auth.getUser?.name }}</h1>
          <p class="text-sm text-slate-500 font-medium flex items-center gap-2">
             <Icon name="lucide:mail" class="w-4 h-4" /> {{ auth.getUser?.email }}
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        
        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 md:gap-4 border-b border-slate-200 pb-4 mb-6">
          <button 
            @click="activeTab = 'profile'"
            class="px-6 py-2.5 rounded-lg text-sm md:text-[15px] font-semibold transition-colors"
            :class="activeTab === 'profile' ? 'bg-[#e32727] text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'"
          >
            Profile Information
          </button>
          <button 
            @click="activeTab = 'password'"
            class="px-6 py-2.5 rounded-lg text-sm md:text-[15px] font-semibold transition-colors"
            :class="activeTab === 'password' ? 'bg-[#e32727] text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'"
          >
            Change Password
          </button>
        </div>

        <div>
          <!-- Profile Update Form -->
          <form v-if="activeTab === 'profile'" @submit.prevent="updateProfile" class="space-y-5 animate-fade-in">
            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Full Name<span class="text-red-500">*</span></label>
              <input 
                v-model="profileForm.name" 
                type="text" 
                required
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all shadow-sm"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Email Address <span class="text-slate-400 font-normal">(Cannot be changed)</span></label>
              <input 
                :value="auth.getUser?.email" 
                type="email" 
                disabled
                class="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none shadow-sm"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Phone Number</label>
              <input 
                v-model="profileForm.phone" 
                type="tel" 
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all shadow-sm"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Shipping / Billing Address</label>
              <textarea 
                v-model="profileForm.address" 
                rows="4"
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all resize-none shadow-sm"
              ></textarea>
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                :disabled="isUpdatingProfile"
                class="px-8 py-3 bg-[#e32727] hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[200px]"
              >
                <Icon v-if="isUpdatingProfile" name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
                {{ isUpdatingProfile ? 'Saving Changes...' : 'Save Changes' }}
              </button>
            </div>
          </form>

          <!-- Password Update Form -->
          <form v-if="activeTab === 'password'" @submit.prevent="updatePassword" class="space-y-5 animate-fade-in">
            
            <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 mb-6">
              <Icon name="lucide:info" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p class="text-sm text-blue-800">Your password must be at least 8 characters long.</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Current Password<span class="text-red-500">*</span></label>
              <input 
                v-model="passwordForm.current_password" 
                type="password" 
                required
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all shadow-sm"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">New Password<span class="text-red-500">*</span></label>
              <input 
                v-model="passwordForm.password" 
                type="password" 
                required
                minlength="8"
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all shadow-sm"
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-bold text-slate-700">Confirm New Password<span class="text-red-500">*</span></label>
              <input 
                v-model="passwordForm.password_confirmation" 
                type="password" 
                required
                minlength="8"
                class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#e32727] focus:border-[#e32727] outline-none transition-all shadow-sm"
              />
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                :disabled="isUpdatingPassword"
                class="px-8 py-3 bg-[#e32727] hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[200px]"
              >
                <Icon v-if="isUpdatingPassword" name="lucide:loader-2" class="w-5 h-5 mr-2 animate-spin" />
                {{ isUpdatingPassword ? 'Updating Password...' : 'Update Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useNuxtApp } from '#app'
import { toast } from 'vue3-toastify'

const auth = useAuthStore()
const router = useRouter()
const { $api } = useNuxtApp()

const activeTab = ref('profile')

const isUpdatingProfile = ref(false)
const isUpdatingPassword = ref(false)

const profileForm = ref({
  name: '',
  phone: '',
  address: ''
})

const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {
  if (!auth.isAuthenticated) {
    router.push('/')
    return
  }

  // Pre-fill profile form
  if (auth.getUser) {
    profileForm.value = {
      name: auth.getUser.name || '',
      phone: auth.getUser.phone || '',
      address: auth.getUser.address || ''
    }
  }
})

const updateProfile = async () => {
  isUpdatingProfile.value = true
  try {
    const response: any = await $api('/public/auth/profile', {
      method: 'PUT',
      body: profileForm.value
    })
    
    // Update local store
    auth.setAuth(response.customer, auth.getToken)
    toast.success('Profile updated successfully!')
  } catch (error: any) {
    console.error(error)
    toast.error(error.data?.message || 'Failed to update profile.')
  } finally {
    isUpdatingProfile.value = false
  }
}

const updatePassword = async () => {
  if (passwordForm.value.password !== passwordForm.value.password_confirmation) {
    toast.error('New passwords do not match.')
    return
  }

  isUpdatingPassword.value = true
  try {
    const response: any = await $api('/public/auth/password', {
      method: 'PUT',
      body: passwordForm.value
    })
    
    toast.success('Password updated successfully!')
    passwordForm.value = { current_password: '', password: '', password_confirmation: '' }
  } catch (error: any) {
    console.error(error)
    toast.error(error.data?.message || 'Failed to update password.')
  } finally {
    isUpdatingPassword.value = false
  }
}

useSeoMeta({
  title: 'My Profile — Digiview Broadcast'
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>

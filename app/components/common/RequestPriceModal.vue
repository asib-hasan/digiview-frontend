<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
    
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-[500px] flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="flex justify-between items-start p-6 border-b border-slate-100 shrink-0">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Our Sales Team Is Standing By</h2>
          <p class="text-sm text-slate-600 mt-1">
            Complete the form to order or learn more about this product. Our team will be in touch. Alternatively, call us at <a href="tel:01971548676" class="text-blue-600 font-medium">01971-548676</a>
          </p>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0 -mt-2 -mr-2 bg-blue-600 text-white shadow-sm hover:bg-blue-700">
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>

      <!-- Scrollable Form Area -->
      <div class="p-6 overflow-y-auto custom-scrollbar flex-1">
        <form @submit.prevent="submitForm" class="space-y-4">
          
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">First Name<span class="text-red-500">*</span></label>
            <input 
              v-model="form.first_name" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Last Name<span class="text-red-500">*</span></label>
            <input 
              v-model="form.last_name" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Email Address<span class="text-red-500">*</span></label>
            <input 
              v-model="form.email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Phone Number<span class="text-red-500">*</span></label>
            <input 
              v-model="form.phone" 
              type="tel" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Company<span class="text-red-500">*</span></label>
            <input 
              v-model="form.company" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Note</label>
            <textarea 
              v-model="form.note" 
              rows="3"
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Industry<span class="text-red-500">*</span></label>
            <select 
              v-model="form.industry" 
              required
              class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
            >
              <option value="" disabled selected>Select Industry</option>
              <option value="TV Broadcaster">TV Broadcaster</option>
              <option value="Audio Visual">Audio Visual</option>
              <option value="Corporate">Corporate</option>
              <option value="Reseller">Reseller</option>
              <option value="Radio & Film">Radio & Film</option>
              <option value="Youtuber">Youtuber</option>
            </select>
            <!-- Dropdown Icon -->
            <div class="relative">
                <Icon name="lucide:chevron-down" class="w-4 h-4 text-slate-500 absolute right-3 -top-8 pointer-events-none" />
            </div>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50 rounded-b-2xl">
        <button 
          @click="submitForm"
          :disabled="isSubmitting"
          class="px-8 py-2.5 bg-[#d6cdc5] hover:bg-[#c4b9b0] text-black font-bold text-sm tracking-wider uppercase transition-colors"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNuxtApp } from '#app'
import { toast } from 'vue3-toastify'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  productId: {
    type: [Number, String],
    required: true
  },
  productTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])
const { $api } = useNuxtApp()

const isSubmitting = ref(false)

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  note: '',
  industry: ''
})

const resetForm = () => {
  form.value = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    note: '',
    industry: ''
  }
}

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

const submitForm = async () => {
  // Basic validation
  if (!form.value.first_name || !form.value.last_name || !form.value.email || !form.value.phone || !form.value.company || !form.value.industry) {
    toast.error('Please fill out all required fields.')
    return
  }

  isSubmitting.value = true

  try {
    const response = await $api('/public/price-requests', {
      method: 'POST',
      body: {
        ...form.value,
        product_id: props.productId
      }
    })

    toast.success(response.message || 'Price request submitted successfully!')
    resetForm()
    closeModal()
  } catch (error: any) {
    console.error('Error submitting price request:', error)
    toast.error(error.data?.message || 'Failed to submit request. Please try again.')
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

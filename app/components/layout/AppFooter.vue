<template>
  <footer class="bg-gray-900 text-gray-300 font-sans border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
        
        <!-- Company Info -->
        <div class="lg:col-span-4 text-center md:text-left">
          <NuxtLink to="/" class="inline-block mb-6">
            <img src="/images/footer-logo.png" alt="Digiview Logo" class="h-16 w-auto mx-auto md:mx-0" />
          </NuxtLink>
          <p class="text-gray-400 mb-6 leading-relaxed whitespace-pre-line">
            {{ settings.address || '39 Purana Paltan, Level-3, Suite-E\nDhaka-1000, Bangladesh' }}<br><br>
            <a :href="`tel:${settings.phone || settings.hotline || '+8801711548676'}`" class="hover:text-[#e32727] transition-colors">{{ settings.phone || settings.hotline || '(+88) 01711 548676' }}</a><br>
            <a :href="`mailto:${settings.email || 'sales@digiview.biz'}`" class="hover:text-[#e32727] transition-colors">{{ settings.email || 'sales@digiview.biz' }}</a>
          </p>
          <div class="flex items-center justify-center md:justify-start gap-4">
            <a v-if="settings.facebook" :href="settings.facebook" target="_blank" aria-label="Facebook" class="social-icon">
              <Icon name="lucide:facebook" class="w-5 h-5" />
            </a>
            <a v-if="settings.twitter" :href="settings.twitter" target="_blank" aria-label="Twitter" class="social-icon">
              <Icon name="lucide:twitter" class="w-5 h-5" />
            </a>
            <a v-if="settings.instagram" :href="settings.instagram" target="_blank" aria-label="Instagram" class="social-icon">
              <Icon name="lucide:instagram" class="w-5 h-5" />
            </a>
            <a v-if="settings.youtube" :href="settings.youtube" target="_blank" aria-label="YouTube" class="social-icon">
              <Icon name="lucide:youtube" class="w-5 h-5" />
            </a>
            <a v-if="settings.linkedin" :href="settings.linkedin" target="_blank" aria-label="LinkedIn" class="social-icon">
              <Icon name="lucide:linkedin" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Important Links -->
        <div class="lg:col-span-4 text-center md:text-left lg:pl-16">
          <h3 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Important Links</h3>
          <ul class="space-y-2.5 inline-block text-left">
            <li><NuxtLink to="/about" class="footer-link">About Us</NuxtLink></li>
            <li><NuxtLink to="/products" class="footer-link">Products</NuxtLink></li>
            <li><NuxtLink to="/blogs" class="footer-link">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-4 text-center md:text-left">
          <h3 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h3>
          <p class="text-gray-400 mb-4 text-sm leading-relaxed">
            Subscribe to our newsletter to get the latest updates on new products and offers.
          </p>
          <form @submit.prevent="submitNewsletter" class="flex flex-col gap-3">
            <div class="relative">
              <Icon name="lucide:mail" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                v-model="email" 
                type="email" 
                placeholder="Enter your email" 
                required
                class="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#e32727] focus:ring-1 focus:ring-[#e32727] transition-colors"
              />
            </div>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-[#e32727] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
          <p>© {{ currentYear }} Digiview Broadcast Technologies. All rights reserved.</p>
          <p class="md:border-l md:border-gray-700 md:pl-4">Developed By <a href="https://creativetechpark.com/" target="_blank" class="text-white hover:text-[#e32727] font-semibold transition-colors">Creative Tech Park</a></p>
        </div>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="hover:text-white transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-white transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNuxtApp, useAsyncData } from '#app'
import { toast } from 'vue3-toastify'

const currentYear = new Date().getFullYear()
const { $api } = useNuxtApp()

const { data: settingsResponse } = await useAsyncData('global-settings-footer', () => $api('/public/settings') as Promise<any>)
const settings = computed(() => settingsResponse.value?.data || {})

const email = ref('')
const isSubmitting = ref(false)

const submitNewsletter = async () => {
  if (!email.value) return

  isSubmitting.value = true
  try {
    const response: any = await $api('/public/newsletters', {
      method: 'POST',
      body: { email: email.value }
    })
    
    toast.success(response.message || 'Subscribed successfully!')
    email.value = ''
  } catch (error: any) {
    console.error(error)
    toast.error(error.data?.message || 'Failed to subscribe. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.footer-link {
  display: inline-block;
  color: #9ca3af;
  transition: all 0.2s ease-in-out;
}
.footer-link:hover {
  color: #60a5fa; /* blue-400 */
  transform: translateX(4px);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #9ca3af;
  transition: all 0.3s ease;
}
.social-icon:hover {
  background: #2563eb; /* blue-600 */
  color: #ffffff;
  transform: translateY(-2px);
}
</style>

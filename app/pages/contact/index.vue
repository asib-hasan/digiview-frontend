<template>
  <div class="contact-page bg-white min-h-screen">
    <PageHero
      title="Contact Us"
      subtitle="Let's build your dream studio. Reach out to our broadcast experts for consultations, product inquiries, or 24/7 technical support."
      label="Get In Touch"
    />

    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden relative">
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e32727]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          <!-- Left: Contact Information (2 cols) -->
          <div class="lg:col-span-2 space-y-10">
            <div v-observe :class="{ 'animate-fade-up': observed.has($el) }">
              <div class="section-label">Reach Out</div>
              <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4 leading-tight">
                We're here to <span class="text-[#e32727]">help</span>
              </h2>
              <p class="text-slate-600 leading-relaxed font-medium">
                Whether you need a complete studio build, an urgent equipment replacement, or technical support, our team is ready to assist you.
              </p>
            </div>

            <div class="space-y-6">
              <div v-for="(info, index) in contactInfo" :key="info.label" v-observe class="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group" :class="{ [`animate-fade-up delay-${(index + 1) * 200}`]: observed.has($el) }">
                <div class="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e32727] transition-colors duration-300">
                  <Icon :name="info.icon" class="w-6 h-6 text-[#e32727] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{{ info.label }}</h3>
                  <div v-for="line in info.lines" :key="line">
                    <a v-if="info.href" :href="`${info.href}${line}`" class="text-slate-600 font-medium hover:text-[#e32727] transition-colors block text-base">{{ line }}</a>
                    <p v-else class="text-slate-600 font-medium text-base">{{ line }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div v-if="settings" v-observe class="pt-6 border-t border-slate-200" :class="{ 'animate-fade-up delay-700': observed.has($el) }">
              <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Follow Us</h3>
              <div class="flex items-center gap-4">
                <a v-if="settings.facebook" :href="settings.facebook" target="_blank" class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#e32727] hover:text-white hover:border-[#e32727] transition-all">
                  <Icon name="fa-brands:facebook-f" class="w-5 h-5" />
                </a>
                <a v-if="settings.instagram" :href="settings.instagram" target="_blank" class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#e32727] hover:text-white hover:border-[#e32727] transition-all">
                  <Icon name="fa-brands:instagram" class="w-5 h-5" />
                </a>
                <a v-if="settings.youtube" :href="settings.youtube" target="_blank" class="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#e32727] hover:text-white hover:border-[#e32727] transition-all">
                  <Icon name="fa-brands:youtube" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Contact Form (3 cols) -->
          <div class="lg:col-span-3">
            <div v-observe class="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden" :class="{ 'animate-fade-up delay-300': observed.has($el) }">
              <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e32727] to-[#ff6b6b]"></div>
              
              <div class="mb-10">
                <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-3">Send us a message</h2>
                <p class="text-slate-500 font-medium">Fill out the form below and one of our broadcast specialists will get back to you within 24 hours.</p>
              </div>

              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="form-label" for="name">Full Name *</label>
                    <input id="name" v-model="form.name" type="text" class="form-input" placeholder="Your full name" required />
                  </div>
                  <div>
                    <label class="form-label" for="email">Email Address *</label>
                    <input id="email" v-model="form.email" type="email" class="form-input" placeholder="your@email.com" required />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label class="form-label" for="phone">Phone Number</label>
                    <input id="phone" v-model="form.phone" type="tel" class="form-input" placeholder="+880 1XXX XXXXXX" />
                  </div>
                  <div>
                    <label class="form-label" for="company">Company / Organization</label>
                    <input id="company" v-model="form.company" type="text" class="form-input" placeholder="Your company or organization name" />
                  </div>
                </div>

                <div>
                  <label class="form-label" for="subject">Inquiry Type *</label>
                  <select id="subject" v-model="form.subject" class="form-input" required>
                    <option value="" disabled>Select an option</option>
                    <option>AV Production</option>
                    <option>System Integration</option>
                    <option>Technical Support</option>
                    <option>Live Streaming</option>
                    <option>IP Transmission/Production</option>
                    <option>Content Creator</option>
                    <option>Post Production</option>
                    <option>Project Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label class="form-label" for="message">Message *</label>
                  <textarea id="message" v-model="form.message" class="form-input min-h-[160px] resize-none" placeholder="Please describe your requirements or issues in detail..." required></textarea>
                </div>

                <!-- Success message -->
                <Transition name="fade-slide">
                  <div v-if="submitted" class="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-xl text-green-700 font-bold">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Icon name="lucide:check" class="w-5 h-5 text-green-600" />
                    </div>
                    Thank you! Your message has been received. Our team will contact you shortly.
                  </div>
                </Transition>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full sm:w-auto px-12 py-4 bg-[#e32727] hover:bg-slate-900 disabled:opacity-60 text-white font-black uppercase tracking-widest text-sm rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_20px_rgba(227,39,39,0.25)] hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Icon v-if="submitting" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                  {{ submitting ? 'Sending Message...' : 'Send Message' }}
                  <Icon v-if="!submitting" name="lucide:send" class="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const { $api } = useNuxtApp()

useSeoMeta({
  title: 'Contact Us — Digiview Broadcast',
  description: 'Contact Digiview Broadcast for professional audio/video equipment, studio integrations, project consultations, and 24/7 technical support in Bangladesh.',
})

// Fetch Settings
const { data: settingsResponse } = await useAsyncData('contact-settings', () => $api('/public/settings') as Promise<any>)
const settings = computed(() => settingsResponse.value?.data || {})

// ── Scroll-triggered animation (Intersection Observer) ──
const observed = reactive(new Set<Element>())

const vObserve = {
  mounted(el: Element) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observed.add(el)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
  },
}

// ── Form State ──
const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)

async function submitForm() {
  submitting.value = true
  try {
    await $api('/public/contact', {
      method: 'POST',
      body: form
    })
    submitted.value = true
    // Reset form
    Object.assign(form, { name: '', email: '', phone: '', company: '', subject: '', message: '' })
    setTimeout(() => { submitted.value = false }, 6000)
  } catch (error) {
    console.error('Failed to submit contact form', error)
    alert('Something went wrong. Please try again.')
  } finally {
    submitting.value = false
  }
}

// ── Contact Info ──
const contactInfo = computed(() => {
  const info = []
  
  if (settings.value.hotline || settings.value.phone) {
    info.push({
      label: 'Phone (24/7 Support)',
      icon: 'lucide:phone-call',
      href: 'tel:',
      lines: [settings.value.hotline, settings.value.phone].filter(Boolean),
    })
  }

  if (settings.value.email) {
    info.push({
      label: 'Email Address',
      icon: 'lucide:mail',
      href: 'mailto:',
      lines: [settings.value.email],
    })
  }

  if (settings.value.address) {
    info.push({
      label: 'Address',
      icon: 'lucide:map-pin',
      href: null,
      lines: [settings.value.address],
    })
  }

  // Global Associate Partner Card
  const partnerText = settings.value.partner || settings.value.partner_address || "Whiteways Systems Pte Ltd.\n#06-06 Number One Building\n1 Ubi Crescent, Singapore 408563"
  if (partnerText) {
    const lines = partnerText.split('\n').map((l: string) => l.trim()).filter(Boolean)
    if (lines.length > 0) {
      info.push({
        label: settings.value.partner_title || 'GLOBAL ASSOCIATE PARTNER',
        icon: 'lucide:handshake',
        href: null,
        lines: lines,
      })
    }
  }

  return info
})
</script>

<style scoped>
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e32727;
  margin-bottom: 1rem;
}
.section-label::before {
  content: '';
  width: 2rem;
  height: 2px;
  background: #e32727;
}

/* ── Form Styles ── */
.form-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #0f172a;
  background: #f8fafc;
  outline: none;
  transition: all 0.3s;
}

.form-input:focus {
  border-color: #e32727;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(227, 39, 39, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
  padding-right: 3rem;
}

/* ── Transitions ── */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

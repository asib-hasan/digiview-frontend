<template>
  <div class="about-page bg-white min-h-screen">

    <PageHero
      title="About Us"
      :subtitle="settings.about_us_hero_content || 'Your trusted partner for professional broadcast, audio-visual, and media technology solutions — empowering studios, networks, and live productions across Bangladesh since 1998.'"
      :bgImage="settings.about_us_hero_image"
    />

    <!-- Section 2: About Us -->
    <section class="py-20 md:py-28 bg-white overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          <!-- Left: Image -->
          <div class="relative w-full h-full min-h-[400px] md:min-h-[520px]">
            <div
              v-observe class="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl z-10"
              :class="{ 'animate-fade-up': observed.has($el) }"
            >
              <img src="/slider/2.webp" alt="Broadcast Studio" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Right: Text Content -->
          <div>
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">
              About Digiview
            </div>
            <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 mb-6 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Empowering broadcasts</span> with world-class equipment
            </h2>
            <p v-observe class="text-slate-600 mb-8 leading-relaxed text-[15px] md:text-base" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              Digiview is Bangladesh's leading distributor of professional broadcast, audio-visual, and media technology equipment. As authorized dealers for globally recognized brands like Yamaha, Blackmagic Design, Sennheiser, and Shure, we supply and integrate complete solutions for television networks, radio stations, recording studios, houses of worship, corporate venues, and live event productions.
            </p>

            <!-- Experience Box -->
            <div v-observe class="flex items-center gap-6 p-6 rounded-2xl bg-[#f8f9fa] border border-slate-100 mb-10" :class="{ 'animate-fade-up delay-500': observed.has($el) }">
              <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-[#e32727] shrink-0">
                <Icon name="lucide:monitor-play" class="w-7 h-7" />
              </div>
              <h3 class="text-[17px] font-bold text-slate-800">
                We Have More Than <span class="text-[#e32727] text-[32px] font-black mx-1.5 leading-none">{{ new Date().getFullYear() - 2001 }}</span> <span class="text-xl font-bold">+</span> Years of Broadcast Experience
              </h3>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- Section 3: Mission / Vision / Goal (Dark) -->
    <section class="bg-slate-900 overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Left: Image -->
        <div v-observe class="relative min-h-[400px] lg:min-h-[600px]" :class="{ 'animate-image-reveal': observed.has($el) }">
          <img src="/images/mission_vision_bg.png" alt="Broadcast Studio Equipment" class="w-full h-full object-cover" />
        </div>

        <!-- Right: Mission/Vision/Goal -->
        <div class="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
          <div v-observe class="flex items-start gap-6 mb-10 pb-10 border-b border-slate-700/50" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            <div class="w-14 h-14 rounded-xl bg-[#e32727] flex items-center justify-center shrink-0 shadow-lg">
              <Icon name="lucide:target" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-black text-white mb-3">Our Mission</h3>
              <p class="text-slate-400 leading-relaxed text-[15px] whitespace-pre-line">{{ settings.mission || "To be the most reliable bridge between global broadcast technology manufacturers and Bangladesh's growing media industry. We are committed to supplying genuine, professional-grade audio, video, and broadcast equipment — backed by expert consultation, seamless installation, and dedicated after-sales support — so that every studio, network, and venue can produce at the highest standard." }}</p>
            </div>
          </div>

          <div v-observe class="flex items-start gap-6" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
            <div class="w-14 h-14 rounded-xl bg-[#e32727] flex items-center justify-center shrink-0 shadow-lg">
              <Icon name="lucide:eye" class="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-black text-white mb-3">Our Vision</h3>
              <p class="text-slate-400 leading-relaxed text-[15px] whitespace-pre-line">{{ settings.vision || "To establish Digiview as South Asia's most trusted broadcast equipment partner — a company synonymous with quality, innovation, and integrity. We envision a future where every broadcaster in the region has access to world-class technology, enabling them to tell their stories with uncompromised production quality and technical excellence." }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Why Choose Us -->
    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <div v-observe class="section-label justify-center" :class="{ 'animate-fade-up': observed.has($el) }">Why Choose Us</div>
          <h2 v-observe class="text-3xl md:text-4xl lg:text-[42px] font-black text-slate-800 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
            <span class="text-[#e32727]">Expert solutions,</span> reliable broadcast equipment
          </h2>
        </div>

        <!-- 3 Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <!-- Left Column -->
          <div class="space-y-6">
            <div v-observe class="why-choose-item" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <div class="icon-box-red">
                <Icon name="lucide:headphones" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">24/7 Technical Support</h3>
                <p class="text-slate-500 text-sm leading-relaxed">Round-the-clock technical helpdesk for equipment troubleshooting, firmware updates, and on-site emergency repairs.</p>
              </div>
            </div>
            <div v-observe class="why-choose-item" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              <div class="icon-box-red">
                <Icon name="lucide:settings" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">Tailored System Design</h3>
                <p class="text-slate-500 text-sm leading-relaxed">Custom broadcast system architecture designed for TV studios, OB vans, auditoriums, and live event venues.</p>
              </div>
            </div>
          </div>

          <!-- Center Image -->
          <div v-observe class="hidden lg:block" :class="{ 'animate-fade-up delay-300': observed.has($el) }">
            <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600" alt="Broadcast Equipment" class="w-full rounded-2xl shadow-xl" />
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <div v-observe class="why-choose-item" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <div class="icon-box-red">
                <Icon name="lucide:wifi" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">Authorized Dealership</h3>
                <p class="text-slate-500 text-sm leading-relaxed">Official authorized dealers for Yamaha, Blackmagic Design, Sennheiser, Shure, and other leading global brands.</p>
              </div>
            </div>
            <div v-observe class="why-choose-item" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              <div class="icon-box-red">
                <Icon name="lucide:wrench" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">End-to-End Installation</h3>
                <p class="text-slate-500 text-sm leading-relaxed">From site assessment and equipment procurement to installation, commissioning, and staff training — we handle it all.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Section 6: Our Expertise -->
    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- Left: Content -->
          <div>
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">Our Expertise</div>
            <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Deep domain knowledge</span> in broadcast infrastructure
            </h2>
            <p v-observe class="text-slate-600 mb-8 leading-relaxed" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              Our engineering team brings decades of hands-on experience in designing, deploying, and maintaining broadcast systems — from digital audio mixing consoles and intercom systems to IP-based video routing, playout automation, and complete studio builds.
            </p>

            <!-- Expertise Items -->
            <div class="space-y-4 mb-8">
              <div v-observe class="flex items-center gap-5 p-4 rounded-xl bg-white border border-slate-100 shadow-sm" :class="{ 'animate-fade-up delay-500': observed.has($el) }">
                <div class="icon-box-red"><Icon name="lucide:cpu" class="w-6 h-6" /></div>
                <div>
                  <h3 class="text-base font-bold text-slate-800 mb-1">Studio Design & Build</h3>
                  <p class="text-slate-500 text-sm">Complete TV/radio studio construction — acoustics, lighting, equipment racks, and system integration.</p>
                </div>
              </div>
              <div v-observe class="flex items-center gap-5 p-4 rounded-xl bg-white border border-slate-100 shadow-sm" :class="{ 'animate-fade-up delay-600': observed.has($el) }">
                <div class="icon-box-red"><Icon name="lucide:shield-check" class="w-6 h-6" /></div>
                <div>
                  <h3 class="text-base font-bold text-slate-800 mb-1">Live Event Production</h3>
                  <p class="text-slate-500 text-sm">PA systems, mixing consoles, wireless mics, and video walls for concerts, conferences, and corporate events.</p>
                </div>
              </div>
            </div>

            <!-- Expertise Counter -->
            <div v-observe class="flex items-center gap-6 p-5 rounded-xl bg-[#e32727] text-white" :class="{ 'animate-fade-up delay-700': observed.has($el) }">
              <h2 class="text-4xl font-black"><AnimatedCounter :value="39" suffix="+" :duration="2000" /></h2>
              <div>
                <p class="font-bold text-sm">Brands Represented</p>
                <p class="text-white/70 text-sm">Across Audio, Video & Broadcast</p>
              </div>
            </div>
          </div>

          <!-- Right: Image + Contact Badge -->
          <div class="relative">
            <div v-observe class="rounded-2xl overflow-hidden shadow-2xl" :class="{ 'animate-image-reveal': observed.has($el) }">
              <img src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=800" alt="Broadcast Expertise" class="w-full h-[500px] object-cover" />
            </div>
            <!-- Floating Contact Badge -->
            <div class="absolute -bottom-6 -left-6 md:left-6 bg-slate-900 rounded-2xl p-5 shadow-xl flex items-center gap-4 z-10">
              <div class="w-12 h-12 rounded-full bg-[#e32727] flex items-center justify-center">
                <Icon name="lucide:phone" class="w-6 h-6 text-white" />
              </div>
              <div>
                <p class="text-slate-400 text-xs font-bold uppercase tracking-wider">24/7 Support</p>
                <a href="tel:+8801234567890" class="text-white font-black text-lg hover:text-[#e32727] transition-colors">+880 1234-567890</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- Section 8: Our Team -->
    <section class="py-20 md:py-28 bg-white overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <!-- Header Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">Meet Our Experts</div>
            <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Dedicated professionals</span> behind your broadcast
            </h2>
          </div>
          <div v-observe class="flex flex-col sm:flex-row items-start sm:items-end gap-4" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
            <p class="text-slate-600 text-[15px] leading-relaxed">Our leadership team combines deep technical expertise in broadcast engineering with decades of business experience in equipment distribution, system integration, and project management.</p>
          </div>
        </div>

        <!-- Team Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(member, idx) in teamMembers" :key="member.name" v-observe class="team-card group" :class="{ [`animate-fade-up delay-${(idx + 1) * 200}`]: observed.has($el) }">
            <div class="relative overflow-hidden rounded-2xl mb-5">
              <img :src="member.image" :alt="member.name" class="w-full h-72 object-cover object-top group-hover:scale-110 transition-transform duration-700" />

            </div>
            <h3 class="text-lg font-black text-slate-800 group-hover:text-[#e32727] transition-colors capitalize">{{ member.name }}</h3>
            <p class="text-sm text-slate-500 font-medium">{{ member.designation }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 9: Technical Support -->
    <section class="py-20 md:py-28 bg-[#f8f9fa] overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <!-- Left: Images -->
          <div class="relative grid grid-cols-2 gap-4">
            <div v-observe class="rounded-2xl overflow-hidden shadow-lg" :class="{ 'animate-image-reveal': observed.has($el) }">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600" alt="Support Team" class="w-full h-80 object-cover" />
            </div>
            <div v-observe class="rounded-2xl overflow-hidden shadow-lg mt-12" :class="{ 'animate-image-reveal delay-300': observed.has($el) }">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600" alt="Technical Support" class="w-full h-80 object-cover" />
            </div>
            <!-- Rotating Circle -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-24 z-20">
              <NuxtLink to="/contact" class="block w-full h-full relative group">
                <svg viewBox="0 0 100 100" class="w-full h-full animate-spin-circle">
                  <defs><path id="supportCircle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" /></defs>
                  <text fill="#e32727" font-size="9" font-weight="700" letter-spacing="3">
                    <textPath href="#supportCircle">★ CONTACT ★ NOW ★ DIGIVIEW ★</textPath>
                  </text>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-10 h-10 bg-[#e32727] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="lucide:arrow-right" class="w-5 h-5 text-white" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Right: Content -->
          <div>
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">Technical Support</div>
            <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Reliable technical</span> support anytime you need
            </h2>
            <p v-observe class="text-slate-600 mb-8 leading-relaxed" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              Our in-house team of certified broadcast engineers provides on-site installation, system commissioning, preventive maintenance, and emergency repair services across Bangladesh.
            </p>

            <div class="space-y-4 mb-8">
              <div v-observe class="flex items-center gap-5 p-4 rounded-xl bg-white border border-slate-100 shadow-sm" :class="{ 'animate-fade-up delay-500': observed.has($el) }">
                <div class="icon-box-red"><Icon name="lucide:radio-tower" class="w-6 h-6" /></div>
                <div>
                  <h3 class="text-base font-bold text-slate-800 mb-1">Installation & Commissioning</h3>
                  <p class="text-slate-500 text-sm">Full equipment rack setup, wiring, signal routing, and system commissioning with test reports.</p>
                </div>
              </div>
              <div v-observe class="flex items-center gap-5 p-4 rounded-xl bg-white border border-slate-100 shadow-sm" :class="{ 'animate-fade-up delay-600': observed.has($el) }">
                <div class="icon-box-red"><Icon name="lucide:monitor-check" class="w-6 h-6" /></div>
                <div>
                  <h3 class="text-base font-bold text-slate-800 mb-1">Preventive Maintenance</h3>
                  <p class="text-slate-500 text-sm">Annual maintenance contracts with scheduled checkups, firmware updates, and performance optimization.</p>
                </div>
              </div>
            </div>

            <div v-observe :class="{ 'animate-fade-up delay-700': observed.has($el) }">
              <NuxtLink to="/contact" class="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-[#e32727] transition-colors uppercase tracking-widest text-sm shadow-lg inline-block">
                Contact Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Section 12: FAQ -->
    <section class="py-20 md:py-28 bg-white overflow-hidden">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <!-- Left: Content -->
          <div class="lg:sticky lg:top-32">
            <div v-observe class="section-label" :class="{ 'animate-fade-up': observed.has($el) }">FAQ</div>
            <h2 v-observe class="text-3xl md:text-4xl font-black text-slate-800 mb-6 leading-tight" :class="{ 'animate-fade-up delay-200': observed.has($el) }">
              <span class="text-[#e32727]">Frequently</span> asked questions
            </h2>
            <p v-observe class="text-slate-600 mb-8 leading-relaxed" :class="{ 'animate-fade-up delay-400': observed.has($el) }">
              Our FAQ section addresses common questions about our broadcast equipment, installation, and services. Find quick and reliable answers to help you make informed decisions.
            </p>

            <div v-observe class="space-y-3" :class="{ 'animate-fade-up delay-500': observed.has($el) }">
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-[#e32727] flex items-center justify-center shrink-0">
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-white" />
                </div>
                <span class="text-slate-700 font-medium text-[15px]">Professional-Grade High-Definition Broadcast Equipment</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-[#e32727] flex items-center justify-center shrink-0">
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-white" />
                </div>
                <span class="text-slate-700 font-medium text-[15px]">Seamless Studio Design & Integration Services</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-[#e32727] flex items-center justify-center shrink-0">
                  <Icon name="lucide:check" class="w-3.5 h-3.5 text-white" />
                </div>
                <span class="text-slate-700 font-medium text-[15px]">Comprehensive After-Sales Technical Support</span>
              </div>
            </div>
          </div>

          <!-- Right: Accordion -->
          <div class="space-y-4">
            <div v-for="(faq, idx) in faqs" :key="idx" v-observe
              class="rounded-2xl border border-slate-200 overflow-hidden transition-all"
              :class="[
                activeFaq === idx ? 'bg-white shadow-md border-slate-300' : 'bg-[#f8f9fa]',
                { [`animate-fade-up delay-${(idx + 1) * 200}`]: observed.has($el) }
              ]"
            >
              <button
                @click="activeFaq = activeFaq === idx ? -1 : idx"
                class="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span class="font-bold text-slate-800 text-[15px] pr-4">{{ faq.question }}</span>
                <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  :class="activeFaq === idx ? 'bg-[#e32727] text-white' : 'bg-slate-200 text-slate-600'"
                >
                  <Icon :name="activeFaq === idx ? 'lucide:minus' : 'lucide:plus'" class="w-4 h-4" />
                </div>
              </button>
              <Transition name="accordion">
                <div v-if="activeFaq === idx" class="px-6 pb-5">
                  <p class="text-slate-600 leading-relaxed text-[15px]">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AnimatedCounter from '~/components/common/AnimatedCounter.vue'

const { $api } = useNuxtApp()

const { data: settingsResponse } = await useAsyncData('global-settings-about', () => $api('/public/settings') as Promise<any>)
const settings = computed(() => settingsResponse.value?.data || {})

useSeoMeta({
  title: 'About Us — Digiview Broadcast',
  description: 'Learn about Digiview Broadcast — our mission, vision, team, and 25+ years of delivering professional broadcast and media technology solutions across Bangladesh.',
})

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

// ── Data ──
const activeFaq = ref(1)

const { data: teamsData } = await useAsyncData('teams', () => $api('/public/teams') as Promise<any>)
const teamMembers = computed(() => teamsData.value?.data || [])

const { data: faqsData } = await useAsyncData('faqs', () => $api('/public/faqs') as Promise<any>)
const faqs = computed(() => faqsData.value?.data || [])
</script>

<style scoped>
/* ── Section Label ── */
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

.section-label-light {
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
.section-label-light::before {
  content: '';
  width: 2rem;
  height: 2px;
  background: #e32727;
}

/* ── Icon Box ── */
.icon-box-red {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #e32727, #c41e1e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(227, 39, 39, 0.3);
}

/* ── Why Choose Item ── */
.why-choose-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}
.why-choose-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

/* ── Spinning Circle ── */
@keyframes spinCircle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-circle {
  animation: spinCircle 15s linear infinite;
}

/* ── Accordion Transition ── */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 200px;
  overflow: hidden;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* ── Scrollbar hide for testimonials ── */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

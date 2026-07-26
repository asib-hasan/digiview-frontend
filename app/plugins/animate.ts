import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', {
    mounted(el, binding) {
      // By default apply opacity-0 to hide the element before animation triggers
      el.classList.add('opacity-0')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove opacity-0
            el.classList.remove('opacity-0')
            
            // Add the animation class passed as value, e.g. v-animate="'animate-fade-up'"
            // If no value provided, default to 'animate-fade-up'
            const animateClass = binding.value || 'animate-fade-up'
            
            // Handle multiple classes if passed as string separated by spaces
            const classes = animateClass.split(' ').filter(Boolean)
            el.classList.add(...classes)
            
            // Stop observing once animated
            observer.unobserve(el)
          }
        })
      }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly trigger before it comes fully into view
      })

      observer.observe(el)
    }
  })
})

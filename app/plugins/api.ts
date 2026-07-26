import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
  
    const $api = $fetch.create({
      baseURL: config.public.apiUrl as string,
  
      onRequest({ options }) {
        const auth = useAuthStore()
        if (auth.getToken) {
          if (!options.headers) {
            options.headers = new Headers();
          } else if (!(options.headers instanceof Headers)) {
            options.headers = new Headers(options.headers);
          }
          (options.headers as Headers).set('Authorization', `Bearer ${auth.getToken}`);
        }
      },
  
      onResponse({ response }) {
        if (process.client && response._data instanceof Blob) {
          const contentDisposition = response.headers.get('content-disposition')
          let fileName = ''
  
          if (contentDisposition) {
            const match = contentDisposition.match(/filename="(.+?)"/)
            if (match && match[1]) fileName = match[1]
          }
  
          const blob = new Blob([response._data])
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          URL.revokeObjectURL(link.href)
        }
      },
  
      onRequestError({ error }) {
        if (import.meta.server) return
        if (error.name === 'AbortError') return
  
        const toast = useToast()
        toast.add({
          icon: 'i-lucide-alert-octagon',
          color: 'red',
          title: error.message ?? 'Something went wrong',
        })
      },
  
      onResponseError({ response }) {
        if (response.status === 401) {
          const toast = useToast()
          toast.add({
            title: 'Please log in to continue',
            icon: 'i-lucide-alert-octagon',
            color: 'red',
          })
          const auth = useAuthStore()
          auth.clearAuth()
        }
      }
    })
  
    return {
      provide: {
        api: $api,
      }
    }
})

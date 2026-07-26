import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    setAuth(user: any, token: string) {
      this.user = user
      this.token = token
    },
    clearAuth() {
      this.user = null
      this.token = null
    }
  },
  persist: true,
})

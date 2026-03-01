import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: false
  }),
  actions: {
    login() {
      this.loggedIn = true
    },
    logout() {
      this.loggedIn = false
    }
  }
})

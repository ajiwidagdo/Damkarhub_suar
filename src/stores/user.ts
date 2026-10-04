import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CitizenUser } from '../types'

export const useUserStore = defineStore('user', () => {
  const user = ref<CitizenUser | null>(null)

  function load() {
    try {
      const raw = localStorage.getItem('suar_user_data')
      user.value = raw ? (JSON.parse(raw) as CitizenUser) : null
    } catch { user.value = null }
  }

  function save(data: CitizenUser) {
    user.value = data
    localStorage.setItem('suar_user', '1')
    localStorage.setItem('suar_user_data', JSON.stringify(data))
  }

  function saveAnon() {
    save({ nama: 'Warga Anonim', whatsapp: '-', alamat: '-', anon: true })
  }

  function logout() {
    user.value = null
    localStorage.removeItem('suar_user')
    localStorage.removeItem('suar_user_data')
  }

  return { user, load, save, saveAnon, logout }
})

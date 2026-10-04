import { ref } from 'vue'

const isDark = ref(false)

export function useTheme() {
  function init() {
    const saved = localStorage.getItem('suar_theme')
    isDark.value = saved ? saved === 'dark' : false
    apply()
  }
  function apply() {
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem('suar_theme', isDark.value ? 'dark' : 'light')
    apply()
  }
  return { isDark, init, toggle }
}

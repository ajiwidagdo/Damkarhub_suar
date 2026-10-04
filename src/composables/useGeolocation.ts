import { ref } from 'vue'

// Mock geolocation — ganti navigator.geolocation saat production
export function useGeolocation() {
  const lat = ref(-6.914744)
  const lng = ref(107.60981)
  const alamat = ref('Jl. Melati No. 10, Sukajadi, Kota Bandung')
  const akurasi = ref('±3 meter')
  const loading = ref(false)

  function detect() {
    loading.value = true
    setTimeout(() => {
      // Simulasi GPS fix (jitter kecil biar terasa live)
      lat.value = -6.914744 + (Math.random() - 0.5) * 0.0004
      lng.value = 107.60981 + (Math.random() - 0.5) * 0.0004
      loading.value = false
    }, 900)
  }

  return { lat, lng, alamat, akurasi, loading, detect }
}

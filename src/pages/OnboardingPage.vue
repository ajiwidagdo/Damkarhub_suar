<template>
  <div class="flex min-h-screen flex-col bg-surface px-6 pb-8 pt-12">
    <div class="flex flex-1 flex-col items-center justify-center text-center">
      <div class="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-xl">
        <component :is="slides[i].icon" class="h-14 w-14 text-brand-500" />
      </div>
      <h2 class="mt-6 text-2xl font-extrabold">{{ slides[i].title }}</h2>
      <p class="mt-2 max-w-xs text-sm text-muted">{{ slides[i].desc }}</p>
    </div>

    <div class="flex items-center justify-center gap-2 pb-6">
      <span v-for="(_, d) in slides" :key="d" :class="['h-2 rounded-full transition-all', d === i ? 'w-8 bg-brand-600' : 'w-2 bg-line']" />
    </div>

    <Button size="lg" @click="next">
      {{ i < slides.length - 1 ? 'Lanjut' : 'Mulai' }} <ArrowRight />
    </Button>
    <button v-if="i < slides.length - 1" class="mt-3 py-2 text-sm font-semibold text-muted" @click="finish">Lewati</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Siren, MapPin, BellRing, ArrowRight } from '@lucide/vue'
import Button from '../components/ui/Button.vue'

const router = useRouter()
const i = ref(0)
const slides = [
  { icon: Siren, title: 'Lapor Darurat Sekali Tekan', desc: 'Kebakaran atau butuh penyelamatan? Tap tombol Lapor, bantuan langsung diteruskan.' },
  { icon: MapPin, title: 'Lokasi Otomatis Terdeteksi', desc: 'Izinkan akses lokasi agar petugas menemukan titik kejadian dengan akurat.' },
  { icon: BellRing, title: 'Pantau Status Laporan', desc: 'Dapat update saat laporan diterima dan petugas meluncur ke lokasi.' },
]

function next() {
  if (i.value < slides.length - 1) i.value++
  else finish()
}
function finish() {
  localStorage.setItem('suar_onboarded', '1')
  router.replace({ name: 'register' })
}
</script>

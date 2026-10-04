<template>
  <div class="px-4 pb-4 pt-4">
    <h2 class="text-lg font-extrabold">Pengaturan Profil</h2>

    <div class="mt-4 flex flex-col items-center">
      <span class="flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-2xl font-extrabold text-white">{{ initial }}</span>
      <button class="mt-2 rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold" @click="gantiFoto">Ganti Foto</button>
    </div>

    <div class="mt-4 space-y-4">
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Nama Lengkap</label>
        <Input v-model="form.nama" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Nomor WhatsApp</label>
        <Input v-model="form.whatsapp" inputmode="tel" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Alamat Rumah / Domisili</label>
        <Input v-model="form.alamat" />
      </div>
      <Card class="p-4">
        <p class="text-sm font-semibold">Lokasi GPS Saat Ini</p>
        <p class="mt-1 font-mono text-xs text-muted">{{ lat.toFixed(6) }}, {{ lng.toFixed(6) }}</p>
        <button class="mt-2 flex items-center gap-1.5 text-xs font-bold text-brand-600" @click="detect()">
          <LocateFixed class="h-4 w-4" /> Perbarui Lokasi GPS
        </button>
        <p class="mt-1 text-[11px] text-muted">Pastikan lokasi GPS aktif untuk respon yang lebih cepat</p>
      </Card>
    </div>

    <Button size="lg" class="mt-6" @click="simpan">Simpan Perubahan</Button>
    <button class="mt-3 w-full py-2 text-sm font-semibold text-brand-600" @click="keluar">Keluar / Ganti Akun</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { LocateFixed } from '@lucide/vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Card from '../components/ui/Card.vue'
import { useUserStore } from '../stores/user'
import { useGeolocation } from '../composables/useGeolocation'

const router = useRouter()
const users = useUserStore()
const { lat, lng, detect } = useGeolocation()
const form = reactive({ nama: '', whatsapp: '', alamat: '' })

onMounted(() => {
  users.load()
  if (users.user) Object.assign(form, { nama: users.user.nama, whatsapp: users.user.whatsapp, alamat: users.user.alamat })
  detect()
})

const initial = computed(() => (form.nama[0] ?? 'W').toUpperCase())

function gantiFoto() { alert('Ganti foto (mock)') }
function simpan() {
  users.save({ nama: form.nama, whatsapp: form.whatsapp, alamat: form.alamat, anon: users.user?.anon ?? false })
  router.push({ name: 'home' })
}
function keluar() {
  users.logout()
  localStorage.removeItem('suar_onboarded')
  router.replace({ name: 'splash' })
}
</script>

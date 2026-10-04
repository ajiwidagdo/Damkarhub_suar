<template>
  <div class="px-4 pb-6 pt-4">
    <div class="mb-4 flex items-center gap-3">
      <button class="flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-surface" @click="back" aria-label="Kembali">
        <ArrowLeft class="h-5 w-5" />
      </button>
      <h2 class="text-lg font-extrabold">Laporan Darurat</h2>
    </div>

    <Stepper :steps="['Lokasi', 'Foto', 'Kirim']" :current="step" class="mb-6 px-2" />

    <!-- STEP 1: Lokasi -->
    <div v-if="step === 0" class="space-y-4">
      <Card class="flex items-center gap-3 p-4">
        <Lock class="h-5 w-5 shrink-0 text-muted" />
        <div class="text-sm">
          <p class="font-bold">Data Pelapor (Otomatis)</p>
          <p class="text-muted">{{ user?.nama }} • {{ user?.whatsapp }}</p>
          <p class="font-mono text-xs text-muted">{{ lat.toFixed(6) }}, {{ lng.toFixed(6) }}</p>
        </div>
        <Badge variant="muted" class="ml-auto">Terkunci</Badge>
      </Card>

      <div>
        <p class="mb-2 text-sm font-bold">1. Presisikan Lokasi Kejadian</p>
        <div class="relative overflow-hidden rounded-2xl border border-line bg-navy-900" style="height: 260px">
          <div class="absolute inset-0 opacity-30" :style="gridBg" />
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <MapPin class="h-10 w-10 fill-brand-600 text-white drop-shadow-lg" />
          </div>
          <button class="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs font-bold shadow" @click="detect()">
            <Crosshair class="h-4 w-4 text-brand-600" /> {{ loading ? 'Mendeteksi…' : 'Presisikan Lokasi' }}
          </button>
        </div>
        <p class="mt-2 flex items-start gap-1.5 text-xs text-muted">
          <Info class="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Alamat terdeteksi: {{ alamat }} (akurasi {{ akurasi }})
        </p>
      </div>

      <div>
        <label class="mb-1.5 block text-sm font-semibold">Catatan (opsional)</label>
        <Input v-model="draft.catatan" placeholder="Contoh: api di lantai 2 ruko" />
      </div>
    </div>

    <!-- STEP 2: Foto -->
    <div v-if="step === 1" class="space-y-4">
      <p class="text-sm font-bold">2. Foto Situasi <span class="font-normal text-muted">(1 foto, opsional)</span></p>
      <div class="relative overflow-hidden rounded-2xl border border-line bg-navy-950" style="height: 320px">
        <img v-if="draft.foto" :src="draft.foto" class="h-full w-full object-cover" alt="Foto situasi" />
        <div v-else class="flex h-full flex-col items-center justify-center gap-2 text-white/50">
          <Camera class="h-12 w-12" />
          <p class="px-8 text-center text-xs">Ambil foto yang jelas untuk analisa petugas</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <Button @click="pickPhoto(true)"><Camera /> Ambil Foto</Button>
        <Button variant="outline" @click="pickPhoto(false)"><ImagePlus /> Galeri</Button>
      </div>
      <input ref="fileRef" type="file" accept="image/*" capture="environment" class="hidden" @change="onFile" />
      <p class="text-center text-xs text-muted">atau <button class="font-bold text-brand-600" @click="step = 2">lewati foto</button></p>
    </div>

    <!-- STEP 3: Konfirmasi -->
    <div v-if="step === 2" class="space-y-4">
      <div class="overflow-hidden rounded-2xl border border-line">
        <div class="flex h-40 items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
          <img v-if="draft.foto" :src="draft.foto" class="h-full w-full object-cover" alt="Foto" />
          <Flame v-else class="h-14 w-14 text-brand-500" />
        </div>
      </div>
      <Card class="divide-y divide-line p-4 text-sm">
        <div class="flex justify-between gap-4 py-2"><span class="text-muted">Jenis</span><span class="font-bold">{{ draft.type === 'kebakaran' ? 'Kebakaran' : 'Penyelamatan' }}</span></div>
        <div class="flex justify-between gap-4 py-2"><span class="text-muted">Nama</span><span class="font-bold">{{ user?.nama ?? '-' }}</span></div>
        <div class="flex justify-between gap-4 py-2"><span class="text-muted">WhatsApp</span><span class="font-bold">{{ user?.whatsapp ?? '-' }}</span></div>
        <div class="flex justify-between gap-4 py-2"><span class="text-muted">Lokasi</span><span class="text-right font-bold">{{ alamat }}</span></div>
        <div class="flex justify-between gap-4 py-2"><span class="text-muted">Koordinat</span><span class="font-mono text-xs font-bold">{{ lat.toFixed(6) }}, {{ lng.toFixed(6) }}</span></div>
      </Card>
      <p class="flex items-start gap-2 rounded-2xl bg-brand-600/5 p-3 text-xs text-muted">
        <Info class="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        Pastikan semua informasi sudah benar. Laporan akan langsung diteruskan ke petugas terdekat.
      </p>
    </div>

    <div class="mt-6">
      <Button v-if="step < 2" size="lg" @click="step++">Lanjutkan <ArrowRight /></Button>
      <Button v-else size="lg" @click="kirim"><Send /> Kirim Laporan Sekarang</Button>
    </div>
  </div>

  <!-- Hasil -->
  <Dialog v-model="done">
    <div class="flex flex-col items-center py-4 text-center">
      <span class="flex h-20 w-20 items-center justify-center rounded-full bg-ok-500/10">
        <Check class="h-10 w-10 text-ok-500" />
      </span>
      <h3 class="mt-4 text-xl font-extrabold">Laporan Terkirim!</h3>
      <p class="mt-1 text-sm text-muted">Tunggu petugas datang<br />dan segera evakuasi ke tempat yang aman.</p>
      <Button class="mt-6" @click="lihatStatus">Pantau Status</Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft, ArrowRight, Lock, MapPin, Crosshair, Info,
  Camera, ImagePlus, Flame, Send, Check,
} from '@lucide/vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Input from '../components/ui/Input.vue'
import Badge from '../components/ui/Badge.vue'
import Dialog from '../components/ui/Dialog.vue'
import Stepper from '../components/ui/Stepper.vue'
import { useReportStore } from '../stores/report'
import { useUserStore } from '../stores/user'
import { useGeolocation } from '../composables/useGeolocation'

const router = useRouter()
const reports = useReportStore()
const users = useUserStore()
const { lat, lng, alamat, akurasi, loading, detect } = useGeolocation()
const step = ref(0)
const done = ref(false)
const fileRef = ref<HTMLInputElement | null>(null)
const useCamera = ref(true)
const createdId = ref('')

const draft = reports.draft
const user = users.user

const gridBg = 'background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px); background-size: 32px 32px;'

onMounted(() => {
  users.load()
  if (!draft.type) router.replace({ name: 'home' })
  detect()
})

function back() {
  if (step.value > 0) step.value--
  else router.back()
}
function pickPhoto(camera: boolean) {
  useCamera.value = camera
  fileRef.value?.click()
}
function onFile(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = () => {
    draft.foto = String(reader.result)
    step.value = 2
  }
  reader.readAsDataURL(f)
}
function kirim() {
  const r = reports.submit(user?.nama ?? 'Warga Anonim', user?.whatsapp ?? '-')
  // sinkronkan lokasi mock ke laporan
  r.lat = lat.value; r.lng = lng.value; r.alamat = alamat.value
  createdId.value = r.id
  done.value = true
}
function lihatStatus() {
  done.value = false
  router.replace({ name: 'status', params: { id: createdId.value } })
}
</script>

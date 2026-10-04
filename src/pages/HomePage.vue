<template>
  <div class="px-4 pb-4 pt-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950">
          <Flame class="h-5 w-5 text-brand-500" />
        </div>
        <div>
          <p class="text-sm font-extrabold tracking-wide">DAMKARHUB</p>
          <p class="text-[10px] font-bold tracking-[.25em] text-brand-500">SUAR</p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button class="relative flex h-10 w-10 items-center justify-center rounded-2xl text-muted hover:bg-surface" aria-label="Notifikasi" @click="goRiwayat">
          <Bell class="h-5 w-5" />
          <span v-if="activeCount" class="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">{{ activeCount }}</span>
        </button>
        <button class="flex h-10 w-10 items-center justify-center rounded-2xl text-muted hover:bg-surface" aria-label="Profil" @click="$router.push('/profil')">
          <CircleUserRound class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Greeting card -->
    <button class="mt-4 flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left" @click="$router.push('/profil')">
      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-lg font-extrabold text-white">{{ initial }}</span>
      <span class="min-w-0 flex-1">
        <span class="block text-xs text-muted">Selamat Datang,</span>
        <span class="block truncate text-base font-extrabold">{{ userName }} <Badge v-if="!isAnon" variant="success" class="ml-1">Terverifikasi</Badge></span>
        <span class="block truncate text-xs text-muted">{{ userAddr }}</span>
      </span>
      <ChevronRight class="h-5 w-5 shrink-0 text-muted" />
    </button>

    <!-- 2 tombol besar -->
    <div class="mt-4 grid grid-cols-1 gap-3">
      <button class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-left text-white shadow-xl shadow-brand-600/30 active:scale-[.98]" @click="lapor('kebakaran')">
        <Flame class="absolute -right-4 -top-4 h-32 w-32 text-white/10" />
        <Badge class="bg-white/20 !text-white">Prioritas Pelayanan</Badge>
        <p class="mt-2 text-xl font-extrabold">LAPOR KEBAKARAN</p>
        <p class="mt-1 text-xs text-white/80">Panggilan darurat untuk respon cepat petugas pemadam terdekat.</p>
        <span class="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700">TEKAN DISINI <ArrowRight class="h-4 w-4" /></span>
      </button>
      <button class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rescue-400 to-rescue-500 p-5 text-left text-white shadow-xl shadow-rescue-500/30 active:scale-[.98]" @click="lapor('penyelamatan')">
        <PawPrint class="absolute -right-4 -top-4 h-32 w-32 text-white/15" />
        <p class="text-xl font-extrabold">LAPOR PENYELAMATAN</p>
        <p class="mt-1 text-xs text-white/85">Evakuasi hewan, sarang tawon, bencana alam, atau bantuan teknis.</p>
        <span class="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-rescue-500">TEKAN DISINI <ArrowRight class="h-4 w-4" /></span>
      </button>
    </div>

    <!-- Quick access -->
    <div class="mt-4 grid grid-cols-2 gap-3">
      <button class="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left active:scale-[.98]" @click="goRiwayat">
        <History class="h-6 w-6 text-brand-600" />
        <span><span class="block text-sm font-bold">Riwayat</span><span class="block text-xs text-muted">{{ activeCount }} Aktif</span></span>
      </button>
      <a href="tel:113" class="flex items-center gap-3 rounded-2xl border border-brand-600/30 bg-brand-600/5 p-4 text-left active:scale-[.98]">
        <PhoneCall class="h-6 w-6 text-brand-600" />
        <span><span class="block text-sm font-bold">Darurat 113</span><span class="block text-xs text-muted">Bebas pulsa</span></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Flame, Bell, CircleUserRound, ChevronRight, ArrowRight, PawPrint, History, PhoneCall } from '@lucide/vue'
import Badge from '../components/ui/Badge.vue'
import { useUserStore } from '../stores/user'
import { useReportStore } from '../stores/report'
import type { ReportType } from '../types'

const router = useRouter()
const users = useUserStore()
const reports = useReportStore()

onMounted(() => users.load())

const userName = computed(() => users.user?.nama ?? 'Warga')
const userAddr = computed(() => users.user?.alamat && users.user.alamat !== '-' ? users.user.alamat : 'Lokasi belum diatur')
const isAnon = computed(() => users.user?.anon ?? true)
const initial = computed(() => (userName.value[0] ?? 'W').toUpperCase())
const activeCount = computed(() => reports.reports.filter((r) => r.stage !== 'selesai').length)

function lapor(type: ReportType) {
  reports.resetDraft()
  reports.draft.type = type
  router.push({ name: 'lapor' })
}
function goRiwayat() {
  router.push({ name: 'riwayat' })
}
</script>

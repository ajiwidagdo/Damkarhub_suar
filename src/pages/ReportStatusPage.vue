<template>
  <div class="px-4 pb-6 pt-4">
    <div class="mb-4 flex items-center gap-3">
      <button class="flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-surface" @click="$router.push('/')" aria-label="Kembali">
        <ArrowLeft class="h-5 w-5" />
      </button>
      <h2 class="text-lg font-extrabold">Status Laporan</h2>
    </div>

    <div v-if="report">
      <Card class="p-4">
        <div class="flex items-center justify-between">
          <Badge :variant="report.type === 'kebakaran' ? 'default' : 'warning'">
            {{ report.type === 'kebakaran' ? 'Kebakaran' : 'Penyelamatan' }}
          </Badge>
          <span class="font-mono text-xs text-muted">{{ report.id.slice(-6).toUpperCase() }}</span>
        </div>
        <p class="mt-2 text-sm font-bold">{{ report.alamat }}</p>
        <p class="text-xs text-muted">{{ formatDate(report.createdAt) }}</p>
      </Card>

      <!-- Timeline -->
      <div class="mt-4 space-y-0">
        <div v-for="(s, i) in stages" :key="s.key" class="flex gap-3">
          <div class="flex flex-col items-center">
            <span :class="['flex h-9 w-9 items-center justify-center rounded-full', i <= currentIdx ? 'bg-brand-600 text-white' : 'bg-line text-muted']">
              <component :is="s.icon" class="h-4 w-4" />
            </span>
            <span v-if="i < stages.length - 1" :class="['w-0.5 flex-1', i < currentIdx ? 'bg-brand-600' : 'bg-line']" style="min-height: 24px" />
          </div>
          <div class="pb-6">
            <p :class="['text-sm font-bold', i <= currentIdx ? 'text-ink' : 'text-muted']">{{ s.label }}</p>
            <p class="text-xs text-muted">{{ s.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="report.rating" class="mt-2 flex items-center gap-2 rounded-2xl bg-rescue-400/10 p-3 text-sm">
        <Star class="h-5 w-5 fill-rescue-400 text-rescue-400" />
        <span class="font-bold">{{ report.rating }}/5</span>
        <span class="text-muted">— terima kasih atas penilaianmu!</span>
      </div>

      <div class="mt-4 space-y-3">
        <Button v-if="report.stage !== 'selesai'" variant="outline" size="sm" @click="simulate">
          <Zap /> Demo: majukan status
        </Button>
        <a href="tel:113">
          <Button variant="secondary"><PhoneCall /> Hubungi 113 (Bebas Pulsa)</Button>
        </a>
      </div>
    </div>
    <div v-else class="py-16 text-center text-muted">
      <p>Laporan tidak ditemukan.</p>
      <Button class="mt-4" @click="$router.push('/')">Ke Beranda</Button>
    </div>
  </div>

  <SurveySheet v-model="surveyOpen" @submit="onSurvey" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Send, CheckCheck, Truck, Flag, Star, Zap, PhoneCall } from '@lucide/vue'
import Button from '../components/ui/Button.vue'
import Card from '../components/ui/Card.vue'
import Badge from '../components/ui/Badge.vue'
import SurveySheet from '../components/survey/SurveySheet.vue'
import { useReportStore } from '../stores/report'

const route = useRoute()
const router = useRouter()
const reports = useReportStore()
const surveyOpen = ref(false)

const report = computed(() => reports.reports.find((r) => r.id === route.params.id))
const stages = [
  { key: 'dikirim', label: 'Dikirim', desc: 'Laporan diteruskan ke Komando', icon: Send },
  { key: 'diterima', label: 'Diterima', desc: 'Komando memverifikasi laporan', icon: CheckCheck },
  { key: 'petugas_jalan', label: 'Petugas Jalan', desc: 'Tim meluncur ke lokasi', icon: Truck },
  { key: 'selesai', label: 'Selesai', desc: 'Penanganan selesai', icon: Flag },
]
const currentIdx = computed(() => stages.findIndex((s) => s.key === report.value?.stage))

// Survey zero-cost: muncul sekali saat laporan selesai & belum dinilai
watch(() => report.value?.stage, (stage) => {
  if (stage === 'selesai' && report.value && !report.value.rating) {
    setTimeout(() => { surveyOpen.value = true }, 600)
  }
}, { immediate: true })

function simulate() {
  if (report.value) reports.advance(report.value.id)
}
function onSurvey(payload: { rating: number; ulasan: string }) {
  if (report.value) reports.rate(report.value.id, payload.rating, payload.ulasan)
  surveyOpen.value = false
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
void router
</script>

<template>
  <div class="px-4 pb-4 pt-4">
    <h2 class="text-lg font-extrabold">Riwayat Laporan</h2>
    <p class="text-sm text-muted">{{ reports.sorted.length }} laporan</p>

    <div v-if="reports.sorted.length" class="mt-4 space-y-3">
      <button
        v-for="r in reports.sorted"
        :key="r.id"
        class="w-full rounded-2xl border border-line bg-surface p-4 text-left active:scale-[.99]"
        @click="$router.push({ name: 'status', params: { id: r.id } })"
      >
        <div class="flex items-center justify-between">
          <Badge :variant="r.type === 'kebakaran' ? 'default' : 'warning'">
            {{ r.type === 'kebakaran' ? 'Kebakaran' : 'Penyelamatan' }}
          </Badge>
          <Badge :variant="r.stage === 'selesai' ? 'success' : 'muted'">{{ stageMeta[r.stage].label }}</Badge>
        </div>
        <p class="mt-2 truncate text-sm font-bold">{{ r.alamat }}</p>
        <div class="mt-1 flex items-center justify-between text-xs text-muted">
          <span>{{ formatDate(r.createdAt) }}</span>
          <span v-if="r.rating" class="flex items-center gap-1 font-bold text-rescue-500">
            <Star class="h-3.5 w-3.5 fill-rescue-400 text-rescue-400" /> {{ r.rating }}/5
          </span>
        </div>
      </button>
    </div>
    <div v-else class="flex flex-col items-center py-16 text-center text-muted">
      <History class="h-12 w-12 opacity-40" />
      <p class="mt-3 text-sm font-semibold">Belum ada laporan</p>
      <Button class="mt-4" @click="$router.push('/lapor')">Buat Laporan</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, History } from '@lucide/vue'
import Button from '../components/ui/Button.vue'
import Badge from '../components/ui/Badge.vue'
import { useReportStore } from '../stores/report'
import { stageMeta } from '../mocks/reports'

const reports = useReportStore()

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}
</script>

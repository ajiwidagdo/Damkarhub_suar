import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CitizenReport, ReportStage, ReportType } from '../types'
import { mockReports } from '../mocks/reports'

const STAGES: ReportStage[] = ['dikirim', 'diterima', 'petugas_jalan', 'selesai']

export const useReportStore = defineStore('report', () => {
  const reports = ref<CitizenReport[]>([...mockReports])
  const draft = ref<{ type: ReportType | null; lat: number; lng: number; alamat: string; foto: string; catatan: string }>({
    type: null, lat: 0, lng: 0, alamat: '', foto: '', catatan: '',
  })

  const sorted = computed(() => [...reports.value].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))

  function resetDraft() {
    draft.value = { type: null, lat: 0, lng: 0, alamat: '', foto: '', catatan: '' }
  }

  function submit(nama: string, whatsapp: string): CitizenReport {
    const r: CitizenReport = {
      id: `r${Date.now()}`,
      type: draft.value.type ?? 'kebakaran',
      nama, whatsapp,
      lat: draft.value.lat, lng: draft.value.lng, alamat: draft.value.alamat,
      foto: draft.value.foto || undefined,
      catatan: draft.value.catatan || undefined,
      stage: 'dikirim',
      createdAt: new Date().toISOString(),
    }
    reports.value.unshift(r)
    resetDraft()
    return r
  }

  function advance(id: string) {
    const r = reports.value.find((x) => x.id === id)
    if (!r) return
    const i = STAGES.indexOf(r.stage)
    if (i < STAGES.length - 1) r.stage = STAGES[i + 1]!
  }

  function rate(id: string, rating: number, ulasan: string) {
    const r = reports.value.find((x) => x.id === id)
    if (r) { r.rating = rating; r.ulasan = ulasan || undefined }
  }

  return { reports, draft, sorted, resetDraft, submit, advance, rate }
})

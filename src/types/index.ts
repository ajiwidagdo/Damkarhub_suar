export type ReportType = 'kebakaran' | 'penyelamatan'
export type ReportStage = 'dikirim' | 'diterima' | 'petugas_jalan' | 'selesai'

export interface CitizenReport {
  id: string
  type: ReportType
  nama: string
  whatsapp: string
  lat: number
  lng: number
  alamat: string
  foto?: string
  catatan?: string
  stage: ReportStage
  createdAt: string
  rating?: number
  ulasan?: string
}

export interface CitizenUser {
  nama: string
  whatsapp: string
  alamat: string
  anon: boolean
}

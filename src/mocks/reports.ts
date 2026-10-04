import type { CitizenReport } from '../types'

export const mockReports: CitizenReport[] = [
  {
    id: 'r-mock-1',
    type: 'kebakaran',
    nama: 'Budi Santoso',
    whatsapp: '0812 3456 7890',
    lat: -6.914744, lng: 107.60981,
    alamat: 'Jl. Melati No. 10, Sukajadi, Kota Bandung',
    stage: 'selesai',
    createdAt: '2026-09-28T10:15:00+07:00',
    rating: 5,
    ulasan: 'Petugas datang cepat, terima kasih!',
  },
  {
    id: 'r-mock-2',
    type: 'penyelamatan',
    nama: 'Budi Santoso',
    whatsapp: '0812 3456 7890',
    lat: -6.914744, lng: 107.60981,
    alamat: 'Jl. Melati No. 10, Sukajadi, Kota Bandung',
    catatan: 'Kucing terjebak di atap',
    stage: 'petugas_jalan',
    createdAt: '2026-10-03T08:20:00+07:00',
  },
]

export const stageMeta: Record<CitizenReport['stage'], { label: string; desc: string }> = {
  dikirim: { label: 'Dikirim', desc: 'Laporan diteruskan ke Komando' },
  diterima: { label: 'Diterima', desc: 'Komando memverifikasi laporan' },
  petugas_jalan: { label: 'Petugas Jalan', desc: 'Tim meluncur ke lokasi' },
  selesai: { label: 'Selesai', desc: 'Penanganan selesai' },
}

# DAMKARHUB SUAR

**Sarana Untuk Aduan Responder** — aplikasi warga untuk lapor darurat kebakaran & penyelamatan.

*"Sekali tekan, bantuan datang."*

## Stack

Vue 3.5 + Vite 7 + TS strict + Tailwind 4 + Vue Router 4 + Pinia + vite-plugin-pwa.
UI kit hand-made pola shadcn (mobile-optimized), icons `@lucide/vue`.

## Halaman (11)

1. Splash — branding navy + tagline
2. Onboarding — 3 slide
3. Register / Anonim — daftar atau lewati
4. Beranda — 2 tombol lapor besar + bottom nav (FAB Lapor)
5. Form Lapor — wizard 3 step (Lokasi → Foto → Konfirmasi)
6. Status Laporan — tracking timeline 4 tahap
7. Riwayat — list laporan + rating
8. Profil — edit data + GPS
9. Pengaturan — tema, notifikasi, darurat 113
10. Tentang — akronim, ekosistem, versi
11. 404

## Fitur

- **Survey zero-cost**: bottom-sheet rating (1–5 + ulasan) muncul saat laporan `selesai`; rating disimpan sebagai field di objek laporan — tanpa tabel/API baru.
- Mock data only (tanpa Supabase). Mock auth: daftar atau anonim.
- PWA: manifest + service worker (auto-update).
- Bundle: ~74 KB gzip (target <300 KB).

## Dev

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # vue-tsc + vite build
```

Mock flags di localStorage: `suar_onboarded`, `suar_user`, `suar_user_data`, `suar_theme`.

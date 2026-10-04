<template>
  <div class="flex min-h-screen flex-col items-center bg-surface px-6 pb-8 pt-10 text-center">
    <button class="self-start flex h-10 w-10 items-center justify-center rounded-2xl border border-line" @click="$router.back()" aria-label="Kembali">
      <ArrowLeft class="h-5 w-5" />
    </button>
    <Logo class="mt-6" show-tagline />
    <div class="mt-6 w-full space-y-3 text-left">
      <Card class="p-4">
        <p class="text-xs font-bold uppercase tracking-widest text-muted">Akronim</p>
        <p class="mt-1 text-sm font-bold">Sarana Untuk Aduan Responder</p>
      </Card>
      <Card class="p-4">
        <p class="text-xs font-bold uppercase tracking-widest text-muted">Fungsi</p>
        <p class="mt-1 text-sm text-muted">Laporkan kebakaran dan butuh penyelamatan langsung dari HP. Sekali tekan, bantuan datang.</p>
      </Card>
      <Card class="p-4">
        <p class="text-xs font-bold uppercase tracking-widest text-muted">Ekosistem</p>
        <p class="mt-1 text-sm text-muted">SUAR terhubung dengan <b>SATRIA</b> (petugas) dan <b>KOMANDO</b> (pusat kendali) dalam satu ekosistem <b>DAMKARHUB</b>.</p>
      </Card>
    </div>
    <p class="mt-auto pt-8 text-xs text-muted">DAMKARHUB SUAR v0.1.0<br />"Pantang Pulang Sebelum Api Padam"</p>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'
import Card from '../components/ui/Card.vue'
import Logo from '../components/brand/Logo.vue'
</script>

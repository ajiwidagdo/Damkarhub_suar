<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-surface px-8 text-center">
    <p class="text-7xl font-extrabold text-line">404</p>
    <p class="mt-2 text-lg font-bold">Halaman tidak ditemukan</p>
    <p class="mt-1 text-sm text-muted">Sepertinya kamu tersesat.</p>
    <Button class="mt-6" @click="$router.push('/')">Ke Beranda</Button>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/ui/Button.vue'
</script>

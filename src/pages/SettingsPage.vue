<template>
  <div class="px-4 pb-4 pt-4">
    <h2 class="text-lg font-extrabold">Pengaturan</h2>

    <Card class="mt-4 divide-y divide-line">
      <button class="flex w-full items-center justify-between p-4" @click="theme.toggle()">
        <span class="flex items-center gap-3"><Moon class="h-5 w-5 text-muted" /><span class="text-sm font-semibold">Mode Gelap</span></span>
        <span :class="['relative h-7 w-12 rounded-full transition-colors', theme.isDark.value ? 'bg-ok-500' : 'bg-line']">
          <span :class="['absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', theme.isDark.value ? 'left-6' : 'left-1']" />
        </span>
      </button>
      <button class="flex w-full items-center justify-between p-4" @click="notif = !notif">
        <span class="flex items-center gap-3"><Bell class="h-5 w-5 text-muted" /><span class="text-sm font-semibold">Notifikasi Status</span></span>
        <span :class="['relative h-7 w-12 rounded-full transition-colors', notif ? 'bg-ok-500' : 'bg-line']">
          <span :class="['absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', notif ? 'left-6' : 'left-1']" />
        </span>
      </button>
      <router-link to="/tentang" class="flex w-full items-center justify-between p-4">
        <span class="flex items-center gap-3"><Info class="h-5 w-5 text-muted" /><span class="text-sm font-semibold">Tentang SUAR</span></span>
        <ChevronRight class="h-5 w-5 text-muted" />
      </router-link>
    </Card>

    <Card class="mt-4 p-4">
      <p class="text-sm font-bold text-brand-600">Nomor Darurat</p>
      <a href="tel:113" class="mt-1 flex items-center justify-between">
        <span class="text-2xl font-extrabold">113</span>
        <span class="text-xs text-muted">Bebas pulsa • 24 jam</span>
      </a>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Bell, Info, ChevronRight } from '@lucide/vue'
import Card from '../components/ui/Card.vue'
import { useTheme } from '../composables/useTheme'

const theme = useTheme()
const notif = ref(true)
</script>

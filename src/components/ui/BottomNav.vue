<template>
  <nav class="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur">
    <div class="mx-auto grid max-w-md grid-cols-3 px-2 pb-2 pt-1">
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="relative flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold text-muted"
        active-class="!text-brand-600"
      >
        <span v-if="item.fab" class="absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl shadow-brand-600/40 ring-4 ring-background">
          <component :is="item.icon" class="h-6 w-6" />
        </span>
        <component :is="item.icon" v-else class="h-6 w-6" />
        <span :class="item.fab && 'mt-7'">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { House, Siren, History } from '@lucide/vue'

const items = [
  { to: '/', label: 'Beranda', icon: House },
  { to: '/lapor', label: 'Lapor', icon: Siren, fab: true },
  { to: '/riwayat', label: 'Riwayat', icon: History },
]
</script>

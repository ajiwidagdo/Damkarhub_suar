<template>
  <div class="flex flex-col items-center gap-3">
    <div :class="cn('flex items-center justify-center rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-xl', boxClass)">
      <Flame :class="cn('text-brand-500', iconClass)" />
    </div>
    <div v-if="showText" class="text-center">
      <p class="text-xl font-extrabold tracking-wide text-white">DAMKARHUB</p>
      <p class="text-sm font-bold tracking-[.3em] text-brand-500">SUAR</p>
      <p v-if="showTagline" class="mt-1 text-xs text-white/60">Sekali tekan, bantuan datang</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Flame } from '@lucide/vue'
import { cn } from '../../lib/utils'

withDefaults(defineProps<{
  showText?: boolean
  showTagline?: boolean
  boxClass?: string
  iconClass?: string
}>(), {
  showText: true,
  showTagline: false,
  boxClass: 'h-20 w-20',
  iconClass: 'h-10 w-10',
})
</script>

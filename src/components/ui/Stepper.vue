<template>
  <div class="flex items-center">
    <template v-for="(s, i) in steps" :key="s">
      <div class="flex flex-col items-center gap-1">
        <span :class="cn('flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold transition-colors', i < current ? 'bg-ok-500 text-white' : i === current ? 'bg-brand-600 text-white' : 'bg-line text-muted')">
          <Check v-if="i < current" class="h-4 w-4" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span :class="['text-[10px] font-semibold', i === current ? 'text-brand-600' : 'text-muted']">{{ s }}</span>
      </div>
      <div v-if="i < steps.length - 1" :class="['mx-1 mb-5 h-0.5 flex-1 rounded', i < current ? 'bg-ok-500' : 'bg-line']" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'
import { cn } from '../../lib/utils'

defineProps<{ steps: string[]; current: number }>()
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', variants[variant])">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'

withDefaults(defineProps<{ variant?: 'default' | 'success' | 'warning' | 'muted' }>(), { variant: 'default' })

const variants: Record<string, string> = {
  default: 'bg-brand-600/10 text-brand-600',
  success: 'bg-ok-500/10 text-ok-500',
  warning: 'bg-rescue-500/15 text-rescue-500',
  muted: 'bg-muted/15 text-muted',
}
</script>

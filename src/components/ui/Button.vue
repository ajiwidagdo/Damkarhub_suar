<template>
  <button
    :class="cn(base, variants[variant], sizes[size], $attrs.class as string)"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'danger-outline'
  size?: 'lg' | 'default' | 'sm'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { variant: 'default', size: 'default', disabled: false })

const base = 'inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-bold transition-all active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5'
const variants: Record<string, string> = {
  default: 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-500',
  secondary: 'bg-navy-900 text-white shadow-lg shadow-navy-900/30 hover:bg-navy-800',
  outline: 'border-2 border-line bg-surface text-ink hover:border-brand-600',
  ghost: 'text-brand-600 hover:bg-brand-600/10',
  'danger-outline': 'border-2 border-brand-600/30 bg-surface text-brand-600',
}
const sizes: Record<string, string> = {
  lg: 'h-14 px-6 text-base',
  default: 'h-12 px-5 text-sm',
  sm: 'h-10 px-4 text-sm',
}
</script>

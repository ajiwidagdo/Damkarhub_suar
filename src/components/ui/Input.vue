<template>
  <input
    :value="modelValue"
    :class="cn('flex h-13 w-full rounded-2xl border border-line bg-background px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-brand-600 focus:outline-none', $attrs.class as string)"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'

defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

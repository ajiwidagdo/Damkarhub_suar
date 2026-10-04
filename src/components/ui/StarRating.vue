<template>
  <div class="flex items-center justify-center gap-2">
    <button
      v-for="n in 5"
      :key="n"
      :aria-label="`Beri ${n} bintang`"
      class="transition-transform active:scale-125"
      @click="$emit('update:modelValue', n)"
    >
      <Star :class="['h-10 w-10 transition-colors', n <= modelValue ? 'fill-rescue-400 text-rescue-400' : 'text-line']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Star } from '@lucide/vue'

defineProps<{ modelValue: number }>()
defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

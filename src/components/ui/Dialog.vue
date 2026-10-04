<template>
  <Teleport to="body">
    <Transition name="dlg">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-end justify-center sm:items-center" @click.self="$emit('update:modelValue', false)">
        <div class="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px]" />
        <div :class="cn('relative w-full max-w-md rounded-t-3xl bg-surface p-5 pb-safe shadow-2xl sm:rounded-3xl sm:m-4', $attrs.class as string)">
          <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-line sm:hidden" />
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'

defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<style scoped>
.dlg-enter-active, .dlg-leave-active { transition: all .28s ease; }
.dlg-enter-from, .dlg-leave-to { opacity: 0; }
.dlg-enter-from > div:last-child, .dlg-leave-to > div:last-child { transform: translateY(40px); }
</style>

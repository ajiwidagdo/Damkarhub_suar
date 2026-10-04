<template>
  <div :class="cn('rounded-2xl border border-line bg-surface', $attrs.class as string)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../lib/utils'
</script>

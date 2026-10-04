<template>
  <div class="mx-auto flex min-h-full w-full max-w-md flex-col pb-28">
    <slot />
  </div>
  <BottomNav />
</template>

<script setup lang="ts">
import BottomNav from '../components/ui/BottomNav.vue'
</script>

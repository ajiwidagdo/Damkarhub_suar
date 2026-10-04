<template>
  <BlankLayout v-if="$route.meta.blank"><router-view /></BlankLayout>
  <AppLayout v-else><router-view /></AppLayout>
</template>

<script setup lang="ts">
import BlankLayout from './BlankLayout.vue'
import AppLayout from './AppLayout.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-navy-800 via-navy-900 to-navy-950 px-8">
    <Logo show-tagline />
    <div class="mt-10 h-1 w-24 overflow-hidden rounded-full bg-white/10">
      <div class="h-full w-1/2 animate-pulse rounded-full bg-brand-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '../components/brand/Logo.vue'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    const onboarded = localStorage.getItem('suar_onboarded') === '1'
    const hasUser = localStorage.getItem('suar_user') === '1'
    if (!onboarded) router.replace({ name: 'onboarding' })
    else if (!hasUser) router.replace({ name: 'register' })
    else router.replace({ name: 'home' })
  }, 1800)
})
</script>

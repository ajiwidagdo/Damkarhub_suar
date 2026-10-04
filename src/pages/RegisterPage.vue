<template>
  <div class="flex min-h-screen flex-col bg-surface px-6 pb-8 pt-10">
    <Logo :show-text="false" box-class="h-16 w-16" icon-class="h-8 w-8" />
    <h2 class="mt-4 text-2xl font-extrabold">Daftar Akun</h2>
    <p class="text-sm text-muted">Satu langkah untuk keselamatan bersama.</p>

    <div class="mt-6 space-y-4">
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Nama Lengkap</label>
        <Input v-model="nama" placeholder="Contoh: Budi Santoso" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Nomor WhatsApp Aktif</label>
        <Input v-model="wa" placeholder="Contoh: 0812 3456 7890" inputmode="tel" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-semibold">Alamat Rumah / Domisili</label>
        <Input v-model="alamat" placeholder="Contoh: Jl. Melati No. 10" />
      </div>
    </div>

    <div class="mt-8 space-y-3">
      <Button size="lg" :disabled="!valid" @click="submit">Lanjutkan <ArrowRight /></Button>
      <Button size="lg" variant="outline" @click="anon">Lapor Tanpa Akun</Button>
    </div>
    <p class="mt-4 text-center text-xs text-muted">Data ini hanya digunakan untuk layanan darurat<br />dan akan dijaga kerahasiaannya.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@lucide/vue'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Logo from '../components/brand/Logo.vue'
import { useUserStore } from '../stores/user'

const router = useRouter()
const users = useUserStore()
const nama = ref('')
const wa = ref('')
const alamat = ref('')

const valid = computed(() => nama.value.trim().length >= 3 && wa.value.trim().length >= 9)

function submit() {
  users.save({ nama: nama.value.trim(), whatsapp: wa.value.trim(), alamat: alamat.value.trim(), anon: false })
  router.replace({ name: 'home' })
}
function anon() {
  users.saveAnon()
  router.replace({ name: 'home' })
}
</script>

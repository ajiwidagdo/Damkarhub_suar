<template>
  <Dialog v-model="open">
    <div class="flex flex-col items-center py-2 text-center">
      <span class="flex h-16 w-16 items-center justify-center rounded-full bg-rescue-400/15">
        <Star class="h-8 w-8 fill-rescue-400 text-rescue-400" />
      </span>
      <h3 class="mt-3 text-lg font-extrabold">Beri Penilaian</h3>
      <p class="mt-1 text-sm text-muted">Bagaimana kecepatan respon petugas?</p>
      <StarRating v-model="rating" class="mt-4" />
      <textarea
        v-model="ulasan"
        rows="2"
        placeholder="Ceritakan pengalamanmu (opsional)"
        class="mt-4 w-full rounded-2xl border border-line bg-background p-3 text-sm outline-none placeholder:text-muted focus:border-brand-600"
      />
      <Button class="mt-4" size="lg" :disabled="rating === 0" @click="submit">Kirim Penilaian</Button>
      <button class="mt-2 py-2 text-sm font-semibold text-muted" @click="open = false">Nanti saja</button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Star } from '@lucide/vue'
import Dialog from '../ui/Dialog.vue'
import Button from '../ui/Button.vue'
import StarRating from '../ui/StarRating.vue'

const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ submit: [{ rating: number; ulasan: string }] }>()

const rating = ref(0)
const ulasan = ref('')

function submit() {
  emit('submit', { rating: rating.value, ulasan: ulasan.value.trim() })
  rating.value = 0
  ulasan.value = ''
}
</script>

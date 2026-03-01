<template>
  <div class="gradient-card" :class="`gradient-card--${variant}`">
    <div class="q-mb-sm" style="opacity: 0.85;">
      <q-icon :name="icon" size="24px" class="q-mr-xs" />
      {{ label }}
    </div>
    <div class="stat-number">
      {{ formatNumber(value) }}
      <span style="font-size: 1rem; font-weight: 400;">د.أ</span>
    </div>
    <div v-if="subtitle" class="q-mt-sm" style="opacity: 0.7; font-size: 0.8rem;">
      {{ subtitle }}
    </div>
    <div v-if="linkTo" class="q-mt-md">
      <router-link :to="linkTo" class="text-white" style="opacity: 0.85; text-decoration: none; font-size: 0.85rem;">
        للمزيد من التفاصيل ←
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: { type: Number, default: 0 },
  icon: String,
  variant: { type: String, default: 'balance' },
  subtitle: String,
  linkTo: String
})

function formatNumber(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

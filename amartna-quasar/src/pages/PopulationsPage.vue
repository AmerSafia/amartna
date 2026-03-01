<template>
  <q-page class="q-pa-md">
    <div class="page-title">سكان العمارة</div>

    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="bento-grid">
      <div v-for="item in population" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem;">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem;">
              0{{ item.phone }}
            </div>
          </div>
          <q-badge
            color="warning"
            text-color="dark"
            class="text-weight-bold q-pa-sm"
            style="border-radius: 10px;"
          >
            شقة {{ item.numApartment }}
          </q-badge>
        </div>
        <div v-if="item.description" class="text-grey-5" style="font-size: 0.9rem;">
          {{ item.description }}
        </div>
      </div>
    </div>

    <div v-if="!loading && population.length === 0" class="text-center q-pa-xl text-grey-6">
      لا يوجد سكان
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'

const { fetch, loading } = useSanity()
const population = ref([])

onMounted(async () => {
  population.value = await fetch('*[_type=="population"] | order(numApartment asc)')
})
</script>

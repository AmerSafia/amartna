<template>
  <q-page class="q-pa-md">
    <div class="page-title">مصاريف</div>

    <div class="filter-bar row q-gutter-sm items-center">
      <q-input
        v-model="search"
        dark
        dense
        outlined
        placeholder="بحث بالاسم..."
        class="col-grow"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="search" color="grey-5" />
        </template>
      </q-input>
      <q-input
        v-model="dateFrom"
        dark
        dense
        outlined
        readonly
        label="من تاريخ"
        class="col"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="event" color="grey-5" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateFrom" mask="YYYY-MM-DD" dark color="primary">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="اختيار"
                    color="primary"
                    flat
                    no-caps
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="dateTo"
        dark
        dense
        outlined
        readonly
        label="إلى تاريخ"
        class="col"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="event" color="grey-5" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateTo" mask="YYYY-MM-DD" dark color="primary">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="اختيار"
                    color="primary"
                    flat
                    no-caps
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="bento-grid">
      <div v-for="item in filteredExpenses" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem">
              {{ date.formatDate(item._createdAt, "YYYY-MM-DD") }}
            </div>
          </div>
          <span class="amount-chip amount-chip--negative">
            {{ item.amount }} د.أ
          </span>
        </div>
        <div
          v-if="item.description"
          class="text-grey-5"
          style="font-size: 0.9rem"
        >
          {{ item.description }}
        </div>
      </div>
    </div>

    <div
      v-if="!loading && filteredExpenses.length === 0"
      class="text-center q-pa-xl text-grey-6"
    >
      لا توجد مصاريف
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useSanity } from "../composables/useSanity";
import { date } from "quasar";

const { fetch, loading } = useSanity();

const expenses = ref([]);
const search = ref("");
const dateFrom = ref("");
const dateTo = ref("");

const filteredExpenses = computed(() => {
  let result = expenses.value;

  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter((e) => e.name?.toLowerCase().includes(q));
  }

  if (dateFrom.value) {
    const from = new Date(dateFrom.value);
    result = result.filter((e) => new Date(e._createdAt) >= from);
  }

  if (dateTo.value) {
    const to = new Date(dateTo.value);
    to.setHours(23, 59, 59);
    result = result.filter((e) => new Date(e._createdAt) <= to);
  }

  return result;
});

onMounted(async () => {
  expenses.value = await fetch('*[_type=="expense"] | order(_createdAt desc)');
});
</script>

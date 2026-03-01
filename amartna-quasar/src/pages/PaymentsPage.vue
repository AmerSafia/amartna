<template>
  <q-page class="q-pa-md">
    <div class="page-title">الدفعات</div>

    <div class="filter-bar row q-gutter-sm items-center">
      <q-select
        v-model="filterBy"
        :options="filterOptions"
        option-label="name"
        option-value="value"
        emit-value
        map-options
        dark
        dense
        outlined
        label="تصفية بواسطة"
        class="col-auto"
        style="min-width: 150px"
      />

      <q-select
        v-if="filterBy === 'name'"
        v-model="filteredByName"
        :options="nameOptions"
        dark
        dense
        outlined
        label="اختر الاسم"
        class="col-auto"
        style="min-width: 180px"
        clearable
      />

      <q-input
        v-if="filterBy === 'month'"
        v-model="selectedMonth"
        dark
        dense
        outlined
        readonly
        clearable
        label="اختر الشهر"
        class="col-auto"
        style="min-width: 180px"
      >
        <template v-slot:prepend>
          <q-icon name="event" color="grey-5" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date
                v-model="selectedMonth"
                emit-immediately
                default-view="Months"
                mask="YYYY-MM"
                dark
                color="primary"
                years-in-month-view
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="اختيار" color="primary" flat no-caps />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-btn
        v-if="filterBy"
        color="primary"
        label="بحث"
        no-caps
        unelevated
        class="q-px-lg"
        style="border-radius: 12px"
        @click="applyFilter"
      />

      <q-btn
        flat
        color="grey-5"
        label="إعادة تعيين"
        no-caps
        @click="resetFilter"
      />
    </div>

    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <div v-else class="bento-grid">
      <div v-for="item in payments" :key="item._id" class="data-card">
        <div class="row justify-between items-start q-mb-sm">
          <div>
            <div class="text-weight-bold text-grey-2" style="font-size: 1.1rem">
              {{ item.name }}
            </div>
            <div class="text-grey-6" style="font-size: 0.8rem">
              {{ date.formatDate(item._createdAt, "YYYY-MM-DD") }}
            </div>
          </div>
          <span class="amount-chip amount-chip--positive">
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
      v-if="!loading && payments.length === 0"
      class="text-center q-pa-xl text-grey-6"
    >
      لا توجد دفعات
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSanity } from "../composables/useSanity";
import { date } from "quasar";
const { fetch, loading } = useSanity();

const payments = ref([]);
const allPayments = ref([]);
const nameOptions = ref([]);
const filterBy = ref("month");
const filteredByName = ref("");
const selectedMonth = ref(new Date().toISOString().substr(0, 7));

const filterOptions = [
  { name: "الشهر", value: "month" },
  { name: "الاسم", value: "name" },
];

async function loadPayments() {
  const data = await fetch('*[_type=="payment"] | order(_createdAt desc)');
  allPayments.value = data;
  payments.value = data;
  nameOptions.value = [...new Set(data.map((p) => p.name))].filter(Boolean);
}

async function filterByName() {
  if (!filteredByName.value) {
    payments.value = allPayments.value;
    return;
  }
  payments.value = await fetch(
    '*[_type=="payment" && name == $name] | order(_createdAt desc)',
    { name: filteredByName.value },
  );
}

async function filterByMonth() {
  if (!selectedMonth.value) return;
  const firstDay = new Date(selectedMonth.value + "-01").toISOString();
  const year = new Date(selectedMonth.value).getFullYear();
  const month = new Date(selectedMonth.value).getMonth() + 1;
  const lastDay = new Date(year, month, 1).toISOString();

  payments.value = await fetch(
    '*[_type=="payment" && dateTime(_createdAt) >= dateTime($from) && dateTime(_createdAt) <= dateTime($to)] | order(_createdAt desc)',
    { from: firstDay, to: lastDay },
  );
}

function applyFilter() {
  if (filterBy.value === "name") filterByName();
  else filterByMonth();
}

function resetFilter() {
  filteredByName.value = "";
  selectedMonth.value = new Date().toISOString().substr(0, 7);
  payments.value = allPayments.value;
}

onMounted(loadPayments);
</script>

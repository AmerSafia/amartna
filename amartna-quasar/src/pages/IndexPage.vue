<template>
  <q-page class="q-pa-md">
    <div class="page-title">لوحة التحكم</div>

    <div class="bento-grid">
      <div class="bento-card--large">
        <StatsCard
          label="المبلغ المتبقي"
          :value="totalPayments - totalExpenses"
          icon="fa-solid fa-filter-circle-dollar"
          variant="balance"
          :subtitle="'حتى تاريخ ' + date"
        />
      </div>

      <div>
        <StatsCard
          label="مجموع المدفوعات"
          :value="totalPayments"
          icon="fa-solid fa-coins"
          variant="payments"
          link-to="/payments"
          :subtitle="'حتى تاريخ ' + date"
        />
      </div>

      <div>
        <StatsCard
          label="مجموع المصاريف"
          :value="totalExpenses"
          icon="fas fa-chart-bar"
          variant="expenses"
          link-to="/expenses"
          :subtitle="'حتى تاريخ ' + date"
        />
      </div>

      <div>
        <StatsCard
          label="عدد الدفعات"
          :value="paymentsCount"
          icon="mdi-counter"
          variant="payments"
        />
      </div>

      <div class="bento-card bento-card--full">
        <div class="text-grey-5 q-mb-md text-weight-medium">آخر النشاطات</div>
        <q-list dark separator>
          <q-item v-for="item in recentActivity" :key="item._id" class="q-px-none">
            <q-item-section avatar>
              <q-icon
                :name="item._type === 'payment' ? 'fa-solid fa-coins' : 'mdi-cash-register'"
                :color="item._type === 'payment' ? 'positive' : 'warning'"
                size="20px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-grey-3">{{ item.name }}</q-item-label>
              <q-item-label caption class="text-grey-6">
                {{ item._type === 'payment' ? 'دفعة' : 'مصروف' }}
                -
                {{ formatDate(item._createdAt) }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <span :class="item._type === 'payment' ? 'amount-chip amount-chip--positive' : 'amount-chip amount-chip--negative'">
                {{ item.amount }} د.أ
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSanity } from '../composables/useSanity'
import StatsCard from '../components/StatsCard.vue'

const { fetch } = useSanity()

const totalPayments = ref(0)
const totalExpenses = ref(0)
const paymentsCount = ref(0)
const recentActivity = ref([])
const date = new Date().toLocaleDateString('ar')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar')
}

onMounted(async () => {
  const [payments, expenses] = await Promise.all([
    fetch('*[_type=="payment"]'),
    fetch('*[_type=="expense"]')
  ])

  totalPayments.value = payments.reduce((sum, p) => sum + p.amount, 0)
  totalExpenses.value = expenses.reduce((sum, e) => sum + e.amount, 0)
  paymentsCount.value = payments.length

  const combined = [...payments, ...expenses]
    .sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt))
    .slice(0, 10)
  recentActivity.value = combined
})
</script>

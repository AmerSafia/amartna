<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة الصرف</div>

    <q-btn color="primary" label="اضافة صرف" no-caps unelevated style="border-radius: 12px;" @click="openDialog()" />

    <CrudTable
      :data="expenses"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card dark style="min-width: 500px; background: #1A2332; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6">{{ expense._id ? 'تعديل صرف' : 'اضافة صرف' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="expense.name" dark outlined label="اسم الصرف" :rules="[val => !!val || 'مطلوب']" />
          <q-input v-model="expense.date" dark outlined type="date" label="تاريخ الصرف" />
          <q-input v-model.number="expense.amount" dark outlined type="number" label="المبلغ" :rules="[val => val > 0 || 'مطلوب']" />
          <q-input v-model="expense.description" dark outlined type="textarea" label="التفاصيل" />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn flat label="اغلاق" color="grey-5" no-caps @click="dialog = false" />
          <q-btn unelevated label="حفظ" color="primary" no-caps style="border-radius: 12px;" @click="saveExpense" :loading="saving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'
import CrudTable from '../components/CrudTable.vue'

const $q = useQuasar()
const { fetch, create, createOrReplace } = useSanity()

const expenses = ref([])
const expense = ref({})
const dialog = ref(false)
const saving = ref(false)

const columns = [
  { name: 'name', label: 'الاسم', field: 'name', align: 'right' },
  { name: 'date', label: 'التاريخ', field: 'date', align: 'right' },
  { name: 'amount', label: 'المبلغ', field: 'amount', align: 'right' },
  { name: 'description', label: 'التفاصيل', field: 'description', align: 'right' },
  { name: 'actions', label: '', field: 'actions', align: 'center' }
]

function openDialog(item = null) {
  expense.value = item ? { ...item } : {
    date: new Date().toISOString().substr(0, 10)
  }
  dialog.value = true
}

async function saveExpense() {
  if (!expense.value.name || !expense.value.amount) return
  saving.value = true
  try {
    if (expense.value._id) {
      const row = { _type: 'expense', ...expense.value }
      await createOrReplace(row)
      const idx = expenses.value.findIndex(e => e._id === expense.value._id)
      if (idx !== -1) expenses.value[idx] = { ...expense.value }
    } else {
      const created = await create('expense', expense.value)
      expenses.value.unshift({ ...expense.value, _id: created._id })
    }
    dialog.value = false
    $q.notify({ type: 'positive', message: 'تم الحفظ بنجاح' })
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحفظ' })
  } finally {
    saving.value = false
  }
}

function onDeleted(id) {
  expenses.value = expenses.value.filter(e => e._id !== id)
}

onMounted(async () => {
  expenses.value = await fetch('*[_type=="expense"] | order(_createdAt desc)')
})
</script>

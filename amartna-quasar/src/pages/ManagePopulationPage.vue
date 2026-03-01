<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة السكان</div>

    <q-btn color="primary" label="اضافة ساكن" no-caps unelevated style="border-radius: 12px;" @click="openDialog()" />

    <CrudTable
      :data="population"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card dark style="min-width: 500px; background: #1A2332; border-radius: 16px;">
        <q-card-section>
          <div class="text-h6">{{ entity._id ? 'تعديل ساكن' : 'اضافة ساكن' }}</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="entity.name" dark outlined label="الاسم" :rules="[val => !!val || 'مطلوب']" />
          <q-input v-model.number="entity.numApartment" dark outlined type="number" label="رقم الشقة" :rules="[val => val > 0 || 'مطلوب']" />
          <q-input v-model.number="entity.phone" dark outlined type="number" label="رقم الهاتف" />
          <q-input v-model="entity.description" dark outlined type="textarea" label="التفاصيل" />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn flat label="اغلاق" color="grey-5" no-caps @click="dialog = false" />
          <q-btn unelevated label="حفظ" color="primary" no-caps style="border-radius: 12px;" @click="saveEntity" :loading="saving" />
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

const population = ref([])
const entity = ref({})
const dialog = ref(false)
const saving = ref(false)

const columns = [
  { name: 'name', label: 'الاسم', field: 'name', align: 'right' },
  { name: 'numApartment', label: 'رقم الشقة', field: 'numApartment', align: 'right', sortable: true },
  { name: 'phone', label: 'رقم الهاتف', field: 'phone', align: 'right' },
  { name: 'description', label: 'التفاصيل', field: 'description', align: 'right' },
  { name: 'actions', label: '', field: 'actions', align: 'center' }
]

function openDialog(item = null) {
  entity.value = item ? { ...item } : {}
  dialog.value = true
}

async function saveEntity() {
  if (!entity.value.name || !entity.value.numApartment) return
  saving.value = true
  try {
    if (entity.value._id) {
      const row = { _type: 'population', ...entity.value }
      await createOrReplace(row)
      const idx = population.value.findIndex(p => p._id === entity.value._id)
      if (idx !== -1) population.value[idx] = { ...entity.value }
    } else {
      const created = await create('population', entity.value)
      population.value.push({ ...entity.value, _id: created._id })
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
  population.value = population.value.filter(p => p._id !== id)
}

onMounted(async () => {
  population.value = await fetch('*[_type=="population"] | order(numApartment asc)')
})
</script>

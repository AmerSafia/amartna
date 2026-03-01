<template>
  <q-table
    :rows="data"
    :columns="columns"
    row-key="_id"
    dark
    flat
    :filter="filter"
    class="q-mt-md"
    style="background: #1A2332; border-radius: 16px;"
  >
    <template v-slot:top>
      <q-input v-model="filter" dark dense outlined placeholder="بحث..." class="col-4">
        <template v-slot:prepend>
          <q-icon name="search" color="grey-5" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat round dense icon="edit" color="primary" @click="$emit('handleEdit', props.row)" />
        <q-btn flat round dense icon="delete" color="negative" @click="confirmDelete(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useSanity } from '../composables/useSanity'

defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true }
})

const emit = defineEmits(['handleEdit', 'deleted'])

const $q = useQuasar()
const { remove } = useSanity()
const filter = ref('')

function confirmDelete(row) {
  $q.dialog({
    title: 'تأكيد الحذف',
    message: 'هل أنت متأكد من حذف هذا العنصر؟',
    cancel: { label: 'إلغاء', flat: true },
    ok: { label: 'حذف', color: 'negative' },
    dark: true
  }).onOk(async () => {
    try {
      await remove(row._id)
      emit('deleted', row._id)
      $q.notify({ type: 'positive', message: 'تم الحذف بنجاح' })
    } catch {
      $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحذف' })
    }
  })
}
</script>

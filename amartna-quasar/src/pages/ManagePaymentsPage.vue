<template>
  <q-page class="q-pa-md">
    <div class="page-title">ادارة الدفعات</div>

    <q-btn
      color="primary"
      label="اضافة دفعة"
      no-caps
      unelevated
      style="border-radius: 12px"
      @click="openDialog()"
    />

    <CrudTable
      :data="payments"
      :columns="columns"
      @handle-edit="openDialog"
      @deleted="onDeleted"
    />

    <q-dialog v-model="dialog" persistent>
      <q-card
        dark
        :style="{
          background: '#1A2332',
          borderRadius: '16px',
          maxWidth: $q.screen.lt.md ? '90%' : '500px',
          width: '100%',
        }"
      >
        <q-card-section>
          <div class="text-h6">
            {{ payment._id ? "تعديل دفعة" : "اضافة دفعة" }}
          </div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-select
            v-model="payment.name"
            :options="populationNames"
            dark
            outlined
            label="اختر الاسم"
            @update:model-value="onNameSelected"
          />
          <q-input
            v-model.number="payment.numApartment"
            dark
            outlined
            type="number"
            label="رقم الشقة"
            readonly
          />
          <q-input
            v-model="payment.date"
            dark
            outlined
            type="date"
            label="تاريخ الدفعة"
          />
          <q-input
            v-model.number="payment.amount"
            dark
            outlined
            type="number"
            label="المبلغ"
            :rules="[(val) => val > 0 || 'مطلوب']"
          />
          <q-input
            v-model="payment.description"
            dark
            outlined
            type="textarea"
            label="التفاصيل"
          />
        </q-card-section>

        <q-card-actions align="left" class="q-pa-md">
          <q-btn
            flat
            label="اغلاق"
            color="grey-5"
            no-caps
            @click="dialog = false"
          />
          <q-btn
            unelevated
            label="حفظ"
            color="primary"
            no-caps
            style="border-radius: 12px"
            @click="savePayment"
            :loading="saving"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useSanity } from "../composables/useSanity";
import CrudTable from "../components/CrudTable.vue";

const $q = useQuasar();
const { fetch, create, createOrReplace } = useSanity();

const payments = ref([]);
const population = ref([]);
const populationNames = ref([]);
const payment = ref({});
const dialog = ref(false);
const saving = ref(false);

const columns = [
  { name: "name", label: "الاسم", field: "name", align: "right" },
  { name: "date", label: "التاريخ", field: "date", align: "right" },
  {
    name: "numApartment",
    label: "رقم الشقة",
    field: "numApartment",
    align: "right",
  },
  { name: "amount", label: "المبلغ", field: "amount", align: "right" },
  {
    name: "description",
    label: "التفاصيل",
    field: "description",
    align: "right",
  },
  { name: "actions", label: "", field: "actions", align: "center" },
];

function openDialog(item = null) {
  payment.value = item
    ? { ...item }
    : {
        date: new Date().toISOString().substr(0, 10),
        numApartment: 0,
      };
  dialog.value = true;
}

function onNameSelected(name) {
  const resident = population.value.find((p) => p.name === name);
  if (resident) payment.value.numApartment = resident.numApartment;
}

async function savePayment() {
  if (!payment.value.name || !payment.value.amount) return;
  saving.value = true;
  try {
    if (payment.value._id) {
      const row = { _type: "payment", ...payment.value };
      await createOrReplace(row);
      const idx = payments.value.findIndex((p) => p._id === payment.value._id);
      if (idx !== -1) payments.value[idx] = { ...payment.value };
    } else {
      const created = await create("payment", payment.value);
      payments.value.unshift({ ...payment.value, _id: created._id });
    }
    dialog.value = false;
    $q.notify({ type: "positive", message: "تم الحفظ بنجاح" });
  } catch {
    $q.notify({ type: "negative", message: "حدث خطأ أثناء الحفظ" });
  } finally {
    saving.value = false;
  }
}

function onDeleted(id) {
  payments.value = payments.value.filter((p) => p._id !== id);
}

onMounted(async () => {
  const [paymentsData, populationData] = await Promise.all([
    fetch('*[_type=="payment"] | order(_createdAt desc)'),
    fetch('*[_type=="population"]'),
  ]);
  payments.value = paymentsData;
  population.value = populationData;
  populationNames.value = populationData.map((p) => p.name);
});
</script>

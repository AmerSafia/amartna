<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">ادارة الدفعات</h1>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="payment = {}"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          اضافة دفعة
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">اضافة دفعة</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="text"
                  label="الاسم"
                  v-model="payment.name"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex md6 class="pr-1">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="payment.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="payment.date"
                      label=" تاريخ الدفعة"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      name="date"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="payment.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(payment.date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="number"
                  label="رقم الشقة"
                  v-model.number="payment.numApartment"
                  name="الاسم"
                ></v-text-field>
              </v-flex>

              <v-flex md6 class="pr-1">
                <v-text-field
                  type="number"
                  label="المبلغ"
                  v-model.number="payment.amount"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="التفاصيل"
                  v-model="payment.description"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            اغلاق
          </v-btn>
          <v-btn color="blue darken-1" text @click="savePayment"> حفظ </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <crud-table :data="payments" :headers="headers" @handleEdit="editPayment" />
  </div>
</template>

<script>
import CrudTable from "../components/CrudTable.vue";
import { client } from "../lib/client";
export default {
  components: { CrudTable },
  name: "managePayments",
  data() {
    return {
      menu: false,
      modal: false,
      dialog: false,
      payments: [],
      payment: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
    };
  },
  methods: {
    async getPayments() {
      this.isLoading = true;
      const query = `*[_type=="payment"]`;
      this.payments = await client.fetch(query);
      this.isLoading = false;
    },

    editPayment(item) {
      this.payment = item;
      this.dialog = true;
    },
    async savePayment() {
      try {
        if (this.payment["_id"]) {
          let cloneData;
          cloneData = [...this.payments];
          const row = { _type: "payment", ...this.payment };
          await client.createOrReplace(row);
          const rowIndex = cloneData.findIndex(
            (v) => v._id === this.payment._id
          );
          cloneData[rowIndex] = this.payment;
        } else {
          const row = { _type: "payment", ...this.payment };
          await client.create(row);
          this.payments = [...this.payments, this.payment];
        }
        this.payment = {};
        this.dialog = false;
      } catch (error) {
        console.log(error);
        this.dialog = false;
      }
    },
  },
  async created() {
    await this.getPayments();
  },
  computed: {
    headers() {
      return [
        {
          text: "الاسم",
          value: "name",
          sortable: false,
        },
        {
          text: "التاريخ",
          value: "date",
          sortable: false,
        },
        {
          text: "رقم الشقة",
          value: "numApartment",
          sortable: false,
        },
        { text: "المبلغ", value: "amount", sortable: false },
        { text: "التفاصيل", value: "description", sortable: false },
        { text: "", value: "actions", sortable: false },
      ];
    },
  },
};
</script>


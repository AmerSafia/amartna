<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">ادارة الصرف</h1>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> اضافة صرف </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">اضافة صرف</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="text"
                  label="اسم الصرف"
                  v-model="expense.name"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex md6 class="pr-1">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="expense.date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="expense.date"
                      label=" تاريخ الصرف"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      name="date"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="expense.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      الغاء
                    </v-btn>
                    <v-btn
                      color="primary"
                      @click="$refs.menu.save(expense.date)"
                    >
                      حفظ
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="number"
                  label="المبلغ"
                  v-model.number="expense.amount"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="التفاصيل"
                  v-model="expense.description"
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
          <v-btn color="primary" dark @click="saveExpense"> حفظ </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <crud-table :data="expenses" :headers="headers" @handleEdit="editExpense" />
  </div>
</template>

<script>
import CrudTable from "../components/CrudTable.vue";
import { client } from "../lib/client";
export default {
  components: { CrudTable },
  data() {
    return {
      menu: false,
      modal: false,
      dialog: false,
      expenses: [],
      expense: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
    };
  },
  async created() {
    await this.getExpense();
  },
  methods: {
    async getExpense() {
      const query = `*[_type=="expense"]`;
      this.expenses = await client.fetch(query);
    },
    editExpense(item) {
      this.expense = item;
      this.dialog = true;
      console.log(item);
    },
    async saveExpense() {
      try {
        const row = { _type: "expense", ...this.expense };
        await client.create(row);
        this.expenses = [...this.expenses, this.expense];
        this.expense = {};
        this.dialog = false;
      } catch (error) {
        console.log(error);
        this.dialog = false;
      }
    },
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
        { text: "المبلغ", value: "amount", sortable: false },
        { text: "التفاصيل", value: "description", sortable: false },
        { text: "", value: "actions", sortable: false },
      ];
    },
  },
};
</script>

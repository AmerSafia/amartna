<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">اضافة صرف</h1>
    <v-form @submit.prevent="saveExpense">
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
            :return-value.sync="expense.dateExpense"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="expense.dateExpense"
                label=" تاريخ الصرف"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                name="dateExpense"
              ></v-text-field>
            </template>
            <v-date-picker v-model="expense.dateExpense" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(expense.dateExpense)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md6 class="pr-1">
          <v-text-field
            type="number"
            label="المبلغ"
            v-model="expense.amount"
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
          <v-btn type="submit" color="primary" elevation="3" dark block
            >حفظ</v-btn
          >
      </v-layout>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      expense: {
        dateExpense: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      },
    };
  },
  methods: {
    saveExpense() {
      console.log(this.expense, "expense");
    },
  },
};
</script>

<style></style>

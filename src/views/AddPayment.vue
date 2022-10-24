<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">اضافة دفعة</h1>
    <v-form @submit.prevent="savePayment">
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
            :return-value.sync="payment.datePyment"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="payment.datePyment"
                label=" تاريخ الدفعة"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                name="datePyment"
              ></v-text-field>
            </template>
            <v-date-picker v-model="payment.datePyment" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(payment.datePyment)"
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
            v-model="payment.NumPartment"
            name="الاسم"
          ></v-text-field>
        </v-flex>

        <v-flex md6 class="pr-1">
          <v-text-field
            type="number"
            label="المبلغ"
            v-model="payment.amount"
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
        <v-btn type="submit" color="primary" elevation="3" dark block>
          حفظ
        </v-btn>
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
      payment: {
        datePyment: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      },
    };
  },
  methods: {
    savePayment() {
      console.log(this.payment);
    },
  },
};
</script>


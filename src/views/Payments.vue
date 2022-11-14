<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">الدفعات</h1>
    <v-card class="rounded-lg">
      <v-layout wrap class="my-4 px-2 py-5">
        <v-flex xs6>
          <v-select
            :items="items"
            item-text="name"
            item-value="value"
            label="تصفية بواسطة"
            v-model="filterBy"
            class="pl-1"
          >
          </v-select>
        </v-flex>
        <v-flex xs6 v-if="filterBy == 'name'">
          <v-select
            :items="NamePayments"
            :item-text="filterBy"
            item-value="value"
            label="اخترالاسم"
            v-model="filterdByName"
          ></v-select>
        </v-flex>
        <v-flex xs6 v-if="filterBy == 'month'">
          <v-menu
            v-if="filterBy == 'month'"
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="اختر الشهر"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-btn
          v-if="filterBy"
          color="primary"
          dark
          @click="filterBy == 'name' ? getPaymentsByName() : getPaymentsDate()"
        >
          بحث
        </v-btn>
      </v-layout>
    </v-card>

    <Card>
      <div class="card" v-for="item of payment" :key="item.id">
        <div class="card-preview d-flex flex-column justify-center">
          <h4 class="text-center">{{ item.name }}</h4>
        </div>
        <div class="card-info">
          <div class="d-flex justify-space-between">
            <h6 class="align-self-center">0{{ item.date }}</h6>

            <v-chip class="font-weight-bold" color="orange darken-4" text-color="white">
             {{ item.amount }} د.أ
            </v-chip>
          </div>
          <h4 class="mt-1">{{ item.description }}</h4>
        </div>
      </div>
    </Card>
  </div>
 
</template>
<script>
import Card from "../components/Card.vue";
import { client } from "../lib/client";

export default {
  name: "payments",
  components: {
    Card,
  },
  data() {
    return {
      menu: false,
      modal: false,
      payment: [],
      items: [
        { name: "الشهر", id: 2, value: "month" },
        { name: "الاسم", id: 1, value: "name" },
      ],

      filterBy: "month",
      filterdByName: "",
      date: new Date().toISOString().substr(0, 7),
    };
  },
  async created() {
    await this.getPayments();
  },
  methods: {
    async getPayments() {
      const query = `*[_type=="payment"]`;
      this.payment = await client.fetch(query);
      this.NamePayments = [...this.payment];
    },
    async getPaymentsByName() {
      const query = `*[_type=="payment" && name == '${this.filterdByName}' ]`;
      this.payment = await client.fetch(query);
    },
    async getPaymentsDate() {
      const firstDayOfMonth = new Date(this.date).toISOString();
      const lastDateofMonth = new Date(
        new Date(this.date).getFullYear(),
        new Date(this.date).getMonth() + 1,
        1
      ).toISOString();

      const query = `*[_type=="payment" && dateTime(_createdAt) >= dateTime('${firstDayOfMonth}')&& dateTime(_createdAt) <= dateTime('${lastDateofMonth}')]`;
      this.payment = await client.fetch(query);
    },
  },
};
</script>

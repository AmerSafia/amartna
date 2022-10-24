<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">الدفعات</h1>
    <div class="cards">
      <Card v-for="item of payment" :key="item.id">
        <v-card-title class="text-h5"> {{ item.name }}</v-card-title>
        <v-card-subtitle>
          <div>تاريخ الدفعة: {{ item.date }}</div>
          <div>شقة رقم : {{ item.numApartment }}</div>
          <div>المبلغ: {{ item.amount }} دينار</div>
          <div>التفاصيل: {{ item.description }}</div>
        </v-card-subtitle>
      </Card>
    </div>
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
      payment: [],
    };
  },
  async created() {
    await this.getPayments();
  },
  methods: {
    async getPayments() {
      const query = `*[_type=="payment"]`;
      this.payment = await client.fetch(query);
    },
  },
};
</script>
<style></style>

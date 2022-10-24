<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">مصاريف</h1>
    <div class="cards">
      <Card v-for="item of expense" :key="item.id">
        <v-card-title class="text-h5"> {{ item.name }}</v-card-title>
        <v-card-subtitle>
          <div>المبلغ: {{ item.amount }} دينار</div>
          <div>تاريخ : {{ item.date }}</div>
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
  name: "expenses",
  components: {
    Card,
  },
  data() {
    return {
      expense: [],
    };
  },
  async created() {
    await this.getExpense();
  },
  methods: {
    async getExpense() {
      const query = `*[_type=="expense"]`;
      this.expense = await client.fetch(query);
    },
  },
};
</script>

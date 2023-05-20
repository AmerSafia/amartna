<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">مصاريف</h1>
    <Card>
      <div v-for="item of expense" :key="item.id">
        <div class="card">
          <div class="card-preview d-flex flex-column justify-center">
            <h6>دفعة</h6>
            <h3 class="text-center">{{ item.name }}</h3>
          </div>
          <div class="card-info">
            <div class="d-flex justify-space-between">
              <h6 class="align-self-center">{{ item.date }}</h6>
              <v-chip
                class="font-weight-bold"
                color="primary"
                text-color="white"
              >
                {{ item.amount }} د.أ
              </v-chip>
            </div>
            <h4 class="mt-1">{{ item.description }}</h4>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { client } from "../lib/client";
export default {
  name: "Expense",
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
      const data = await client.fetch(query);
      this.expense = data.sort((x) => {
        return x.date;
      });
      data.sort(
        (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
      );
    },
  },
};
</script>

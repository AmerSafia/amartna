<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">سكان العمارة</h1>
    <div class="cards">
      <Card v-for="pay of population" :card="pay" :key="pay.id">
        <v-card-title class="text-h7 py-2 "> الاسم : {{ pay.name }}</v-card-title>
        <v-card-subtitle class="my-0 pb-1" >
          <div>رقم الهاتف : 0{{ pay.phone }}</div>
          <div>رقم الشقة : {{ pay.numApartment }}</div>
          <div>التفاصيل: {{ pay.description }}</div>
        </v-card-subtitle>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import { client } from "../lib/client";
export default {
  name: "populations",
  components: {
    Card,
  },
  data() {
    return {
      population: [],
    };
  },
  async created() {
    await this.getPopulations();
  },
  methods: {
    async getPopulations() {
      const query = `*[_type=="population"]`;
      this.population = await client.fetch(query);
    },
  },
};
</script>

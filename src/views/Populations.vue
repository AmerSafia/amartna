<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">سكان العمارة</h1>
    <Card>
      <div class="card" v-for="item of population" :key="item.id">
        <div class="card-preview d-flex flex-column justify-center">
          <h4 class="text-center">{{ item.name }}</h4>
        </div>
        <div class="card-info">
          <div class="d-flex justify-space-between">
            <h6 class="align-self-center">0{{ item.phone }}</h6>

            <v-chip class="font-weight-bold" color="warning" text-color="white">
              شقة رقم
              {{ item.numApartment }}
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
      const population = await client.fetch(query);
      this.population = population.sort((a, b) => {
        if (a.numApartment < b.numApartment) return -1;
        return a.numApartment > b.numApartment ? 1 : 0;
      });
    },
  },
};
</script>

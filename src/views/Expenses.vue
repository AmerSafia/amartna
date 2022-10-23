<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">مصاريف </h1>
    <div class="cards">
      <Card v-for="pay of payments" :card="pay" :key="pay.id">
        <v-card-title class="text-h5"> {{ pay.name }}</v-card-title>
        <v-card-subtitle>
          <div>دفعة: {{ pay.price }} دينار</div>
          <div>تاريخ : {{ pay.date }}</div>
          <div>التفاصيل: {{ pay.desc }}</div>
        </v-card-subtitle>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  name: "expenses",
  components: {
    Card,
  },
  data() {
    return {
      payments: [
        {
          name: "صيانة مصعد",
          desc: "صيانة مصعد",
          price: 75,
          date: "20/10/2020",
        },
      ],
    };
  },
};
</script>

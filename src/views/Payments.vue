<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">الدفعات</h1>
    <div class="cards">
      <Card v-for="card of cards" :card="card" :key="card.id">
        <v-card-title class="text-h5"> {{ card.name }}</v-card-title>
        <v-card-subtitle>
          <div>تاريخ الدفعة: {{ card.date }}</div>
          <div>شقة رقم : {{ card.apartmentNum }}</div>
          <div>التفاصيل: {{ card.desc }}</div>
          <div>المبلغ: {{ card.pay }} دينار</div>
        </v-card-subtitle>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  name: "payments",
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        {
          name: "عامر حسين صافية",
          date: "10/10/2020",
          desc: "دفعة عن شهر 10",
          apartmentNum: 12,
          pay: 12,
        },
        {
          name: "عامر حسين صافية",
          date: "10/10/2020",
          desc: "دفعة عن شهر 10",
          apartmentNum: 12,
          pay: 12,
        },
        {
          name: "عامر حسين صافية",
          date: "10/10/2020",
          desc: "دفعة عن شهر 10",
          apartmentNum: 12,
          pay: 12,
        },
        {
          name: "عامر حسين صافية",
          date: "10/10/2020",
          desc: "دفعة عن شهر 10",
          apartmentNum: 12,
          pay: 12,
        },
        {
          name: "عامر حسين صافية",
          date: "10/10/2020",
          desc: "دفعة عن شهر 10",
          apartmentNum: 12,
          pay: 12,
        },
      ],
    };
  },
};
</script>
<style></style>

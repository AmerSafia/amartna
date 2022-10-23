<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center ">سكان العمارة</h1>
    <div class="cards">
      <Card v-for="pay of payments" :card="pay" :key="pay.id">
        <v-card-title class="text-h5"> الاسم : {{ pay.name }}</v-card-title>
        <v-card-subtitle>
          <div>التفاصيل: {{ pay.desc }}</div>
          <div>شقة رقم : {{ pay.apartmentNum }}</div>
          <div>رقم الهاتف : {{ pay.phone }}</div>
        </v-card-subtitle>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  name: "populations",
  components: {
    Card,
  },
  data() {
    return {
      payments: [
        {
          name: "عامر حسين صافية",
          phone: "+962 7 786830335",
          desc: "الطابق الاخير",
          apartmentNum: 12,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },

        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
        {
          name: "مهندس",
          phone: "+962 7 9973 5671",
          desc: "desc",
          apartmentNum: 1,
        },
      ],
    };
  },
};
</script>

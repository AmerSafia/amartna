<template>
  <v-layout wrap>
    <v-list-item
      v-for="item of nav"
      :key="item.id"
      :to="item.url"
      class="home-card p-0"
      
    >
      <v-list-item-icon>
        <v-icon color="white">{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="bold">
        {{ item.name }}
      </v-list-item-title>
    </v-list-item>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      nav: [
        {
          name: "سكان العمارة",
          url: "populations",
          icon: "far fa-building",
          id: 2,
        },
        { name: "الدفعات", url: "payments", icon: "fas fa-file-alt", id: 3 },
        { name: "المصاريف", url: "expenses", icon: "mdi-cash-register", id: 4 },
        {
          name: "ادارة السكان",
          url: "managePopulation",
          icon: "fas fa-users",
          id: 5,
        },
        {
          name: "ادارة الدفعات",
          url: "managePayments",
          icon: "fas fa-file-invoice-dollar",
          id: 6,
        },
        {
          name: "ادارة المصاريف",
          url: "manageExpenses",
          icon: "fas fa-hand-holding-usd",
          id: 7,
        },
        {
          name: "تسجيل الدخول",
          url: "login",
          icon: "fas fa-sign-in-alt",
          id: 8,
        },
      ],
    };
  },
};
</script>
<style >
.home-card {
  background-color: #673ab7;
  margin: 10px 10px;
  border-radius: 10px !important;
  color: #fff !important;
  flex: 1 1 30% !important;
}
.home-card .v-list-item__icon {
  color: #fff !important;
}
</style>

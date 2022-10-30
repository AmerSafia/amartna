<template>
  <v-layout wrap>
    <v-card v-for="item of nav" class="home-card p-0" :key="item.id">
      <v-list-item
        :to="item.url"
        v-if="!item.adminPermission || store.loggedIn"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="bold">
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
    </v-card>
  </v-layout>
</template>

<script>
import { store } from "../../store";

export default {
  name: "Home",
  data() {
    return {
      store,
      nav: [
        {
          name: "سكان العمارة",
          url: "populations",
          icon: "far fa-building",
          id: 1,
        },
        { name: "الدفعات", url: "payments", icon: "fas fa-file-alt", id: 2 },
        { name: "المصاريف", url: "expenses", icon: "mdi-cash-register", id: 3 },
        {
          name: "ادارة السكان",
          url: "managePopulation",
          icon: "fas fa-users",
          adminPermission: true,
          id: 4,
        },
        {
          name: "ادارة الدفعات",
          url: "managePayments",
          icon: "fas fa-file-invoice-dollar",
          adminPermission: true,
          id: 5,
        },
        {
          name: "ادارة المصاريف",
          url: "manageExpenses",
          icon: "fas fa-hand-holding-usd",
          adminPermission: true,
          id: 6,
        },
      ],
    };
  },
};
</script>
<style  >
.home-card {
  background-color: #673ab7 !important;
  margin: 10px 10px;
  border-radius: 10px !important;
  color: #fff !important;
  flex: 1 1 30% !important;
}

.home-card .v-list-item__icon,
.home-card .v-list-item__title {
  color: #fff !important;
}
.v-card:empty {
  display: none;
}
</style>

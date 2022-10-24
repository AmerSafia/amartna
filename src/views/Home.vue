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
          id: 1,
        },
        { name: "الدفعات", url: "payments", icon: "fas fa-file-alt", id: 2 },
        { name: "المصاريف", url: "Expenses", icon: "mdi-cash-register", id: 3 },
        {
          name: "تسجيل دفعة",
          url: "addpayment",
          icon: "fas fa-file-invoice-dollar",
          id: 4,
        },
        {
          name: "تسجيل صرف",
          url: "addexpenses",
          icon: "fas fa-file-invoice-dollar",
          id: 5,
        },
      ],
    };
  },
};
</script>
<style >
.home-card {
  /* text-align: center; */
  background-color: #673ab7;
  margin: 10px 10px;
  border-radius: 10px !important;
  color: #fff !important;
  flex: 1 1 30% !important;
}
.home-card .v-list-item__icon{
  color: #fff !important;
}
</style>

<template >
  <div>
    <Navbar :nav="nav">
      <v-main>
        <router-view />
      </v-main>
    </Navbar>
  </div>
</template>

<script>
import "./assets/global.css";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  data() {
    return {
      nav: [
        {
          name: "الصفحة الرئيسية",
          url: "/",
          icon: "mdi-home",
          id: 1,
        },
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
          icon: "fas fa-file-invoice-dollar",
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
          icon: "fas fa-file-invoice-dollar",
          id: 7,
        },
      ],
    };
  },
  components: {
    Navbar,
  },
};
</script>

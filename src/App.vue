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
          id: 6,
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
  components: {
    Navbar,
  },
};
</script>

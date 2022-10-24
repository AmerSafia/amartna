import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/populations",
    name: "populations",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Populations.vue"),
  },
  {
    path: "/payments",
    name: "payments",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Payments.vue"),
  },
  {
    path: "/expenses",
    name: "expenses",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/expenses.vue"),
  },
  {
    path: "/managePayments",
    name: "managePayments",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/managePayments.vue"),
  },
  {
    path: "/manageExpenses",
    name: "manageExpenses",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/manageExpenses.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

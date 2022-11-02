import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index.vue";

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
      import(/* webpackChunkName: "about" */ "../views/Expenses.vue"),
  },

  {
    path: "/managePopulation",
    name: "managePopulation",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/managePopulation.vue"),
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
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: '*',
    name: '404',
    component: Home,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

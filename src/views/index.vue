<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs6 md4>
        <v-card class="mx-1 my-4" min-height="170px" outlined>
          <v-list-item three-line>
            <v-list-item-content class="card-price">
              <div class="text-overline mb-4">
                المجموع الكلي للمدفوعات حتى تاريخ
                <div>
                  {{ date }}
                </div>
              </div>
              <v-list-item-title class="text-h5 mb-1">
                <v-chip label color="primary" class="py-5">
                  {{ TotalPayments }}
                  دينار اردني
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-list-item to="/payments" class="details">
                  للمزيد من التفاصيل 
                  <span>
                    اضغط هنا
                  </span>
                </v-list-item>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              class="card-price-avatar"
              tile
              size="60"
              color="lime darken-3"
            >
              <v-icon color="white">fa-solid fa-coins </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>

      <v-flex xs6 md4>
        <v-card class="mx-1 my-4" min-height="170px" outlined>
          <v-list-item three-line>
            <v-list-item-content class="card-price">
              <div class="text-overline mb-4">
                المجموع الكلي للمصاريف حتى تاريخ
                <div>
                  {{ date }}
                </div>
              </div>
              <v-list-item-title class="text-h5 mb-1">
                <v-chip label color="primary" class="py-5">
                  {{ TotalExpense }}
                  دينار اردني
                </v-chip>
              </v-list-item-title>
              <v-list-item to="/expenses" class="details">
                  للمزيد من التفاصيل 
                  <span>
                    اضغط هنا
                  </span>
                </v-list-item>
            </v-list-item-content>

            <v-list-item-avatar
              class="card-price-avatar"
              tile
              size="60"
              color="blue darken-4"
            >
              <v-icon color="white"> fas fa-chart-bar </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex xs6 md4>
        <v-card class="mx-1 my-4" min-height="170px" outlined>
          <v-list-item three-line>
            <v-list-item-content class="card-price">
              <div class="text-overline mb-4">
                مجموع المبقي حتى تاريخ
                <div>
                  {{ date }}
                </div>
              </div>
              <v-list-item-title class="text-h5 mb-1">
                <v-chip label color="primary" class="py-5">
                  {{ TotalPayments - TotalExpense }}
                  دينار اردني
                </v-chip>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              class="card-price-avatar"
              tile
              size="60"
              color="amber darken-1"
            >
              <v-icon color="white"> fa-solid fa-filter-circle-dollar </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store";
import { client } from "../lib/client";
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
      date: new Date().toLocaleDateString(),
      TotalPayments: 0,
      TotalExpense: 0,
    };
  },
  async created() {
    await this.getTotalExpense();
    await this.getTotalPayments();
  },
  methods: {
    async getTotalExpense() {
      const query = `*[_type=="expense"]`;
      const expenses = await client.fetch(query);
      this.TotalExpense = expenses.reduce((sum, li) => sum + li.amount, 0);
    },
    async getTotalPayments() {
      const query = `*[_type=="payment"]`;
      const payments = await client.fetch(query);
      this.TotalPayments = payments.reduce((sum, li) => sum + li.amount, 0);
    },
  },
};
</script>
<style>
.v-card:empty {
  display: none;
}
.card-price {
  position: relative;
}
.card-price-avatar {
  position: absolute;
  left: 10px;
  top: -28px;
}
.details{
  color: rgba(169, 161, 161, 0.818) !important;
  padding: 0;
}
.details span{
  padding: 4px;
  color: #673ab7;
}
</style>

<template>
  <v-app>
    <v-card
      class="mx-auto backgroundFix"
      height="100%"
      min-height="100vh"
      width="100%"
      color="#FFEBC6"
    >
      <v-app-bar color="deep-purple" dark class="style-header">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-list-item to="/" active-class="deActive"> عمارتنا </v-list-item>
        </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer color="#EEEEEE" v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4 ">
            <div v-for="item of nav" :key="item.id">
              <v-list-item
                :to="item.url"
                v-if="!item.adminPermission || store.loggedIn"
              >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="bold">
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <slot> </slot>
      </v-container>
    </v-card>
  </v-app>
</template>
<script>
import { store } from "../../store";

export default {
  name: "Navbar",
  props: {
    nav: { type: Array },
  },
  data: () => ({
    drawer: false,
    store,
  }),
};
</script>
<style scoped>
.bold {
  font-weight: bold !important;
}
.v-list-item__icon {
  margin: auto;
}
.deActive {
  color: #fff;
}
.style-header {
  border-radius: 0 !important;
}
</style>

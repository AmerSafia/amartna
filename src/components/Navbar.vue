<template>
  <v-app>
    <v-card class="mx-auto" height="100%" min-height="100vh" width="100%">
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title class="direction-ltr">عمارتنا</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4 "
          >
            <v-list-item v-for="item of nav" :key="item.id" :to="item.url">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="bold">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
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
export default {
  name: "Navbar",
  props: {
    nav: { type: Array },
  },
  data: () => ({
    drawer: false,
    group: null,
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
</style>

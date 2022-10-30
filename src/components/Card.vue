<template>
  <v-card color="deep-purple darken-4" class="card elevation-15" dark>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: { type: Object },
  },
};
</script>

<style scoped>
.card {
  border-radius: 24px 4px !important;
}
</style>

<template>
  <v-layout>
    <v-flex xs12 md6>
      <v-text-field class="pr-1" v-model="email" label="Email"></v-text-field>
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        @click:append="show = !show"
        class="pr-1"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      email: "",
      password: "",
    };
  },
};
</script>

<style>
</style>
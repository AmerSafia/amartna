<template>
  <v-container>
    <h1 class="font-weight-black mb-4 text-center">تسجيل الدخول</h1>

    <v-layout wrap>
      <v-flex xs12>
        <v-text-field class="pr-1" v-model="email" label="Email"></v-text-field>
      </v-flex>
      <v-flex xs12>
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
      <v-btn class="mt-4" color="primary" @click="login">تسجيل الدخول</v-btn>
      {{error}}
    </v-layout>
  </v-container>
</template>

<script>
import { store } from "../../store";
import { client } from "../lib/client";
export default {
  data() {
    return {
      show: false,
      email: "",
      password: "",
      error: "",
      store
    };
  },
  methods: {
    async login() {
      const email = this.email;
      const password = this.password;
      const query = `*[_type=="admin" && email==$email&& password==$password]`;
      const user = await client.fetch(query, { email, password });
      if (user.length) {
        this.store.login();
        this.$router.push({ name: "Home" });
      } else {
        this.error = "please check email and password";
      }
    },
  },
};
</script>

<style>
</style>
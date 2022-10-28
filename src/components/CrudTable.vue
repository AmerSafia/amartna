<template>
  <div>
    <v-flex xs12>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :loading="isLoading"
        :headers="headers"
        :items="data"
        :search="search"
        v-model="selected"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-flex>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">هل انت متاكد من الحذف ؟</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { client } from "../lib/client";
export default {
  name: "crud-table",
  props: {
    headers: { type: Array },
    data: { type: Array },
  },
  data() {
    return {
      dialogDelete: false,
      isLoading: false,
      search: "",
      selected: [],
      deletedItem: {
        _id: "",
      },
    };
  },
  methods: {
    editItem(item) {
      this.$emit("handleEdit", item);
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.deletedItem = item;
    },
    async deleteItemConfirm() {
      if (this.deletedItem) {
        await client
          .delete(this.deletedItem._id)
          .then(() => {
            const cloneData = [...this.data];
            const filterData = cloneData.filter(
              (ele) => ele._id !== this.deletedItem._id
            );
            this.data = [...filterData];
          })
          .catch((err) => {
            console.error("Delete failed: ", err.message);
          });
      }
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style>
</style>
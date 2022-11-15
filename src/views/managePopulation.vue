<template>
  <div>
    <h1 class="font-weight-black mb-4 text-center">ادارة السكان</h1>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="entity = {}"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          اضافة ساكن
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">اضافة ساكن</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="text"
                  label="الاسم"
                  v-model="entity.name"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex md6 class="pr-1">
                <v-text-field
                  type="number"
                  label="رقم الشقة"
                  v-model.number="entity.numApartment"
                  name="الاسم"
                ></v-text-field>
              </v-flex>

              <v-flex md6 class="pr-1">
                <v-text-field
                  type="number"
                  label="رقم الهاتف"
                  v-model.number="entity.phone"
                  name="الاسم"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="التفاصيل"
                  v-model="entity.description"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            اغلاق
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEntity"> حفظ </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <crud-table
      :data="population"
      :headers="headers"
      @handleEdit="editPopulation"
    />
  </div>
</template>

<script>
import { client } from "../lib/client";
import CrudTable from "../components/CrudTable.vue";
export default {
  name: "managePopulations",
  components: { CrudTable },
  data() {
    return {
      dialog: false,
      population: [],
      entity: {},
    };
  },
  async created() {
    await this.getPopulations();
  },
  methods: {
    async getPopulations() {
      const query = `*[_type=="population"]`;
      this.population = await client.fetch(query);
    },

    async saveEntity() {
      try {
        if (this.entity["_id"]) {
          let cloneData;
          cloneData = [...this.population];
          const row = { _type: "population", ...this.entity };
          await client.createOrReplace(row);
          const rowIndex = cloneData.findIndex(
            (v) => v._id === this.entity._id
          );
          cloneData[rowIndex] = this.entity;
        } else {
          const row = { _type: "population", ...this.entity };
          await client.create(row);
          this.population = [...this.population, this.entity];
        }
        this.entity = {};
        this.dialog = false;
      } catch (error) {
        console.log(error);
        this.dialog = false;
      }
    },
    editPopulation(item) {
      this.entity = item;
      this.dialog = true;
      console.log(item);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "الاسم",
          value: "name",
          sortable: false,
        },
        {
          text: "رقم الشقة",
          value: "numApartment",
          sortable: true,
        },
        { text: "رقم الهاتف", value: "phone", sortable: false },
        { text: "التفاصيل", value: "description", sortable: false },
        { text: "", value: "actions", sortable: false },
      ];
    },
  },
};
</script>

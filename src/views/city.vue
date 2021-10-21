<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>City List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-select
          class="mt-10"
          v-model="filterCountryId"
          solo
          label="Filter by Country"
          :items="countryList"
          item-text="name"
          item-value="countryId"
          @input="filterCities()"
        ></v-select>
        <v-btn icon color="primary" @click="resetFilter" class="mt-4">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      required
                      :rules="[(value) => !!value || 'City name is required.']"
                      label="City name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.countryId"
                      required
                      :rules="[(value) => !!value || 'Country is required.']"
                      label="Country"
                      :items="countryList"
                      item-text="name"
                      item-value="countryId"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="close"> Cancel </v-btn>
              <v-btn color="primary" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "id" },
      {
        text: "Name",
        sortable: false,
        value: "name",
      },
      {
        text: "Country",
        sortable: false,
        value: "country",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    countryList: [],
    editedIndex: -1,
    filterCountryId: null,
    editedItem: {
      name: "",
      countryId: "",
    },
    defaultItem: {
      name: "",
      countryId: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getCities();
    this.getCountries();
  },

  methods: {
    ////////////////////////////////
    // Data Methods
    ////////////////////////////////
    getCities() {
      this.$axios.get("city").then((res) => {
        this.initialize(res);
      });
    },
    getCountries() {
      this.$axios.get("country").then((res) => {
        this.countryList = res.data.map((item) => {
          item.countryId = item.id;
          return item;
        });
      });
    },
    initialize(data) {
      this.items = [...data.data];
    },
    filterCities() {
      this.$axios(`city/getcities/${this.filterCountryId}`).then((res) => {
        this.items = res.data.map((item) => {
          item.country = item.country.name;
          return item;
        });
      });
    },
    resetFilter() {
      this.filterCountryId = null;
      this.getCities();
    },

    ////////////////////////////////
    // Submtion Methods
    ////////////////////////////////
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.editCountry();
        } else {
          this.saveCountry();
        }
      }
    },
    saveCountry() {
      this.$axios.post("city", this.editedItem).then((res) => {
        this.items.unshift(res.data);
        this.close();
      });
    },
    editCountry() {
      this.$axios.put("city", this.editedItem).then((res) => {
        Object.assign(this.items[this.editedIndex], res.data);
        this.close();
      });
    },

    ////////////////////////////////
    // Delete Methods
    ////////////////////////////////
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.$axios.delete(`city/${this.editedItem.id}`).then(() => {
        this.items.splice(this.editedIndex, 1);
        this.closeDelete();
      });
    },

    ////////////////////////////////
    // Reset Methods
    ////////////////////////////////
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$refs.form.reset();
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
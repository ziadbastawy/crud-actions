<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon color="white" @click.stop="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text">
          <v-list-item :to="{ name: 'country-list' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Countries</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'city-list' }">
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cities</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    logout() {
      this.$router.push({ name: "login" });
      localStorage.removeItem("token");
    },
  },
};
</script>
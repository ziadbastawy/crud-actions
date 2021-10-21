<template>
  <!-- width="512" -->
  <v-navigation-drawer class="blue darken-3" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6 white--text">
          Application
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="blue lighten-4" />
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-content>
          <router-link :to="{ name: item.routeName }">
            <v-list-item-title class="grey--text text--lighten-5">
              {{ item.title }}
            </v-list-item-title>
          </router-link>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    <!-- -->
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "Home",

  components: {},
};
</script>

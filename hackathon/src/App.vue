<template>
  <div>
    <v-app>
      <!-- <v-app-bar
        app
        color="#00827f"
        dark
      >
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
          <h3 class="p-1 pt-3 pl-5">Health Care</h3>
        </div>

        <v-spacer></v-spacer>
      </v-app-bar> -->
      <v-main>
        <Analysis/>
        <!-- <Tables /> -->
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Analysis from './components/Analysis';
// import Tables from './components/Tables';
export default {
  name: 'App',

  components: {
    Analysis,
    // Tables
  },

  data: () => ({
    //
  }),
};
</script>

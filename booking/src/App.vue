<template>
  <div>
    <v-app>
      <v-main>
        <Booking />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Booking from './components/Appointment';
export default {
  name: 'App',

  components: {
    Booking,
  },

  data: () => ({
    //
  }),
};
</script>

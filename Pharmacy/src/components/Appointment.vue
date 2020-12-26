<template>
  <div>
    <div class="container pt-3">
      <h4 class="text-center pt-3" style="color: #00827f">Pharmacy - Secure Health</h4>
      <div class="row justify-content-center">
        <div class="col-md-8">
        <v-text-field
            v-model="number"
            :rules="nameRules"
            :counter="13"
            label="Patient Number"
            color="#00827f"
            required
        ></v-text-field>
        <div class="my-2">
          <center><v-btn dense color="#00827f" style="color: #fff" @click="getData()">Get Prescriptions</v-btn></center>
        </div>
        </div>
      </div>
      
    </div>
    <div class="container" v-show="showData">
      <div class="row justify-content-center">
        <div v-for="item in data" :key="item">
            <div class="col-md-12">
                <v-card class="" style="width:250px">
                    <v-card-text style="color: #000">
                        <p class="text--primary" style="font-weight:600">
                            {{ item.title }}
                        </p>
                        <p>{{ item.date.split('T')[0] }}</p>
                        <a :href="item.details" target="_blank" style="text-decoration: none;">
                            <v-btn class="mr-auto" text dense color="#00827f">
                                View
                            </v-btn>
                        </a>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        
    </div>
  </div>
  </div>
</template>

<script>
export default {
    name: "Analysis",
    data () {
      return {
        number: '',
        showData: false,
        data: []
      }
    },
    methods: {
      getData()
      {
        fetch('https://health-care-auto.herokuapp.com/api/doctor/'+this.number, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
          this.showData = true;
          this.data = data;
          console.log(data);
        });
      }
    }
}
</script>

<style scoped>

</style>
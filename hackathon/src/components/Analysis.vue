<template>
    <div>
      
        <div class="container pt-5">
            <div class="row justify-content-center">
                <v-container fluid grid-list-md>
                    <v-textarea
                    name="input-7-1"
                    filled
                    label="Personal Diary"
                    auto-grow
                    color="#00827f"
                    v-model="testData"
                    ></v-textarea>
                    
                    <v-btn
                        :loading="submitText"
                        :disabled="submitText"
                        color="#00827f"
                        @click="addDiary()"
                        >
                        <span style="color: #fff !important">Log Diary</span>
                        <template v-slot:loader>
                            <span class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </template>
                    </v-btn> &nbsp;
                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="#00827f"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          Submit report
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Submit report to doctor</span>
                        </v-card-title>
                        <v-card-text>
                          <div class="container">
                            <h5 class="text-center" style="color: #000">Start Date</h5>
                            <div class="row justify-content-center">
                              <v-date-picker color="#00827f" v-model="startPicker" :multiple="multiple" width="300"></v-date-picker>
                            </div>
                            <br>
                            <h5 class="text-center" style="color: #000">End Date</h5>
                            <div class="row justify-content-center">
                              <v-date-picker color="#00827f" v-model="endPicker" :multiple="multiple" width="300"></v-date-picker>
                            </div>
                          </div>
                          
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="#00827f" text @click="dialog = false">Close</v-btn>
                          <v-btn color="#00827f" text @click="sendReport()">Send</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- <br> <br> -->
                    <!-- <v-btn
                        color="info"
                        >
                        <span style="color: #fff !important">Exit</span>
                    </v-btn> -->
                </v-container>
            </div>
            <br> <br>
            <div v-show="loadAlert">
                <h5 class="text-center">{{ customText }}</h5>
                <div class="row justify-content-center">
                  <div v-for="(item,i) in spotifyPlaylist" :key="i">
                    <div class="col-md-12">
                      <v-card class="" max-width="344">
                          <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="item.images[0].url"
                          >
                          </v-img>

                          <v-card-subtitle class="pb-0"></v-card-subtitle>

                          <v-card-text class="text--primary">
                            <div class="h5">{{ item.name }}</div>

                            <div>{{ item.type }} by <strong>{{ item.owner.display_name }}</strong></div>
                          </v-card-text>

                          <v-card-actions>
                            <a :href="item.external_urls.spotify" style="text-decoration: none" target="_blank">
                            <v-btn
                              color="#1DB954"
                              text
                              
                            >
                            <v-icon>mdi-spotify</v-icon> &nbsp;
                              <span class="pl-2">Listen on spotify</span>
                            </v-btn>
                            </a>
                          </v-card-actions>
                      </v-card>
                    </div>  
                  </div>
              </div>
            </div>
            <br> <br>
            <v-btn color="info" @click="exit()">
                <span style="color: #fff !important">Exit</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "Analysis",
    data () {
      return {
        startPicker: new Date().toISOString().substr(0, 10),
        endPicker: new Date().toISOString().substr(0, 10),
        multiple: false,
        loader: null,
        dialog: false,
        submitText: false,
        loadAlert: false,
        score: {},
        testData: '',
        isPos: false,
        isNeg: false,
        isNeu: true,
        spotifyPlaylist: {},
        customText: '',
        sendData: {},
        negative : '',
        positive: '',
        neutral: '',
        compound: '',
        summary: '',
        ent_list: [],
        uid: localStorage.pid
      }
    },
    computed: {
      functionEvents () {
        return this.month ? this.monthFunctionEvents : this.dateFunctionEvents
      },
    },
    mounted()
    {
      fetch('https://health-care-auto.herokuapp.com/api/diary/hello/diaryUser',{
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.pid = data._id;
        this.uid = data._id;
      });
    },
    watch: {
      startPicker(){
        console.log(this.startPicker);
      },
      endPicker(){
        console.log(this.endPicker);
      }
    },
    methods: {
      dateFunctionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
      monthFunctionEvents (date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) return true
        if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        return false
      },
      sendReport()
      {
        this.dialog = false;
        console.log(localStorage.pid);
        fetch("https://health-care-auto.herokuapp.com/api/diary/sendData", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            startDate: this.startPicker,
            endDate: this.endPicker,
            userId: this.uid
          })
        })
        .then(res => res.json())
        .then(resData => console.log(resData));
      },
      addDiary () {
        this.loadAlert = false;
        const l = this.loader
        this[l] = !this[l];
        const data = this.testData;
        console.log(data);
        fetch("https://4e23b68c917f.ngrok.io/fetch", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "query": this.testData
            })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.summary = data.Summary;
          this.ent_list = data.ent_list;
            this.score = {};
            console.log(localStorage.pid)
            Object.entries(data.scores).forEach(element => {
                
                if(element[0] == "neg")
                {
                  this.negative = element[1];
                  this.score["Negative"] = element[1]*100 + ' %';
                  
                }
                    
                else if(element[0] == "neu")
                {
                  this.neutral = element[1];
                  this.score["Neutral"] = element[1]*100 + ' %';
                  
                }
                    
                else if(element[0] == "pos")
                {
                  this.positive = element[1];
                  this.score["Positive"] = element[1]*100 + ' %';
                }
                    
                else if(element[0] == "compound")
                {
                  this.compound = element[1];
                  this.score["Compound"] = element[1];
                  if(element[1] > 0)
                  {
                    this.customText = "Glad to hear, you had a great day. Here's a playlist to celebrate your day";
                    this.isPos = true;
                    this.isNeg = false;
                    this.isNeu = false;
                  }
                  else if(element[1] == 0)
                  {
                    this.customText = "Here's a playlist to cheer up your mood";
                    this.isPos = false;
                    this.isNeg = false;
                    this.isNeu = true;
                  }
                  else
                  {
                    this.customText = "This too shall pass, you're a warrior, chin up brother!";
                    this.isPos = false;
                    this.isNeg = true;
                    this.isNeu = false;
                  }
                }
            });
            this.spotifyPlaylist = data.Spotify.playlists.items;
            // console.log(this.spotifyPlaylist);
            // console.log(this.score);
            this.sendData ={
              text: this.testData,
              user: localStorage.pid,
              scores: {
                neg: this.negative,
                neu: this.neutral,
                pos: this.positive,
                compound: this.compound
              },
              Summary: this.summary,
              ent_list: this.ent_list
            };
            console.log(JSON.stringify(this.sendData));
            fetch("https://health-care-auto.herokuapp.com/api/diary/",{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.sendData)
            })
            .then(res => res.json())
            .then(resData => {
              console.log("Heyyy Done");
              console.log(resData);
            });
            console.log(this.sendData);
            this.loadAlert = true;
            this[l] = false
        })
        .catch(err => console.log(err));
        this.loader = null;
      },
      exit()
      {
        fetch("https://health-care-auto.herokuapp.com/api/diary/close",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: localStorage.pid
          })
        })
        .then(res => res.json())
        .then(data => console.log(data));
      }
    }
}
</script>

<style scoped>
    .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>